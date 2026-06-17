import Link from 'next/link';
import { Package, ShoppingCart, IndianRupee, AlertTriangle } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatPrice } from '@/lib/utils/formatPrice';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const admin = createAdminClient();

  const [{ count: orderCount }, { count: productCount }, { data: orders }, { data: lowStock }] =
    await Promise.all([
      admin.from('orders').select('id', { count: 'exact', head: true }),
      admin.from('products').select('id', { count: 'exact', head: true }),
      admin
        .from('orders')
        .select('id, order_number, total_amount, status, created_at')
        .order('created_at', { ascending: false })
        .limit(8),
      admin.from('products').select('id, name, stock_quantity').lte('stock_quantity', 5).limit(10),
    ]);

  const { data: paidOrders } = await admin
    .from('orders')
    .select('total_amount')
    .eq('payment_status', 'paid');
  const revenue = (paidOrders ?? []).reduce((sum, o) => sum + Number(o.total_amount), 0);

  const stats = [
    { label: 'Total Orders', value: orderCount ?? 0, icon: ShoppingCart },
    { label: 'Revenue', value: formatPrice(revenue), icon: IndianRupee },
    { label: 'Total Products', value: productCount ?? 0, icon: Package },
    { label: 'Low Stock', value: lowStock?.length ?? 0, icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-lg border border-border bg-white p-4">
              <Icon className="mb-2 h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-border bg-white p-4">
        <h2 className="mb-3 font-semibold">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-gray-500">
                <th className="py-2">Order</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(orders ?? []).map((o) => (
                <tr key={o.id} className="border-b border-border">
                  <td className="py-2 font-medium">{o.order_number}</td>
                  <td>{o.status}</td>
                  <td>{formatPrice(Number(o.total_amount))}</td>
                  <td>{new Date(o.created_at).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
              {(orders ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
