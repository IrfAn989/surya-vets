'use client';

import { useCartStore } from '@/lib/store/cartStore';

const FREE_DELIVERY_THRESHOLD = Number(
  process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD ?? 499
);

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = items.reduce((sum, i) => sum + i.sale_price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const hasFreeDelivery = remainingForFreeDelivery <= 0 && subtotal > 0;
  const shipping = hasFreeDelivery || subtotal === 0 ? 0 : 50;

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    remainingForFreeDelivery,
    hasFreeDelivery,
    shipping,
    total: subtotal + shipping,
    freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
  };
}
