import { describe, it, expect, beforeEach, vi } from 'vitest';
import { scrollToSection } from '../scroll';
import { DESIGN } from '@/constants';

describe('scrollToSection', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.scrollTo = vi.fn();
    
    // Reset DOM
    document.body.innerHTML = '';
    
    // Create mock header with explicit offsetHeight
    const header = document.createElement('header');
    header.className = 'header';
    header.style.height = '80px';
    // Mock offsetHeight to ensure it's read correctly
    Object.defineProperty(header, 'offsetHeight', {
      configurable: true,
      value: 80,
    });
    document.body.appendChild(header);
  });

  it('scrolls to element when it exists', () => {
    // Create target element
    const target = document.createElement('div');
    target.id = 'test-section';
    target.style.height = '100px';
    document.body.appendChild(target);

    scrollToSection('test-section');

    expect(global.scrollTo).toHaveBeenCalledTimes(1);
    expect(global.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth',
    });
  });

  it('handles missing element gracefully', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    scrollToSection('non-existent-section');

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Element with id "non-existent-section" not found'
    );
    expect(global.scrollTo).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it('calculates correct offset with header height', () => {
    const target = document.createElement('div');
    target.id = 'test-section';
    document.body.appendChild(target);

    // Mock getBoundingClientRect - top is relative to viewport
    const mockRect = {
      top: 500,
    };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(mockRect);

    // Mock pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });

    scrollToSection('test-section');

    expect(global.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth',
    });

    // Verify the calculation includes header height and offset
    const callArgs = global.scrollTo.mock.calls[0][0];
    // Should subtract header height (80) and offset (20) from element position
    expect(callArgs.top).toBeLessThan(500); // Should be less than element position
    expect(callArgs.top).toBeGreaterThan(300); // Should account for header + offset
  });

  it('uses default offset from constants', () => {
    const target = document.createElement('div');
    target.id = 'test-section';
    document.body.appendChild(target);

    const mockRect = { top: 500 };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(mockRect);
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });

    scrollToSection('test-section');

    const callArgs = global.scrollTo.mock.calls[0][0];
    // Should use DESIGN.scrollOffset (20) by default
    expect(callArgs.top).toBe(500 - 80 - DESIGN.scrollOffset);
  });

  it('uses custom offset when provided', () => {
    const target = document.createElement('div');
    target.id = 'test-section';
    document.body.appendChild(target);

    const mockRect = { top: 500 };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(mockRect);
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });

    scrollToSection('test-section', 50);

    const callArgs = global.scrollTo.mock.calls[0][0];
    // Should use custom offset (50) instead of default (20)
    expect(callArgs.top).toBe(500 - 80 - 50);
  });

  it('handles missing header gracefully', () => {
    // Remove header
    const header = document.querySelector('.header');
    if (header) {
      header.remove();
    }

    const target = document.createElement('div');
    target.id = 'test-section';
    document.body.appendChild(target);

    const mockRect = { top: 500 };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(mockRect);
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });

    scrollToSection('test-section');

    // Should still work, just with headerHeight = 0
    expect(global.scrollTo).toHaveBeenCalled();
    const callArgs = global.scrollTo.mock.calls[0][0];
    expect(callArgs.top).toBe(500 - 0 - DESIGN.scrollOffset);
  });

  it('handles non-zero pageYOffset', () => {
    const target = document.createElement('div');
    target.id = 'test-section';
    document.body.appendChild(target);

    // When scrolled 200px, element at document position 700 would have viewport position 500
    const mockRect = { top: 500 };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(mockRect);
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 200,
    });

    scrollToSection('test-section');

    const callArgs = global.scrollTo.mock.calls[0][0];
    // Calculation: elementPosition (viewport) + pageYOffset - headerHeight - offset
    // Should include pageYOffset in the calculation
    expect(callArgs.top).toBeGreaterThan(500); // Should be greater than viewport position
    expect(callArgs.top).toBeLessThan(700); // Should account for header + offset
  });
});
