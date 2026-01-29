import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import '@/test/i18n';

// Extend Vitest matchers with jest-axe
expect.extend(toHaveNoViolations);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
