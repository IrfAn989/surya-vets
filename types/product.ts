export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  display_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  sku: string | null;
  mrp: number;
  sale_price: number;
  stock_quantity: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  sku: string | null;
  brand_id: string | null;
  subcategory_id: string | null;
  product_type: string | null;
  mrp: number;
  sale_price: number;
  discount_percent: number;
  stock_quantity: number;
  is_in_stock: boolean;
  is_active: boolean;
  is_featured: boolean;
  is_top_selling: boolean;
  weight: string | null;
  prescription_required: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductWithImages extends Product {
  product_images: ProductImage[];
  product_variants?: ProductVariant[];
  primary_image_url?: string;
}

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  product_type: string;
  mrp: number;
  sale_price: number;
  discount_percent: number;
  is_in_stock: boolean;
}
