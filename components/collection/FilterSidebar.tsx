'use client';

import { PRODUCT_TYPES } from '@/lib/constants/petCategories';
import { cn } from '@/lib/utils/cn';

interface FilterSidebarProps {
  selectedType: string | null;
  inStock: boolean;
  onTypeChange: (type: string | null) => void;
  onInStockChange: (val: boolean) => void;
}

export function FilterSidebar({
  selectedType,
  inStock,
  onTypeChange,
  onInStockChange,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-5">
      {/* Availability */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Availability</h3>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-gray-700">
          <div className="relative">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="peer sr-only"
            />
            <div className={cn(
              'h-5 w-5 rounded-md border-2 transition-all',
              inStock ? 'border-primary bg-primary' : 'border-border bg-white'
            )}>
              {inStock && (
                <svg className="h-full w-full p-0.5 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          In stock only
        </label>
      </div>

      {/* Product Type */}
      <div className="rounded-xl border border-border bg-white p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Product Type</h3>
        <ul className="space-y-1">
          {PRODUCT_TYPES.map((type) => (
            <li key={type}>
              <button
                onClick={() => onTypeChange(selectedType === type ? null : type)}
                className={cn(
                  'w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors',
                  selectedType === type
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-surface hover:text-gray-900'
                )}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
