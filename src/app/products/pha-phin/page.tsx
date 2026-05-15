import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from '../Listing.module.css';
import BrewingGuide from '@/components/BrewingGuide/BrewingGuide';
import { mockProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PhaPhinProducts() {
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
    p.category_name?.toLowerCase().includes('phin') || 
    p.specs?.suitable?.toLowerCase().includes('phin') ||
    p.name.toLowerCase().includes('phin')
  );
  
  const finalProducts = displayProducts.length > 0 ? displayProducts : allProducts;

  const guideProps = {
    title: 'Bản Sắc Việt (Pha Phin)',
    subtitle: 'BREWING GUIDE',
    description: 'Pha Phin là nét văn hóa thưởng thức cà phê truyền thống và đặc trưng nhất của người Việt. Mỗi giọt cà phê chắt chiu sự nhẫn nại, mang đậm hương vị mạnh mẽ, nồng nàn của hạt Robusta trứ danh.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=800&auto=format&fit=crop',
    steps: [
      {
        number: '01',
        title: 'Tráng Phin',
        desc: 'Tráng phin qua nước sôi để làm sạch và làm nóng. Bước này rất quan trọng giúp cà phê sau khi cho vào phin không bị mất nhiệt.'
      },
      {
        number: '02',
        title: 'Đong Cà Phê',
        desc: 'Cho khoảng 20g - 25g bột cà phê (xay thô vừa) vào phin. Lắc nhẹ để làm phẳng bề mặt, sau đó dùng nắp gài ấn nhẹ tay.'
      },
      {
        number: '03',
        title: 'Ủ Cà Phê (Blooming)',
        desc: 'Rót khoảng 20ml nước sôi (92-95°C) xâm xấp bề mặt cà phê. Đậy nắp và chờ 1-2 phút cho cà phê ngấm nước và nở đều.'
      },
      {
        number: '04',
        title: 'Chiết Xuất',
        desc: 'Sau khi cà phê nở xong, tiếp tục rót thêm 50-60ml nước sôi. Đậy nắp lại và chờ cà phê nhỏ giọt. Quá trình rơi vào khoảng 5-7 phút là hoàn hảo.'
      }
    ]
  };

  return (
    <main>
      <Header />
      
      <div className={styles.banner}>
        <div className="container">
          <h1>Pha Phin</h1>
          <p>Linh hồn thực sự của di sản văn hóa cà phê Việt</p>
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
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-may" style={{ color: 'inherit' }}>• Pha Máy (Espresso)</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-phin" style={{ color: 'var(--coffee-light)', fontWeight: 'bold' }}>• Pha Phin</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products" style={{ color: 'inherit' }}>• Tất cả sản phẩm</Link></li>
                </ul>
              </div>
            </aside>
            
            <div className={styles.content}>
              <div className={styles.toolbar}>
                <p>Hiển thị {finalProducts.length} sản phẩm Pha Phin</p>
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
