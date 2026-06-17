'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';
import { SortDropdown } from './SortDropdown';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductGridSkeleton } from '@/components/product/ProductSkeleton';
import { Pagination } from '@/components/ui/Pagination';
import { useProducts } from '@/lib/hooks/useProducts';

const LIMIT = 24;

export function CollectionView({ slug }: { slug: string }) {
  const [sort, setSort] = useState('newest');
  const [type, setType] = useState<string | null>(null);
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const params = useMemo(
    () => ({ subcategory: slug, sort, page, limit: LIMIT, type: type ?? undefined, inStock }),
    [slug, sort, page, type, inStock]
  );

  const { data, isLoading } = useProducts(params);
  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const filters = (
    <FilterSidebar
      selectedType={type}
      inStock={inStock}
      onTypeChange={(t) => {
        setType(t);
        setPage(1);
      }}
      onInStockChange={(v) => {
        setInStock(v);
        setPage(1);
      }}
    />
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-[110px]">{filters}</div>
      </div>

      <div>
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
            <span className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">{total}</span> products
            </span>
          </div>
          <SortDropdown
            value={sort}
            onChange={(v) => {
              setSort(v);
              setPage(1);
            }}
          />
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <ProductGrid products={products} />
        )}

        <div className="mt-8">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-[320px] flex-col bg-white shadow-drawer animate-slide-in-left">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="text-base font-bold text-gray-900">Filters</span>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-surface hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
              {filters}
            </div>
            <div className="border-t border-border p-4">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
              >
                View {total} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
