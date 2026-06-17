-- ============================================================
-- 0002_fixes.sql
-- Run this after 0001_init.sql in the Supabase SQL Editor.
-- Adds missing columns, RLS policies, and storage setup.
-- ============================================================

-- 1. Add cta_label to banners (used by HeroBannerSlider)
ALTER TABLE banners ADD COLUMN IF NOT EXISTS cta_label TEXT;

-- 2. Add subtitle to banners (used by HeroBannerSlider)
ALTER TABLE banners ADD COLUMN IF NOT EXISTS subtitle TEXT;

-- ============================================================
-- RLS: Enable on tables that were missing it
-- ============================================================
ALTER TABLE brands               ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants     ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_pincodes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items          ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper: is_admin() function (avoids repeated sub-selects)
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid() AND is_admin = TRUE
  );
$$;

-- ============================================================
-- BANNERS — admin write, public read
-- ============================================================
DROP POLICY IF EXISTS "Admin can manage banners" ON banners;
CREATE POLICY "Admin can manage banners" ON banners
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- BRANDS — public read, admin write
-- ============================================================
CREATE POLICY "Public can read brands"  ON brands FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin can manage brands" ON brands FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================
-- PRODUCT IMAGES — public read, admin write
-- ============================================================
CREATE POLICY "Public can read product images"  ON product_images FOR SELECT USING (TRUE);
CREATE POLICY "Admin can manage product images" ON product_images FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================
-- PRODUCT VARIANTS — public read, admin write
-- ============================================================
CREATE POLICY "Public can read product variants"  ON product_variants FOR SELECT USING (TRUE);
CREATE POLICY "Admin can manage product variants" ON product_variants FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================
-- PRODUCTS — fix admin policy to also include WITH CHECK
-- ============================================================
DROP POLICY IF EXISTS "Admins can do everything on products" ON products;
CREATE POLICY "Admin can manage products" ON products
  FOR ALL
  USING (is_admin() OR is_active = TRUE)
  WITH CHECK (is_admin());

-- ============================================================
-- CATEGORIES / SUBCATEGORIES / ANIMAL_TYPES — admin write
-- ============================================================
DROP POLICY IF EXISTS "Public can read categories"    ON categories;
DROP POLICY IF EXISTS "Public can read subcategories" ON subcategories;
DROP POLICY IF EXISTS "Public can read animal types"  ON animal_types;

CREATE POLICY "Public can read categories"    ON categories    FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin can manage categories"   ON categories    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Public can read subcategories"  ON subcategories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin can manage subcategories" ON subcategories FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Public can read animal types"  ON animal_types  FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin can manage animal types" ON animal_types  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================
-- ORDERS — authenticated users can insert their own orders
-- ============================================================
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage orders" ON orders
  FOR ALL USING (is_admin());

-- ============================================================
-- ORDER ITEMS — mirrors order ownership
-- ============================================================
CREATE POLICY "Users can create order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

CREATE POLICY "Admin can manage order items" ON order_items
  FOR ALL USING (is_admin());

-- ============================================================
-- NEWSLETTER — anyone can subscribe (INSERT only)
-- ============================================================
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admin can manage newsletter" ON newsletter_subscribers
  FOR ALL USING (is_admin());

-- ============================================================
-- USER PROFILES — users can insert their own on signup
-- ============================================================
DROP POLICY IF EXISTS "Users can view own profile"   ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can view own profile"   ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin can manage profiles"    ON user_profiles FOR ALL USING (is_admin());

-- ============================================================
-- DELIVERY PINCODES — public read, admin write
-- ============================================================
CREATE POLICY "Public can read pincodes"  ON delivery_pincodes FOR SELECT USING (TRUE);
CREATE POLICY "Admin can manage pincodes" ON delivery_pincodes FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================
-- STORAGE BUCKETS
-- Create these manually in Supabase Dashboard > Storage, OR
-- run this if using the Supabase CLI.
-- ============================================================

-- Product images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Banners bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: admins can upload/delete; public can read
CREATE POLICY "Public can read product images storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Admin can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Public can read banners storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'banners');

CREATE POLICY "Admin can upload banners"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'banners' AND is_admin());

CREATE POLICY "Admin can delete banners"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'banners' AND is_admin());
