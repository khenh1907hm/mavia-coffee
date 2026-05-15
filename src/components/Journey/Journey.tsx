'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Journey.module.css';

const steps = [
  {
    id: '01',
    title: 'Tuyển Chọn Tại Nông Trại',
    description: 'Chúng tôi trực tiếp đến các vùng nguyên liệu Đắk Lắk và Lâm Đồng, nơi những hạt cà phê được canh tác hữu cơ và thu hoạch thủ công khi đạt độ chín hoàn hảo nhất.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200&auto=format&fit=crop',
    tag: 'Nguồn Gốc'
  },
  {
    id: '02',
    title: 'Sơ Chế & Phơi Khô',
    description: 'Áp dụng phương pháp Sơ chế Ướt (Washed) hoặc Phơi khô tự nhiên (Natural) trên giàn cao để kiểm soát sự lên men, giữ trọn vẹn hương vị tinh khiết của trái chín.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    tag: 'Tỉ Mỉ'
  },
  {
    id: '03',
    title: 'Nghệ Thuật Rang Xay',
    description: 'Công nghệ Full Hot Air giúp hạt chín đều từ trong ra ngoài. Nghệ nhân rang kiểm soát từng giây để đánh thức các tầng hương: từ chua thanh đến hậu ngọt sâu.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
    tag: 'Công Nghệ'
  },
  {
    id: '04',
    title: 'Trải Nghiệm Đẳng Cấp',
    description: 'Mỗi tách cà phê Mavia là một câu chuyện về đam mê. Chúng tôi cam kết mang đến hương vị chuẩn gu, đánh thức mọi giác quan của bạn.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop',
    tag: 'Thưởng Thức'
  }
];

export default function Journey() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4">
        <div className={styles.header}>
          <div className={styles.badge}>Mavia Process</div>
          <h2 className={styles.title}>Hành Trình Của Những Hạt Cà Phê</h2>
          <p className={styles.subtitle}>Quy trình khép kín từ nông trại tới tay khách hàng để bảo tồn hương vị nguyên bản.</p>
        </div>

        <div className={styles.journeyContainer}>
          {/* Left Side: Sticky Images */}
          <div className={styles.stickySide}>
            <div className={styles.imageStack}>
              {steps.map((step, index) => (
                <div 
                  key={`img-${step.id}`} 
                  className={`${styles.imageFrame} ${activeIndex === index ? styles.active : ''}`}
                >
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    fill 
                    className={styles.image}
                    priority={index === 0}
                  />
                  <div className={styles.overlay}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Scrolling Content */}
          <div className={styles.scrollingSide}>
            <div className={styles.timeline}>
              <div 
                className={styles.progressLine} 
                style={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {steps.map((step, index) => (
              <div 
                key={step.id} 
                ref={(el) => { stepRefs.current[index] = el; }}
                data-index={index}
                className={`${styles.stepContent} ${activeIndex === index ? styles.stepActive : ''}`}
              >
                <div className={styles.stepHeader}>
                  <span className={styles.stepTag}>{step.tag}</span>
                  <span className={styles.stepNum}>{step.id}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <div className={styles.stepIcon}>
                   {/* Optional: Add custom SVG icons for each step */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
