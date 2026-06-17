import { createClient } from '@/lib/supabase/server';
import type { Banner } from '@/components/home/HeroBannerSlider';

export async function getHeroBanners(): Promise<Banner[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('banners')
    .select('id, title, subtitle, image_url, mobile_image_url, link_url, cta_label')
    .eq('is_active', true)
    .eq('banner_type', 'hero')
    .order('display_order', { ascending: true });

  if (error || !data) return [];
  return data as Banner[];
}
