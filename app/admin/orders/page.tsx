import { createAdminClient } from '@/lib/supabase/admin';
import { OrderTable } from '@/components/admin/OrderTable';
import type { Order } from '@/types/order';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const admin = createAdminClient();
  const { data: orders } = await admin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      <OrderTable orders={(orders ?? []) as Order[]} />
    </div>
  );
}
