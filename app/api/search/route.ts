import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (q.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(
      'id, slug, name, product_type, mrp, sale_price, discount_percent, is_in_stock, product_images(image_url, is_primary)'
    )
    .eq('is_active', true)
    .textSearch('search_vector', q, { type: 'websearch', config: 'english' })
    .limit(12);

  if (error || !data) {
    // Fallback to ILIKE if full-text search unavailable.
    const { data: fallback } = await supabase
      .from('products')
      .select(
        'id, slug, name, product_type, mrp, sale_price, discount_percent, is_in_stock, product_images(image_url, is_primary)'
      )
      .eq('is_active', true)
      .ilike('name', `%${q}%`)
      .limit(12);
    return NextResponse.json({ products: mapProducts(fallback ?? []) });
  }

  return NextResponse.json({ products: mapProducts(data) });
}

function mapProducts(rows: RawProduct[]) {
  return rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image_url:
      p.product_images?.find((i) => i.is_primary)?.image_url ??
      p.product_images?.[0]?.image_url ??
      '/placeholder.svg',
    product_type: p.product_type ?? '',
    mrp: p.mrp,
    sale_price: p.sale_price,
    discount_percent: p.discount_percent,
    is_in_stock: p.is_in_stock,
  }));
}
