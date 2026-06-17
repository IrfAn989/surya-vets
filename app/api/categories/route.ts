import { NextResponse } from 'next/server';
import { NAV_ITEMS } from '@/lib/constants/navigation';

export const revalidate = 3600;

// Returns the static navigation tree (no DB call needed for menu).
export async function GET() {
  return NextResponse.json(
    { categories: NAV_ITEMS },
    { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' } }
  );
}
