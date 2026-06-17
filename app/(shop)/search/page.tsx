'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['search-page', q],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    },
    enabled: q.length >= 2,
  });

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-2xl font-bold">
        Search results for &quot;{q}&quot;
      </h1>
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <ProductGrid products={data?.products ?? []} />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-6">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
