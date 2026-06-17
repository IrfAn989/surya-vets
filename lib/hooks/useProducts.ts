'use client';

import { useQuery } from '@tanstack/react-query';
import type { ProductCardData } from '@/types/product';

interface ProductsResponse {
  products: ProductCardData[];
  total: number;
  page: number;
  limit: number;
}

interface UseProductsParams {
  subcategory?: string;
  sort?: string;
  page?: number;
  limit?: number;
  type?: string;
  inStock?: boolean;
}

async function fetchProducts(params: UseProductsParams): Promise<ProductsResponse> {
  const search = new URLSearchParams();
  if (params.subcategory) search.set('subcategory', params.subcategory);
  if (params.sort) search.set('sort', params.sort);
  if (params.page) search.set('page', String(params.page));
  if (params.limit) search.set('limit', String(params.limit));
  if (params.type) search.set('type', params.type);
  if (params.inStock) search.set('inStock', 'true');

  const res = await fetch(`/api/products?${search.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export function useProducts(params: UseProductsParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000,
  });
}
