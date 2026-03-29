'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#fdfcf9]">
        <Header />
        <section className="pt-40 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-coffee-dark mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá và chọn cho mình hương vị yêu thích nhé!</p>
            <Link href="/products" className="inline-block bg-coffee-dark text-white px-8 py-4 rounded-full font-bold hover:bg-coffee-medium transition-all">
              KHÁM PHÁ SẢN PHẨM
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf9]">
      <Header />
      
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <Link href="/products" className="p-2 hover:bg-white rounded-full transition-all text-coffee-dark">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-4xl font-serif font-black text-coffee-dark uppercase tracking-tighter">Giỏ hàng của bạn</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* List Table */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.weight}`} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-all">
                  <div className="w-32 h-32 relative rounded-2xl overflow-hidden bg-gray-50">
                    <Image 
                      src={item.image_url || '/placeholder-coffee.jpg'} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-all duration-700" 
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-serif font-bold text-coffee-dark mb-1">{item.name}</h3>
                    <p className="text-coffee-light text-sm font-bold mb-2 uppercase tracking-widest">{item.weight}</p>
                    <p className="text-lg font-bold text-coffee-dark">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl">
                    <button 
                      onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                      className="text-coffee-dark hover:text-coffee-light transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                      className="text-coffee-dark hover:text-coffee-light transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="text-right min-w-[120px]">
                    <p className="text-xl font-black text-coffee-dark">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                    </p>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.weight)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-coffee-dark p-8 md:p-10 rounded-[40px] text-white shadow-2xl sticky top-40">
                <h2 className="text-2xl font-serif font-bold mb-8 pb-4 border-b border-white/10 uppercase tracking-widest">Tổng đơn hàng</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white/60">
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Phí vận chuyển</span>
                    <span className="italic text-xs">Tính khi thanh toán</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-lg font-bold">Tổng cộng</span>
                    <span className="text-3xl font-black text-coffee-light">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}
                    </span>
                  </div>
                </div>

                <Link 
                  href="/checkout" 
                  className="w-full bg-coffee-light text-white text-center py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-coffee-dark transition-all block shadow-lg shadow-coffee-light/20"
                >
                  TIẾN HÀNH THANH TOÁN
                </Link>
                
                <p className="text-center mt-6 text-white/40 text-xs">
                  Sẵn sàng trải nghiệm hương vị cà phê tuyệt hảo nhất?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
