import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = { title: 'Terms and Conditions' };

export default function TermsPage() {
  return (
    <div className="container max-w-3xl space-y-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms and Conditions' }]} />
      <h1 className="text-2xl font-bold">Terms and Conditions</h1>
      <p className="text-gray-600">
        By using this website and placing orders, you agree to our terms of service. Products sold here
        are veterinary products intended for use in animals. Pet owners should consult a qualified
        veterinarian before administering medicines or treatments.
      </p>
      <p className="text-gray-600">
        Prices and availability are subject to change without notice. We reserve the right to cancel any
        order in case of pricing errors or stock unavailability.
      </p>
    </div>
  );
}
