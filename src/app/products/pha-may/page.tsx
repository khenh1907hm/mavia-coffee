import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from '../Listing.module.css';
import BrewingGuide from '@/components/BrewingGuide/BrewingGuide';
import { mockProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PhaMayProducts() {
  // Fetch real products from Supabase
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  // Map database response to match the expected Product structure
  const allProducts = (dbProducts && dbProducts.length > 0) 
    ? dbProducts.map(p => ({
        ...p,
        category_name: p.categories?.name || p.category_name || 'Coffee'
      }))
    : mockProducts;

  if (error) {
    console.error('Error fetching products from Supabase:', error);
  }

  const displayProducts = allProducts.filter(p => 
    p.category_name?.toLowerCase().includes('máy') || 
    p.specs?.suitable?.toLowerCase().includes('máy') ||
    p.name.toLowerCase().includes('espresso')
  );
  
  const finalProducts = displayProducts.length > 0 ? displayProducts : allProducts;

  const guideProps = {
    title: 'Nghệ Thuật Pha Máy (Espresso)',
    subtitle: 'BREWING GUIDE',
    description: 'Espresso là linh hồn của các món cà phê hiện đại. Nước nóng được nén dưới áp suất cao đi qua lớp bột cà phê siêu mịn, chiết xuất ra những giọt tinh chất đậm đặc cùng lớp Crema vàng óng đầy quyến rũ.',
    image: 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=800&auto=format&fit=crop',
    steps: [
      {
        number: '01',
        title: 'Chuẩn Bị Tay Pha (Portafilter)',
        desc: 'Tháo tay pha ra khỏi máy, lau khô và sạch hoàn toàn rổ lọc (basket) để tránh cà phê cũ làm ảnh hưởng hương vị.'
      },
      {
        number: '02',
        title: 'Xay & Đong Cà Phê',
        desc: 'Xay khoảng 18g - 20g cà phê (cho double shot) ở mức độ mịn (fine). Cho vào tay pha và dàn đều (distribution).'
      },
      {
        number: '03',
        title: 'Nén Cà Phê (Tamping)',
        desc: 'Dùng Tamper nén cà phê xuống với một lực vừa đủ (khoảng 15kg) sao cho bề mặt phẳng và cân bằng hoàn hảo.'
      },
      {
        number: '04',
        title: 'Chiết Xuất (Extraction)',
        desc: 'Lắp tay pha vào máy và xả nước ngay lập tức. Tỷ lệ chuẩn thường là 1:2 (18g cà phê lấy 36g espresso) trong thời gian 25 - 30 giây.'
      }
    ]
  };

  return (
    <main>
      <Header />
      
      <div className={styles.banner}>
        <div className="container">
          <h1>Pha Máy (Espresso)</h1>
          <p>Đậm đặc, mạnh mẽ và đánh thức mọi giác quan</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <h4>Danh mục</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pour-over" style={{ color: 'inherit' }}>• Pour Over</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-may" style={{ color: 'var(--coffee-light)', fontWeight: 'bold' }}>• Pha Máy (Espresso)</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-phin" style={{ color: 'inherit' }}>• Pha Phin</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products" style={{ color: 'inherit' }}>• Tất cả sản phẩm</Link></li>
                </ul>
              </div>
            </aside>
            
            <div className={styles.content}>
              <div className={styles.toolbar}>
                <p>Hiển thị {finalProducts.length} sản phẩm Pha Máy</p>
                <select>
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                </select>
              </div>
              <ProductGrid products={finalProducts} />
            </div>
          </div>
        </div>
      </section>

      <BrewingGuide {...guideProps} />

      <Footer />
    </main>
  );
}
