'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './HeroSection.module.css';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

const HeroSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const categories = {
    pour: {
      title: 'Hương Vị Thủ Công (Pour Over)',
      description: 'Lọc lẩy khéo léo để đánh thức những nốt hương trái cây và hoa cỏ thanh khiết nhất. Mỗi dòng chảy là một bản giao hưởng của sự kiên nhẫn.',
      href: '/products/pour-over',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
      label: 'POUR OVER',
      icon: '💧'
    },
    may: {
      title: 'Espresso Hiện Đại (Pha Máy)',
      description: 'Dòng chảy đậm đặc với lớp Crema vàng óng được chiết xuất dưới áp suất hoàn hảo. Đánh thức năng lượng bùng nổ trong từng giọt cà phê.',
      href: '/products/pha-may',
      image: 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?q=80&w=800&auto=format&fit=crop',
      label: 'PHA MÁY ESPRESSO',
      icon: '⚡'
    },
    phin: {
      title: 'Bản Sắc Việt (Pha Phin)',
      description: 'Sự giao thoa giữa thời gian và sự kiên nhẫn. Giọt cà phê chậm rãi, đậm đà - linh hồn thực sự của di sản văn hóa cà phê Việt Nam.',
      href: '/products/pha-phin',
      image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?q=80&w=800&auto=format&fit=crop',
      label: 'PHIN TRUYỀN THỐNG',
      icon: '☕'
    }
  };

  const categoryKeys = Object.keys(categories);

  // Check if mobile for behavioral differences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNextCategory = useCallback(() => {
    setActiveCategory((prev) => {
      const current = prev || categoryKeys[categoryKeys.length - 1];
      const currentIndex = categoryKeys.indexOf(current);
      const nextIndex = (currentIndex + 1) % categoryKeys.length;
      return categoryKeys[nextIndex];
    });
  }, [categoryKeys]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      handleNextCategory();
    }, 5000); // 5 seconds per slide
  }, [handleNextCategory]);

  // Auto-play control
  useEffect(() => {
    if (isMobile) {
      if (!activeCategory) setActiveCategory(categoryKeys[0]);
      startAutoPlay();
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isMobile, startAutoPlay, activeCategory, categoryKeys]);

  const handleCategoryClick = (key: string) => {
    setActiveCategory(key);
    if (isMobile) {
      startAutoPlay(); // Restart timer on click so it doesn't jump immediately
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Layer */}
      <div className={styles.heroBackground}>
        <video autoPlay muted loop playsInline className={styles.heroVideo}>
          <source src="/mavia_cf.mp4" type="video/mp4" />
        </video>
        {/* Mobile Background Images */}
        {categoryKeys.map((key) => (
          <div 
            key={key}
            className={`${styles.mobileBgImage} ${activeCategory === key ? styles.mobileBgImageActive : ''}`}
            style={{ backgroundImage: `url(${categories[key as keyof typeof categories].image})` }}
          />
        ))}
        <div className={styles.overlay}></div>
      </div>

      {/* Main Hero Content (Only shown on Desktop or when no category active) */}
      <div className={`${styles.container} ${activeCategory && isMobile ? styles.contentHidden : ''}`}>
        <ScrollReveal effect="fade" duration={1.5}>
          <span className={styles.overTitle}>ESTABLISHED 2024 • PREMIUM ROASTERS</span>
        </ScrollReveal>
        
        <ScrollReveal effect="up" delay={200} duration={1.2}>
          <h1 className={styles.title}>
            Hương Vị Tận Cùng <br />
            <span className={styles.italicTitle}>Từ Tâm Hồn Cà Phê</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal effect="up" delay={600}>
          <div className={styles.heroActions}>
            <Link href="#products" className={styles.primaryBtn}>KHÁM PHÁ NGAY</Link>
            <Link href="/our-story" className={styles.secondaryBtn}>VỀ CHÚNG TÔI</Link>
          </div>
        </ScrollReveal>
      </div>

      {/* [DESKTOP ONLY] Sidebar Lollipop Tabs */}
      <div className={styles.sidebarTabs}>
        {categoryKeys.map((key) => {
          const cat = categories[key as keyof typeof categories];
          return (
            <div 
              key={key}
              className={styles.tabItem}
              onMouseEnter={() => setActiveCategory(key)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className={styles.tabIndicator}>
                <span className={styles.tabIcon}>{cat.icon}</span>
                <span className={styles.tabLabel}>{cat.label}</span>
              </div>

              <div className={styles.tabContent}>
                <div className={styles.textContent}>
                  <h2 className={styles.methodTitle}>{cat.title}</h2>
                  <p className={styles.methodDesc}>{cat.description}</p>
                  <Link href={cat.href} className={styles.methodBtn}>
                    XEM SẢN PHẨM
                  </Link>
                </div>
                <div className={styles.featuredImageWrapper}>
                  <div className={styles.circleDecor}></div>
                  <img src={cat.image} alt={cat.label} className={styles.circleImage} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* [MOBILE ONLY] Category Navigation Strip - Always Visible at Top */}
      <div className={styles.categoryBar}>
        {categoryKeys.map((key) => {
          const cat = categories[key as keyof typeof categories];
          return (
            <div 
              key={key}
              className={`${styles.catItem} ${activeCategory === key ? styles.catItemActive : ''}`}
              onClick={() => handleCategoryClick(key)}
            >
              <span className={styles.catIcon}>{cat.icon}</span>
              <span className={styles.catName}>{cat.label}</span>
              {/* Visible Progress Bar on active item */}
              {activeCategory === key && isMobile && (
                 <div className={styles.progressBar} key={activeCategory}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* [MOBILE ONLY] Interactive Detail Overlay - Auto-cycles */}
      <div className={`${styles.detailOverlay} ${activeCategory && isMobile ? styles.detailOverlayActive : ''}`}>
        {activeCategory && isMobile && (
          <div className={styles.detailContent} key={activeCategory}>
            <div className={styles.detailInfo}>
              <span className={styles.detailLabel}>Brewing Method</span>
              <h2 className={styles.detailTitle}>{categories[activeCategory as keyof typeof categories].title}</h2>
              <p className={styles.detailDesc}>{categories[activeCategory as keyof typeof categories].description}</p>
              <Link href={categories[activeCategory as keyof typeof categories].href} className={styles.detailBtn}>
                MUA SẢN PHẨM NÀY
              </Link>
            </div>
          </div>
      )}
    </div>
    </section>
  );
};

export default HeroSection;
