import { formatPrice } from '@/lib/utils/formatPrice';
import { cn } from '@/lib/utils/cn';

interface ProductPriceProps {
  mrp: number;
  salePrice: number;
  size?: 'sm' | 'lg';
}

export function ProductPrice({ mrp, salePrice, size = 'sm' }: ProductPriceProps) {
  const hasDiscount = mrp > salePrice;
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={cn('font-bold text-gray-900', size === 'lg' ? 'text-2xl' : 'text-[15px]')}>
        {formatPrice(salePrice)}
      </span>
      {hasDiscount && (
        <span
          className={cn(
            'text-gray-400 line-through',
            size === 'lg' ? 'text-sm' : 'text-xs'
          )}
        >
          {formatPrice(mrp)}
        </span>
      )}
    </div>
  );
}
