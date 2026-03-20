import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for UI demonstration
const featuredProducts = [
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

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroSubtitle}>Premium Coffee Roasters</span>
          <h1 className={styles.heroTitle}>Hương Vị Tận Cùng <br /> Từ Tâm Hồn Cà Phê</h1>
          <p className={styles.heroText}>
            Chúng tôi tuyển chọn những hạt cà phê ngon nhất từ các vùng nguyên liệu đặc hữu, 
            rang thủ công để giữ trọn vẹn bản sắc hương vị.
          </p>
          <div className={styles.heroActions}>
            <Link href="/products" className={styles.primaryBtn}>MUA NGAY</Link>
            <Link href="/our-story" className={styles.secondaryBtn}>CÂU CHUYỆN</Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Sản Phẩm Nổi Bật</h2>
            <p>Khám phá bộ sưu tập cà phê rang xay đặc sản từ Mavia</p>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className={styles.viewAll}>
            <Link href="/products" className={styles.viewMoreBtn}>XEM TẤT CẢ SẢN PHẨM</Link>
          </div>
        </div>
      </section>

      {/* Our Story Snippet */}
      <section className={styles.storySnippet}>
        <div className={`container ${styles.storyLayout}`}>
          <div className={styles.storyContent}>
            <h2>Nghệ Thuật Rang Phẩm</h2>
            <p>
              Tại Mavia Coffee, mỗi mẻ rang là một bản giao hưởng giữa nhiệt độ và thời gian. 
              Chúng tôi không chỉ bán cà phê, chúng tôi mang đến một trải nghiệm thưởng thức tinh tế, 
              nơi mỗi nốt hương đều kể một câu chuyện về vùng đất nó sinh ra.
            </p>
            <Link href="/our-story" className={styles.textBtn}>KHÁM PHÁ THÊM &rarr;</Link>
          </div>
          <div className={styles.storyImage}>
            <Image 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" 
              alt="Coffee Roasting" 
              width={600} 
              height={400} 
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
