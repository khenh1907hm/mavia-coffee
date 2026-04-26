'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { sendZaloContactNotification } from '@/utils/notifications';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Cần thêm thông tin',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;
      
      // Send Zalo Notification
      await sendZaloContactNotification(formData);
      
      setSubmitted(true);
    } catch (error: any) {
      alert('Có lỗi xảy ra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#fdfcf9] min-h-screen font-inter">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-coffee-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/coffee-beans.png')]"></div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-widest font-serif italic">
            Liên hệ Mavia
          </h1>
          <p className="text-lg text-coffee-cream/70 max-w-2xl mx-auto font-medium">
            Hãy để lại lời nhắn, Mavia luôn sẵn sàng lắng nghe và đồng hành cùng hành trình thưởng thức cà phê của bạn.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-coffee-dark mb-8 flex items-center gap-4">
                  <span className="w-12 h-[2px] bg-coffee-light"></span>
                  Thông tin liên hệ
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-coffee-cream flex items-center justify-center text-coffee-light group-hover:bg-coffee-dark group-hover:text-white transition-all duration-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-coffee-dark uppercase tracking-widest text-xs mb-2">Địa chỉ rang xay</h4>
                      <p className="text-gray-600 leading-relaxed font-medium">123 Đường Cà Phê, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-coffee-cream flex items-center justify-center text-coffee-light group-hover:bg-coffee-dark group-hover:text-white transition-all duration-500">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-coffee-dark uppercase tracking-widest text-xs mb-2">Hotline hỗ trợ</h4>
                      <p className="text-gray-600 leading-relaxed font-bold text-lg">+84 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-coffee-cream flex items-center justify-center text-coffee-light group-hover:bg-coffee-dark group-hover:text-white transition-all duration-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-coffee-dark uppercase tracking-widest text-xs mb-2">Email phản hồi</h4>
                      <p className="text-gray-600 leading-relaxed font-medium">hello@maviacoffee.vn</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map Box */}
              <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-white h-[350px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.3311769759066!2d108.37976557430059!3d11.750177640480127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317141c6f5f9af2d%3A0xd8acbbc8fa279b38!2sMavia%20coffee!5e1!3m2!1svi!2s!4v1774790791832!5m2!1svi!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-12 md:p-16 rounded-[50px] shadow-xl shadow-coffee-dark/5 border border-coffee-cream relative overflow-hidden">
                {submitted ? (
                  <div className="text-center py-20 space-y-6 animate-fade-in">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-coffee-dark italic">Cảm ơn bạn đã gửi tin!</h3>
                    <p className="text-gray-500 font-medium">Lời nhắn của bạn đã được tiếp nhận. Đội ngũ Mavia sẽ phản hồi sớm nhất có thể.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-coffee-light font-bold uppercase tracking-widest text-xs hover:underline pt-10"
                    >
                      Gửi thêm tin nhắn khác
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-12">
                      <h3 className="text-3xl font-serif font-bold text-coffee-dark mb-4 italic">Gửi lời nhắn cho chúng tôi</h3>
                      <p className="text-gray-500 font-medium">Điền thông tin bên dưới, chúng tôi sẽ sớm liên hệ lại với bạn.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-dark/60 ml-1">Họ và Tên</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-coffee-light focus:bg-white transition-all font-medium"
                            placeholder="Tên của bạn..."
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-dark/60 ml-1">Email</label>
                          <input 
                            required
                            type="email" 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-coffee-light focus:bg-white transition-all font-medium"
                            placeholder="Email liên hệ..."
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-dark/60 ml-1">Số điện thoại</label>
                          <input 
                            required
                            type="tel" 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-coffee-light focus:bg-white transition-all font-medium"
                            placeholder="09xx xxx xxx"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-dark/60 ml-1">Chủ đề</label>
                          <select 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-coffee-light focus:bg-white transition-all font-medium appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          >
                            <option value="Đặt hàng số lượng lớn">Đặt hàng số lượng lớn</option>
                            <option value="Cần thêm thông tin">Cần thêm thông tin</option>
                            <option value="Găp mặt">Gặp mặt</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-dark/60 ml-1">Nội dung</label>
                        <textarea 
                          required
                          rows={5}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-coffee-light focus:bg-white transition-all font-medium resize-none leading-relaxed"
                          placeholder="Nhập lời nhắn của bạn tại đây..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      <button 
                        disabled={loading}
                        type="submit"
                        className="w-full py-5 bg-coffee-dark text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-coffee-medium transition-all shadow-xl shadow-coffee-dark/20 active:scale-95 disabled:opacity-50 mt-4"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        <span>{loading ? 'Đang gửi...' : 'Gửi yêu cầu'}</span>
                      </button>
                    </form>
                  </>
                )}

                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coffee-cream opacity-20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
