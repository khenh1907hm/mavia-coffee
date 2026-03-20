import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import styles from './Detail.module.css';

// Using mock data for now
const product = {
  id: '1',
  name: 'Son Pacamara - Filter Bean',
  slug: 'son-pacamara-filter',
  price: 350000,
  description: 'Một loại cà phê đặc sản với hương vị thanh tao, chua nhẹ và hậu vị ngọt kéo dài. Hạt được tuyển chọn từ vùng cao nguyên Cầu Đất, nơi có khí hậu và thổ nhưỡng lý tưởng cho giống cà phê Pacamara phát triển.',
  image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
  category_name: 'Filter Coffee',
  roast_level: 'Light',
  flavor_notes: ['Berry', 'Sweet', 'Floral', 'Honey'],
  brew_methods: ['V60', 'Chemex', 'AeroPress'],
  stock_quantity: 100
};

export default function ProductDetail() {
  return (
    <main>
      <Header />
      
      <section className={`section ${styles.detailSection}`}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <Image 
                  src={product.image_url} 
                  alt={product.name} 
                  width={600} 
                  height={600} 
                  priority
                />
              </div>
            </div>
            
            <div className={styles.info}>
              <span className={styles.category}>{product.category_name}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.price}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
              
              <div className={styles.description}>
                <p>{product.description}</p>
              </div>
              
              <div className={styles.specs}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Mức độ rang:</span>
                  <span className={styles.specValue}>{product.roast_level}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Hương vị:</span>
                  <div className={styles.tags}>
                    {product.flavor_notes.map((note, idx) => (
                      <span key={idx} className={styles.tag}>{note}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Phương pháp pha:</span>
                  <span className={styles.specValue}>{product.brew_methods.join(', ')}</span>
                </div>
              </div>
              
              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button>-</button>
                  <input type="number" defaultValue={1} readOnly />
                  <button>+</button>
                </div>
                <button className={styles.cartBtn}>THÊM VÀO GIỎ HÀNG</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
