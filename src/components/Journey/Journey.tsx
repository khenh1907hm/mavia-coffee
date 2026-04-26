'use client';

import Image from 'next/image';
import styles from './Journey.module.css';
import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  {
    id: '01',
    title: 'Tuyển Chọn Tại Nông Trại',
    description: 'Chúng tôi làm việc trực tiếp với nông dân tại Đắk Lắk và Lâm Đồng để chọn ra những vườn cà phê canh tác hữu cơ, đảm bảo hạt đạt độ chín hoàn hảo.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '02',
    title: 'Sơ Chế Thủ Công',
    description: 'Hạt cà phê được xử lý theo phương pháp Honey hoặc Natural để giữ trọn vẹn hương vị trái cây tự nhiên và độ ngọt nguyên bản.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    title: 'Nghệ Thuật Rang Xay',
    description: 'Mỗi mẻ cà phê được rang bằng hệ thống Hot Air hiện đại, kiểm soát nhiệt độ chính xác để đánh thức các tầng hương vị phức hợp.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '04',
    title: 'Thưởng Thức Trọn Vẹn',
    description: 'Sản phẩm đến tay bạn là tâm huyết của cả một đội ngũ, mang đến trải nghiệm cà phê sạch, đậm đà và đầy cảm hứng.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop',
  }
];

export default function Journey() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal effect="up">
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>Từ Nông Trại Đến Tách Cà Phê</span>
            <h2>Hành Trình Của Những Hạt Cà Phê</h2>
            <p className={styles.sectionDesc}>Hành trình tỉ mỉ và tận tâm để mang đến hương vị nguyên bản nhất.</p>
          </div>
        </ScrollReveal>

        <div className={styles.journeyGrid}>
          {steps.map((step, idx) => (
            <div key={step.id} className={styles.journeyItem}>
              <ScrollReveal effect={idx % 2 === 0 ? "left" : "right"} delay={idx * 200}>
                <div className={`${styles.itemContent} ${idx % 2 !== 0 ? styles.reverse : ''}`}>
                  <div className={styles.imageWrapper}>
                    <div className={styles.imageInner}>
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        width={600} 
                        height={450} 
                        className={styles.image}
                      />
                      <div className={styles.stepNumber}>{step.id}</div>
                    </div>
                  </div>
                  <div className={styles.textContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                    <div className={styles.decorLine}></div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
