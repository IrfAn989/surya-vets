'use client';

import Image from 'next/image';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded border border-border bg-surface">
              <Image
                src={item.image_url || '/placeholder.svg'}
                alt={item.name}
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1">
              <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold">
              {formatPrice(item.sale_price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
