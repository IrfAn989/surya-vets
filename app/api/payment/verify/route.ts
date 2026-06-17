import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyPaymentSchema } from '@/lib/validations/orderSchema';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = verifyPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Mark order as paid.
  const { data: order, error } = await admin
    .from('orders')
    .update({
      payment_status: 'paid',
      status: 'confirmed',
      razorpay_payment_id,
    })
    .eq('razorpay_order_id', razorpay_order_id)
    .select('id')
    .single();

  if (error || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Deduct stock for each item.
  const { data: items } = await admin
    .from('order_items')
    .select('product_id, quantity')
    .eq('order_id', order.id);

  for (const item of items ?? []) {
    if (!item.product_id) continue;
    const { data: product } = await admin
      .from('products')
      .select('stock_quantity')
      .eq('id', item.product_id)
      .single();
    if (product) {
      await admin
        .from('products')
        .update({ stock_quantity: Math.max(0, product.stock_quantity - item.quantity) })
        .eq('id', item.product_id);
    }
  }

  return NextResponse.json({ success: true, orderId: order.id });
}
