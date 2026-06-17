'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Home, Phone } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants/navigation';
import { useUIStore } from '@/lib/store/uiStore';
import { cn } from '@/lib/utils/cn';

export function MobileNav() {
  const { mobileNavOpen, closeMobileNav } = useUIStore();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openCat, setOpenCat] = useState<string | null>(null);

  if (!mobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobileNav} />
      <div className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] flex flex-col bg-white shadow-drawer animate-slide-in-left">

        {/* Header */}
        <div className="flex items-center justify-between bg-primary px-4 py-4">
          <Link href="/" onClick={closeMobileNav} className="flex items-center gap-0.5 select-none">
            <span className="text-xl font-extrabold tracking-tight text-white leading-none">Surya</span>
            <span className="text-xl font-extrabold tracking-tight text-accent leading-none">Vets</span>
          </Link>
          <button
            onClick={closeMobileNav}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick links */}
        <div className="flex border-b border-border">
          <Link
            href="/"
            onClick={closeMobileNav}
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-gray-600 hover:text-primary hover:bg-surface transition-colors"
          >
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <Link
            href="/pages/contact"
            onClick={closeMobileNav}
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-gray-600 hover:text-primary hover:bg-surface transition-colors border-l border-border"
          >
            <Phone className="h-3.5 w-3.5" /> Contact
          </Link>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <ul className="divide-y divide-border/60">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = item.categories.length > 0;
              const isOpen = openItem === item.slug;
              return (
                <li key={item.slug}>
                  {hasDropdown ? (
                    <button
                      className={cn(
                        'flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium transition-colors',
                        isOpen ? 'bg-primary-light text-primary' : 'text-gray-800 hover:bg-surface'
                      )}
                      onClick={() => setOpenItem(isOpen ? null : item.slug)}
                    >
                      {item.label}
                      <ChevronRight
                        className={cn('h-4 w-4 text-gray-400 transition-transform duration-200', isOpen && 'rotate-90')}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.slug === 'contact' ? '/pages/contact' : `/collections/${item.slug}`}
                      className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-800 transition-colors hover:bg-surface hover:text-primary"
                      onClick={closeMobileNav}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </Link>
                  )}

                  {hasDropdown && isOpen && (
                    <ul className="bg-surface/70 px-4 pb-3 pt-1">
                      {item.categories.map((cat) => {
                        const catOpen = openCat === cat.slug;
                        return (
                          <li key={cat.slug} className="py-1">
                            <div className="flex items-center justify-between">
                              <Link
                                href={`/collections/${cat.slug}`}
                                className="text-[13px] font-semibold text-primary hover:underline"
                                onClick={closeMobileNav}
                              >
                                {cat.label}
                              </Link>
                              {cat.subcategories.length > 0 && (
                                <button
                                  onClick={() => setOpenCat(catOpen ? null : cat.slug)}
                                  aria-label="Expand"
                                  className="p-1"
                                >
                                  <ChevronRight
                                    className={cn(
                                      'h-3.5 w-3.5 text-gray-400 transition-transform duration-200',
                                      catOpen && 'rotate-90'
                                    )}
                                  />
                                </button>
                              )}
                            </div>
                            {catOpen && (
                              <ul className="ml-2 mt-1.5 space-y-1.5 border-l-2 border-primary/20 pl-3">
                                {cat.subcategories.map((sub) => (
                                  <li key={sub.slug}>
                                    <Link
                                      href={`/collections/${sub.slug}`}
                                      className="block py-0.5 text-xs text-gray-500 transition-colors hover:text-primary"
                                      onClick={closeMobileNav}
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer strip */}
        <div className="border-t border-border bg-surface px-4 py-3 text-center text-[11px] text-gray-400">
          © {new Date().getFullYear()} SuryaVets — Genuine Pet Care
        </div>
      </div>
    </div>
  );
}
