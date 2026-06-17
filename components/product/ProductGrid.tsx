import { ShoppingBag } from 'lucide-react';
import { ProductCard, type ProductCardProps } from './ProductCard';

export function ProductGrid({ products }: { products: ProductCardProps[] }) {
  if (!products.length) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface text-gray-400">
        <ShoppingBag className="h-10 w-10 text-gray-300" />
        <p className="text-sm font-medium">No products found</p>
        <p className="text-xs text-gray-400">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
