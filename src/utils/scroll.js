import { DESIGN } from '@/constants';

/**
 * Smoothly scrolls to a section on the page with header offset
 * @param {string} targetId - The ID of the element to scroll to
 * @param {number} offset - Additional offset in pixels (defaults to DESIGN.scrollOffset)
 */
export const scrollToSection = (targetId, offset = DESIGN.scrollOffset) => {
  const element = document.getElementById(targetId);
  if (!element) {
    console.warn(`Element with id "${targetId}" not found`);
    return;
  }

  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 0;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};
