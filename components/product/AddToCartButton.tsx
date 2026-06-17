'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cartStore';
import { useUIStore } from '@/lib/store/uiStore';
import type { CartItem } from '@/types/cart';

interface AddToCartButtonProps extends Omit<ButtonProps, 'onClick'> {
  item: Omit<CartItem, 'id' | 'quantity'>;
  quantity?: number;
  label?: string;
  openDrawer?: boolean;
}

export function AddToCartButton({
  item,
  quantity = 1,
  label = 'Add to Cart',
  openDrawer = true,
  variant = 'accent',
  ...props
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({ ...item, quantity });
    if (openDrawer) openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button variant={variant} onClick={handleClick} {...props}>
      {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      {added ? 'Added' : label}
    </Button>
  );
}
