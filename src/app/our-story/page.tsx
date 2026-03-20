import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import styles from './Story.module.css';

export default function OurStory() {
  return (
    <main>
      <Header />
      
      <div className={styles.hero}>
        <div className="container">
          <h1>Câu Chuyện Của Mavia</h1>
          <p>Hành trình tìm kiếm những hạt cà phê hảo hạng nhất.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            <div className={styles.textBlock}>
              <h2>Khởi Đầu Từ Đam Mê</h2>
              <p>
                Mavia Coffee được thành lập bởi một nhóm những người yêu cà phê, 
                với mong muốn mang lại hương vị cà phê rang xay nguyên bản và chất lượng nhất cho người Việt. 
                Chúng tôi tin rằng mỗi tách cà phê không chỉ là một thức uống, 
                mà là một nghệ thuật được kết tinh từ đôi bàn tay của người nông dân và sự tinh tế của người thợ rang.
              </p>
            </div>
            
            <div className={styles.imageBlock}>
              <Image 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" 
                alt="Coffee Farm" 
                width={800} 
                height={500} 
              />
            </div>

            <div className={styles.textBlock}>
              <h2>Triết Lý Của Chúng Tôi</h2>
              <p>
                <b>Chất lượng là ưu tiên hàng đầu:</b> Chúng tôi trực tiếp làm việc với các vùng nguyên liệu tại Cầu Đất, Buôn Ma Thuột để tuyển chọn những hạt cà phê đạt tiêu chuẩn cao nhất.
                <br /><br />
                <b>Rang thủ công:</b> Mỗi mẻ rang đều được kiểm soát chặt chẽ để phát triển tối đa tiềm năng hương vị của từng loại hạt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
