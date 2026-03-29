'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, FileText, Settings, Layers, Grid, Palette, Mail, Package } from 'lucide-react';

export default function AdminNavbarSub() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/admin/dashboard' },
    { name: 'Products', icon: <Coffee size={18} />, href: '/admin/products' },
    { name: 'Articles', icon: <FileText size={18} />, href: '/admin/posts' },
    { name: 'Orders', icon: <Package size={18} />, href: '/admin/orders' },
    { name: 'Messages', icon: <Mail size={18} />, href: '/admin/messages' },
    { name: 'Advanced UI', icon: <Layers size={18} />, href: '/admin/ui' },
    { name: 'User Interface', icon: <Palette size={18} />, href: '/admin/interface' },
    { name: 'Components', icon: <Grid size={18} />, href: '/admin/components' },
    { name: 'Settings', icon: <Settings size={18} />, href: '/admin/settings' },
  ];

  return (
    <div className="bg-white h-14 flex items-center px-8 shadow-sm sticky top-16 z-40 overflow-x-auto no-scrollbar whitespace-nowrap border-b border-gray-100">
      <nav className="flex items-center h-full">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center h-full gap-3 px-6 text-sm font-semibold transition-all border-b-2 ${
                isActive 
                  ? 'text-coffee-dark border-coffee-dark bg-gray-50' 
                  : 'text-gray-500 border-transparent hover:text-coffee-dark hover:bg-gray-50/50'
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
