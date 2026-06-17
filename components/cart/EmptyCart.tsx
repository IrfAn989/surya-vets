import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <ShoppingBag className="h-16 w-16 text-gray-300" />
      <h2 className="text-xl font-semibold">Your cart is empty</h2>
      <p className="text-sm text-gray-500">Looks like you haven&apos;t added anything yet.</p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
