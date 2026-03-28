'use client';

import { usePathname } from 'next/navigation';
import FloatingContact from './FloatingContact';

export default function FloatingContactWrapper() {
  const pathname = usePathname();
  
  // Hide on admin and login routes
  const isHiddenRoute = pathname?.startsWith('/admin') || pathname === '/login';
  
  if (isHiddenRoute) return null;
  
  return <FloatingContact />;
}
