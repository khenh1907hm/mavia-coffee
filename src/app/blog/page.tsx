import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main>
      <Header />
      
      <section className="section bg-coffee-cream/30 min-h-[60vh]">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl text-coffee-dark mb-4 uppercase tracking-widest">Mavia Stories</h1>
            <p className="text-gray-500 max-w-2xl mx-auto italic">
              Khám phá những câu chuyện thú vị về thế giới cà phê, từ những đồi xanh đến từng tách thơm nồng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts?.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={post.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800'} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <span className="text-xs text-coffee-light font-bold uppercase tracking-widest mb-3 block">
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </span>
                  <h2 className="font-serif text-2xl text-coffee-dark mb-4 group-hover:text-coffee-light transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-6 text-sm leading-relaxed">
                    {post.content}
                  </p>
                  <span className="text-coffee-dark font-bold text-xs uppercase tracking-tighter border-b-2 border-coffee-light pb-1 group-hover:border-coffee-dark transition-all">
                    Đọc tiếp &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {(!posts || posts.length === 0) && (
            <div className="text-center py-20 text-gray-400 italic">
              Chưa có bài viết nào được đăng tải.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
