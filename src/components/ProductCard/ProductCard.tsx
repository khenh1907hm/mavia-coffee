import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image_url: string;
    category_name: string;
    roast_level: string;
    flavor_notes: string[];
    brew_methods: string[];
  };
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageWrapper}>
        <Image
          src={product.image_url || '/placeholder-coffee.jpg'}
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
        />
        <div className={styles.badge}>{product.roast_level} Roast</div>
      </Link>
      
      <div className={styles.content}>
        <span className={styles.category}>{product.category_name}</span>
        <h3 className={styles.title}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        
        <div className={styles.flavorNotes}>
          {product.flavor_notes.map((note, idx) => (
            <span key={idx} className={styles.note}>{note}</span>
          ))}
        </div>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Brew:</span>
            <span className={styles.value}>{product.brew_methods.join(', ')}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <span className={styles.price}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
          <button className={styles.addButton}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
