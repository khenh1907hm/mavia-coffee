'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, FileText, Mail, Package, Settings, Grid } from 'lucide-react';

export default function AdminNavbarSub() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={16} />, href: '/admin/dashboard' },
    { name: 'Đơn hàng', icon: <Package size={16} />, href: '/admin/orders' },
    { name: 'Sản phẩm', icon: <Coffee size={16} />, href: '/admin/products' },
    { name: 'Bài viết', icon: <FileText size={16} />, href: '/admin/posts' },
    { name: 'Tin nhắn', icon: <Mail size={16} />, href: '/admin/messages' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-16 z-40 border-b border-gray-100 py-3 px-6 lg:px-10">
      <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-coffee-dark text-white shadow-md shadow-coffee-dark/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-coffee-dark'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
