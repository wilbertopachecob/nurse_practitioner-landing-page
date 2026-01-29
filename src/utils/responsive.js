import { DESIGN } from '@/constants';

/**
 * Responsive breakpoint constants
 */
export const BREAKPOINTS = {
  tablet: DESIGN.breakpoints.tablet,
  mobile: DESIGN.breakpoints.mobile,
  small: DESIGN.breakpoints.small,
};

/**
 * Media query helper functions
 * @param {number} breakpoint - Breakpoint in pixels
 * @returns {string} - Media query string
 */
export const mediaQuery = {
  maxWidth: (breakpoint) => `@media (max-width: ${breakpoint}px)`,
  minWidth: (breakpoint) => `@media (min-width: ${breakpoint}px)`,
};

/**
 * Check if current viewport matches breakpoint
 * @param {number} breakpoint - Breakpoint in pixels
 * @returns {boolean} - True if viewport width is less than or equal to breakpoint
 */
export const isMobileViewport = (breakpoint = BREAKPOINTS.tablet) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= breakpoint;
};
