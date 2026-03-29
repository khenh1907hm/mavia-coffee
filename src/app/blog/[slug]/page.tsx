import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BlogSidebar from '@/components/Blog/BlogSidebar';

export const dynamic = 'force-dynamic';

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) return notFound();

  return (
    <main className="bg-[#FAF9F6] min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Content (Post detail) */}
            <article className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-gray-200/50 border border-gray-100">
              
              <div className="mb-12">
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-coffee-light mb-8">
                  <Link href="/blog" className="hover:text-coffee-dark transition-colors">Blog</Link>
                  <span>/</span>
                  <span className="text-gray-400">Câu chuyện</span>
                </nav>

                <h1 className="font-serif text-4xl md:text-6xl text-coffee-dark mb-6 leading-tight uppercase tracking-tighter">
                  {post.title}
                </h1>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-coffee-cream flex items-center justify-center text-coffee-dark font-bold text-xs shadow-sm">
                      M
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-coffee-dark uppercase tracking-widest">Mavia Editor</p>
                      <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">
                        {new Date(post.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {post.image_url && (
                <div className="relative aspect-[16/9] mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image 
                    src={post.image_url} 
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose prose-lg prose-coffee max-w-none text-gray-700 leading-[1.8] font-serif">
                <div className="text-xl md:text-2xl text-coffee-dark/80 italic mb-10 leading-relaxed border-l-4 border-coffee-cream pl-8 py-2">
                  {post.summary || "Chào mừng bạn đến với hành trình khám phá hương vị cà phê tại Mavia Coffee."}
                </div>
                
                <div className="whitespace-pre-line text-lg text-gray-600">
                  {post.content}
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-full mb-2">Thẻ bài viết</span>
                {['Cà phê', 'Rang xay', 'Mavia Story', 'Thủ công'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold text-coffee-dark hover:bg-coffee-cream transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <BlogSidebar />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
