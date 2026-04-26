'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';
import ScrollReveal from '@/components/ScrollReveal';

const reviews = [
  {
    id: 1,
    name: "Hoàng Minh",
    text: "Cà phê ở đây thực sự khác biệt, hương vị Pour Over thanh khiết và hậu vị ngọt rất lâu. Không gian quán cũng rất thư giãn.",
    rating: 5,
    date: "2 tháng trước",
    avatar: "https://i.pravatar.cc/150?u=hm"
  },
  {
    id: 2,
    name: "Thùy Chi",
    text: "Giao hàng cực nhanh, hạt cà phê mới rang mùi thơm nức cả phòng. Đã thử nhiều nơi nhưng Mavia vẫn là chân ái của mình.",
    rating: 5,
    date: "1 tháng trước",
    avatar: "https://i.pravatar.cc/150?u=tc"
  },
  {
    id: 3,
    name: "Alex Johnson",
    text: "Amazing specialty coffee! The roasting quality is on par with the best roasters in Seattle. Highly recommend the Da Lat beans.",
    rating: 5,
    date: "3 tuần trước",
    avatar: "https://i.pravatar.cc/150?u=aj"
  },
  {
    id: 4,
    name: "Minh Quân",
    text: "Dịch vụ khách hàng rất chu đáo, tư vấn tận tình loại hạt phù hợp với gu vị của mình. Sẽ còn ủng hộ lâu dài.",
    rating: 5,
    date: "Vừa xong",
    avatar: "https://i.pravatar.cc/150?u=mq"
  },
  {
    id: 5,
    name: "Elena Rossi",
    text: "Bellissimo! The espresso blend is balanced and rich. Mavia Coffee truly understands the art of roasting.",
    rating: 5,
    date: "5 ngày trước",
    avatar: "https://i.pravatar.cc/150?u=er"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    resetTimeout();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    resetTimeout();
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1)),
      6000 // Slightly slower auto-play
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.gridContainer}>
          {/* Left Side: Title & Badge */}
          <div className={styles.leftSide}>
            <ScrollReveal effect="left" delay={100}>
              <div className={styles.googleBadge}>
                <div className={styles.googleLogo}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <div className={styles.badgeText}>
                  <span className={styles.ratingScore}>4.9/5</span>
                  <div className={styles.miniStars}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="#FBBC05" color="#FBBC05" />)}
                  </div>
                </div>
              </div>
              <h2 className={styles.title}>Đánh Giá Của Khách Hàng</h2>
              <p className={styles.subtitle}>
                Mavia cam kết mang đến những trải nghiệm hương vị tuyệt vời nhất cho mỗi khách hàng. Sự hài lòng của bạn là động lực để chúng tôi không ngừng cải tiến.
              </p>
              
              <div className={styles.navButtons}>
                <button onClick={handlePrev} className={styles.navBtn} aria-label="Previous">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className={styles.navBtn} aria-label="Next">
                  <ChevronRight size={24} />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Carousel Cards */}
          <div className={styles.rightSide}>
            <ScrollReveal effect="right" delay={300}>
              <div className={styles.carouselContainer}>
                <div 
                  className={styles.carouselTrack} 
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {reviews.map((review) => (
                    <div key={review.id} className={styles.carouselItem}>
                      <div className={styles.reviewCard}>
                        <Quote className={styles.quoteIcon} size={30} />
                        <p className={styles.reviewText}>"{review.text}"</p>
                        
                        <div className={styles.reviewerInfo}>
                          <h4 className={styles.reviewerName}>{review.name}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.dots}>
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dot} ${activeIndex === idx ? styles.dotActive : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
