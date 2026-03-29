import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import BlogSidebar from '@/components/Blog/BlogSidebar';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
  }
  
  console.log('Fetched Posts:', posts?.length || 0);

  // Helper to validate and fallback image
  const getImageUrl = (url: string | null) => {
    if (!url || (!url.startsWith('http') && !url.startsWith('/'))) {
      return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800';
    }
    return url;
  };

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Blog Hero Section - Premium Brewing Guide Style */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/hero.png"
            alt="Mavia Blog Hero"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Dark Overlay with Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10"></div>

        {/* Content */}
        <div className="container relative z-20 text-center text-white">
          <ScrollReveal effect="fade" duration={1.5}>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-[0.15em] uppercase font-serif !text-white drop-shadow-2xl">
                Blog Mavia
              </h1>
              <div className="w-16 h-1 bg-coffee-light mx-auto mb-8"></div>
              <p className="text-lg md:text-xl !text-white/90 font-medium max-w-2xl mx-auto leading-relaxed italic">
                Thông tin & câu chuyện về thế giới cà phê rang xay thủ công dành cho những tâm hồn đồng điệu.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Main Content (8/12) */}
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts?.map((post) => (
                  <article key={post.id} className="group p-6 flex flex-col bg-white rounded-[30px] border-2 border-coffee-cream shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                    {/* Image Wrapper - Now Rounded & Inset */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
                      <Image
                        src={getImageUrl(post.image_url)}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                      />
                      {/* Category Badge - Positioned like HTML */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="bg-coffee-cream text-coffee-dark px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md border border-coffee-cream/50">
                          Coffee Story
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                    </div>
                    
                    {/* Content Area - Clean & Spaced */}
                    <div className="flex flex-col flex-grow pt-10 px-2 pb-4">
                      <div className="flex items-center gap-3 text-coffee-light/60 text-[12px] font-bold uppercase tracking-widest mb-5">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </div>

                      <h2 className="text-2xl font-bold pb-4 text-coffee-dark mb-4 leading-snug line-clamp-2 group-hover:text-coffee-light transition-colors font-serif">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                        {post.summary || post.content}
                      </p>

                      <div className="mt-auto">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-coffee-light font-bold text-xs uppercase tracking-widest group/link hover:gap-4 transition-all"
                        >
                          Xem thêm <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {(!posts || posts.length === 0) && (
                <div className="text-center py-40 bg-coffee-cream/30 rounded-[30px] border-2 border-dashed border-coffee-cream">
                  <p className="text-coffee-light italic font-serif text-lg">Hành trình đang được viết tiếp, vui lòng quay lại sau...</p>
                </div>
              )}

              {/* Premium Pagination */}
              {posts && posts.length > 0 && (
                <div className="flex justify-center items-center gap-3 mt-16">
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-2 border-coffee-cream text-coffee-light hover:bg-coffee-dark hover:text-white hover:border-coffee-dark transition-all shadow-sm">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-coffee-dark text-white font-bold shadow-md">
                    1
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-2 border-coffee-cream text-coffee-dark hover:bg-coffee-cream transition-opacity">
                    2
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-2 border-coffee-cream text-coffee-dark hover:bg-coffee-cream transition-opacity">
                    3
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-2 border-coffee-cream text-coffee-light hover:bg-coffee-dark hover:text-white hover:border-coffee-dark transition-all shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar (4/12) */}
            <div className="md:col-span-4">
              <BlogSidebar />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
