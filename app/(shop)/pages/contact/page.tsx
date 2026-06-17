import type { Metadata } from 'next';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = { title: 'Contact Us' };

export default function ContactPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919820854449';
  return (
    <div className="container max-w-3xl space-y-6 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="text-gray-600">
        Have questions about a product or your order? Reach out and our team will be happy to help.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary"
        >
          <MessageCircle className="h-6 w-6 text-[#25D366]" />
          <div>
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-xs text-gray-500">Chat with us</p>
          </div>
        </a>
        <a
          href={`tel:+${whatsapp}`}
          className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary"
        >
          <Phone className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-medium">Call</p>
            <p className="text-xs text-gray-500">+{whatsapp}</p>
          </div>
        </a>
        <a
          href="mailto:support@suryavets.com"
          className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-primary"
        >
          <Mail className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-gray-500">support@suryavets.com</p>
          </div>
        </a>
      </div>
    </div>
  );
}
