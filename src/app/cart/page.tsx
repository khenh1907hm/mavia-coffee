import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import styles from './Cart.module.css';

export default function Cart() {
  return (
    <main>
      <Header />
      
      <section className={`section ${styles.cartSection}`}>
        <div className="container">
          <h1 className={styles.cartTitle}>Giỏ Hàng Của Bạn</h1>
          
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>☕</div>
            <p>Giỏ hàng của bạn đang trống.</p>
            <Link href="/products" className={styles.shopBtn}>BẮT ĐẦU MUA SẮM</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
