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

-- Create users table for admin access
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- In a real app, this should be hashed
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert admin user (As requested: admin / maviacf)
INSERT INTO users (username, password, role) 
VALUES ('admin', 'maviacf', 'admin')
ON CONFLICT (username) DO NOTHING;
-- Thêm cột story vào bảng products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS story TEXT;

-- Nếu bạn muốn thêm đầy đủ các trường như trong JSON bạn gửi, hãy chạy thêm lệnh này:
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category_id UUID,
ADD COLUMN IF NOT EXISTS roast_level TEXT,
ADD COLUMN IF NOT EXISTS flavor_notes JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS brew_methods JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0;
INSERT INTO products (
  id, name, slug, description, image_url, price, variants, specs, story, stock_quantity, category_id
) VALUES 
(
  'gu1', 'Cà Phê Hạt [GU1] Heritage Blend', 'ca-phe-gu1', 
  'Thể chất đậm-mạnh, đắng, cân bằng, hậu vị ít ngọt.', 
  'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800', 
  235000, 
  '[{"weight": "500gr", "price": 235000}, {"weight": "1kg", "price": 305000}]'::jsonb, 
  '{"ratio": "90% Robusta Natural"}'::jsonb, 
  'Câu chuyện sản phẩm...', 100,
  (SELECT id FROM categories WHERE name = 'Traditional Blend' LIMIT 1)
),
(
  'gu2', 'Cà Phê Hạt [GU2] Harmony Blend', 'ca-phe-gu2', 
  'Thể chất mạnh, ít đắng, hậu vị ngọt dịu.', 
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800', 
  260000, 
  '[{"weight": "500gr", "price": 260000}]'::jsonb, 
  '{"ratio": "60% Robusta"}'::jsonb, 
  'Câu chuyện GU2...', 80,
  (SELECT id FROM categories WHERE name = 'Signature Blend' LIMIT 1)
),
(
  'gu4', 'Cà Phê Hạt [GU4] Pure Honey', 'ca-phe-gu4', 
  'Thể chất đậm, vị chua nhẹ, ít đắng.', 
  'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800', 
  260000, 
  '[{"weight": "500gr", "price": 260000}]'::jsonb, 
  '{"ratio": "100% Robusta Honey"}'::jsonb, 
  'Câu chuyện GU4...', 50,
  (SELECT id FROM categories WHERE name = 'Single Origin Choice' LIMIT 1)
),
(
  'gu3', 'Cà Phê Hạt [GU3] Elegant Balanced', 'ca-phe-gu3', 
  'Thể chất đậm vừa, vị chua nhẹ.', 
  'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800', 
  290000, 
  '[{"weight": "500gr", "price": 290000}]'::jsonb, 
  '{"ratio": "80% Robusta Honey"}'::jsonb, 
  'Câu chuyện GU3...', 40,
  (SELECT id FROM categories WHERE name = 'Premium Blend' LIMIT 1)
);

-- 1. Tạo lại bảng bài viết (posts)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT, -- Cột tóm tắt đã thêm ở đây
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bật tính năng bảo mật Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3. Tạo các chính sách (Policies) để cho phép thao tác
-- Cho phép xem bài viết công khai
CREATE POLICY "Allow public select" ON posts FOR SELECT TO public USING (true);

-- Cho phép thêm bài viết (INSERT)
CREATE POLICY "Allow public insert" ON posts FOR INSERT TO public WITH CHECK (true);

-- Cho phép sửa bài viết (UPDATE)
CREATE POLICY "Allow public update" ON posts FOR UPDATE TO public USING (true);

-- Cho phép xóa bài viết (DELETE)
CREATE POLICY "Allow public delete" ON posts FOR DELETE TO public USING (true);
