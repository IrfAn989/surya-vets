import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { formatPrice } from '@/lib/utils/formatPrice';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const admin = createAdminClient();
  const { data: products } = await admin
    .from('products')
    .select('id, name, product_type, mrp, sale_price, stock_quantity, is_active')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-gray-500">
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">MRP</th>
              <th className="p-3">Sale</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr key={p.id} className="border-b border-border">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.product_type}</td>
                <td className="p-3">{formatPrice(Number(p.mrp))}</td>
                <td className="p-3">{formatPrice(Number(p.sale_price))}</td>
                <td className="p-3">{p.stock_quantity}</td>
                <td className="p-3">
                  <span className={p.is_active ? 'text-primary' : 'text-gray-400'}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`} className="text-primary hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {(products ?? []).length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  No products yet. Add your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
