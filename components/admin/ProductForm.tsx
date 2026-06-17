'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { PRODUCT_TYPES } from '@/lib/constants/petCategories';
import Image from 'next/image';
import { slugify } from '@/lib/utils/slugify';
import type { Product } from '@/types/product';

const inputClass =
  'w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary';

interface SubcategoryOption {
  id: string;
  name: string;
  category: { name: string; animal_type: { name: string } } | null;
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [subcategories, setSubcategories] = useState<SubcategoryOption[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    short_description: product?.short_description ?? '',
    description: product?.description ?? '',
    product_type: product?.product_type ?? 'TABLET',
    mrp: product?.mrp ?? 0,
    sale_price: product?.sale_price ?? 0,
    stock_quantity: product?.stock_quantity ?? 0,
    weight: product?.weight ?? '',
    subcategory_id: (product as any)?.subcategory_id ?? '',
    is_active: product?.is_active ?? true,
    is_top_selling: product?.is_top_selling ?? false,
    is_featured: (product as any)?.is_featured ?? false,
    prescription_required: product?.prescription_required ?? false,
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'error' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Load subcategories for the dropdown
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('subcategories')
      .select('id, name, category:categories(name, animal_type:animal_types(name))')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        if (data) setSubcategories(data as unknown as SubcategoryOption[]);
      });
  }, []);

  const set = (key: string, value: string | number | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (productId: string): Promise<string | null> => {
    if (!imageFile) return null;
    setUploading(true);
    const supabase = createClient();
    const ext = imageFile.name.split('.').pop();
    const path = `${productId}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('product-images')
      .upload(path, imageFile, { upsert: true });
    setUploading(false);
    if (upErr) return null;
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setError(null);
    const supabase = createClient();
    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      subcategory_id: form.subcategory_id || null,
    };

    if (product) {
      // Update existing product
      const { error: updErr } = await supabase
        .from('products')
        .update(payload)
        .eq('id', product.id);
      if (updErr) { setError(updErr.message); setStatus('error'); return; }

      // Upload new image if provided
      if (imageFile) {
        const url = await uploadImage(product.id);
        if (url) {
          await supabase
            .from('product_images')
            .insert({ product_id: product.id, image_url: url, is_primary: false });
        }
      }
    } else {
      // Insert new product
      const { data: newProduct, error: insErr } = await supabase
        .from('products')
        .insert(payload)
        .select('id')
        .single();
      if (insErr || !newProduct) { setError(insErr?.message ?? 'Insert failed'); setStatus('error'); return; }

      // Upload primary image if provided
      if (imageFile) {
        const url = await uploadImage(newProduct.id);
        if (url) {
          await supabase
            .from('product_images')
            .insert({ product_id: newProduct.id, image_url: url, is_primary: true });
        }
      }
    }

    setStatus('success');
    router.push('/admin/products');
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-5 rounded-lg border border-border bg-white p-5">

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">Product Name *</label>
        <input
          className={inputClass}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. Apoquel 16mg Tablets"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-1 block text-sm font-medium">Slug <span className="text-gray-400">(auto-generated if empty)</span></label>
        <input className={inputClass} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="apoquel-16mg-tablets" />
      </div>

      {/* Subcategory */}
      <div>
        <label className="mb-1 block text-sm font-medium">Category / Subcategory *</label>
        <select
          className={inputClass}
          value={form.subcategory_id}
          onChange={(e) => set('subcategory_id', e.target.value)}
          required
        >
          <option value="">— Select a subcategory —</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.category?.animal_type?.name} › {s.category?.name} › {s.name}
            </option>
          ))}
        </select>
        {subcategories.length === 0 && (
          <p className="mt-1 text-xs text-amber-600">No subcategories found. Add some via Admin › Categories first.</p>
        )}
      </div>

      {/* Short description */}
      <div>
        <label className="mb-1 block text-sm font-medium">Short Description</label>
        <input
          className={inputClass}
          value={form.short_description}
          onChange={(e) => set('short_description', e.target.value)}
          placeholder="One-line summary shown on product card"
        />
      </div>

      {/* Full description */}
      <div>
        <label className="mb-1 block text-sm font-medium">Full Description</label>
        <textarea
          className={inputClass}
          rows={4}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Detailed product description…"
        />
      </div>

      {/* Type / Weight / Stock */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Product Type</label>
          <select
            className={inputClass}
            value={form.product_type}
            onChange={(e) => set('product_type', e.target.value)}
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Weight / Pack Size</label>
          <input
            className={inputClass}
            value={form.weight}
            onChange={(e) => set('weight', e.target.value)}
            placeholder="1.2kg / 10 tab"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={form.stock_quantity}
            onChange={(e) => set('stock_quantity', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">MRP (₹) *</label>
          <input
            type="number" step="0.01" min={0}
            className={inputClass}
            value={form.mrp}
            onChange={(e) => set('mrp', Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Sale Price (₹) *</label>
          <input
            type="number" step="0.01" min={0}
            className={inputClass}
            value={form.sale_price}
            onChange={(e) => set('sale_price', Number(e.target.value))}
            required
          />
          {form.mrp > 0 && form.sale_price > 0 && form.sale_price < form.mrp && (
            <p className="mt-1 text-xs text-primary">
              {Math.round(((form.mrp - form.sale_price) / form.mrp) * 100)}% discount
            </p>
          )}
        </div>
      </div>

      {/* Product Image Upload */}
      <div>
        <label className="mb-1 block text-sm font-medium">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-primary-hover"
        />
        {imagePreview && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-lg border border-border">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
          </div>
        )}
        {uploading && <p className="mt-1 text-xs text-gray-500">Uploading image…</p>}
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-5">
        {[
          { key: 'is_active', label: 'Active (visible on site)' },
          { key: 'is_top_selling', label: 'Top Selling (shown on home page)' },
          { key: 'is_featured', label: 'Featured' },
          { key: 'prescription_required', label: 'Prescription Required' },
        ].map(({ key, label }) => (
          <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              checked={form[key as keyof typeof form] as boolean}
              onChange={(e) => set(key, e.target.checked)}
            />
            {label}
          </label>
        ))}
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button type="submit" disabled={status === 'saving' || uploading}>
        {status === 'saving' ? 'Saving…' : product ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
}
