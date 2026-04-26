'use client';

import Link from 'next/link';
import { AlertCircle, ChevronLeft } from 'lucide-react';

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        
        <h1 className="text-2xl font-black text-coffee-dark mb-4 uppercase tracking-tighter">
          Xác thực thất bại
        </h1>
        
        <p className="text-coffee-dark/60 mb-8 leading-relaxed">
          Đã có lỗi xảy ra trong quá trình đăng nhập bằng Google. Vui lòng kiểm tra lại cấu hình Client ID và Secret hoặc thử lại sau.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-dark text-white rounded-full font-bold uppercase text-[12px] tracking-widest hover:bg-coffee-light transition-all shadow-xl shadow-coffee-dark/10"
        >
          <ChevronLeft size={18} />
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
