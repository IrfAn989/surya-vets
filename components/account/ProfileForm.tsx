'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface ProfileFormProps {
  userId: string;
  email: string;
  initialName: string;
  initialPhone: string;
}

export function ProfileForm({ userId, email, initialName, initialPhone }: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const inputClass =
    'w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary';

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    const supabase = createClient();
    const { error } = await supabase
      .from('user_profiles')
      .update({ full_name: fullName, phone })
      .eq('id', userId);
    setStatus(error ? 'error' : 'saved');
  };

  return (
    <form onSubmit={save} className="max-w-md space-y-4 rounded-lg border border-border bg-white p-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input className={`${inputClass} bg-surface`} value={email} disabled />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <input
          className={inputClass}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <input
          className={inputClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9820854449"
        />
      </div>
      <Button type="submit" disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving...' : 'Save Changes'}
      </Button>
      {status === 'saved' && <p className="text-sm text-primary">Profile updated!</p>}
      {status === 'error' && <p className="text-sm text-discount">Update failed. Try again.</p>}
    </form>
  );
}
