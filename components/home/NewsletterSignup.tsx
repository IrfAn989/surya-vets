'use client';

import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'done' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 via-primary to-primary-700 px-6 py-10 text-center md:px-12 md:py-14">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold text-white md:text-3xl">Stay in the Loop</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
          Get exclusive offers, pet care tips, and new arrivals straight to your inbox.
        </p>

        {status === 'done' ? (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3.5">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <p className="text-sm font-semibold text-white">You&apos;re subscribed! Welcome to the family 🎉</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-lg outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-60 sm:flex-shrink-0"
            >
              {status === 'loading' ? 'Subscribing…' : (
                <>Subscribe <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-xs text-red-300">Something went wrong. Please try again.</p>
        )}

        <p className="mt-3 text-xs text-white/50">No spam ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
