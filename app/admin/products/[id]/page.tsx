import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { ProductForm } from '@/components/admin/ProductForm';
import type { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data: product } = await admin
    .from('products')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!product) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <ProductForm product={product as Product} />
    </div>
  );
}
