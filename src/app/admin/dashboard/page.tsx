'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Coffee, FileText, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    posts: 0,
    categories: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: postCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });

    setStats({
      products: productCount || 0,
      posts: postCount || 0,
      categories: categoryCount || 0
    });
  };

  const cards = [
    { title: 'Sản phẩm', value: stats.products, icon: <Coffee className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Bài viết', value: stats.posts, icon: <FileText className="text-green-500" />, color: 'bg-green-50' },
    { title: 'Danh mục', value: stats.categories, icon: <TrendingUp className="text-purple-500" />, color: 'bg-purple-50' },
    { title: 'Admin', value: 1, icon: <Users className="text-orange-500" />, color: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-coffee-dark uppercase">Tổng quan Dashbord</h1>
        <p className="text-gray-500 mt-2">Chào mừng quay trở lại, Mavia Admin!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className={`p-4 rounded-lg ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">{card.title}</p>
              <p className="text-2xl font-bold text-coffee-dark">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-coffee-dark uppercase tracking-wide">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/admin/products/new" 
              className="p-4 border border-dashed border-gray-200 rounded-lg text-center hover:border-coffee-light hover:bg-coffee-cream transition-all group"
            >
              <Coffee className="mx-auto mb-2 text-gray-400 group-hover:text-coffee-dark" size={24} />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-coffee-dark">Thêm Sản phẩm</span>
            </Link>
            <Link 
              href="/admin/posts/new" 
              className="p-4 border border-dashed border-gray-200 rounded-lg text-center hover:border-coffee-light hover:bg-coffee-cream transition-all group"
            >
              <FileText className="mx-auto mb-2 text-gray-400 group-hover:text-coffee-dark" size={24} />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-coffee-dark">Viết bài mới</span>
            </Link>
          </div>
        </div>

        <div className="bg-coffee-dark text-white p-8 rounded-xl shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-serif font-bold mb-4">Mavia Coffee Roastery</h2>
            <p className="text-gray-400 mb-6">
              Mỗi hạt cà phê là một câu chuyện. Hãy quản lý nội dung của bạn thật tốt để truyền tải giá trị đó đến khách hàng.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-white text-coffee-dark px-6 py-2 rounded-lg font-bold hover:bg-coffee-light transition-all"
            >
              Xem Website
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}
