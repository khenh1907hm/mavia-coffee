'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'maviacf') {
      alert('Đăng nhập thành công!');
      router.push('/admin/dashboard');
    } else {
      alert('Sai tài khoản hoặc mật khẩu!');
    }
  };

  // Color Constants (Fallback for Tailwind)
  const COFFEE_LIGHT = "#c4a484";
  const COFFEE_DARK = "#2c1810";

  return (
    <main className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden bg-[#1a0f0a]">
      {/* Background Hero Style */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000")' }}
      ></div>
      
      {/* Overlay Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/5 skew-x-12"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/5 -skew-x-12"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-white mb-2 tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              MAVIA
            </h1>
            <div className="h-0.5 w-12 mx-auto mb-4" style={{ backgroundColor: COFFEE_LIGHT }}></div>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: COFFEE_LIGHT }}>
              Management Portal
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">
                Tài khoản
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder:text-white/20 outline-none transition-all font-sans focus:border-white/40 focus:bg-white/15"
                placeholder="Admin username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest ml-1">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder:text-white/20 outline-none transition-all font-sans focus:border-white/40 focus:bg-white/15"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full font-black py-5 rounded-xl shadow-xl transform active:scale-[0.98] transition-all duration-300 tracking-[0.2em] mt-8 uppercase text-xs hover:brightness-110"
              style={{ backgroundColor: COFFEE_LIGHT, color: COFFEE_DARK }}
            >
              VÀO HỆ THỐNG
            </button>
          </form>
          
          <div className="mt-12 text-center">
            <p className="text-white/20 text-[9px] uppercase tracking-widest">
              &copy; 2024 Mavia Coffee Roastery &bull; Secured Access
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
