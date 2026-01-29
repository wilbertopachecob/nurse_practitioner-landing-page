import { useState, useEffect } from 'react';
import { DESIGN } from '@/constants';

/**
 * Custom hook to detect if the current viewport is mobile/tablet
 * @param {number} breakpoint - Breakpoint in pixels (defaults to DESIGN.breakpoints.tablet)
 * @returns {boolean} - True if viewport width is less than or equal to breakpoint
 */
export const useMobile = (breakpoint = DESIGN.breakpoints.tablet) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};
