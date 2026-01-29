import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMobile } from '@/hooks/useMobile';

describe('useMobile', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 1024,
      });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false for desktop viewport', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useMobile());
      expect(result.current).toBe(false);
    }
  });

  it('returns true for mobile viewport', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500,
      });

      const { result } = renderHook(() => useMobile());
      expect(result.current).toBe(true);
    }
  });

  it('updates on window resize', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 1024,
      });

      const { result, rerender } = renderHook(() => useMobile());
      expect(result.current).toBe(false);

      // Simulate resize
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500,
      });

      window.dispatchEvent(new Event('resize'));
      rerender();

      expect(result.current).toBe(true);
    }
  });

  it('uses custom breakpoint', () => {
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 600,
      });

      const { result } = renderHook(() => useMobile(500));
      expect(result.current).toBe(false);
    }
  });
});
