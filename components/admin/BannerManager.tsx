'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface BannerRow {
  id: string;
  title: string | null;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
  display_order: number;
}

const inputClass =
  'w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary';

export function BannerManager({ banners }: { banners: BannerRow[] }) {
  const [rows, setRows] = useState(banners);
  const [form, setForm] = useState({ title: '', subtitle: '', image_url: '', mobile_image_url: '', link_url: '', cta_label: '' });
  const [saving, setSaving] = useState(false);

  const addBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) return;
    setSaving(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('banners')
      .insert({
        title: form.title || null,
        subtitle: form.subtitle || null,
        image_url: form.image_url,
        mobile_image_url: form.mobile_image_url || null,
        link_url: form.link_url || null,
        cta_label: form.cta_label || null,
        banner_type: 'hero',
        display_order: rows.length,
      })
      .select()
      .single();
    if (data) setRows((r) => [...r, data as BannerRow]);
    setForm({ title: '', subtitle: '', image_url: '', mobile_image_url: '', link_url: '', cta_label: '' });
    setSaving(false);
  };

  const remove = async (id: string) => {
    setRows((r) => r.filter((b) => b.id !== id));
    const supabase = createClient();
    await supabase.from('banners').delete().eq('id', id);
  };

  const toggle = async (id: string, isActive: boolean) => {
    setRows((r) => r.map((b) => (b.id === id ? { ...b, is_active: isActive } : b)));
    const supabase = createClient();
    await supabase.from('banners').update({ is_active: isActive }).eq('id', id);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addBanner} className="space-y-3 rounded-lg border border-border bg-white p-4">
        <h2 className="font-semibold">Add Hero Banner</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Title (e.g. Genuine Pet Medicines)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Subtitle (e.g. Vet-approved, fast delivery)"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
        </div>
        <input
          className={inputClass}
          placeholder="Desktop Image URL (Supabase Storage public URL) *"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          required
        />
        <input
          className={inputClass}
          placeholder="Mobile Image URL (optional, portrait crop)"
          value={form.mobile_image_url}
          onChange={(e) => setForm({ ...form, mobile_image_url: e.target.value })}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Link URL (e.g. /collections/dog)"
            value={form.link_url}
            onChange={(e) => setForm({ ...form, link_url: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="CTA Button Label (e.g. Shop Now)"
            value={form.cta_label}
            onChange={(e) => setForm({ ...form, cta_label: e.target.value })}
          />
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? 'Adding...' : 'Add Banner'}
        </Button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {rows.map((b) => (
          <div key={b.id} className="overflow-hidden rounded-lg border border-border bg-white">
            <div className="relative aspect-[16/6] bg-surface">
              <Image src={b.image_url} alt={b.title || 'Banner'} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between p-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={b.is_active}
                  onChange={(e) => toggle(b.id, e.target.checked)}
                />
                Active
              </label>
              <button
                onClick={() => remove(b.id)}
                className="text-discount hover:opacity-70"
                aria-label="Delete banner"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
