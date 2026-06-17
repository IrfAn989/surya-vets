'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useCartStore } from '@/lib/store/cartStore';
import type { CartItem as CartItemType } from '@/types/cart';

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 border-b border-border py-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-surface">
        <Image
          src={item.image_url || '/placeholder.svg'}
          alt={item.name}
          fill
          sizes="96px"
          className="object-contain p-1"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-sm font-medium">{item.name}</p>
        {item.variantName && <p className="text-xs text-gray-500">{item.variantName}</p>}
        <p className="mt-1 text-sm font-bold">{formatPrice(item.sale_price)}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-md border border-border">
            <button
              className="flex h-8 w-8 items-center justify-center"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              className="flex h-8 w-8 items-center justify-center"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-discount"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      </div>
      <div className="hidden text-right text-sm font-bold sm:block">
        {formatPrice(item.sale_price * item.quantity)}
      </div>
    </div>
  );
}
