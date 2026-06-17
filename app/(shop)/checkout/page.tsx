'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddressForm } from '@/components/checkout/AddressForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import {
  PaymentSection,
  loadRazorpayScript,
  type PaymentMethod,
} from '@/components/checkout/PaymentSection';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { useCart } from '@/lib/hooks/useCart';
import { addressSchema, type AddressInput } from '@/lib/validations/addressSchema';

const emptyAddress: AddressInput = {
  full_name: '',
  phone: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  pincode: '',
  is_default: false,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [address, setAddress] = useState<AddressInput>(emptyAddress);
  const [method, setMethod] = useState<PaymentMethod>('razorpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="container py-6">
        <EmptyCart />
      </div>
    );
  }

  const handlePay = async () => {
    setError(null);
    const parsed = addressSchema.safeParse(address);
    if (!parsed.success) {
      setError('Please fill in a valid delivery address.');
      return;
    }

    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        name: i.name,
        variantName: i.variantName,
        image_url: i.image_url,
        quantity: i.quantity,
        mrp: i.mrp,
        sale_price: i.sale_price,
      }));

      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems, paymentMethod: method, address }),
      });

      if (!res.ok) throw new Error('Could not create order');
      const data = await res.json();

      if (method === 'cod') {
        clearCart();
        router.push(`/account/orders?success=${data.orderNumber ?? ''}`);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Razorpay failed to load');

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'SuryaVets',
        description: 'Order Payment',
        order_id: data.razorpayOrderId,
        handler: async (response: Record<string, string>) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          if (verifyRes.ok) {
            clearCart();
            router.push('/account/orders?success=1');
          } else {
            setError('Payment verification failed.');
          }
        },
        prefill: { name: address.full_name, contact: address.phone },
        theme: { color: '#1a5c2a' },
      });
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-lg font-semibold">Delivery Address</h2>
            <AddressForm value={address} onChange={setAddress} />
          </section>
          <section>
            <h2 className="mb-3 text-lg font-semibold">Payment Method</h2>
            <PaymentSection
              method={method}
              onMethodChange={setMethod}
              onPay={handlePay}
              loading={loading}
            />
            {error && <p className="mt-2 text-sm text-discount">{error}</p>}
          </section>
        </div>
        <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
      </div>
    </div>
  );
}
