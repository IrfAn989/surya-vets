import { createClient } from '@/lib/supabase/server';
import type { ProductCardProps } from '@/components/product/ProductCard';
import type { ProductWithImages } from '@/types/product';
import type { ResolvedCollection } from '@/types/category';

const PRODUCT_CARD_COLUMNS =
  'id, slug, name, product_type, mrp, sale_price, discount_percent, is_in_stock, product_images(image_url, is_primary)';

type RawProduct = {
  id: string;
  slug: string;
  name: string;
  product_type: string | null;
  mrp: number;
  sale_price: number;
  discount_percent: number;
  is_in_stock: boolean;
  product_images?: { image_url: string; is_primary: boolean }[];
};

function toCard(p: RawProduct): ProductCardProps {
  const primary =
    p.product_images?.find((i) => i.is_primary)?.image_url ??
    p.product_images?.[0]?.image_url ??
    '/placeholder.svg';
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    image_url: primary,
    product_type: p.product_type ?? '',
    mrp: p.mrp,
    sale_price: p.sale_price,
    discount_percent: p.discount_percent,
    is_in_stock: p.is_in_stock,
  };
}

export async function getTopSellingProducts(limit = 20): Promise<ProductCardProps[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_CARD_COLUMNS)
    .eq('is_active', true)
    .eq('is_top_selling', true)
    .limit(limit);

  if (error || !data) return [];
  return (data as RawProduct[]).map(toCard);
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return data as ProductWithImages;
}

export async function getRelatedProducts(
  subcategoryId: string | null,
  excludeId: string,
  limit = 6
): Promise<ProductCardProps[]> {
  if (!subcategoryId) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_CARD_COLUMNS)
    .eq('is_active', true)
    .eq('subcategory_id', subcategoryId)
    .neq('id', excludeId)
    .limit(limit);

  if (error || !data) return [];
  return (data as RawProduct[]).map(toCard);
}

// Resolve a collection slug across animal_types, categories, subcategories.
export async function resolveCollection(slug: string): Promise<ResolvedCollection | null> {
  const supabase = createClient();

  const { data: sub } = await supabase
    .from('subcategories')
    .select('id, name, slug')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (sub) return { level: 'subcategory', ...sub };

  const { data: cat } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (cat) return { level: 'category', ...cat };

  const { data: animal } = await supabase
    .from('animal_types')
    .select('id, name, slug')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (animal) return { level: 'animal_type', ...animal };

  return null;
}

interface CollectionProductsParams {
  resolved: ResolvedCollection;
  sort?: string;
  page?: number;
  limit?: number;
  type?: string;
  inStock?: boolean;
}

export async function getCollectionProducts({
  resolved,
  sort = 'newest',
  page = 1,
  limit = 24,
  type,
  inStock,
}: CollectionProductsParams): Promise<{ products: ProductCardProps[]; total: number }> {
  const supabase = createClient();

  let query = supabase
    .from('products')
    .select(PRODUCT_CARD_COLUMNS, { count: 'exact' })
    .eq('is_active', true);

  if (resolved.level === 'subcategory') {
    query = query.eq('subcategory_id', resolved.id);
  } else if (resolved.level === 'category') {
    const { data: subs } = await supabase
      .from('subcategories')
      .select('id')
      .eq('category_id', resolved.id);
    const ids = (subs ?? []).map((s) => s.id);
    query = query.in('subcategory_id', ids.length ? ids : ['00000000-0000-0000-0000-000000000000']);
  } else {
    const { data: cats } = await supabase
      .from('categories')
      .select('id')
      .eq('animal_type_id', resolved.id);
    const catIds = (cats ?? []).map((c) => c.id);
    const { data: subs } = await supabase
      .from('subcategories')
      .select('id')
      .in('category_id', catIds.length ? catIds : ['00000000-0000-0000-0000-000000000000']);
    const ids = (subs ?? []).map((s) => s.id);
    query = query.in('subcategory_id', ids.length ? ids : ['00000000-0000-0000-0000-000000000000']);
  }

  if (type) query = query.eq('product_type', type);
  if (inStock) query = query.eq('is_in_stock', true);

  switch (sort) {
    case 'price_asc':
      query = query.order('sale_price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('sale_price', { ascending: false });
      break;
    case 'discount':
      query = query.order('discount_percent', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, count, error } = await query;
  if (error || !data) return { products: [], total: 0 };

  return { products: (data as RawProduct[]).map(toCard), total: count ?? 0 };
}
