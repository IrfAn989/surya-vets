import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = { title: 'Shipping Policy' };

export default function ShippingPolicyPage() {
  return (
    <div className="container max-w-3xl space-y-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shipping Policy' }]} />
      <h1 className="text-2xl font-bold">Shipping Policy</h1>
      <p className="text-gray-600">
        We offer free delivery on all orders above ₹499 in selected serviceable locations. Orders below
        ₹499 are charged a flat shipping fee of ₹50.
      </p>
      <p className="text-gray-600">
        Orders are typically dispatched within 1-2 business days and delivered within 3-7 business days
        depending on your location. You will receive tracking details once your order ships.
      </p>
    </div>
  );
}
