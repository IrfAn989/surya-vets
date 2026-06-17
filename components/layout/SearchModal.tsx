'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useUIStore } from '@/lib/store/uiStore';
import { useSearch } from '@/lib/hooks/useSearch';
import { formatPrice } from '@/lib/utils/formatPrice';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { ProductCardData } from '@/types/product';

const QUICK_SEARCHES = ['Dog food', 'Cat dewormer', 'Tick treatment', 'Bird supplements', 'Fish medicine'];

export function SearchModal() {
  const { searchOpen, closeSearch } = useUIStore();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { data, isFetching, debouncedQuery } = useSearch(query);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (searchOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  if (!searchOpen) return null;

  const products: ProductCardData[] = data?.products ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      closeSearch();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuick = (term: string) => {
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-[70] animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} />
      <div className="absolute left-0 right-0 top-0 bg-white shadow-dropdown animate-slide-down">
        <div className="container py-4">
          {/* Search input row */}
          <form onSubmit={submit} className="flex items-center gap-3 rounded-xl border-2 border-primary/30 bg-surface px-4 py-2.5 focus-within:border-primary focus-within:bg-white transition-all">
            <Search className="h-5 w-5 flex-shrink-0 text-primary" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicines, food, treats, supplies…"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            {isFetching && <LoadingSpinner className="h-4 w-4 text-primary" />}
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear" className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Results or quick searches */}
          {debouncedQuery.length >= 2 ? (
            <div className="mt-3 max-h-[55vh] overflow-y-auto rounded-xl border border-border bg-white shadow-card">
              {products.length === 0 && !isFetching ? (
                <div className="py-10 text-center">
                  <p className="text-sm font-medium text-gray-600">No results for &quot;{debouncedQuery}&quot;</p>
                  <p className="mt-1 text-xs text-gray-400">Try a different search term</p>
                </div>
              ) : (
                <ul>
                  {products.map((p, i) => (
                    <li key={p.id} className={i > 0 ? 'border-t border-border/60' : ''}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-surface"
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-surface">
                          <Image
                            src={p.image_url || '/placeholder.svg'}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="line-clamp-1 text-sm font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs font-semibold text-primary">{formatPrice(p.sale_price)}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
                      </Link>
                    </li>
                  ))}
                  {products.length > 0 && (
                    <li className="border-t border-border/60 bg-surface/60">
                      <button
                        onClick={() => handleQuick(debouncedQuery)}
                        className="flex w-full items-center justify-center gap-2 py-3 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                      >
                        View all results for &quot;{debouncedQuery}&quot;
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          ) : (
            <div className="mt-3 pb-2">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <TrendingUp className="h-3.5 w-3.5" /> Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuick(term)}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-primary/40 hover:bg-primary-light hover:text-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
