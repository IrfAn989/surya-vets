import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const admin = createAdminClient();
  const { data: customers } = await admin
    .from('user_profiles')
    .select('id, full_name, phone, is_admin, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Customers</h1>
      <div className="overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-gray-500">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {(customers ?? []).map((c) => (
              <tr key={c.id} className="border-b border-border">
                <td className="p-3 font-medium">{c.full_name ?? '—'}</td>
                <td className="p-3">{c.phone ?? '—'}</td>
                <td className="p-3">{c.is_admin ? 'Admin' : 'Customer'}</td>
                <td className="p-3">{new Date(c.created_at).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
            {(customers ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No customers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
