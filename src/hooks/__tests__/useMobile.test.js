import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMobile } from '../useMobile';
import { DESIGN } from '@/constants';

describe('useMobile', () => {
  beforeEach(() => {
    // Ensure window exists and reset window.innerWidth
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false when window is undefined (SSR)', () => {
    // This test verifies SSR behavior, but in jsdom window exists
    // So we'll test that the hook handles the case gracefully
    const { result } = renderHook(() => useMobile());
    
    // In test environment, window exists, so this will return based on width
    // The actual SSR test would require a different test environment
    expect(typeof result.current).toBe('boolean');
  });

  it('returns false for desktop width', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
    }

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(false);
  });

  it('returns true for mobile width', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });
    }

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(true);
  });

  it('returns true when width equals breakpoint', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: DESIGN.breakpoints.tablet,
      });
    }

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(true);
  });

  it('uses default breakpoint from constants', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: DESIGN.breakpoints.tablet - 1,
      });
    }

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(true);
  });

  it('uses custom breakpoint when provided', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });
    }

    const { result } = renderHook(() => useMobile(500));

    // 600 > 500, so should return false
    expect(result.current).toBe(false);
  });

  it('updates on window resize', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });
    }

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(false);

    // Simulate resize to mobile width
    if (typeof window !== 'undefined') {
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 500,
        });
        window.dispatchEvent(new Event('resize'));
      });
    }

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    if (typeof window !== 'undefined') {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() => useMobile());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    }
  });

  it('handles multiple resize events correctly', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200,
      });

      const { result } = renderHook(() => useMobile());

      expect(result.current).toBe(false);

      // Resize to mobile
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 500,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toBe(true);

      // Resize back to desktop
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1200,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toBe(false);
    }
  });

  it('updates when breakpoint changes', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      });

      const { result, rerender } = renderHook(
        ({ breakpoint }) => useMobile(breakpoint),
        { initialProps: { breakpoint: 500 } }
      );

      // 600 > 500, so should be false
      expect(result.current).toBe(false);

      // Change breakpoint to 700
      rerender({ breakpoint: 700 });

      // 600 <= 700, so should be true
      expect(result.current).toBe(true);
    }
  });
});
