import { createAdminClient } from '@/lib/supabase/admin';
import { BannerManager } from '@/components/admin/BannerManager';

export const dynamic = 'force-dynamic';

export default async function AdminBannersPage() {
  const admin = createAdminClient();
  const { data: banners } = await admin
    .from('banners')
    .select('id, title, image_url, link_url, is_active, display_order')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Banners</h1>
      <BannerManager banners={banners ?? []} />
    </div>
  );
}
