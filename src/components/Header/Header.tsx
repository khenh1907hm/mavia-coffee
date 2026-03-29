'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 md:px-8 transition-all duration-500 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(44,24,16,0.12)] rounded-[40px] px-8 md:px-12 py-4 flex items-center justify-between transition-all hover:shadow-[0_12px_48px_0_rgba(44,24,16,0.18)] hover:bg-white/90">

          <div className="flex items-center gap-2 group">
            <Link href="/" className="font-serif text-2xl font-black text-coffee-dark tracking-tighter transition-all group-hover:tracking-normal">
              MAVIA COFFEE
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { name: 'Trang chủ', href: '/' },
              { name: 'Sản phẩm', href: '/products' },
              { name: 'Hướng dẫn pha', href: '/brewing-guide' },
              { name: 'Blog', href: '/blog' },
              { name: 'Giới thiệu', href: '/our-story' },
              { name: 'Liên hệ', href: '/contact' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-coffee-dark/60 hover:text-coffee-dark transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-coffee-light transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group p-2 text-coffee-dark hover:scale-110 transition-all">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-coffee-light text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-coffee-light/40 animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
