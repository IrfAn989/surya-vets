import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import type { ProductCardProps } from '@/components/product/ProductCard';

export function TopSellingProducts({ products }: { products: ProductCardProps[] }) {
  return (
    <section>
      {/* Heading — centered on mobile, left on desktop */}
      <div className="mb-5 text-center md:flex md:items-end md:justify-between md:text-left">
        <div>
          <h2 className="text-2xl font-extrabold text-primary md:text-2xl">
            Top Selling
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">Products Frequently Bought</p>
        </div>
        <Link
          href="/collections/all"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover md:flex"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
