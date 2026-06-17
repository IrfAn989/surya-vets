import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="container flex min-h-[40vh] items-center justify-center py-10">
      <LoadingSpinner className="h-8 w-8" />
    </div>
  );
}
