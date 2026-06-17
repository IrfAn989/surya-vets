import Link from 'next/link';

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#b2dfce] bg-[#e8f5ee]">
      {/* Paw print decorative bg */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='20' cy='30' rx='8' ry='6' fill='%23000'/%3E%3Ccircle cx='10' cy='18' r='4' fill='%23000'/%3E%3Ccircle cx='30' cy='18' r='4' fill='%23000'/%3E%3Ccircle cx='14' cy='10' r='3' fill='%23000'/%3E%3Ccircle cx='26' cy='10' r='3' fill='%23000'/%3E%3C/svg%3E\")", backgroundSize: '60px 60px' }}
      />

      <div className="relative flex items-center justify-between gap-3 px-5 py-5 md:px-8 md:py-7">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-lg font-extrabold leading-tight text-gray-900 md:text-2xl">
            Free Delivery Above ₹499
          </h2>
          <p className="mt-1 text-sm font-semibold text-gray-700">
            Get Your Order Within 2 Hrs in Mumbai!
          </p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            T&amp;Cs apply | Selected locations only
          </p>
          <Link
            href="/collections/all"
            className="mt-3 inline-block rounded-lg bg-[#5a3e1b] px-5 py-2 text-xs font-bold text-white shadow transition-all hover:bg-[#3d2a10] active:scale-95"
          >
            Shop Now
          </Link>
        </div>

        {/* Truck illustration */}
        <div className="flex-shrink-0 text-6xl select-none md:text-8xl" aria-hidden="true">
          🚚
        </div>
      </div>
    </section>
  );
}
