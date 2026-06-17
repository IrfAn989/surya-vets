import { HeroBannerSlider } from '@/components/home/HeroBannerSlider';
import { TrustBadges } from '@/components/home/TrustBadges';
import { ShopByPets } from '@/components/home/ShopByPets';
import { PromoBanner } from '@/components/home/PromoBanner';
import { TopSellingProducts } from '@/components/home/TopSellingProducts';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { getHeroBanners } from '@/lib/data/banners';
import { getTopSellingProducts } from '@/lib/data/products';

export const revalidate = 3600;

export default async function HomePage() {
  const [banners, topSelling] = await Promise.all([
    getHeroBanners(),
    getTopSellingProducts(20),
  ]);

  return (
    <div className="container space-y-12 py-6 pb-12">
      <HeroBannerSlider banners={banners} />
      <TrustBadges />
      <ShopByPets />
      <PromoBanner />
      <TopSellingProducts products={topSelling} />
      <NewsletterSignup />
    </div>
  );
}
