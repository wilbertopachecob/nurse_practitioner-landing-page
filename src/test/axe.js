import { axe } from 'jest-axe';

/**
 * Helper function to run axe accessibility checks
 * @param {HTMLElement} container - The container element to test
 * @param {Object} options - Axe options
 * @returns {Promise<Object>} Axe results
 */
export const checkA11y = async (container, options = {}) => {
  const results = await axe(container, {
    rules: {
      // You can disable specific rules if needed
      // 'color-contrast': { enabled: false },
    },
    ...options,
  });
  return results;
};

export default checkA11y;
