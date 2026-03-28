import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions extends IntersectionObserverInit {
  once?: boolean;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { once = true, ...observerOptions } = options;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.1,
      ...observerOptions
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [once, observerOptions]);

  return elementRef;
};
