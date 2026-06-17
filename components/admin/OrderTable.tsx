'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { Order, OrderStatus } from '@/types/order';

const STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export function OrderTable({ orders }: { orders: Order[] }) {
  const [rows, setRows] = useState(orders);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setRows((r) => r.map((o) => (o.id === id ? { ...o, status } : o)));
    const supabase = createClient();
    await supabase.from('orders').update({ status }).eq('id', id);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-gray-500">
            <th className="p-3">Order</th>
            <th className="p-3">Total</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id} className="border-b border-border">
              <td className="p-3 font-medium">{o.order_number}</td>
              <td className="p-3">{formatPrice(Number(o.total_amount))}</td>
              <td className="p-3">{o.payment_status}</td>
              <td className="p-3">{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
              <td className="p-3">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                  className="rounded-md border border-border px-2 py-1 text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-400">
                No orders yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
