import { NextResponse, type NextRequest } from 'next/server';
import { resolveCollection, getCollectionProducts } from '@/lib/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subcategory = searchParams.get('subcategory');
  const sort = searchParams.get('sort') ?? 'newest';
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '24');
  const type = searchParams.get('type') ?? undefined;
  const inStock = searchParams.get('inStock') === 'true';

  if (!subcategory) {
    return NextResponse.json({ products: [], total: 0, page, limit });
  }

  const resolved = await resolveCollection(subcategory);
  if (!resolved) {
    return NextResponse.json({ products: [], total: 0, page, limit });
  }

  const { products, total } = await getCollectionProducts({
    resolved,
    sort,
    page,
    limit,
    type,
    inStock,
  });

  return NextResponse.json({ products, total, page, limit });
}
