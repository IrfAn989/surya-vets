import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'hero';

  const supabase = createClient();
  const { data, error } = await supabase
    .from('banners')
    .select('id, title, image_url, mobile_image_url, link_url, display_order')
    .eq('is_active', true)
    .eq('banner_type', type)
    .order('display_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ banners: data });
}
