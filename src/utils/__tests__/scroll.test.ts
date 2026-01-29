import { describe, it, expect, beforeEach, vi } from 'vitest';
import { scrollToSection } from '@/utils/scroll';

describe('scrollToSection', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    window.pageYOffset = 0;

    // Create a mock header element
    const header = document.createElement('div');
    header.className = 'header';
    document.body.appendChild(header);
    Object.defineProperty(header, 'offsetHeight', {
      configurable: true,
      value: 80,
    });
  });

  it('scrolls to element with correct offset', () => {
    const element = document.createElement('div');
    element.id = 'test-section';
    document.body.appendChild(element);
    Object.defineProperty(element, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        top: 500,
        left: 0,
        bottom: 600,
        right: 0,
        width: 100,
        height: 100,
      }),
    });

    scrollToSection('test-section');

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 (top) + 0 (pageYOffset) - 80 (header) - 20 (offset)
      behavior: 'smooth',
    });
  });

  it('handles missing element gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    scrollToSection('non-existent');

    expect(consoleSpy).toHaveBeenCalledWith('Element with id "non-existent" not found');
    expect(window.scrollTo).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('uses custom offset when provided', () => {
    const element = document.createElement('div');
    element.id = 'test-section';
    document.body.appendChild(element);
    Object.defineProperty(element, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({
        top: 500,
        left: 0,
        bottom: 600,
        right: 0,
        width: 100,
        height: 100,
      }),
    });

    scrollToSection('test-section', 50);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 370, // 500 (top) + 0 (pageYOffset) - 80 (header) - 50 (custom offset)
      behavior: 'smooth',
    });
  });
});
