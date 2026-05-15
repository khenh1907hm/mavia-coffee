'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Mail, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNavbarTop() {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchUser();
    
    // Auto refresh data every minute
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
    // Lấy số lượng tin nhắn mới
    const { count: msgCount } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');
      
    // Lấy số lượng đơn hàng chờ xử lý
    const { count: orderCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    setUnreadMessages(msgCount || 0);
    setPendingOrders(orderCount || 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-12">
        <Link href="/admin/dashboard" className="text-2xl font-serif font-bold tracking-tighter text-indigo-900">
          MAVIA
        </Link>
        
        <div className="relative w-72 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-80">
          <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-5 h-auto rounded-sm shadow-sm" />
        </div>

        <Link href="/admin/messages" className="relative cursor-pointer text-gray-500 hover:text-indigo-900 transition-colors">
          <Mail size={20} />
          {unreadMessages > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {unreadMessages > 99 ? '99+' : unreadMessages}
            </span>
          )}
        </Link>

        <Link href="/admin/orders" className="relative cursor-pointer text-gray-500 hover:text-indigo-900 transition-colors">
          <Bell size={20} />
          {pendingOrders > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {pendingOrders > 99 ? '99+' : pendingOrders}
            </span>
          )}
        </Link>

        <div className="relative">
          <div 
            className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-50 transition-transform group-hover:scale-105">
              <User className="text-indigo-600" size={20} />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-gray-800 leading-none truncate max-w-[120px]">
                {userEmail ? userEmail.split('@')[0] : 'Đang tải...'}
              </p>
              <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Administrator</p>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-gray-50 mb-2">
                <p className="text-xs font-bold text-gray-800 truncate">{userEmail}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
