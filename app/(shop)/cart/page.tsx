'use client';

import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { useCart } from '@/lib/hooks/useCart';

export default function CartPage() {
  const { items, subtotal, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-6">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          ctaHref="/checkout"
        />
      </div>
    </div>
  );
}
