'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface variant {
  weight: string;
  price: number;
}

interface ProductProps {
  product: {
    id: string;
    name: string;
    slug: string;
    image_url: string;
    category_name: string;
    description?: string;
    price?: number;
    variants?: { weight: string; price: number }[];
    specs?: {
      ratio: string;
      origin: string;
      roast: string;
      tech: string;
      suitable: string;
      details: string;
    };
  };
  bestSeller?: boolean;
}

const ProductCard = ({ product, bestSeller }: ProductProps) => {
  // Safe variants check with fallback
  const variants = product.variants && product.variants.length > 0
    ? product.variants
    : [{ weight: 'Standard', price: product.price || 0 }];

  const [selectedWeight, setSelectedWeight] = useState(variants[0].weight);
  const [quantity, setQuantity] = useState(1);

  const currentVariant = variants.find(v => v.weight === selectedWeight) || variants[0];

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageWrapper}>
        <Image
          src={product.image_url || '/placeholder-coffee.jpg'}
          alt={product.name}
          width={400}
          height={400}
          className={styles.image}
        />
        {bestSeller && <div className={styles.bestSellerBadge}>Hot Deal</div>}
      </Link>

      <div className={styles.content}>
        <span className={styles.category}>{product.category_name}</span>
        <h3 className={styles.title}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        {/* {product.specs && (
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Tỉ lệ:</span>
              <span className={styles.specValue}>{product.specs.ratio}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Nguồn gốc:</span>
              <span className={styles.specValue}>{product.specs.origin}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Công nghệ:</span>
              <span className={styles.specValue}>{product.specs.tech}</span>
            </div>
          </div>
        )} */}

        <div className={styles.selectors}>
          <div className={styles.weightSelector}>
            {variants.map((v) => (
              <button
                key={v.weight}
                className={`${styles.weightBtn} ${selectedWeight === v.weight ? styles.activeWeight : ''}`}
                onClick={() => setSelectedWeight(v.weight)}
              >
                {v.weight}
              </button>
            ))}
          </div>

          <div className={styles.quantitySelector}>
            <button onClick={() => handleQuantityChange(-1)} className={styles.qtyBtn}>-</button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className={styles.qtyBtn}>+</button>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceSection}>
            <span className={styles.price}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentVariant.price)}
            </span>
            {quantity > 1 && (
              <span className={styles.totalPrice}>
                Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentVariant.price * quantity)}
              </span>
            )}
          </div>
          <button className={styles.addToCartBtn}>THÊM GIỎ HÀNG</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
