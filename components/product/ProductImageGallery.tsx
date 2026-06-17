'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface GalleryImage {
  image_url: string;
  alt_text?: string | null;
}

export function ProductImageGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const safeImages = images.length ? images : [{ image_url: '/placeholder.svg', alt_text: name }];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface">
        <Image
          src={safeImages[active]?.image_url || '/placeholder.svg'}
          alt={safeImages[active]?.alt_text || name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-surface',
                i === active ? 'border-primary ring-1 ring-primary' : 'border-border'
              )}
            >
              <Image
                src={img.image_url}
                alt={img.alt_text || `${name} ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
