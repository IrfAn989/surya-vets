import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AccountNav } from '@/components/account/AccountNav';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div className="container py-6">
      <h1 className="mb-6 text-2xl font-bold">My Account</h1>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="rounded-lg border border-border bg-white p-3">
          <AccountNav />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
