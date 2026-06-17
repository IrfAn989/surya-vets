import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SearchModal } from '@/components/layout/SearchModal';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <SearchModal />
      <WhatsAppButton />
    </>
  );
}
