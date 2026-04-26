'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, CreditCard, Truck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { sendZaloOrderNotification } from '@/utils/notifications';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr'>('vietqr');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    note: ''
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata.full_name || prev.name,
          email: user.email || prev.email
        }));
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);

    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          customer_email: formData.email,
          note: formData.note,
          payment_method: paymentMethod,
          total_amount: cartTotal,
          status: 'pending',
          user_id: user?.id || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        weight: item.weight
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Send Zalo Notification
      await sendZaloOrderNotification(order, orderItems);

      setOrderId(order.id);
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // If order is success
  if (orderId) {
    return (
      <main className="min-h-screen bg-[#fdfcf9]">
        <Header />
        <section className="pt-40 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h1 className="text-4xl font-serif font-black text-coffee-dark mb-4 uppercase">Đặt hàng thành công!</h1>
            <p className="text-gray-500 mb-8 font-medium">Cảm ơn bạn đã tin tưởng Mavia Coffee. Mã đơn hàng của bạn là: <span className="text-coffee-dark font-bold">#{orderId.split('-')[0].toUpperCase()}</span></p>
            
            {paymentMethod === 'vietqr' && (
              <div className="bg-gray-50 p-8 rounded-3xl mb-8 border border-gray-100">
                <h3 className="text-lg font-bold text-coffee-dark mb-4">Quét mã VietQR để hoàn tất thanh toán</h3>
                <div className="flex justify-center mb-6">
                  {/* GENERATE VIETQR IMAGE (Mocked for now, need user bank details later) */}
                  <Image 
                    src={`https://img.vietqr.io/image/970415-102870425946-compact2.jpg?amount=${cartTotal}&addInfo=ORDER%20${orderId.split('-')[0].toUpperCase()}&accountName=MAVIA%20COFFEE`} 
                    alt="VietQR" 
                    width={300} 
                    height={300} 
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <p className="text-xs text-gray-400">Giao dịch được mã hóa an toàn 256-bit</p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/" className="bg-coffee-dark text-white px-8 py-4 rounded-2xl font-black uppercase hover:bg-coffee-medium transition-all">
                VỀ TRANG CHỦ
              </Link>
              <Link href="/products" className="bg-white border-2 border-coffee-dark text-coffee-dark px-8 py-4 rounded-2xl font-black uppercase hover:bg-gray-50 transition-all">
                TIẾP TỤC MUA SẮM
              </Link>
            </div>
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
          <h1 className="text-4xl font-serif font-black text-coffee-dark uppercase tracking-tighter mb-12">Thanh toán</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 bg-coffee-dark text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Thông tin giao hàng
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-coffee-dark/60 uppercase tracking-widest">Họ và tên</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light transition-all outline-none" 
                      placeholder="Nguyễn Văn A" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-coffee-dark/60 uppercase tracking-widest">Số điện thoại</label>
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light transition-all outline-none" 
                      placeholder="0912 345 678" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-coffee-dark/60 uppercase tracking-widest">Địa chỉ chi tiết</label>
                    <input 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light transition-all outline-none" 
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-coffee-dark/60 uppercase tracking-widest">Email (Tùy chọn)</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light transition-all outline-none" 
                      placeholder="example@gmail.com" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-coffee-dark/60 uppercase tracking-widest">Ghi chú (Tùy chọn)</label>
                    <textarea 
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-coffee-light transition-all outline-none resize-none" 
                      placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..." 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 bg-coffee-dark text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Hình thức thanh toán
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('vietqr')}
                    className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${paymentMethod === 'vietqr' ? 'border-coffee-light bg-coffee-light/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`p-3 rounded-2xl ${paymentMethod === 'vietqr' ? 'bg-coffee-light text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <CreditCard size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-coffee-dark">Chuyển khoản VietQR</p>
                      <p className="text-xs text-gray-500">Nhanh chóng & An toàn</p>
                    </div>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-coffee-light bg-coffee-light/5 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`p-3 rounded-2xl ${paymentMethod === 'cod' ? 'bg-coffee-light text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <Truck size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-coffee-dark">Tiền mặt (COD)</p>
                      <p className="text-xs text-gray-500">Thanh toán khi nhận hàng</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl border border-gray-100 sticky top-40">
                <h2 className="text-2xl font-serif font-bold text-coffee-dark mb-8 pb-4 border-b border-gray-100 uppercase tracking-widest text-center">Tóm tắt đơn hàng</h2>
                
                <div className="max-h-[300px] overflow-y-auto mb-8 pr-2 space-y-4 no-scrollbar">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.weight}`} className="flex justify-between items-center gap-4 py-2">
                       <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl relative overflow-hidden flex-shrink-0">
                          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-coffee-dark leading-tight">{item.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.quantity}x {item.weight}</p>
                        </div>
                       </div>
                       <p className="font-bold text-coffee-dark text-sm">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                       </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-500 font-bold uppercase text-[10px]">Miễn phí</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <span className="text-lg font-bold text-coffee-dark">Tổng cộng</span>
                    <span className="text-3xl font-black text-coffee-dark">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}
                    </span>
                  </div>
                </div>

                <button 
                  disabled={loading || cart.length === 0}
                  className="w-full bg-coffee-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-coffee-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-coffee-dark/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      ĐANG XỬ LÝ...
                    </>
                  ) : 'XÁC NHẬN ĐẶT HÀNG'}
                </button>
                
                <p className="text-center mt-6 text-gray-300 text-[10px] font-bold uppercase tracking-wider">
                  Mavia Coffee cam kết bảo mật thông tin
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
