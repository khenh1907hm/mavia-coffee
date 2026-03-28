import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) return notFound();

  return (
    <main>
      <Header />
      
      <article className="section pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm text-coffee-light font-bold uppercase tracking-widest mb-4 block">
              Mavia Story • {new Date(post.created_at).toLocaleDateString('vi-VN')}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-coffee-dark mb-8 leading-tight uppercase">
              {post.title}
            </h1>
          </div>

          {post.image_url && (
            <div className="relative h-[500px] mb-16 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={post.image_url} 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg prose-coffee mx-auto text-gray-700 leading-relaxed whitespace-pre-line font-serif italic text-xl text-center px-4">
            {post.content}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
