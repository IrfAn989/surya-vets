'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, UserCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const links = [
  { href: '/account', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders', label: 'My Orders', icon: Package },
  { href: '/account/profile', label: 'Profile', icon: UserCircle },
];

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="space-y-1">
      {links.map((l) => {
        const Icon = l.icon;
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
              active ? 'bg-primary/10 font-medium text-primary' : 'hover:bg-surface'
            )}
          >
            <Icon className="h-4 w-4" />
            {l.label}
          </Link>
        );
      })}
      <button
        onClick={signOut}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-discount hover:bg-surface"
      >
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </nav>
  );
}
