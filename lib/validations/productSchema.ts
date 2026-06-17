import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().optional().nullable(),
  short_description: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
  brand_id: z.string().uuid().optional().nullable(),
  subcategory_id: z.string().uuid().optional().nullable(),
  product_type: z.string().optional().nullable(),
  mrp: z.coerce.number().positive('MRP must be greater than 0'),
  sale_price: z.coerce.number().positive('Sale price must be greater than 0'),
  stock_quantity: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  is_top_selling: z.boolean().default(false),
  weight: z.string().optional().nullable(),
  prescription_required: z.boolean().default(false),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
});

export type ProductInput = z.infer<typeof productSchema>;
