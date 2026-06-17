import Link from 'next/link';
import { Package, UserCircle, ShoppingBag } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function AccountDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name')
    .eq('id', user?.id ?? '')
    .maybeSingle();

  const cards = [
    { href: '/account/orders', label: 'My Orders', icon: Package, desc: 'Track and view orders' },
    { href: '/account/profile', label: 'Profile', icon: UserCircle, desc: 'Manage your details' },
    { href: '/', label: 'Continue Shopping', icon: ShoppingBag, desc: 'Browse products' },
  ];

  return (
    <div>
      <p className="mb-4 text-gray-600">
        Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-lg border border-border bg-white p-4 hover:border-primary"
            >
              <Icon className="mb-2 h-6 w-6 text-primary" />
              <p className="font-medium">{c.label}</p>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
