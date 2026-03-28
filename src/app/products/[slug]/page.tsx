import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import styles from './Detail.module.css';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('slug', slug)
    .single();

  if (error || !product) {
    return notFound();
  }

  // Safe mapping for categories and arrays
  const categoryName = product.categories?.name || 'Uncategorized';
  const flavorNotes = Array.isArray(product.flavor_notes) ? product.flavor_notes : [];
  const brewMethods = Array.isArray(product.brew_methods) ? product.brew_methods : [];

  return (
    <main>
      <Header />
      
      <section className={`section ${styles.detailSection}`}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.imageGallery}>
              <div className={styles.mainImage}>
                <Image 
                  src={product.image_url} 
                  alt={product.name} 
                  width={600} 
                  height={600} 
                  priority
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
            
            <div className={styles.info}>
              <span className={styles.category}>{categoryName}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.price}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </p>
              
              <div className={styles.description}>
                <p>{product.description}</p>
              </div>
              
              <div className={styles.specs}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Mức độ rang:</span>
                  <span className={styles.specValue}>{product.roast_level}</span>
                </div>
                
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Hương vị:</span>
                  <div className={styles.tags}>
                    {flavorNotes.map((note: string, idx: number) => (
                      <span key={idx} className={styles.tag}>{note}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Phương pháp pha:</span>
                  <span className={styles.specValue}>{brewMethods.join(', ')}</span>
                </div>
              </div>
              
              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button className="px-3">-</button>
                  <input type="number" defaultValue={1} readOnly className="w-12 text-center bg-transparent" />
                  <button className="px-3">+</button>
                </div>
                <button className={styles.cartBtn}>THÊM VÀO GIỎ HÀNG</button>
              </div>
            </div>
          </div>
        </div>

        {product.story && (
          <div className="mt-20 py-16 border-t border-gray-100 bg-coffee-cream/20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="font-serif text-3xl text-coffee-dark mb-8 uppercase tracking-widest">
                Câu Chuyện Phía Sau
              </h2>
              <p className="prose prose-coffee max-w-none text-gray-700 leading-relaxed text-lg italic whitespace-pre-line">
                "{product.story}"
              </p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
