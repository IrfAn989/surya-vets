export interface CartItem {
  id: string;
  productId: string;
  variantId: string | null;
  slug: string;
  name: string;
  variantName: string | null;
  image_url: string;
  mrp: number;
  sale_price: number;
  quantity: number;
}
