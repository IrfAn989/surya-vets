import { z } from 'zod';

export const addressSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'),
  address_line1: z.string().min(3, 'Address is required'),
  address_line2: z.string().optional().nullable(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  is_default: z.boolean().default(false),
});

export type AddressInput = z.infer<typeof addressSchema>;
