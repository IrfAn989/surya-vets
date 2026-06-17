import { createClient } from '@/lib/supabase/server';
import { OrderCard } from '@/components/account/OrderCard';
import type { OrderWithItems } from '@/types/order';

export default async function OrdersPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', user?.id ?? '')
    .order('created_at', { ascending: false });

  const list = (orders ?? []) as OrderWithItems[];

  if (list.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-10 text-center text-gray-500">
        You haven&apos;t placed any orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {list.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
