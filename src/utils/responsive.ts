import { DESIGN } from '@/constants';

/**
 * Responsive breakpoint constants
 */
export const BREAKPOINTS = {
  tablet: DESIGN.breakpoints.tablet,
  mobile: DESIGN.breakpoints.mobile,
  small: DESIGN.breakpoints.small,
} as const;

/**
 * Media query helper functions
 * @param breakpoint - Breakpoint in pixels
 * @returns Media query string
 */
export const mediaQuery = {
  maxWidth: (breakpoint: number): string => `@media (max-width: ${breakpoint}px)`,
  minWidth: (breakpoint: number): string => `@media (min-width: ${breakpoint}px)`,
};

/**
 * Check if current viewport matches breakpoint
 * @param breakpoint - Breakpoint in pixels
 * @returns True if viewport width is less than or equal to breakpoint
 */
export const isMobileViewport = (breakpoint: number = BREAKPOINTS.tablet): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= breakpoint;
};
