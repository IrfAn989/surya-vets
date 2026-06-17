'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface Banner {
  id: string;
  title: string | null;
  subtitle?: string | null;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  cta_label?: string | null;
}

const FALLBACK_BANNERS: Banner[] = [
  {
    id: 'f1',
    title: 'Genuine Pet Medicines',
    subtitle: 'Vet-approved medicines and supplements, delivered to your door.',
    image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&q=80',
    mobile_image_url: null,
    link_url: '/collections/dog',
    cta_label: 'Shop for Dogs',
  },
  {
    id: 'f2',
    title: 'Premium Food & Treats',
    subtitle: 'Nutritious meals and tasty treats your cat will love.',
    image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&q=80',
    mobile_image_url: null,
    link_url: '/collections/cat',
    cta_label: 'Shop for Cats',
  },
  {
    id: 'f3',
    title: 'Free Delivery Above ₹499',
    subtitle: 'Order today and get your pet essentials delivered fast.',
    image_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&q=80',
    mobile_image_url: null,
    link_url: '/collections/birds',
    cta_label: 'Explore All Pets',
  },
];

export function HeroBannerSlider({ banners }: { banners?: Banner[] }) {
  const slides = banners && banners.length ? banners : FALLBACK_BANNERS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [slides.length, paused, next]);

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl bg-gray-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Aspect-ratio shim: 75% = 4:3 on mobile, 37.5% = 16:6 on desktop */}
      <div className="pb-[75%] md:pb-[37.5%]" aria-hidden="true" />

      {/* Slides */}
      {slides.map((banner, i) => (
        <div
          key={banner.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          <Image
            src={banner.image_url}
            alt={banner.title || 'Banner'}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

          {/* Text overlay */}
          {(banner.title || banner.subtitle) && (
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="container">
                <div
                  className={cn(
                    'max-w-xs transition-all duration-500 md:max-w-md',
                    i === active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  )}
                >
                  {banner.title && (
                    <h2 className="text-xl font-extrabold leading-tight text-white drop-shadow-md md:text-3xl lg:text-4xl">
                      {banner.title}
                    </h2>
                  )}
                  {banner.subtitle && (
                    <p className="mt-1.5 text-xs text-white/85 drop-shadow md:mt-2 md:text-base">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.link_url && (
                    <Link
                      href={banner.link_url}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-accent-hover active:scale-95 md:mt-4 md:px-5 md:py-2.5 md:text-sm"
                    >
                      {banner.cta_label ?? 'Shop Now'}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Arrow navigation — always visible on mobile, hover on desktop */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-all hover:bg-white/40 md:left-4 md:h-10 md:w-10 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-all hover:bg-white/40 md:right-4 md:h-10 md:w-10 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === active ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
