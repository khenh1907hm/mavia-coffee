'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Folder, Star } from 'lucide-react';

interface SidebarProps {
  categories?: { name: string; count: number; slug: string }[];
  popularPosts?: { title: string; date: string; image: string; slug: string }[];
}

const BlogSidebar: React.FC<SidebarProps> = ({ 
  categories = [
    { name: 'Khởi đầu ngày mới', count: 5, slug: 'coffee-morning' },
    { name: 'Kỹ thuật Pha chế', count: 8, slug: 'brewing' },
    { name: 'Vùng nguyên liệu', count: 3, slug: 'origin' },
    { name: 'Văn hóa Cà phê', count: 6, slug: 'culture' },
    { name: 'Tin tức Mavia', count: 4, slug: 'news' },
    { name: 'Dữ liệu Cà phê', count: 2, slug: 'data' },
  ],
  popularPosts = [
    { 
      title: 'Bí quyết chọn hạt cà phê cho Espresso hoàn hảo', 
      date: '15/03/2026', 
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=200',
      slug: 'bi-quyet-chon-hat-espresso'
    },
    { 
      title: 'Hành trình từ nông trại Cấu Đất đến tách cà phê sữa đá', 
      date: '10/01/2026', 
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200',
      slug: 'hanh-trinh-cau-dat'
    },
    { 
      title: 'Nghệ thuật thưởng thức cà phê Rang xay', 
      date: '05/01/2026', 
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=200',
      slug: 'nghe-thuat-thuong-thuc-ca-phe'
    },
    { 
      title: 'Xu hướng công nghệ trong ngành nông sản 2026', 
      date: '28/12/2025', 
      image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=200',
      slug: 'xu-huong-cong-nghe-2026'
    }
  ]
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <aside className="lg:pl-8 lg:border-l-[3px] border-coffee-cream flex flex-col gap-10">
      {/* Search Bar - Premium 50px Rounded */}
      <div className="order-first lg:order-none">
        <form className="relative group" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text"
            placeholder="Tìm bài viết..."
            className="w-full bg-white border-2 border-coffee-cream rounded-[50px] py-4 pl-6 pr-14 text-sm font-medium focus:outline-none focus:border-coffee-light focus:ring-4 focus:ring-coffee-light/10 transition-all shadow-sm group-hover:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-coffee-dark text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-coffee-light hover:scale-105 transition-all shadow-md active:scale-95"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-[20px] p-8 border-2 border-coffee-cream shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-coffee-dark mb-6 pb-4 border-b-[3px] border-coffee-cream flex items-center gap-3">
          <Folder className="w-5 h-5 text-coffee-light" />
          Danh mục
        </h3>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.slug} className="border-b border-coffee-cream/50 last:border-0 pb-4 last:pb-0">
              <Link 
                href={`/blog/category/${cat.slug}`}
                className="flex items-center justify-between group transition-all"
              >
                <span className="font-medium text-coffee-dark group-hover:text-coffee-light group-hover:translate-x-1 transition-all">
                  {cat.name}
                </span>
                <span className="bg-coffee-cream text-coffee-dark text-[11px] font-bold px-3 py-1 rounded-[15px] border border-coffee-cream group-hover:bg-coffee-light group-hover:text-white group-hover:border-coffee-light transition-all">
                  {cat.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-[20px] p-8 border-2 border-coffee-cream shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold text-coffee-dark mb-8 pb-4 border-b-[3px] border-coffee-cream flex items-center gap-3">
          <Star className="w-5 h-5 text-coffee-light" />
          Bài viết nổi bật
        </h3>
        <div className="space-y-6">
          {popularPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="flex gap-4 group"
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-[10px] overflow-hidden shadow-sm bg-gradient-to-br from-coffee-dark to-coffee-light">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-110 duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h4 className="text-[13px] font-bold text-coffee-dark line-clamp-2 leading-snug group-hover:text-coffee-light transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-coffee-light/60 font-bold uppercase tracking-widest">
                  <Star className="w-2.5 h-2.5 fill-coffee-light/20" />
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
