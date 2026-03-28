'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ReactNode, HTMLAttributes } from 'react';

/**
 * ScrollReveal Component
 * Provides various fade and slide animations when the component enters the viewport.
 * 
 * @param effect - Animation direction style ('fade' | 'up' | 'down' | 'left' | 'right' | 'scale')
 * @param delay - Delay in milliseconds (multiples of 100 up to 1000)
 * @param duration - (Optional) custom duration via inline style
 * @param once - If true, the animation only plays the first time it enters the viewport
 */

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  effect?: 'fade' | 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number; // 100, 200, ..., 1000
  duration?: number; // in seconds, e.g. 0.8
  once?: boolean;
}

const ScrollReveal = ({ 
  children, 
  effect = 'fade', 
  delay = 0, 
  duration,
  once = true,
  className = '',
  style,
  ...props 
}: ScrollRevealProps) => {
  const ref = useScrollReveal({ once });
  
  const effectClass = effect !== 'fade' ? `reveal-${effect}` : '';
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  
  const combinedStyles = {
    ...style,
    ...(duration ? { transitionDuration: `${duration}s` } : {})
  };

  return (
    <div 
      ref={ref as any} 
      className={`reveal ${effectClass} ${delayClass} ${className}`}
      style={combinedStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
