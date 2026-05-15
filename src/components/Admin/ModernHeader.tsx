'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Mail, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ModernHeader() {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    fetchUser();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserEmail(user.email || 'Admin');
    }
  };

  const fetchData = async () => {
    const { count: msgCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new');
    const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    setUnreadMessages(msgCount || 0);
    setPendingOrders(orderCount || 0);
  };

  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-8 sticky top-0 z-40 font-poppins">
      <div className="relative w-[400px] hidden lg:block">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Tìm kiếm nhanh sản phẩm, đơn hàng..."
          className="w-full pl-14 pr-6 py-3.5 bg-gray-100/50 border border-transparent rounded-2xl text-sm outline-none hover:bg-gray-100 focus:bg-white focus:border-coffee-light/30 focus:ring-4 focus:ring-coffee-light/10 transition-all font-medium text-gray-700 placeholder:text-gray-400 shadow-inner"
        />
      </div>
      <div className="flex-1 lg:hidden"></div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 pr-8 border-r border-gray-200">
          <Link href="/admin/messages" className="relative p-2.5 text-gray-400 hover:text-coffee-dark hover:bg-coffee-cream/20 rounded-xl transition-all group">
            <Mail size={22} className="group-hover:scale-110 transition-transform" />
            {unreadMessages > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {unreadMessages}
              </span>
            )}
          </Link>

          <Link href="/admin/orders" className="relative p-2.5 text-gray-400 hover:text-coffee-dark hover:bg-coffee-cream/20 rounded-xl transition-all group">
            <Bell size={22} className="group-hover:scale-110 transition-transform" />
            {pendingOrders > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {pendingOrders}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-none mb-1 group-hover:text-coffee-dark transition-colors">
              {userEmail ? userEmail.split('@')[0] : 'Admin'}
            </p>
            <p className="text-[10px] text-coffee-light font-bold uppercase tracking-widest">
              Quản Trị Viên
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coffee-light to-coffee-dark flex items-center justify-center shadow-lg shadow-coffee-dark/20 text-white border-2 border-white group-hover:scale-105 transition-transform duration-300">
            <User size={22} />
          </div>
        </div>
      </div>
    </header>
  );
}
