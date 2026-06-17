'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith('/checkout')) return null;

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919820854449';
  const href = `https://wa.me/${number}?text=${encodeURIComponent('Hi! I need help with my order.')}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 z-40 group flex items-center gap-2 overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] hover:scale-[1.03] active:scale-95"
    >
      {/* Icon pill */}
      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <MessageCircle className="h-6 w-6" />
      </span>
      {/* Expanding label */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[120px] group-hover:pr-4">
        Need Help?
      </span>
    </a>
  );
}
