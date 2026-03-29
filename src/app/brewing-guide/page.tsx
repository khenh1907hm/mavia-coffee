import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './Brewing.module.css';

const brewingMethods = [
  {
    name: 'V60',
    title: 'HƯỚNG DẪN PHA V60',
    slug: 'v60',
    bgColor: '#c4a480', // Yellowish/Gold
    icon: '/images/brewing/v60.png'
  },
  {
    name: 'Cold Brew',
    title: 'HƯỚNG DẪN PHA COLD BREW',
    slug: 'cold-brew',
    bgColor: '#a68a86', // Pinkish/Brick
    icon: '/images/brewing/cold-brew.png'
  },
  {
    name: 'AeroPress',
    title: 'HƯỚNG DẪN PHA AEROPRESS',
    slug: 'aeropress',
    bgColor: '#b08b5c', // Tan/Brown
    icon: '/images/brewing/aeropress.png'
  },
  {
    name: 'Moka Pot',
    title: 'HƯỚNG DẪN PHA MOKA POT',
    slug: 'moka-pot',
    bgColor: '#7a816b', // Sage/Grey
    icon: '/images/brewing/moka-pot.png'
  },
  {
    name: 'Espresso',
    title: 'HƯỚNG DẪN PHA ESPRESSO TẠI NHÀ',
    slug: 'espresso',
    bgColor: '#96a5a8', // Blue-grey
    icon: '/images/brewing/espresso.png'
  },
  {
    name: 'French Press',
    title: 'HƯỚNG DẪN PHA FRENCH PRESS',
    slug: 'french-press',
    bgColor: '#9e8c81', // Muted Brown
    icon: '/images/brewing/french-press.png'
  },
  {
    name: 'Phin',
    title: 'HƯỚNG DẪN PHA PHIN',
    slug: 'phin',
    bgColor: '#b67e6c', // Reddish
    icon: '/images/brewing/phin.svg'
  },
  {
    name: 'Cascara',
    title: 'HƯỚNG DẪN PHA CASCARA',
    slug: 'cascara',
    bgColor: '#879796', // Slate blue
    icon: '/images/brewing/cascara.svg'
  },
  {
    name: 'Phin Giấy',
    title: 'HƯỚNG DẪN PHA CÀ PHÊ PHIN GIẤY',
    slug: 'phin-giay',
    bgColor: '#aba59c', // Beige/Grey
    icon: '/images/brewing/phin-giay.svg'
  }
];

export default function BrewingGuide() {
  return (
    <main className={styles.wrapper}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className="container relative z-10 text-center">
          <ScrollReveal effect="scale" duration={1.2}>
            <h1 className={styles.heroTitle}>HƯỚNG DẪN PHA</h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <ScrollReveal effect="up">
            <p className={styles.introText}>
              Với mỗi kỹ thuật pha, dụng cụ và loại cà phê khác nhau đều có thể làm bạn bất ngờ vì những hương vị khác biệt. Đây là một số đề xuất cơ bản của Sơn Pacamara giúp bạn có thể tạo nên ly cà phê thơm ngon của riêng mình.
            </p>
          </ScrollReveal>
          
          <div className={styles.introIcons}>
             {/* Using local icons for consistency */}
            <ScrollReveal effect="up" delay={100} className={styles.headerIcon}>
               <img src="/images/brewing/v60.png" alt="V60" style={{ filter: 'grayscale(1) brightness(0.5)' }} />
            </ScrollReveal>
            <ScrollReveal effect="up" delay={200} className={styles.headerIcon}>
               <img src="/images/brewing/moka-pot.png" alt="Moka Pot" style={{ filter: 'grayscale(1) brightness(0.5)' }} />
            </ScrollReveal>
            <ScrollReveal effect="up" delay={300} className={styles.headerIcon}>
               <img src="/images/brewing/aeropress.png" alt="AeroPress" style={{ filter: 'grayscale(1) brightness(0.5)' }} />
            </ScrollReveal>
          </div>

          <div className={styles.technicalInfo}>
            <ScrollReveal effect="up" delay={400} className={styles.infoBlock}>
              <p><strong>Các dụng cụ phù hợp:</strong> Espresso / Pour over / Moka pot / French Press / AeroPress / Chemex / Phin Việt Nam</p>
            </ScrollReveal>
            <ScrollReveal effect="up" delay={500} className={styles.infoBlock}>
              <p><strong>Tỉ lệ x cà phê : y nước khuyên dùng</strong> (x gram cà phê với y ml nước) dao động từ 1: 15 đến 1:17 cho pour-over. Với Coldbrew tỉ lệ khuyên dùng là 1:10, với Espresso là 1:1,5 – 1:2.</p>
            </ScrollReveal>
            <ScrollReveal effect="up" delay={600} className={styles.infoBlock}>
              <p><strong>Nhiệt độ nước pha</strong> từ 88 – 91 độ C. Với cold brew dùng nước lạnh và ủ trong ngăn mát tủ lạnh từ 4 – 7 độ C.</p>
            </ScrollReveal>
            <ScrollReveal effect="up" delay={700} className={styles.infoBlock}>
              <p><strong>Blooming tỉ lệ nước : cà phê</strong> để blooming từ 1: 2 đến 1: 2,5 trong thời gian từ 30 – 45s (cà phê rang càng mới thì thời gian và tỉ lệ blooming càng lớn)</p>
            </ScrollReveal>
            <ScrollReveal effect="up" delay={800} className={styles.infoBlock}>
              <p><strong>Thời gian kết thúc quá trình pha</strong> nên từ 2p30s đến 2p45s với pour-over.</p>
            </ScrollReveal>
            <ScrollReveal effect="up" delay={900} className={styles.infoBlock}>
              <p><strong>Mức xay thông thường cho từng dụng cụ:</strong></p>
              <ul className={styles.grindList}>
                <li>– Rất mịn: Espresso / Moka pot</li>
                <li>– Mịn: AeroPress / Phin</li>
                <li>– Bình thường: Pour over / Chemex</li>
                <li>– Thô: Coldbrew / FrenchPress</li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.gridOuter}>
            {brewingMethods.map((method, idx) => (
              <ScrollReveal 
                key={method.slug} 
                effect={idx % 2 === 0 ? 'left' : 'right'}
                delay={(idx % 3) * 100}
                className={styles.tile}
                style={{ backgroundColor: method.bgColor, height: '100%' }}
              >
                <div className={styles.tileContent}>
                  <div className={styles.tileIcon}>
                    <img src={method.icon} alt={method.name} />
                  </div>
                  <h3 className={styles.tileTitle}>{method.title}</h3>
                </div>
                <a href={`/brewing-guide/${method.slug}`} className={styles.tileLink} aria-label={`View ${method.name} guide`}></a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCTA}>
        <div className="container text-center">
          <div className={styles.divider}></div>
          <h2 className={styles.ctaTitle}>Oops! Bạn không tìm thấy phương pháp pha yêu thích của mình?</h2>
          <p className={styles.ctaText}>
            Thật tuyệt vời, bạn đã có một phương pháp pha chế dành riêng cho mình.<br />
            Đừng ngại ngần chia sẻ phương thức cùng Sơn Pacamara tại fanpage nhé.<br />
            Chúng tôi luôn luôn lắng nghe và học hỏi tích cực từ kinh nghiệm của bạn.<br />
            Cảm ơn bạn nhé!
          </p>
          <div className={styles.bottomDivider}></div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
