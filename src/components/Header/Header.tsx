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
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        
        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartIcon}>
            Cart (0)
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
