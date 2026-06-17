import { Badge } from '@/components/ui/badge';

export function DiscountBadge({ percent }: { percent: number }) {
  if (!percent || percent <= 0) return null;
  return <Badge variant="discount">{percent}% OFF</Badge>;
}

export function ProductTypeBadge({ type }: { type?: string | null }) {
  if (!type) return null;
  return <Badge variant="type">{type.toUpperCase()}</Badge>;
}
