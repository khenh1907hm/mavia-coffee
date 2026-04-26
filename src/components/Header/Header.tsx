'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import GoogleLoginButton from '@/components/Auth/GoogleLoginButton';

const Header = () => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Hướng dẫn pha', href: '/brewing-guide' },
    { name: 'Blog', href: '/blog' },
    { name: 'Giới thiệu', href: '/our-story' },
    { name: 'Liên hệ', href: '/contact' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-coffee-dark/5 py-3 shadow-lg' 
            : 'bg-white/30 backdrop-blur-md border-white/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2 group">
              <Link href="/" className="font-serif text-2xl font-black text-coffee-dark tracking-tighter transition-all group-hover:tracking-normal">
                MAVIA COFFEE
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
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

            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/cart" className="relative group p-2 text-coffee-dark hover:scale-110 transition-all">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-coffee-light text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-coffee-light/40 animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>

              <GoogleLoginButton />

              {/* Mobile Menu Toggle Button */}
              <button 
                className="md:hidden p-2 text-coffee-dark hover:scale-110 transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay - Full Screen */}
      <div 
        className={`md:hidden fixed inset-0 w-full h-full z-[1001] transition-all duration-500 ease-in-out bg-white/98 backdrop-blur-2xl flex flex-col ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Mobile Menu Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-coffee-dark/5">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-serif text-2xl font-black text-coffee-dark">
            MAVIA COFFEE
          </Link>
          <button 
            className="p-2 text-coffee-dark"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Nav Links */}
        <div className="flex-1 overflow-y-auto px-6 py-10">
          <nav className="flex flex-col gap-8 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[18px] font-black uppercase tracking-[0.2em] text-coffee-dark/80 hover:text-coffee-dark transition-all flex items-center justify-between group"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <span className="w-10 h-[1px] bg-coffee-light/30 group-hover:w-full transition-all duration-500"></span>
              </Link>
            ))}
          </nav>

          {/* Support Section */}
          <div className="mt-auto pt-10 border-t border-coffee-dark/10">
            <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-coffee-light mb-8">Bạn cần hỗ trợ?</h3>
            <div className="flex flex-col gap-6">
              <a href="tel:0867086128" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-coffee-light/5 flex items-center justify-center text-coffee-light group-hover:bg-coffee-light group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-coffee-dark/40 uppercase font-bold tracking-widest">Liên hệ</span>
                  <span className="text-[14px] font-bold text-coffee-dark">0867086128</span>
                </div>
              </a>

              <a href="mailto:hoanghuy4991@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-coffee-light/5 flex items-center justify-center text-coffee-light group-hover:bg-coffee-light group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-coffee-dark/40 uppercase font-bold tracking-widest">Email</span>
                  <span className="text-[14px] font-bold text-coffee-dark">hoanghuy4991@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-coffee-light/5 flex items-center justify-center text-coffee-light group-hover:bg-coffee-light group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-coffee-dark/40 uppercase font-bold tracking-widest">Địa chỉ</span>
                  <span className="text-[14px] font-bold text-coffee-dark leading-relaxed">200 Quốc Lộ 20, Xã Đức Trọng, tỉnh Lâm Đồng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
