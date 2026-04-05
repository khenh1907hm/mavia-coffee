import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductCard from '@/components/ProductCard/ProductCard';
import BlogCard from '@/components/BlogCard/BlogCard';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import { mockProducts } from '@/data/products';
import { supabase } from '@/lib/supabase';


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

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch real products from Supabase
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  // Map database response to match the expected Product structure
  // Fallback to mockProducts if DB is empty or has issues
  const products = (dbProducts && dbProducts.length > 0) 
    ? dbProducts.map(p => ({
        ...p,
        category_name: p.categories?.name || p.category_name || 'Coffee'
      }))
    : mockProducts;

  if (error) {
    console.error('Error fetching products from Supabase:', error);
  }

  return (
    <main className={styles.main}>
      <Header />

      {/* 2. Hero Section - Redesigned Centered Premium Version */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className={styles.heroVideo}
          >
            <source src="/mavia_cf.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`container ${styles.heroContainerCentered}`}>
          <div className={styles.heroContentCentered}>
            <ScrollReveal effect="fade" duration={1.5}>
              <span className={styles.heroOverTitle}>PREMIUM COFFEE ROASTERS</span>
            </ScrollReveal>
            
            <ScrollReveal effect="up" delay={200} duration={1.2}>
              <h1 className={styles.heroTitleCentered}>
                Hương Vị Tận Cùng <br />
                <span className="text-coffee-light italic">Từ Tâm Hồn Cà Phê</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal effect="up" delay={400}>
              <p className={styles.heroSubtitleCentered}>
                Chúng tôi tuyển chọn những hạt cà phê ngon nhất từ các vùng nguyên liệu đặc hữu, 
                rang xay thủ công để giữ trọn vẹn bản sắc hương vị tự nhiên nhất.
              </p>
            </ScrollReveal>

            <ScrollReveal effect="up" delay={600}>
              <div className={styles.heroActions}>
                <Link href="#products" className={styles.primaryBtn}>MUA NGAY</Link>
                <Link href="/our-story" className={styles.secondaryBtn}>CÂU CHUYỆN</Link>
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
            {products.slice(0, 4).map((product, idx) => (
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
              <h2>Nguồn GỐc Hạt Cà Phê</h2>
              <p>
                Với hơn 10 năm kinh nghiệm cung cấp cà phê rang xay chất lượng,
                Mavia Coffee là đối tác nhà cung cấp cà phê đáng tin cậy của hàng trăm khách hàng là doanh nghiệp, đại lý và cá nhân. Không chỉ sở hữu xưởng rang xay cà phê đạt tiêu chuẩn vệ sinh an toàn thực phẩm, cà phê nguyên liệu mà chúng tôi lựa chọn có nguồn gốc rõ ràng, hạt to 16, 18 không sâu bệnh, không phụ liệu và không chất bảo quản.
                Bên cạnh đó là hệ thống máy móc rang xay cao cấp đạt chất lượng rang xay chuẩn Châu Âu.
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
