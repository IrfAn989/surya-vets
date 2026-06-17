import Image from 'next/image';
import Link from 'next/link';
import { PET_CATEGORIES } from '@/lib/constants/petCategories';

export function ShopByPets() {
  return (
    <section>
      {/* Section heading — centered on mobile, left on desktop */}
      <div className="mb-4 text-center md:mb-5 md:text-left">
        <h2 className="text-2xl font-extrabold text-primary md:text-2xl">Shop By Pets</h2>
        <p className="mt-1 text-sm text-gray-500">
          All pet categories, one click—find what your pet loves!
        </p>
      </div>

      {/* Mobile: 3-col rectangular cards (first 3 pets) */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        {PET_CATEGORIES.slice(0, 3).map((pet) => (
          <Link
            key={pet.slug}
            href={`/collections/${pet.slug}`}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative w-full overflow-hidden rounded-xl bg-surface" style={{ aspectRatio: '1/1' }}>
              <Image
                src={pet.image}
                alt={pet.label}
                fill
                sizes="(max-width: 640px) 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-center text-[13px] font-bold text-gray-900">
              {pet.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: all pets in a row of circles */}
      <div className="hidden gap-3 md:grid md:grid-cols-8">
        {PET_CATEGORIES.map((pet) => (
          <Link
            key={pet.slug}
            href={`/collections/${pet.slug}`}
            className="group flex flex-col items-center gap-2"
          >
            <div className="relative h-[76px] w-[76px] overflow-hidden rounded-full bg-surface ring-2 ring-transparent transition-all duration-200 group-hover:ring-primary group-hover:ring-offset-2">
              <Image
                src={pet.image}
                alt={pet.label}
                fill
                sizes="80px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-center text-[13px] font-medium text-gray-600 transition-colors group-hover:text-primary">
              {pet.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
