'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, FileText, Settings, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tổng quan', icon: <LayoutDashboard size={20} />, href: '/admin/dashboard' },
    { name: 'Sản phẩm', icon: <Coffee size={20} />, href: '/admin/products' },
    { name: 'Bài viết', icon: <FileText size={20} />, href: '/admin/posts' },
    { name: 'Cài đặt', icon: <Settings size={20} />, href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-coffee-dark h-screen sticky top-0 text-white flex flex-col p-6 shadow-xl">
      <div className="mb-10 text-2xl font-serif font-bold tracking-widest text-coffee-light">
        MAVIA ADMIN
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                isActive ? 'bg-coffee-light text-coffee-dark font-bold' : 'hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto border-t border-white/10 pt-6">
        <Link 
          href="/" 
          className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span>Thoát Admin</span>
        </Link>
      </div>
    </aside>
  );
}
