import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = { title: 'Return and Refund Policy' };

export default function ReturnRefundPage() {
  return (
    <div className="container max-w-3xl space-y-4 py-8">
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Return and Refund Policy' }]}
      />
      <h1 className="text-2xl font-bold">Return and Refund Policy</h1>
      <p className="text-gray-600">
        Due to the nature of veterinary medicines and consumable products, returns are accepted only for
        damaged, defective, or incorrectly shipped items. Please report any issues within 48 hours of
        delivery with photos.
      </p>
      <p className="text-gray-600">
        Approved refunds are processed to the original payment method within 5-7 business days. Opened or
        used medicines and perishable food cannot be returned for safety reasons.
      </p>
    </div>
  );
}
