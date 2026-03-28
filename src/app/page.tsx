import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductCard from '@/components/ProductCard/ProductCard';
import BlogCard from '@/components/BlogCard/BlogCard';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import { mockProducts } from '@/data/products';

const mockBlogs = [
  {
    id: '1',
    title: 'Hành trình đi tìm hạt cà phê nguyên bản',
    slug: 'hanh-trinh-tim-hat-ca-phe',
    image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Khám phá chặng đường từ những vùng đất cao nguyên trồng mọng đến tách cà phê trên bàn, nơi chúng tôi trực tiếp làm việc cùng người nông dân.',
    date: '15 Thg 03, 2026',
  },
  {
    id: '2',
    title: 'Nghệ thuật rang xay thủ công (Artisan Roasting)',
    slug: 'nghe-thuat-rang-xay',
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Tại sao Mavia Coffee lại lựa chọn kiên định với phương pháp rang thủ công từng mẻ nhỏ thay vì quy mô khổng lồ.',
    date: '10 Thg 03, 2026',
  },
  {
    id: '3',
    title: 'Cách pha Pour Over (V60) chuẩn vị tại nhà',
    slug: 'cach-pha-pour-over-v60',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Hướng dẫn cụ thể cho bạn từng bước một để có ly cà phê chiết xuất cân bằng và hoàn mĩ.',
    date: '05 Thg 03, 2026',
  }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      
      {/* 2. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <ScrollReveal effect="left">
              <h1 className={styles.heroTitle}>Cà phê nguyên chất – Đậm vị thật</h1>
            </ScrollReveal>
            <ScrollReveal effect="left" delay={200}>
              <p className={styles.heroSubtitle}>
                Hạt cà phê rang xay thủ công, giữ trọn hương vị tự nhiên từ cao nguyên Lâm Đồng.
              </p>
            </ScrollReveal>
            <ScrollReveal effect="left" delay={400}>
              <div className={styles.heroActions}>
                <Link href="#products" className={styles.primaryBtn}>MUA NGAY</Link>
                <Link href="/brewing-guide" className={styles.secondaryBtn}>HƯỚNG DẪN PHA</Link>
              </div>
            </ScrollReveal>
          </div>
          <div className={styles.heroImage}>
             <ScrollReveal effect="scale" delay={300}>
                <div className={styles.imageWrapper}>
                   <Image 
                     src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop" 
                     alt="Premium Mavia Quality" 
                     width={500} 
                     height={500}
                     priority
                     className={styles.heroImg}
                   />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Section: Sản phẩm của chúng tôi (Updated from 'Nổi bật') */}
      <section id="products" className="section">
        <div className="container">
          <ScrollReveal effect="up">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitle}>Premium Blends</span>
              <h2>Sản Phẩm Của Chúng Tôi</h2>
              <p className={styles.sectionDesc}>Hệ thống rang Full Hot Air & Trống kép hiện đại giúp giữ trọn hương vị.</p>
            </div>
          </ScrollReveal>
          
          <div className={styles.productGrid4}>
             {mockProducts.map((product, idx) => (
                <ScrollReveal key={product.id} effect="up" delay={idx * 100}>
                  <ProductCard product={product} bestSeller={idx === 0} />
                </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Section: Câu chuyện thương hiệu */}
      <section className={styles.brandStory}>
        <div className={`container ${styles.storyLayout}`}>
          <div className={styles.storyText}>
            <ScrollReveal effect="left">
              <h2>Nguồn Gốc Hạt Cà Phê</h2>
              <p>
                Tại Mavia Coffee, chúng tôi chọn lọc khắt khe từ những nông trại tại Tân Hà - Lâm Hà và Cầu Đất - Đà Lạt. Nơi hạt cà phê thấm đẫm nắng gió của thiên nhiên kỳ vĩ, được chăm sóc tỉ mỉ từng giai đoạn.
              </p>
              <p>
                Công nghệ rang Full Hot Air tiên tiến kết hợp cùng hệ thống trống kép giúp kiểm soát nhiệt độ hoàn hảo, mang đến những hạt cà phê chín đều từ trong ra ngoài, không bị cháy khét, giữ nguyên hương vị bản sắc.
              </p>
            </ScrollReveal>
          </div>
          <div className={styles.storyImageWrapper}>
            <ScrollReveal effect="right" delay={200}>
              <Image 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                alt="Coffee Farm Origin" 
                width={800} 
                height={600}
                className={styles.storyImg}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Section: Blog */}
      <section className="section bg-gray-50/50">
        <div className="container">
          <ScrollReveal effect="up">
            <div className={styles.sectionHeader}>
              <h2>Bài Viết Gần Đây</h2>
            </div>
          </ScrollReveal>
          <div className={styles.blogGrid}>
            {mockBlogs.map((post, idx) => (
              <ScrollReveal key={post.id} effect="up" delay={idx * 100}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
