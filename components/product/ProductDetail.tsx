'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, AlertTriangle } from 'lucide-react';
import { ProductImageGallery } from './ProductImageGallery';
import { DiscountBadge, ProductTypeBadge } from './ProductBadge';
import { ProductPrice } from './ProductPrice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import { MEDICAL_DISCLAIMER } from '@/lib/constants/petCategories';
import { useCartStore } from '@/lib/store/cartStore';
import { useUIStore } from '@/lib/store/uiStore';
import type { ProductWithImages, ProductVariant } from '@/types/product';

export function ProductDetail({ product }: { product: ProductWithImages }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);

  const variants = product.product_variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);

  const mrp = selectedVariant?.mrp ?? product.mrp;
  const salePrice = selectedVariant?.sale_price ?? product.sale_price;
  const image = product.product_images?.find((i) => i.is_primary)?.image_url
    ?? product.product_images?.[0]?.image_url
    ?? '/placeholder.svg';

  const buildItem = () => ({
    productId: product.id,
    variantId: selectedVariant?.id ?? null,
    slug: product.slug,
    name: product.name,
    variantName: selectedVariant?.variant_name ?? null,
    image_url: image,
    mrp,
    sale_price: salePrice,
  });

  const handleAddToCart = () => {
    addItem({ ...buildItem(), quantity });
    openCart();
  };

  const handleBuyNow = () => {
    addItem({ ...buildItem(), quantity });
    router.push('/checkout');
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImageGallery images={product.product_images ?? []} name={product.name} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <ProductTypeBadge type={product.product_type} />
          <DiscountBadge percent={product.discount_percent} />
          {product.is_in_stock ? (
            <Badge variant="default">In Stock</Badge>
          ) : (
            <Badge variant="outline">Out of Stock</Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        {product.short_description && (
          <p className="text-sm text-gray-600">{product.short_description}</p>
        )}

        <ProductPrice mrp={mrp} salePrice={salePrice} size="lg" />

        {variants.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Select Variant</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    'rounded-md border px-3 py-1.5 text-sm',
                    selectedVariant?.id === v.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:bg-surface'
                  )}
                >
                  {v.variant_name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center rounded-md border border-border">
            <button
              className="flex h-9 w-9 items-center justify-center disabled:opacity-40"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <button
              className="flex h-9 w-9 items-center justify-center disabled:opacity-40"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="accent"
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!product.is_in_stock}
          >
            Add to Cart
          </Button>
          <Button
            variant="default"
            size="lg"
            className="flex-1"
            onClick={handleBuyNow}
            disabled={!product.is_in_stock}
          >
            Buy Now
          </Button>
        </div>

        {product.prescription_required && (
          <div className="flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <p>{MEDICAL_DISCLAIMER}</p>
          </div>
        )}

        {product.description && (
          <div className="mt-4 border-t border-border pt-4">
            <h2 className="mb-2 font-semibold">Description</h2>
            <p className="whitespace-pre-line text-sm text-gray-600">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
