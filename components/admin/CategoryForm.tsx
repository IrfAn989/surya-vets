'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils/slugify';

interface AnimalTypeOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

const inputClass =
  'w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary';

export function CategoryForm({
  animalTypes,
  categories,
}: {
  animalTypes: AnimalTypeOption[];
  categories: CategoryOption[];
}) {
  const router = useRouter();
  const [level, setLevel] = useState<'animal_type' | 'category' | 'subcategory'>('animal_type');
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const slug = slugify(name);

    let res;
    if (level === 'animal_type') {
      res = await supabase.from('animal_types').insert({ name, slug });
    } else if (level === 'category') {
      res = await supabase.from('categories').insert({ name, slug, animal_type_id: parentId });
    } else {
      res = await supabase.from('subcategories').insert({ name, slug, category_id: parentId });
    }

    setSaving(false);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    setName('');
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="max-w-lg space-y-4 rounded-lg border border-border bg-white p-5">
      <div>
        <label className="mb-1 block text-sm font-medium">Level</label>
        <select
          className={inputClass}
          value={level}
          onChange={(e) => setLevel(e.target.value as typeof level)}
        >
          <option value="animal_type">Animal Type</option>
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
        </select>
      </div>

      {level === 'category' && (
        <div>
          <label className="mb-1 block text-sm font-medium">Parent Animal Type</label>
          <select className={inputClass} value={parentId} onChange={(e) => setParentId(e.target.value)} required>
            <option value="">Select...</option>
            {animalTypes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {level === 'subcategory' && (
        <div>
          <label className="mb-1 block text-sm font-medium">Parent Category</label>
          <select className={inputClass} value={parentId} onChange={(e) => setParentId(e.target.value)} required>
            <option value="">Select...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      {error && <p className="text-sm text-discount">{error}</p>}
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Create'}
      </Button>
    </form>
  );
}
