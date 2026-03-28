import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link href="/">MAVIA COFFEE</Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/">Trang chủ</Link>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/brewing-guide">Hướng dẫn pha</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/our-story">Giới thiệu</Link>
        </nav>
        
        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartIcon}>
            🛒 Giỏ hàng
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
