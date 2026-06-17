'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils/cn';

export function MegaMenu() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex">
      <ul className="flex items-center">
        {NAV_ITEMS.map((item) => {
          const hasDropdown = item.categories.length > 0;
          const isOpen = openSlug === item.slug;
          return (
            <li
              key={item.slug}
              className="static"
              onMouseEnter={() => setOpenSlug(item.slug)}
              onMouseLeave={() => setOpenSlug(null)}
            >
              <Link
                href={item.slug === 'contact' ? '/pages/contact' : `/collections/${item.slug}`}
                className={cn(
                  'relative flex items-center gap-1 px-3.5 py-3 text-[13px] font-medium transition-colors',
                  isOpen ? 'text-primary' : 'text-gray-600 hover:text-primary',
                  'after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-[2px] after:rounded-full after:bg-primary after:transition-transform after:origin-left',
                  isOpen ? 'after:scale-x-100' : 'after:scale-x-0'
                )}
              >
                {item.label}
                {hasDropdown && (
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
                  />
                )}
              </Link>

              {hasDropdown && isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 border-t border-border bg-white shadow-dropdown animate-slide-down">
                  <div className="container grid grid-cols-2 gap-x-8 gap-y-6 py-7 md:grid-cols-3 lg:grid-cols-5">
                    {item.categories.map((cat) => (
                      <div key={cat.slug}>
                        <Link
                          href={`/collections/${cat.slug}`}
                          className="mb-2.5 block text-[13px] font-semibold uppercase tracking-wide text-primary hover:text-primary-hover"
                        >
                          {cat.label}
                        </Link>
                        <ul className="space-y-1.5">
                          {cat.subcategories.map((sub) => (
                            <li key={sub.slug}>
                              <Link
                                href={`/collections/${sub.slug}`}
                                className="block text-[13px] text-gray-500 transition-colors hover:text-primary hover:translate-x-0.5 hover:font-medium"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
