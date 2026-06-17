import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature') ?? '';
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  if (expected !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const admin = createAdminClient();

  if (event.event === 'payment.captured' || event.event === 'order.paid') {
    const razorpayOrderId =
      event.payload?.payment?.entity?.order_id ?? event.payload?.order?.entity?.id;
    const paymentId = event.payload?.payment?.entity?.id;
    if (razorpayOrderId) {
      await admin
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
          razorpay_payment_id: paymentId ?? null,
        })
        .eq('razorpay_order_id', razorpayOrderId);
    }
  }

  if (event.event === 'payment.failed') {
    const razorpayOrderId = event.payload?.payment?.entity?.order_id;
    if (razorpayOrderId) {
      await admin
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('razorpay_order_id', razorpayOrderId);
    }
  }

  return NextResponse.json({ received: true });
}
