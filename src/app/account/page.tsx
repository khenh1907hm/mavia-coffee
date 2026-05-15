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
  Loader2,
  User as UserIcon,
  MapPin,
  Phone,
  Save
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  payment_method: string;
  customer_name: string;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }
      
      setUser(user);
      setFormData({
        fullName: user.user_metadata.full_name || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || ''
      });

      // Fetch orders
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

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address
        }
      });

      if (error) throw error;
      setUser(data.user);
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi cập nhật!');
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'Chờ xử lý', icon: <Clock size={14}/>, color: 'text-yellow-600 bg-yellow-50' };
      case 'paid': return { label: 'Đã thanh toán', icon: <CheckCircle2 size={14}/>, color: 'text-blue-600 bg-blue-50' };
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
          <p className="text-coffee-dark/60 font-bold uppercase tracking-widest text-xs">Đang tải thông tin...</p>
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
            <UserIcon size={64} className="text-coffee-light/20 mx-auto mb-6" />
            <h1 className="text-2xl font-serif font-black text-coffee-dark mb-4 uppercase">Bạn chưa đăng nhập</h1>
            <p className="text-gray-500 mb-8">Vui lòng đăng nhập để xem thông tin tài khoản.</p>
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
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Sidebar */}
            <aside className="w-full md:w-1/4">
              <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-coffee-light/10 text-coffee-light flex items-center justify-center overflow-hidden">
                    {user.user_metadata.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={32} />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-coffee-dark">{user.user_metadata.full_name || 'Khách hàng'}</h2>
                    <p className="text-xs text-gray-400 truncate w-32">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${activeTab === 'profile' ? 'bg-coffee-dark text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <UserIcon size={18} />
                    Thông tin cá nhân
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-sm ${activeTab === 'orders' ? 'bg-coffee-dark text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <ShoppingBag size={18} />
                    Lịch sử đơn hàng
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              
              {activeTab === 'profile' && (
                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 animate-in fade-in duration-500">
                  <h1 className="text-3xl font-serif font-black text-coffee-dark uppercase tracking-tighter mb-8">Thông tin cá nhân</h1>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-coffee-dark/60 uppercase tracking-widest">Họ và tên</label>
                      <input 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light outline-none" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-coffee-dark/60 uppercase tracking-widest flex items-center gap-2"><Phone size={14}/> Số điện thoại</label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light outline-none" 
                        placeholder="Thêm số điện thoại của bạn"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-coffee-dark/60 uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Địa chỉ giao hàng mặc định</label>
                      <textarea 
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light outline-none resize-none" 
                        placeholder="Thêm địa chỉ giao hàng của bạn để thanh toán nhanh hơn"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-coffee-dark text-white px-8 py-4 rounded-2xl font-black uppercase hover:bg-coffee-medium transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                      {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      LƯU THÔNG TIN
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="animate-in fade-in duration-500">
                  <h1 className="text-3xl font-serif font-black text-coffee-dark uppercase tracking-tighter mb-8">Lịch sử đơn hàng</h1>
                  
                  {orders.length === 0 ? (
                    <div className="bg-white p-20 rounded-[40px] shadow-sm border border-gray-100 text-center">
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
                            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
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
                                {/* Optional: View Order Details Button */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
