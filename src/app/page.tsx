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
import HeroSection from '@/components/Hero/HeroSection';
import Testimonials from '@/components/Testimonials/Testimonials';
import Journey from '@/components/Journey/Journey';


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

      <HeroSection />

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

      {/* 4. Section: Hành trình của hạt (Replaced Brand Story) */}
      <Journey />

      {/* 5. Section: Blog */}
      <section className="section bg-gray-50/50">
        <div className="container">
          <ScrollReveal effect="up">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitle}>Blog</span>
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

      {/* 6. Section: Gallery (Sliding) */}
      <section className={styles.gallerySection}>
        <div className="container">
          <ScrollReveal effect="up">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitle}>Premium Blends</span>
              <h2>Không Gian Mavia</h2>
            </div>
          </ScrollReveal>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            {[
              'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop'
            ].map((img, idx) => (
              <div key={idx} className={styles.sliderItem}>
                <Image src={img} alt={`Gallery ${idx}`} width={400} height={300} className={styles.galleryImg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section: Partners (Staggered) */}
      <section className="section overflow-hidden">
        <div className="container">
          <ScrollReveal effect="up">
            <div className={styles.sectionHeader}>
              <span className={styles.subTitle}>Partnership</span>
              <h2>Đối Tác Đồng Hành</h2>
            </div>
          </ScrollReveal>

          <div className={styles.partnersGrid}>
            {[
              { name: 'Olam Coffee', logo: '/images/partner/Olam.jpg' },
              { name: 'Simexco', logo: '/images/partner/Simexco.jpg' },
              { name: 'Brewico', logo: '/images/partner/brewico.png' },
              { name: 'Intimex', logo: '/images/partner/intimex.png' },
              { name: 'Kien Nam Group', logo: '/images/partner/logo_kien_nam_group.png' },
              { name: 'Long Beach', logo: '/images/partner/longbeach.png' },
              { name: 'Vinafin', logo: '/images/partner/vinafin.png' }
            ].map((p, idx) => (
              <ScrollReveal key={idx} effect="up" delay={idx * 100}>
                <div className={`${styles.partnerItem} ${idx % 2 === 0 ? styles.staggerUp : styles.staggerDown}`}>
                  <div className={styles.partnerLogoWrapper}>
                    <img src={p.logo} alt={p.name} className={styles.partnerLogo} />
                  </div>
                  <span className={styles.partnerName}>{p.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <Footer />
    </main>
  );
}
