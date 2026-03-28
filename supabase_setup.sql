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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  story TEXT
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES 
('Filter Coffee', 'filter-coffee'),
('Espresso Blend', 'espresso-blend'),
('Cold Brew', 'cold-brew')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products with WORKING images
INSERT INTO products (name, slug, description, price, image_url, category_id, roast_level, flavor_notes, brew_methods, stock_quantity, story)
SELECT 
  'Son Pacamara - Filter Bean', 
  'son-pacamara-filter', 
  'Một loại cà phê đặc sản với hương vị thanh tao, chua nhẹ và hậu vị ngọt kéo dài.', 
  350000, 
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800',
  id,
  'Light',
  ARRAY['Berry', 'Sweet', 'Floral'],
  ARRAY['V60', 'Chemex'],
  100,
  'Hạt cà phê Pacamara từ vùng Cầu Đất mang trong mình hương vị tinh khiết của sương sớm...'
FROM categories WHERE slug = 'filter-coffee'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, image_url, category_id, roast_level, flavor_notes, brew_methods, stock_quantity, story)
SELECT 
  'Espresso Blend - Mavia Signature', 
  'espresso-blend-signature', 
  'Sự kết hợp hoàn hảo giữa Robusta chất lượng cao và Arabica, mang lại lớp crema dày và hương vị đậm đà.', 
  280000, 
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800',
  id,
  'Medium',
  ARRAY['Chocolate', 'Nutty', 'Caramel'],
  ARRAY['Espresso', 'Moka Pot'],
  150,
  'Hành trình tìm kiếm hương vị Espresso hoàn hảo hòa quyện giữa sự mạnh mẽ và tinh tế...'
FROM categories WHERE slug = 'espresso-blend'
ON CONFLICT (slug) DO NOTHING;

-- Create users table for admin access
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create posts table for blog/articles
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert admin user (As requested: admin / maviacf)
INSERT INTO users (username, password, role) 
VALUES ('admin', 'maviacf', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample post
INSERT INTO posts (title, slug, content, image_url)
VALUES (
  'Nghệ thuật thưởng thức cà phê Rang xay',
  'nghe-thuat-thuong-thuc-ca-phe',
  'Cà phê rang xay không chỉ là thức uống, đó là cả một nghệ thuật...',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200'
)
ON CONFLICT (slug) DO NOTHING;
