-- Sample seed data for SuryaVets. Run after 0001_init.sql.

-- Animal types
INSERT INTO animal_types (name, slug, display_order) VALUES
  ('Cat', 'cat', 1),
  ('Dog', 'dog', 2),
  ('Birds', 'birds', 3),
  ('Small Pets', 'small-pets', 4);

-- Categories (link to animal types)
INSERT INTO categories (animal_type_id, name, slug, display_order)
SELECT id, 'Medicine For Dogs', 'medicine-for-dogs', 1 FROM animal_types WHERE slug = 'dog';
INSERT INTO categories (animal_type_id, name, slug, display_order)
SELECT id, 'Dog Food', 'food-for-dogs', 2 FROM animal_types WHERE slug = 'dog';
INSERT INTO categories (animal_type_id, name, slug, display_order)
SELECT id, 'Medicine For Cats', 'medicine-for-cats', 1 FROM animal_types WHERE slug = 'cat';

-- Subcategories
INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT id, 'Allergy Relief For Dogs', 'allergy-relief-for-dogs', 1 FROM categories WHERE slug = 'medicine-for-dogs';
INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT id, 'Dewormers For Dogs', 'dewormers-for-dogs', 2 FROM categories WHERE slug = 'medicine-for-dogs';
INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT id, 'Dry Food For Dogs', 'dry-food-for-dogs', 1 FROM categories WHERE slug = 'food-for-dogs';
INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT id, 'Allergy Relief For Cats', 'allergy-relief-for-cats', 1 FROM categories WHERE slug = 'medicine-for-cats';

-- Sample products
INSERT INTO products (name, slug, short_description, description, product_type, mrp, sale_price, stock_quantity, is_top_selling, prescription_required, subcategory_id)
SELECT
  'Apoquel 16mg Tablets',
  'apoquel-16mg-tablets',
  'Fast-acting allergy & itch relief for dogs',
  'Apoquel provides relief from allergic itch and inflammation in dogs. Consult your veterinarian before use.',
  'TABLET',
  1840, 1656, 50, TRUE, TRUE,
  id
FROM subcategories WHERE slug = 'allergy-relief-for-dogs';

INSERT INTO products (name, slug, short_description, description, product_type, mrp, sale_price, stock_quantity, is_top_selling, subcategory_id)
SELECT
  'Drontal Plus Dewormer',
  'drontal-plus-dewormer',
  'Broad-spectrum dewormer for dogs',
  'Drontal Plus eliminates roundworms, hookworms, whipworms, and tapeworms in dogs.',
  'TABLET',
  450, 399, 80, TRUE,
  id
FROM subcategories WHERE slug = 'dewormers-for-dogs';

INSERT INTO products (name, slug, short_description, description, product_type, mrp, sale_price, stock_quantity, is_top_selling, subcategory_id)
SELECT
  'Royal Canin Maxi Adult Dry Food 4kg',
  'royal-canin-maxi-adult-4kg',
  'Complete nutrition for large breed adult dogs',
  'Royal Canin Maxi Adult is tailored for large breed dogs with balanced nutrition for healthy digestion and coat.',
  'KIBBLE',
  3200, 2880, 30, TRUE,
  id
FROM subcategories WHERE slug = 'dry-food-for-dogs';

INSERT INTO products (name, slug, short_description, description, product_type, mrp, sale_price, stock_quantity, is_top_selling, prescription_required, subcategory_id)
SELECT
  'Cetirizine Syrup For Cats 60ml',
  'cetirizine-syrup-cats-60ml',
  'Antihistamine syrup for feline allergies',
  'Provides relief from allergic reactions in cats. Use under veterinary guidance.',
  'SYRUP',
  320, 280, 0, FALSE, TRUE,
  id
FROM subcategories WHERE slug = 'allergy-relief-for-cats';

-- Primary images for products
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80', TRUE FROM products WHERE slug = 'apoquel-16mg-tablets';
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80', TRUE FROM products WHERE slug = 'drontal-plus-dewormer';
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80', TRUE FROM products WHERE slug = 'royal-canin-maxi-adult-4kg';
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT id, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80', TRUE FROM products WHERE slug = 'cetirizine-syrup-cats-60ml';

-- Hero banners
INSERT INTO banners (title, image_url, link_url, banner_type, display_order, is_active) VALUES
  ('Genuine Pet Medicines', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600&q=80', '/collections/dog', 'hero', 1, TRUE),
  ('Premium Food & Treats', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&q=80', '/collections/cat', 'hero', 2, TRUE);
