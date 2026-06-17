import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[50vh] flex-col items-center justify-center gap-4 py-10 text-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
