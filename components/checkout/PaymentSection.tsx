'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

export type PaymentMethod = 'razorpay' | 'cod';

interface PaymentSectionProps {
  method: PaymentMethod;
  onMethodChange: (m: PaymentMethod) => void;
  onPay: () => void;
  loading?: boolean;
}

export function PaymentSection({ method, onMethodChange, onPay, loading }: PaymentSectionProps) {
  const options: { value: PaymentMethod; label: string; desc: string }[] = [
    { value: 'razorpay', label: 'Pay Online', desc: 'UPI, Cards, Netbanking via Razorpay' },
    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
  ];

  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'flex cursor-pointer items-start gap-3 rounded-md border p-3',
            method === opt.value ? 'border-primary bg-primary/5' : 'border-border'
          )}
        >
          <input
            type="radio"
            name="payment"
            checked={method === opt.value}
            onChange={() => onMethodChange(opt.value)}
            className="mt-1 h-4 w-4 accent-primary"
          />
          <div>
            <p className="text-sm font-medium">{opt.label}</p>
            <p className="text-xs text-gray-500">{opt.desc}</p>
          </div>
        </label>
      ))}

      <Button variant="accent" size="lg" className="w-full" onClick={onPay} disabled={loading}>
        {loading ? 'Processing...' : method === 'cod' ? 'Place Order' : 'Pay Now'}
      </Button>
    </div>
  );
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
