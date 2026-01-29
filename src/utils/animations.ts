import type { AnimationType } from '@/types';

/**
 * Animation Utilities
 * Scroll-triggered animations using Intersection Observer
 */

/**
 * Initialize scroll-triggered animations for elements with data-animate attribute
 * @param selector - CSS selector for elements to animate (default: '[data-animate]')
 * @param options - Intersection Observer options
 * @returns IntersectionObserver instance
 */
export const initScrollAnimations = (
  selector: string = '[data-animate]',
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const animationType = (element.getAttribute('data-animate') || 'fadeInUp') as AnimationType;
        const delay = element.getAttribute('data-animate-delay') || '0';
        
        element.classList.add(`animate-${animationType}`);
        element.style.animationDelay = `${delay}ms`;
        element.classList.add('animate-visible');
        
        // Unobserve after animation
        observer.unobserve(element);
      }
    });
  }, defaultOptions);

  // Observe all matching elements
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
};

/**
 * Animate element when it enters viewport
 * @param element - Element to animate
 * @param animationClass - CSS animation class to apply
 * @param options - Intersection Observer options
 * @returns IntersectionObserver instance
 */
export const animateOnScroll = (
  element: HTMLElement | null,
  animationClass: string = 'fadeInUp',
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (!element) return null;

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.classList.add(animationClass);
        element.classList.add('animate-visible');
        observer.unobserve(element);
      }
    });
  }, defaultOptions);

  observer.observe(element);
  return observer;
};

/**
 * Stagger animation for child elements
 * @param container - Container element
 * @param childSelector - Selector for child elements
 * @param animationClass - Animation class to apply
 * @param staggerDelay - Delay between each child in milliseconds
 * @returns IntersectionObserver instance
 */
export const staggerAnimation = (
  container: HTMLElement | null,
  childSelector: string,
  animationClass: string = 'fadeInUp',
  staggerDelay: number = 100
): IntersectionObserver | null => {
  if (!container) return null;

  const children = container.querySelectorAll<HTMLElement>(childSelector);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add(animationClass);
              child.classList.add('animate-visible');
            }, index * staggerDelay);
          });
          observer.unobserve(container);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  observer.observe(container);
  return observer;
};
