'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useUIStore } from '@/lib/store/uiStore';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/utils/formatPrice';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { cartOpen, closeCart } = useUIStore();
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    remainingForFreeDelivery,
    hasFreeDelivery,
    freeDeliveryThreshold,
  } = useCart();

  if (!cartOpen) return null;

  const progress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCart} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white shadow-drawer animate-slide-in-right">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {items.length}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-surface hover:text-gray-600"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface">
              <ShoppingBag className="h-10 w-10 text-gray-300" />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Your cart is empty</p>
              <p className="mt-1 text-sm text-gray-400">Add items to get started</p>
            </div>
            <Button onClick={closeCart} variant="outline" className="mt-2 rounded-full">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Free delivery progress */}
            <div className="border-b border-border/60 bg-surface/60 px-5 py-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Truck className={`h-4 w-4 flex-shrink-0 ${hasFreeDelivery ? 'text-primary' : 'text-gray-400'}`} />
                {hasFreeDelivery ? (
                  <p className="text-xs font-semibold text-primary">🎉 You've unlocked FREE delivery!</p>
                ) : (
                  <p className="text-xs text-gray-600">
                    Add <span className="font-bold text-primary">{formatPrice(remainingForFreeDelivery)}</span> more for free delivery
                  </p>
                )}
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3.5 rounded-xl border border-border/60 bg-white p-3 shadow-card">
                    <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-surface">
                      <Image
                        src={item.image_url || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="flex flex-1 flex-col min-w-0">
                      <p className="line-clamp-2 text-[13px] font-medium leading-snug text-gray-800">{item.name}</p>
                      {item.variantName && (
                        <p className="mt-0.5 text-xs text-gray-400">{item.variantName}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-lg border border-border bg-surface">
                          <button
                            className="flex h-7 w-7 items-center justify-center text-gray-500 transition-colors hover:text-primary"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-[13px] font-semibold">{item.quantity}</span>
                          <button
                            className="flex h-7 w-7 items-center justify-center text-gray-500 transition-colors hover:text-primary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{formatPrice(item.sale_price * item.quantity)}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-red-50 hover:text-discount"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-white px-5 pb-6 pt-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-gray-400">Taxes and shipping calculated at checkout</p>
              <Button asChild variant="accent" size="lg" className="w-full rounded-xl font-semibold shadow-md">
                <Link href="/checkout" onClick={closeCart} className="flex items-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <button
                onClick={closeCart}
                className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
