import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Detail.module.css';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/Product/ProductDetailClient';

export const dynamic = 'force-dynamic';

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

  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      <Header />
      
      <section className={`section pt-40 pb-20 ${styles.detailSection}`}>
        <div className="container">
          <ProductDetailClient product={product} />
        </div>

        {product.story && (
          <div className="mt-32 py-24 bg-white border-y border-gray-100">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="flex justify-center mb-10">
                <div className="w-16 h-[1px] bg-coffee-light/40"></div>
                <div className="mx-4 w-2 h-2 rounded-full bg-coffee-light"></div>
                <div className="w-16 h-[1px] bg-coffee-light/40"></div>
              </div>
              <h2 className="font-serif text-4xl text-coffee-dark mb-10 uppercase tracking-[0.2em] font-black">
                Câu Chuyện Phía Sau
              </h2>
              <p className="prose prose-coffee max-w-none text-gray-600 leading-[2] text-lg font-medium italic whitespace-pre-line">
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
