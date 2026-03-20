import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from './Listing.module.css';

// Using mock data for now, in a real app this would be fetched from Supabase
const allProducts = [
  {
    id: '1',
    name: 'Son Pacamara - Filter Bean',
    slug: 'son-pacamara-filter',
    price: 350000,
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    category_name: 'Filter Coffee',
    roast_level: 'Light',
    flavor_notes: ['Berry', 'Sweet', 'Floral'],
    brew_methods: ['V60', 'Chemex']
  },
  {
    id: '2',
    name: 'Espresso Blend - Mavia Signature',
    slug: 'espresso-blend-signature',
    price: 280000,
    image_url: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop',
    category_name: 'Espresso Blend',
    roast_level: 'Medium',
    flavor_notes: ['Chocolate', 'Nutty', 'Caramel'],
    brew_methods: ['Espresso', 'Moka Pot']
  },
  {
    id: '3',
    name: 'Cold Brew Blend - Summer Breeze',
    slug: 'cold-brew-summer',
    price: 320000,
    image_url: 'https://images.unsplash.com/photo-1517701604599-bb29b56509d1?q=80&w=800&auto=format&fit=crop',
    category_name: 'Cold Brew',
    roast_level: 'Light-Medium',
    flavor_notes: ['Citrus', 'Stone Fruit', 'Crisp'],
    brew_methods: ['Cold Brew']
  }
];

export default function ProductListing() {
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
                <p>Hiển thị {allProducts.length} sản phẩm</p>
                <select>
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                </select>
              </div>
              <ProductGrid products={allProducts} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
