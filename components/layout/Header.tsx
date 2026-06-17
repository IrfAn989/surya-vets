'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, MessageCircle } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { useUIStore } from '@/lib/store/uiStore';
import { useCartStore } from '@/lib/store/cartStore';

export function Header() {
  const { openCart, openSearch, openMobileNav } = useUIStore();
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919820854449';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-header">
      {/* ── Main bar ── */}
      <div className="relative flex items-center px-3 py-2 md:container md:py-3.5">

        {/* Hamburger – mobile only */}
        <button
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-surface hover:text-primary lg:hidden"
          onClick={openMobileNav}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* ── Logo (mobile: centered absolute; desktop: left) ── */}
        {/* Mobile centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center select-none lg:hidden"
        >
          <div className="flex items-baseline gap-0.5 leading-none">
            <span className="text-[22px] font-extrabold tracking-tight text-primary">SURYA</span>
            <span className="text-[22px] font-extrabold tracking-tight text-accent">vets</span>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.18em] text-gray-400 uppercase -mt-0.5">
            Pet&apos;s Lifeline
          </span>
        </Link>

        {/* Desktop logo */}
        <Link href="/" className="hidden items-baseline gap-0.5 select-none lg:flex">
          <span className="text-[22px] font-extrabold tracking-tight text-primary leading-none">SURYA</span>
          <span className="text-[22px] font-extrabold tracking-tight text-accent leading-none">vets</span>
        </Link>

        {/* Desktop search bar */}
        <button
          onClick={openSearch}
          className="ml-6 hidden flex-1 max-w-sm items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-gray-400 shadow-input transition-all hover:border-primary/40 hover:bg-white hover:text-gray-500 lg:flex"
          aria-label="Search products"
        >
          <Search className="h-4 w-4 flex-shrink-0" />
          <span>Search medicines, food, supplies…</span>
          <kbd className="ml-auto hidden rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 xl:inline">⌘K</kbd>
        </button>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-0.5 lg:ml-4 lg:gap-1">
          {/* WhatsApp – desktop only */}
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-surface hover:text-primary lg:flex"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-surface hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>

          {/* Account */}
          <Link
            href="/account"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-surface hover:text-primary"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* ── Mobile search bar row ── */}
      <div className="border-t border-border/50 px-3 py-2 lg:hidden">
        <button
          onClick={openSearch}
          className="flex w-full items-center justify-between rounded-lg border-2 border-primary/60 bg-white px-4 py-2.5 text-sm text-gray-400 transition-colors hover:border-primary"
          aria-label="Search products"
        >
          <span>Search products...</span>
          <Search className="h-5 w-5 flex-shrink-0 text-primary" />
        </button>
      </div>

      {/* ── Desktop nav bar ── */}
      <div className="hidden border-t border-border/60 lg:block">
        <div className="container">
          <MegaMenu />
        </div>
      </div>
    </header>
  );
}
