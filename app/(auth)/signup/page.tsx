'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputClass =
    'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/20';

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email to confirm your account, then login.');
      setTimeout(() => router.push('/login'), 2500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-light p-4">
      <div className="w-full max-w-[420px] rounded-2xl border border-border bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-0.5 select-none">
          <span className="text-[26px] font-extrabold tracking-tight text-primary leading-none">Surya</span>
          <span className="text-[26px] font-extrabold tracking-tight text-accent leading-none">Vets</span>
        </Link>

        <h1 className="mb-1 text-xl font-bold text-gray-900">Create your account</h1>
        <p className="mb-6 text-sm text-gray-500">Join thousands of happy pet parents</p>

        {message ? (
          <div className="rounded-xl bg-primary-light p-5 text-center">
            <p className="text-sm font-semibold text-primary">✅ {message}</p>
            <p className="mt-1 text-xs text-gray-500">Redirecting to login…</p>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Full name</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Email address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Password</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-discount">{error}</div>
            )}
            <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
