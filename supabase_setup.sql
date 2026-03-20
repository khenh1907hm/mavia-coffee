-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  roast_level TEXT,
  flavor_notes TEXT[] DEFAULT '{}',
  brew_methods TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES 
('Filter Coffee', 'filter-coffee'),
('Espresso Blend', 'espresso-blend'),
('Cold Brew', 'cold-brew')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, image_url, category_id, roast_level, flavor_notes, brew_methods, stock_quantity)
SELECT 
  'Son Pacamara - Filter Bean', 
  'son-pacamara-filter', 
  'Một loại cà phê đặc sản với hương vị thanh tao, chua nhẹ và hậu vị ngọt kéo dài.', 
  350000, 
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
  id,
  'Light',
  ARRAY['Berry', 'Sweet', 'Floral'],
  ARRAY['V60', 'Chemex'],
  100
FROM categories WHERE slug = 'filter-coffee';

INSERT INTO products (name, slug, description, price, image_url, category_id, roast_level, flavor_notes, brew_methods, stock_quantity)
SELECT 
  'Espresso Blend - Mavia Signature', 
  'espresso-blend-signature', 
  'Sự kết hợp hoàn hảo giữa Robusta chất lượng cao và Arabica, mang lại lớp crema dày và hương vị đậm đà.', 
  280000, 
  'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop',
  id,
  'Medium',
  ARRAY['Chocolate', 'Nutty', 'Caramel'],
  ARRAY['Espresso', 'Moka Pot'],
  150
FROM categories WHERE slug = 'espresso-blend';
