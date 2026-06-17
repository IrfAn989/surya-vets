'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container flex min-h-[40vh] flex-col items-center justify-center gap-4 py-10 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-500">An unexpected error occurred while loading this page.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
