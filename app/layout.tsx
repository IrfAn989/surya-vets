import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'SuryaVets — Genuine Pet Medicines & Supplies',
    template: '%s | SuryaVets',
  },
  description:
    'Buy genuine veterinary medicines, supplements, food & supplies for dogs, cats, birds & more. Free delivery above ₹499.',
  keywords: [
    'pet medicines',
    'dog medicine',
    'cat medicine',
    'veterinary online',
    'pet pharmacy india',
  ],
  openGraph: { type: 'website', locale: 'en_IN' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
