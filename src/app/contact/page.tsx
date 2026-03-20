import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <main>
      <Header />
      
      <div className={styles.banner}>
        <div className="container">
          <h1>Liên Hệ</h1>
          <p>Chúng tôi luôn lắng nghe phản hồi từ bạn.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.info}>
              <h2>Địa Chỉ Của Mavia</h2>
              <div className={styles.infoItem}>
                <strong>Địa chỉ:</strong>
                <p>123 Đường Cà Phê, Quận 1, TP. Hồ Chí Minh</p>
              </div>
              <div className={styles.infoItem}>
                <strong>Điện thoại:</strong>
                <p>+84 123 456 789</p>
              </div>
              <div className={styles.infoItem}>
                <strong>Email:</strong>
                <p>hello@maviacoffee.vn</p>
              </div>
              <div className={styles.social}>
                <p>Theo dõi chúng tôi trên mạng xã hội</p>
                {/* Icons placeholder */}
              </div>
            </div>
            
            <div className={styles.formWrapper}>
              <h2>Gửi Tin Nhắn</h2>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Họ và Tên</label>
                  <input type="text" placeholder="Nhập tên của bạn" />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="Nhập email" />
                </div>
                <div className={styles.formGroup}>
                  <label>Nội dung</label>
                  <textarea rows={5} placeholder="Bạn cần hỗ trợ điều gì?"></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>GỬI LỜI NHẮN</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
