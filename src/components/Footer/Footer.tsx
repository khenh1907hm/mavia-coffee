import styles from './Footer.module.css';
import Link from 'next/link';
import { 
  FileText, 
  MapPin, 
  Phone, 
  Mail, 
  PhoneCall,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const policyLinks = [
    { name: 'Chính sách bảo mật', href: '#' },
    { name: 'Điều khoản sử dụng', href: '#' },
    { name: 'Kinh doanh có điều kiện', href: '#' },
    { name: 'Điều kiện giao dịch', href: '#' },
    { name: 'Phương thức thanh toán', href: '#' },
    { name: 'Thông tin giá - hàng hoá', href: '#' },
    { name: 'Vận chuyển & giao nhận', href: '#' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        {/* Column 1: Company & Legal */}
        <div className={styles.column}>
          <div className={styles.brandWrapper}>
            <h2 className={styles.companyName}>Công ty TNHH KỲ KHANG AN</h2>
          </div>
          
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <FileText size={16} className={styles.infoIcon} />
              <span>MST: <strong>5801519981</strong></span>
            </div>
            
            <div className={styles.infoItem}>
              <MapPin size={16} className={styles.infoIcon} />
              <div className={styles.addressLines}>
                <p>53 Quảng Đức, TT. Đinh Văn, Lâm Hà</p>
                <p>Số 200, QL20, Tổ 21, Đức Trọng, Lâm Đồng</p>
              </div>
            </div>

            <p className={styles.licenseText}>
              GPKD số <strong>5801519981</strong> cấp ngày 18/06/2024 tại Sở KH&ĐT tỉnh Lâm Đồng (Thay đổi lần 1 ngày 22/07/2024).
            </p>

            <div className={styles.verifiedBadgeWrapper}>
              <a href="http://online.gov.vn/Home/WebDetails/136079" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://w.ladicdn.com/s450x350/5f0978c9927187251f2e7fbf/bocongthuong-20250925045033-gz0z1.png" 
                  alt="Đã thông báo Bộ Công Thương" 
                  className={styles.verifiedBadge}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Information Links */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Thông tin & Chính sách</h3>
          <nav className={styles.policyNav}>
            {policyLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className={styles.policyLink}>
                <ChevronRight size={14} className={styles.linkIcon} />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Contact & Support */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Hỗ trợ & Liên hệ</h3>
          
          <a href="tel:0919002403" className={styles.supportPhoneBox}>
            <div className={styles.phoneIconWrapper}>
              <PhoneCall size={20} />
            </div>
            <div className={styles.phoneText}>
              <span className={styles.phoneLabel}>Hotline 24/7</span>
              <span className={styles.phoneNumber}>091.900.2403</span>
            </div>
          </a>

          <div className={styles.workingHours}>
            <div className={styles.hourItem}>
              <span className={styles.hourIcon}>☀️</span>
              <span>Sáng: 8h00 – 11h00</span>
            </div>
            <div className={styles.hourItem}>
              <span className={styles.hourIcon}>🌙</span>
              <span>Chiều: 13h00 – 20h00</span>
            </div>
          </div>

          <div className={styles.contactItem} style={{marginTop: '15px'}}>
            <Mail size={16} className={styles.infoIcon} />
            <span>mavia.coffee@gmail.com</span>
          </div>

          <p className={styles.ctaText}>
            Kết nối với chúng tôi để nhận sự tư vấn phù hợp với mô hình kinh doanh của bạn.
          </p>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>© 2024 Mavia Coffee Roastery. Thiết kế bởi Mavia Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
