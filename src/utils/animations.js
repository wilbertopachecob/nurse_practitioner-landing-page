/**
 * Animation Utilities
 * Scroll-triggered animations using Intersection Observer
 */

/**
 * Initialize scroll-triggered animations for elements with data-animate attribute
 * @param {string} selector - CSS selector for elements to animate (default: '[data-animate]')
 * @param {Object} options - Intersection Observer options
 */
export const initScrollAnimations = (selector = '[data-animate]', options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.getAttribute('data-animate') || 'fadeInUp';
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
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS animation class to apply
 * @param {Object} options - Intersection Observer options
 */
export const animateOnScroll = (element, animationClass = 'fadeInUp', options = {}) => {
  if (!element) return null;

  const defaultOptions = {
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
 * @param {HTMLElement} container - Container element
 * @param {string} childSelector - Selector for child elements
 * @param {string} animationClass - Animation class to apply
 * @param {number} staggerDelay - Delay between each child in milliseconds
 */
export const staggerAnimation = (
  container,
  childSelector,
  animationClass = 'fadeInUp',
  staggerDelay = 100
) => {
  if (!container) return;

  const children = container.querySelectorAll(childSelector);
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
