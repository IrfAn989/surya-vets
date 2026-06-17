'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils/formatPrice';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  ctaLabel?: string;
  ctaHref?: string;
  onCheckout?: () => void;
  loading?: boolean;
}

export function CartSummary({
  subtotal,
  shipping,
  total,
  ctaLabel = 'Proceed to Checkout',
  ctaHref,
  onCheckout,
  loading,
}: CartSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-white p-5">
      <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div className="my-2 border-t border-border" />
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {ctaHref ? (
        <Button asChild variant="accent" size="lg" className="mt-4 w-full">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : (
        <Button
          variant="accent"
          size="lg"
          className="mt-4 w-full"
          onClick={onCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : ctaLabel}
        </Button>
      )}
    </div>
  );
}
