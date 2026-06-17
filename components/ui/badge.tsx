import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold leading-none tracking-wide',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        discount: 'bg-discount text-white shadow-sm',
        type: 'bg-white/90 text-gray-600 border border-gray-200 backdrop-blur-sm',
        outline: 'border border-border bg-white text-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
