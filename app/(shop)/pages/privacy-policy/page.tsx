import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl space-y-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="text-gray-600">
        We respect your privacy and are committed to protecting your personal data. We collect
        information such as your name, contact details, and address solely to process your orders and
        improve your shopping experience.
      </p>
      <p className="text-gray-600">
        We never sell your data to third parties. Payment information is processed securely through our
        payment partner Razorpay and is never stored on our servers.
      </p>
    </div>
  );
}
