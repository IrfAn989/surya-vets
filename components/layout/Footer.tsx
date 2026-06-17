import Link from 'next/link';
import { MessageCircle, Mail } from 'lucide-react';
import { MEDICAL_DISCLAIMER } from '@/lib/constants/petCategories';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/pages/about-us' },
    { label: 'Contact Us', href: '/pages/contact' },
  ],
  Policies: [
    { label: 'Shipping Policy', href: '/pages/shipping-policy' },
    { label: 'Privacy Policy', href: '/pages/privacy-policy' },
    { label: 'Terms & Conditions', href: '/pages/terms-and-conditions' },
    { label: 'Return & Refund', href: '/pages/return-and-refund-policy' },
  ],
  Shop: [
    { label: 'Dogs', href: '/collections/dog' },
    { label: 'Cats', href: '/collections/cat' },
    { label: 'Birds', href: '/collections/birds' },
    { label: 'Small Pets', href: '/collections/small-pets' },
    { label: 'Fish & Aquatics', href: '/collections/fish' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-gray-950 text-gray-400">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-0.5 select-none">
            <span className="text-[22px] font-extrabold tracking-tight text-white leading-none">Surya</span>
            <span className="text-[22px] font-extrabold tracking-tight text-accent leading-none">Vets</span>
          </Link>
          <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
            Genuine veterinary medicines, supplements, food &amp; supplies — delivered to your pets with care.
          </p>
          {/* Contact info */}
          <div className="mt-5 space-y-2">
            <a href="https://wa.me/919820854449" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-gray-500 transition-colors hover:text-green-400">
              <MessageCircle className="h-4 w-4 flex-shrink-0" />
              WhatsApp Support
            </a>
            <a href="mailto:support@suryavets.com"
              className="flex items-center gap-2 text-[13px] text-gray-500 transition-colors hover:text-gray-300">
              <Mail className="h-4 w-4 flex-shrink-0" />
              support@suryavets.com
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">{title}</h3>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-gray-500 transition-colors hover:text-gray-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Disclaimer + copyright */}
      <div className="border-t border-white/5">
        <div className="container py-5">
          <p className="text-[11px] leading-relaxed text-gray-600">{MEDICAL_DISCLAIMER}</p>
          <p className="mt-3 text-[11px] text-gray-600">
            © {year} SuryaVets. All rights reserved. Made with ❤️ for pets.
          </p>
        </div>
      </div>
    </footer>
  );
}
