'use client';

import { useState } from 'react';
import type { AddressInput } from '@/lib/validations/addressSchema';

interface AddressFormProps {
  value: AddressInput;
  onChange: (value: AddressInput) => void;
}

const inputClass =
  'w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary';

export function AddressForm({ value, onChange }: AddressFormProps) {
  const [errors] = useState<Record<string, string>>({});

  const set = (key: keyof AddressInput, val: string | boolean) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Full Name</label>
        <input
          className={inputClass}
          value={value.full_name}
          onChange={(e) => set('full_name', e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <input
          className={inputClass}
          value={value.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder="9820854449"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Pincode</label>
        <input
          className={inputClass}
          value={value.pincode}
          onChange={(e) => set('pincode', e.target.value)}
          placeholder="400001"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address Line 1</label>
        <input
          className={inputClass}
          value={value.address_line1}
          onChange={(e) => set('address_line1', e.target.value)}
          placeholder="House no, Street"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium">Address Line 2 (optional)</label>
        <input
          className={inputClass}
          value={value.address_line2 ?? ''}
          onChange={(e) => set('address_line2', e.target.value)}
          placeholder="Landmark, Area"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">City</label>
        <input
          className={inputClass}
          value={value.city}
          onChange={(e) => set('city', e.target.value)}
          placeholder="Mumbai"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">State</label>
        <input
          className={inputClass}
          value={value.state}
          onChange={(e) => set('state', e.target.value)}
          placeholder="Maharashtra"
        />
      </div>
      {Object.values(errors).length > 0 && (
        <p className="text-xs text-discount sm:col-span-2">
          Please fill all required fields correctly.
        </p>
      )}
    </div>
  );
}
