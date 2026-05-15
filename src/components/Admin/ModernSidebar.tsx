'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Coffee, FileText, Mail, Package, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function ModernSidebar({ 
  collapsed, 
  setCollapsed 
}: { 
  collapsed: boolean; 
  setCollapsed: (val: boolean) => void; 
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Tổng quan', icon: <LayoutDashboard size={20} />, href: '/admin/dashboard' },
    { name: 'Đơn hàng', icon: <Package size={20} />, href: '/admin/orders' },
    { name: 'Sản phẩm', icon: <Coffee size={20} />, href: '/admin/products' },
    { name: 'Bài viết', icon: <FileText size={20} />, href: '/admin/posts' },
    { name: 'Tin nhắn', icon: <Mail size={20} />, href: '/admin/messages' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className={`bg-[#0f172a] text-white transition-all duration-300 ease-in-out flex flex-col fixed inset-y-0 left-0 z-50 shadow-2xl font-poppins ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        {!collapsed && (
          <Link href="/admin/dashboard" className="text-3xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-coffee-light to-amber-200">
            MAVIA
          </Link>
        )}
        {collapsed && <span className="text-2xl font-black text-coffee-light mx-auto">M</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/50 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-8 px-4 no-scrollbar flex flex-col gap-2">
        <p className={`text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4 pl-2 ${collapsed ? 'hidden' : 'block'}`}>
          Menu Quản Lý
        </p>
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-coffee-dark to-coffee-dark/80 text-coffee-light shadow-lg shadow-coffee-dark/30'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
              title={collapsed ? item.name : ''}
            >
              <div className={`${isActive ? 'scale-110 text-coffee-light' : 'group-hover:scale-110 group-hover:text-coffee-light'} transition-all duration-300`}>
                {item.icon}
              </div>
              {!collapsed && <span className="text-sm tracking-wide">{item.name}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 group`}
          title={collapsed ? 'Đăng xuất' : ''}
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          {!collapsed && <span className="text-sm tracking-wide">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
