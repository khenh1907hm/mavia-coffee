'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  ChevronRight,
  Package,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  payment_method: string;
  customer_name: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  weight: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }
      
      setUser(user);

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'Chờ xử lý', icon: <Clock size={14}/>, color: 'text-yellow-600 bg-yellow-50' };
      case 'processing': return { label: 'Đang giao', icon: <Truck size={14}/>, color: 'text-blue-600 bg-blue-50' };
      case 'delivered': return { label: 'Hoàn thành', icon: <CheckCircle2 size={14}/>, color: 'text-green-600 bg-green-50' };
      case 'cancelled': return { label: 'Đã hủy', icon: <XCircle size={14}/>, color: 'text-red-600 bg-red-50' };
      default: return { label: status, icon: <Package size={14}/>, color: 'text-gray-600 bg-gray-50' };
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdfcf9]">
        <Header />
        <div className="pt-40 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-coffee-light mb-4" size={40} />
          <p className="text-coffee-dark/60 font-bold uppercase tracking-widest text-xs">Đang tải lịch sử đơn hàng...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#fdfcf9]">
        <Header />
        <div className="pt-40 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100">
            <ShoppingBag size={64} className="text-coffee-light/20 mx-auto mb-6" />
            <h1 className="text-2xl font-serif font-black text-coffee-dark mb-4 uppercase">Bạn chưa đăng nhập</h1>
            <p className="text-gray-500 mb-8">Vui lòng đăng nhập để xem lịch sử đơn hàng của mình.</p>
            <Link href="/" className="inline-block bg-coffee-dark text-white px-8 py-4 rounded-2xl font-black uppercase hover:bg-coffee-medium transition-all">
              VỀ TRANG CHỦ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfcf9]">
      <Header />
      
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <Link href="/" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-coffee-dark hover:bg-coffee-dark hover:text-white transition-all">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-4xl font-serif font-black text-coffee-dark uppercase tracking-tighter">Lịch sử đơn hàng</h1>
              <p className="text-gray-500 font-medium">Chào {user.user_metadata.full_name || 'bạn'}, đây là danh sách các đơn hàng của bạn.</p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white p-20 rounded-[40px] shadow-xl border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Bạn chưa có đơn hàng nào</h3>
              <p className="text-gray-400 mb-8">Hãy khám phá các loại cà phê đặc sản của chúng tôi ngay!</p>
              <Link href="/products" className="bg-coffee-dark text-white px-8 py-4 rounded-2xl font-black uppercase hover:bg-coffee-medium transition-all">
                ĐI MUA SẮM NGAY
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => {
                const status = getStatusInfo(order.status);
                return (
                  <div key={order.id} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-coffee-light/20 transition-all group">
                    <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-coffee-light group-hover:bg-coffee-light group-hover:text-white transition-all">
                          <Package size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono text-gray-400">#{order.id.split('-')[0].toUpperCase()}</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${status.color}`}>
                              {status.icon} {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 font-medium">
                            Đặt ngày {new Date(order.created_at).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-10">
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Tổng cộng</p>
                          <p className="text-xl font-black text-coffee-dark">{formatPrice(order.total_amount)}</p>
                        </div>
                        <div className="p-3 bg-gray-50 text-gray-400 rounded-full group-hover:bg-coffee-dark group-hover:text-white transition-all">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
