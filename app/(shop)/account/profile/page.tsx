import { createClient } from '@/lib/supabase/server';
import { ProfileForm } from '@/components/account/ProfileForm';

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name, phone')
    .eq('id', user?.id ?? '')
    .maybeSingle();

  return (
    <ProfileForm
      userId={user?.id ?? ''}
      email={user?.email ?? ''}
      initialName={profile?.full_name ?? ''}
      initialPhone={profile?.phone ?? ''}
    />
  );
}
