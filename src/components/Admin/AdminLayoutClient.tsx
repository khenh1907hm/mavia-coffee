'use client';

import { useState } from 'react';
import ModernSidebar from './ModernSidebar';
import ModernHeader from './ModernHeader';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout flex bg-[#f4f7f9] min-h-screen font-poppins selection:bg-coffee-light/20">
      <ModernSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Dynamic Spacer based on collapsed state */}
      <div className={`${collapsed ? 'w-20' : 'w-72'} flex-shrink-0 transition-all duration-300 hidden lg:block`}></div>
      <div className="w-20 flex-shrink-0 lg:hidden"></div> {/* Mobile spacer */}

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <ModernHeader />
        
        <div className="p-8 lg:p-12 max-w-[1600px] w-full mx-auto">
          <main className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
