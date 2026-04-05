'use client';

import { MapPin, MessageCircle, Phone } from 'lucide-react';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
  return (
    <div className={styles.container}>
      <a
        href="https://maps.app.goo.gl/PBMgfZr9uDNabcWf7"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.icon} ${styles.map}`}
        title="Bản đồ"
      >
        <MapPin size={24} />
      </a>

      <a
        href="https://zalo.me/0867086128"
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
