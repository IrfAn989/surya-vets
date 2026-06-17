import Image from 'next/image';
import Link from 'next/link';
import { DiscountBadge, ProductTypeBadge } from './ProductBadge';
import { ProductPrice } from './ProductPrice';
import { AddToCartButton } from './AddToCartButton';

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  product_type: string;
  mrp: number;
  sale_price: number;
  discount_percent: number;
  is_in_stock: boolean;
}

export function ProductCard(product: ProductCardProps) {
  const { id, slug, name, image_url, product_type, mrp, sale_price, discount_percent, is_in_stock } =
    product;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image */}
      <Link href={`/products/${slug}`} className="relative block aspect-square overflow-hidden bg-surface">
        <Image
          src={image_url || '/placeholder.svg'}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.06]"
        />
        {/* Badges */}
        {discount_percent > 0 && (
          <div className="absolute left-2 top-2">
            <DiscountBadge percent={discount_percent} />
          </div>
        )}
        <div className="absolute right-2 top-2">
          <ProductTypeBadge type={product_type} />
        </div>
        {/* Out of stock overlay */}
        {!is_in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-[1px]">
            <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-500">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3 pt-2.5">
        <Link href={`/products/${slug}`} className="flex-1 mb-2">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium leading-snug text-gray-800 transition-colors hover:text-primary">
            {name}
          </h3>
        </Link>
        <ProductPrice mrp={mrp} salePrice={sale_price} />
        <div className="mt-2.5">
          <AddToCartButton
            size="sm"
            className="w-full rounded-lg text-xs font-semibold"
            disabled={!is_in_stock}
            item={{
              productId: id,
              variantId: null,
              slug,
              name,
              variantName: null,
              image_url,
              mrp,
              sale_price,
            }}
          />
        </div>
      </div>
    </div>
  );
}
