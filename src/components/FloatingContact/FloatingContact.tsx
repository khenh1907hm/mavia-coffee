'use client';

import { MapPin, MessageCircle, Phone } from 'lucide-react';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
  return (
    <div className={styles.container}>
      <a
        href="https://goo.gl/maps/embed?pb=!1m18!1m12!1m3!1d3250.0881741385697!2d108.38001947408365!3d11.750303340478071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317140d8d1652cbd%3A0x5b102f106a93dd5b!2zMjAwIFFMMjAsIExpw6puIE5naMSpYSwgxJDhu6ljIFRy4buNbmcsIEzDom0gxJDhu5NuZyA2NjAwMCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1773998703009!5m2!1svi!2s"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.map}`}
        title="Bản đồ"
      >
        <MapPin size={24} />
      </a>

      <a
        href="https://zalo.me/0839395292"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.zalo}`}
        title="Zalo"
      >
        <span className={styles.zaloText}>Zalo</span>
      </a>

      <a
        href="https://m.me/your_page"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.messenger}`}
        title="Facebook"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
