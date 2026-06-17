import { Skeleton } from '@/components/ui/skeleton';

export function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card">
      <Skeleton className="aspect-square w-full shimmer" />
      <div className="flex flex-col gap-2 p-3 pt-2.5">
        <Skeleton className="h-3.5 w-full shimmer" />
        <Skeleton className="h-3.5 w-3/4 shimmer" />
        <Skeleton className="h-[15px] w-1/2 shimmer" />
        <Skeleton className="h-9 w-full rounded-lg shimmer" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
