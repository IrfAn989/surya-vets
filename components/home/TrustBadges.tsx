import { CheckCircle, Lock, Truck, ShieldCheck, Stethoscope, Headset } from 'lucide-react';
import { TRUST_BADGES } from '@/lib/constants/trustBadges';

const ICONS: Record<string, typeof Truck> = {
  truck: Truck,
  'shield-check': ShieldCheck,
  stethoscope: Stethoscope,
  headset: Headset,
  check: CheckCircle,
  lock: Lock,
};

export function TrustBadges() {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3">
      {TRUST_BADGES.map((badge) => {
        const Icon = ICONS[badge.icon] ?? ShieldCheck;
        return (
          <div
            key={badge.title}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white px-2 py-3.5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card md:flex-row md:items-center md:gap-3.5 md:px-4 md:text-left"
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              <Icon className="h-7 w-7 text-primary md:h-6 md:w-6" />
            </div>
            {/* Text */}
            <div className="min-w-0">
              <p className="text-[11px] font-bold leading-tight text-gray-800 md:text-sm">{badge.title}</p>
              <p className="mt-0.5 hidden text-xs leading-snug text-gray-500 md:block">{badge.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
