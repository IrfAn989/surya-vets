import { formatPrice } from '@/lib/utils/formatPrice';
import { Badge } from '@/components/ui/badge';
import type { OrderWithItems } from '@/types/order';

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export function OrderCard({ order }: { order: OrderWithItems }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <p className="text-sm font-semibold">{order.order_number}</p>
          <p className="text-xs text-gray-500">
            {new Date(order.created_at).toLocaleDateString('en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{STATUS_LABEL[order.status] ?? order.status}</Badge>
          <span className="text-sm font-bold">{formatPrice(order.total_amount)}</span>
        </div>
      </div>
      <ul className="mt-3 space-y-1">
        {order.order_items?.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span className="line-clamp-1 text-gray-700">
              {item.product_name} × {item.quantity}
            </span>
            <span>{formatPrice(item.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
