import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = { title: 'About Us' };

export default function AboutUsPage() {
  return (
    <div className="container max-w-3xl space-y-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      <h1 className="text-2xl font-bold">About Us</h1>
      <p className="text-gray-600">
        SuryaVets is an online veterinary pharmacy and pet supplies store dedicated to the health and
        wellbeing of your pets. We offer genuine medicines, supplements, food, treats and supplies for
        dogs, cats, birds, small pets, farm animals, and fish &amp; reptiles.
      </p>
      <p className="text-gray-600">
        Our mission is to make trusted veterinary products easily accessible across India with fast
        delivery and expert support. All products are sourced from authorised distributors to ensure
        authenticity.
      </p>
    </div>
  );
}
