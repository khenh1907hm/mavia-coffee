'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Plus, Minus, CheckCircle, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '@/app/products/[slug]/Detail.module.css';

interface ProductDetailClientProps {
  product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  
  // Safe variants check
  const variants = product.variants && product.variants.length > 0
    ? product.variants
    : [{ weight: 'Standard', price: product.price || 0 }];

  // Gallery Setup
  const gallery = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : [product.image_url];

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [selectedWeight, setSelectedWeight] = useState(variants[0].weight);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeIndex = gallery.indexOf(activeImage);

  const handleNextImage = () => {
    const nextIndex = (activeIndex + 1) % gallery.length;
    setActiveImage(gallery[nextIndex]);
  };

  const handlePrevImage = () => {
    const prevIndex = (activeIndex - 1 + gallery.length) % gallery.length;
    setActiveImage(gallery[prevIndex]);
  };

  const currentVariant = variants.find((v: any) => v.weight === selectedWeight) || variants[0];
  const totalPrice = currentVariant.price * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentVariant.price,
      weight: selectedWeight,
      quantity: quantity,
      image_url: product.image_url,
      slug: product.slug
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const flavorNotes = Array.isArray(product.flavor_notes) ? product.flavor_notes : [];
  const brewMethods = Array.isArray(product.brew_methods) ? product.brew_methods : [];

  return (
    <div className={styles.layout}>
      <div className={styles.imageGallery}>
        <div className={styles.mainImageContainer}>
          <div className={styles.mainImage}>
            <Image 
              src={activeImage} 
              alt={product.name} 
              width={800} 
              height={800} 
              priority
              className="object-cover transition-all duration-700 ease-in-out"
            />
            {product.hover_image_url && activeImage === product.image_url && (
              <div className="absolute inset-0 opacity-0 lg:hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none group">
                 <Image 
                  src={product.hover_image_url} 
                  alt={`${product.name} Info`} 
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          {gallery.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className={styles.navBtnPrev}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNextImage}
                className={styles.navBtnNext}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className={styles.imageCounter}>
                {activeIndex + 1} / {gallery.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className={styles.thumbnailsGrid}>
            {gallery.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`${styles.thumbnailBtn} ${
                  activeImage === img ? styles.activeThumbnail : ''
                }`}
              >
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      
      <div className={styles.info}>
        <div className="flex items-center gap-3 mb-4">
          <span className={styles.category}>{product.categories?.name || 'Coffee'}</span>
          <div className="h-1 w-1 rounded-full bg-gray-300"></div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-coffee-light">In Stock</span>
        </div>

        <h1 className={styles.title}>{product.name || 'Sản phẩm Mavia'}</h1>
        
        <div className={styles.price}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentVariant.price || 0)}
          {quantity > 1 && (
            <span className="text-gray-300 text-lg font-medium ml-4">
               × {quantity}
            </span>
          )}
        </div>
        
        <div className={styles.description}>
          <p>{product.description || 'Hương vị cà phê nguyên bản, rang xay thủ công từ Mavia Coffee.'}</p>
        </div>

        {/* Weight Selector */}
        <div className="mb-10">
          <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-coffee-light mb-4">
            Khối lượng (Weight)
          </label>
          <div className="flex flex-wrap gap-3">
            {variants.map((v: any) => (
              <button
                key={v.weight}
                onClick={() => setSelectedWeight(v.weight)}
                className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  selectedWeight === v.weight 
                    ? 'bg-coffee-dark text-white shadow-2xl shadow-coffee-dark/20 scale-105' 
                    : 'bg-gray-50 text-coffee-dark hover:bg-gray-100 hover:scale-102'
                }`}
              >
                {v.weight}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.specs}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Mức độ rang</span>
            <span className={styles.specValue}>{product.roast_level || 'Medium'}</span>
          </div>
          
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Hương vị đặc trưng</span>
            <div className={styles.tags}>
              {flavorNotes.length > 0 ? flavorNotes.map((note: string, idx: number) => (
                <span key={idx} className={styles.tag}>{note}</span>
              )) : <span className={styles.tag}>Hương vị tự nhiên</span>}
            </div>
          </div>
          
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Phương pháp pha gợi ý</span>
            <span className={styles.specValue}>{brewMethods.length > 0 ? brewMethods.join(', ') : 'Pha máy, Pha phin'}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-5">
          <div className="flex items-center bg-gray-100/50 rounded-2xl p-1 shrink-0 border border-gray-100">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-14 h-14 flex items-center justify-center hover:bg-white rounded-xl transition-all text-coffee-dark"
            >
              <Minus size={18} />
            </button>
            <input 
              readOnly 
              className="w-12 text-center bg-transparent font-black text-coffee-dark text-lg" 
              value={quantity} 
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-14 h-14 flex items-center justify-center hover:bg-white rounded-xl transition-all text-coffee-dark"
            >
              <Plus size={18} />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 ${
              added 
                ? 'bg-emerald-500 text-white cursor-default' 
                : 'bg-coffee-dark text-white hover:bg-coffee-medium active:scale-95 shadow-xl shadow-coffee-dark/20'
            }`}
          >
            {added ? (
              <>
                <CheckCircle size={18} /> THÊM VÀO GIỎ THÀNH CÔNG
              </>
            ) : (
              <>
                <ShoppingCart size={18} /> THÊM GIỎ HÀNG — {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
