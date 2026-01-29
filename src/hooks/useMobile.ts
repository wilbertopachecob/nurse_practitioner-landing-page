import { useState, useEffect } from 'react';
import { DESIGN } from '@/constants';
import type { UseMobileReturn } from '@/types';

/**
 * Custom hook to detect if the current viewport is mobile/tablet
 * @param breakpoint - Breakpoint in pixels (defaults to DESIGN.breakpoints.tablet)
 * @returns True if viewport width is less than or equal to breakpoint
 */
export const useMobile = (breakpoint: number = DESIGN.breakpoints.tablet): UseMobileReturn => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};
