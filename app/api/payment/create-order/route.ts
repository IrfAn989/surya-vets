import { NextResponse, type NextRequest } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { addressSchema } from '@/lib/validations/addressSchema';
import { createOrderSchema } from '@/lib/validations/orderSchema';

const FREE_DELIVERY_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD ?? 499
);

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Please login to checkout' }, { status: 401 });
  }

  const body = await request.json();
  const orderParse = createOrderSchema.safeParse(body);
  const addressParse = addressSchema.safeParse(body.address);
  if (!orderParse.success || !addressParse.success) {
    return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
  }

  const { items, paymentMethod } = orderParse.data;
  const admin = createAdminClient();

  // Validate items against DB (price + stock) to prevent tampering.
  const productIds = items.map((i) => i.productId);
  const { data: dbProducts, error: dbErr } = await admin
    .from('products')
    .select('id, name, sale_price, mrp, stock_quantity, is_active')
    .in('id', productIds);

  if (dbErr || !dbProducts) {
    return NextResponse.json({ error: 'Could not validate products' }, { status: 500 });
  }

  let subtotal = 0;
  for (const item of items) {
    const dbProduct = dbProducts.find((p) => p.id === item.productId);
    if (!dbProduct || !dbProduct.is_active) {
      return NextResponse.json(
        { error: `Product unavailable: ${item.name}` },
        { status: 400 }
      );
    }
    if (dbProduct.stock_quantity < item.quantity) {
      return NextResponse.json(
        { error: `Insufficient stock for ${dbProduct.name}` },
        { status: 400 }
      );
    }
    subtotal += dbProduct.sale_price * item.quantity;
  }

  const shipping = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 50;
  const total = subtotal + shipping;

  // Save delivery address.
  const { data: address } = await admin
    .from('addresses')
    .insert({ ...addressParse.data, user_id: user.id })
    .select('id')
    .single();

  // Create order record.
  const { data: order, error: orderErr } = await admin
    .from('orders')
    .insert({
      user_id: user.id,
      address_id: address?.id ?? null,
      subtotal,
      shipping_amount: shipping,
      total_amount: total,
      payment_method: paymentMethod,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      payment_status: 'pending',
    })
    .select('id, order_number')
    .single();

  if (orderErr || !order) {
    return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
  }

  // Insert order items.
  await admin.from('order_items').insert(
    items.map((i) => {
      const dbProduct = dbProducts.find((p) => p.id === i.productId)!;
      return {
        order_id: order.id,
        product_id: i.productId,
        variant_id: i.variantId ?? null,
        product_name: i.name,
        variant_name: i.variantName ?? null,
        image_url: i.image_url,
        quantity: i.quantity,
        mrp: dbProduct.mrp,
        sale_price: dbProduct.sale_price,
        total: dbProduct.sale_price * i.quantity,
      };
    })
  );

  if (paymentMethod === 'cod') {
    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      method: 'cod',
    });
  }

  // Create Razorpay order.
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const rzpOrder = await razorpay.orders.create({
    amount: Math.round(total * 100),
    currency: 'INR',
    receipt: order.order_number,
  });

  await admin.from('orders').update({ razorpay_order_id: rzpOrder.id }).eq('id', order.id);

  return NextResponse.json({
    orderId: order.id,
    orderNumber: order.order_number,
    razorpayOrderId: rzpOrder.id,
    amount: rzpOrder.amount,
  });
}
