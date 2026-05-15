import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from '../Listing.module.css';
import BrewingGuide from '@/components/BrewingGuide/BrewingGuide';
import { mockProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PourOverProducts() {
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
    p.category_name?.toLowerCase().includes('pour') || 
    p.specs?.suitable?.toLowerCase().includes('pour') ||
    p.name.toLowerCase().includes('pour')
  );
  
  const finalProducts = displayProducts.length > 0 ? displayProducts : allProducts;

  const guideProps = {
    title: 'Nghệ Thuật Pha Pour Over',
    subtitle: 'BREWING GUIDE',
    description: 'Pour Over (lọc qua giấy) là phương pháp pha chế tôn vinh trọn vẹn hương vị nguyên bản của hạt cà phê. Từng giọt nước nóng chắt lọc lấy tinh túy, mang đến một tách cà phê trong trẻo, đậm hương hoa cỏ và trái cây.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    steps: [
      {
        number: '01',
        title: 'Chuẩn Bị',
        desc: 'Đun sôi nước (khoảng 92-96°C). Gấp giấy lọc và tráng qua nước nóng để loại bỏ mùi giấy và làm ấm phễu.'
      },
      {
        number: '02',
        title: 'Xay Cà Phê',
        desc: 'Xay 15g cà phê ở mức độ vừa (medium - giống hạt muối biển tinh). Cho cà phê vào phễu và dàn phẳng.'
      },
      {
        number: '03',
        title: 'Ủ Cà Phê (Blooming)',
        desc: 'Rót chậm khoảng 30ml nước nóng theo hình xoắn ốc để ủ cà phê trong 30 giây. Bước này giúp giải phóng khí CO2.'
      },
      {
        number: '04',
        title: 'Chiết Xuất',
        desc: 'Tiếp tục rót phần nước còn lại (tổng 225ml) theo vòng tròn từ trong ra ngoài. Tổng thời gian pha khoảng 2.5 - 3 phút.'
      }
    ]
  };

  return (
    <main>
      <Header />
      
      <div className={styles.banner}>
        <div className="container">
          <h1>Pour Over</h1>
          <p>Trải nghiệm cà phê trong trẻo và tinh tế</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterGroup}>
                <h4>Danh mục</h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pour-over" style={{ color: 'var(--coffee-light)', fontWeight: 'bold' }}>• Pour Over</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-may" style={{ color: 'inherit' }}>• Pha Máy (Espresso)</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-phin" style={{ color: 'inherit' }}>• Pha Phin</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products" style={{ color: 'inherit' }}>• Tất cả sản phẩm</Link></li>
                </ul>
              </div>
            </aside>
            
            <div className={styles.content}>
              <div className={styles.toolbar}>
                <p>Hiển thị {finalProducts.length} sản phẩm Pour Over</p>
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
