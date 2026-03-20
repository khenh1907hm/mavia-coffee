import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <h3>MAVIA COFFEE</h3>
          <p>Trải nghiệm hương vị cà phê rang xay nguyên bản.</p>
        </div>
        
        <div className={styles.links}>
          <h4>Shop</h4>
          <Link href="/products">Tất cả sản phẩm</Link>
          <Link href="/products?category=specialty">Specialty Coffee</Link>
          <Link href="/products?category=blend">Coffee Blends</Link>
        </div>
        
        <div className={styles.links}>
          <h4>Company</h4>
          <Link href="/our-story">Câu chuyện</Link>
          <Link href="/contact">Liên hệ</Link>
        </div>
        
        <div className={styles.newsletter}>
          <h4>Đăng ký nhận tin</h4>
          <p>Nhận thông báo về sản phẩm mới và ưu đãi.</p>
          <div className={styles.form}>
            <input type="email" placeholder="Email của bạn" />
            <button>GỬI</button>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; 2024 Mavia Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
