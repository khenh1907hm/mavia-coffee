'use client';

import { Search, Bell, Mail, User } from 'lucide-react';
import Image from 'next/image';

export default function AdminNavbarTop() {
  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-12">
        <div className="text-2xl font-serif font-bold tracking-tighter text-indigo-900">
          MAVIA
        </div>
        
        <div className="relative w-72 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-xs outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-80">
          <img src="https://flagcdn.com/w40/us.png" alt="US" className="w-5 h-auto rounded-sm shadow-sm" />
        </div>

        <div className="relative cursor-pointer text-gray-500 hover:text-indigo-900 transition-colors">
          <Mail size={20} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">5</span>
        </div>

        <div className="relative cursor-pointer text-gray-500 hover:text-indigo-900 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">21</span>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-50 transition-transform group-hover:scale-105">
            <User className="text-indigo-600" size={20} />
          </div>
          <div className="hidden lg:block">
            <p className="text-xs font-bold text-gray-800 leading-none">Minh Hoang</p>
            <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
