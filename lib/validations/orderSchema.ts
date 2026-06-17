import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().nullable().optional(),
  name: z.string(),
  variantName: z.string().nullable().optional(),
  image_url: z.string(),
  quantity: z.number().int().positive(),
  mrp: z.number().nonnegative(),
  sale_price: z.number().nonnegative(),
});

export const createOrderSchema = z.object({
  addressId: z.string().uuid().optional(),
  items: z.array(orderItemSchema).min(1, 'Cart is empty'),
  paymentMethod: z.enum(['razorpay', 'cod']).default('razorpay'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
