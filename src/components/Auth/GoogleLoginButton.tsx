'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { LogIn, LogOut, User as UserIcon, Loader2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GoogleLoginButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Đăng nhập thất bại, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="p-2 text-coffee-dark/40 animate-pulse">
        <Loader2 size={22} className="animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-coffee-dark/5 transition-all focus:outline-none"
        >
          {user.user_metadata.avatar_url ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-coffee-light/20 shadow-sm shadow-coffee-light/10">
              <Image 
                src={user.user_metadata.avatar_url} 
                alt={user.user_metadata.full_name || 'User'} 
                width={32} 
                height={32}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-coffee-light/10 flex items-center justify-center text-coffee-light">
              <UserIcon size={18} />
            </div>
          )}
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-coffee-dark/5 py-3 z-20 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="px-4 py-2 border-b border-coffee-dark/5 mb-2">
                <p className="text-[12px] font-black text-coffee-dark truncate">
                  {user.user_metadata.full_name || 'Khách hàng'}
                </p>
                <p className="text-[10px] text-coffee-dark/50 truncate">
                  {user.email}
                </p>
              </div>

              <Link
                href="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-coffee-dark hover:bg-gray-50 transition-all border-b border-gray-50 mb-1"
              >
                <ShoppingBag size={16} className="text-coffee-light" />
                Đơn hàng của tôi
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-bold text-red-500 hover:bg-red-50 transition-all text-left"
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-dark text-white hover:bg-coffee-light transition-all shadow-lg shadow-coffee-dark/10 hover:shadow-coffee-light/20 disabled:opacity-50"
    >
      <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
      <span className="text-[11px] font-black uppercase tracking-wider hidden md:inline">Đăng nhập</span>
    </button>
  );
}
