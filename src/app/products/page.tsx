import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from './Listing.module.css';
import { mockProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';

export default async function ProductListing() {
  // We prioritize mockProducts for now as per user request for GU series
  const displayProducts = mockProducts;
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
                <h4>Phân loại</h4>
                <ul>
                  <li><input type="checkbox" id="cat1" /> <label htmlFor="cat1">Filter Coffee</label></li>
                  <li><input type="checkbox" id="cat2" /> <label htmlFor="cat2">Espresso Blend</label></li>
                  <li><input type="checkbox" id="cat3" /> <label htmlFor="cat3">Cold Brew</label></li>
                </ul>
              </div>
              
              <div className={styles.filterGroup}>
                <h4>Độ rang</h4>
                <ul>
                  <li><input type="checkbox" id="r1" /> <label htmlFor="r1">Light</label></li>
                  <li><input type="checkbox" id="r2" /> <label htmlFor="r2">Medium</label></li>
                  <li><input type="checkbox" id="r3" /> <label htmlFor="r3">Dark</label></li>
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
