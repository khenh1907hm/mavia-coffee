import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from './Listing.module.css';
import { mockProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductListing() {
  // Fetch real products from Supabase
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  // Map database response to match the expected Product structure
  const displayProducts = (dbProducts && dbProducts.length > 0) 
    ? dbProducts.map(p => ({
        ...p,
        category_name: p.categories?.name || p.category_name || 'Coffee'
      }))
    : mockProducts;

  if (error) {
    console.error('Error fetching products from Supabase:', error);
  }
  return (
    <main>
      <Header />
      
      <div className={styles.banner}>
        <div className="container">
          <h1>Sản Phẩm</h1>
          <p>Tất cả các dòng cà phê tuyển chọn từ Mavia</p>
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
                  <li style={{ marginBottom: '10px' }}><Link href="/products/pha-phin" style={{ color: 'inherit' }}>• Pha Phin</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link href="/products" style={{ color: 'var(--coffee-light)', fontWeight: 'bold' }}>• Tất cả sản phẩm</Link></li>
                </ul>
              </div>
            </aside>
            
            <div className={styles.content}>
              <div className={styles.toolbar}>
                <p>Hiển thị {displayProducts.length} sản phẩm</p>
                <select>
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                </select>
              </div>
              <ProductGrid products={displayProducts} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
