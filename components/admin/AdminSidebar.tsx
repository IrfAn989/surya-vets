'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image as ImageIcon,
  Users,
  FolderTree,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { createClient } from '@/lib/supabase/client';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/customers', label: 'Customers', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className="flex h-full w-56 flex-col border-r border-border bg-white">
      <div className="border-b border-border p-4">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-lg font-bold text-primary">Surya</span>
          <span className="text-lg font-bold text-accent">Vets</span>
        </Link>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
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
      </nav>
      <button
        onClick={signOut}
        className="flex items-center gap-2 border-t border-border p-4 text-sm text-discount hover:bg-surface"
      >
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </aside>
  );
}
