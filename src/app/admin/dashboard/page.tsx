'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Coffee, FileText, Mail, Package, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    posts: 0,
    orders: 0,
    contacts: 0
  });
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchStats();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email) {
      setUserName(user.email.split('@')[0]);
    }
  };

  const fetchStats = async () => {
    const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: postCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const { count: contactCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });

    setStats({
      products: productCount || 0,
      posts: postCount || 0,
      orders: orderCount || 0,
      contacts: contactCount || 0
    });
  };

  const cards = [
    { title: 'Tổng Sản Phẩm', value: stats.products, icon: <Coffee size={24} />, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', href: '/admin/products' },
    { title: 'Đơn Hàng Mới', value: stats.orders, icon: <Package size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', href: '/admin/orders' },
    { title: 'Tin Nhắn & Liên Hệ', value: stats.contacts, icon: <Mail size={24} />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', href: '/admin/messages' },
    { title: 'Bài Viết (Blog)', value: stats.posts, icon: <FileText size={24} />, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', href: '/admin/posts' },
  ];

  return (
    <div className="space-y-10 pb-20">


      {/* Stats Grid */}
      <div>
        <h2 className="text-xl font-bold text-coffee-dark uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
          <TrendingUp size={20} className="text-coffee-light" />
          Tổng quan hệ thống
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <Link
              href={card.href}
              key={i}
              className={`block bg-white p-6 rounded-3xl border ${card.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-coffee-dark transition-colors" size={20} />
              </div>
              <div>
                <p className="text-[2rem] font-black text-coffee-dark leading-none mb-1">{card.value}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{card.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-coffee-dark uppercase tracking-widest">Truy cập nhanh</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center hover:border-coffee-light hover:bg-coffee-cream/30 transition-all group"
            >
              <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                <Coffee className="text-gray-400 group-hover:text-coffee-dark" size={20} />
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-coffee-dark">Thêm Sản phẩm</span>
            </Link>
            <Link
              href="/admin/posts/new"
              className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center hover:border-coffee-light hover:bg-coffee-cream/30 transition-all group"
            >
              <div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                <FileText className="text-gray-400 group-hover:text-coffee-dark" size={20} />
              </div>
              <span className="text-sm font-bold text-gray-600 group-hover:text-coffee-dark">Viết bài mới</span>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-[32px] shadow-inner border border-gray-200 flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-coffee-dark/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-4 relative z-10">
            <span className="font-black text-2xl text-coffee-dark">M</span>
          </div>
          <h2 className="text-xl text-coffee-dark font-black mb-2 uppercase tracking-widest relative z-10">Mavia Coffee Roastery</h2>
          <p className="text-gray-500 mb-8 max-w-sm text-sm relative z-10">
            "Từ những hạt cà phê hảo hạng nhất, chúng tôi tạo nên những trải nghiệm không thể nào quên."
          </p>
          <Link
            href="/"
            target="_blank"
            className="bg-coffee-dark text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-coffee-light hover:shadow-lg transition-all relative z-10"
          >
            Xem Website Ngoài
          </Link>
        </div>
      </div>
    </div>
  );
}
