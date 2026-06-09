import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import LanguageToggle from '@/components/LanguageToggle';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: vi.fn(),
    },
    t: (key: string) => {
      const translations: Record<string, string> = {
        'aria.switchTo': 'Switch to',
        'aria.spanish': 'Spanish',
        'aria.english': 'English',
      };
      return translations[key] ?? key;
    },
  }),
}));

describe('LanguageToggle', () => {
  it('renders language toggle button', () => {
    render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /switch to english/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /switch to spanish/i })).toBeInTheDocument();
  });

  it('displays current language', () => {
    render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );

    const englishButton = screen.getByRole('button', { name: /switch to english/i });
    expect(englishButton).toHaveTextContent('EN');
    expect(englishButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('has accessible label', () => {
    render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );

    const group = screen.getByRole('group', { name: /language/i });
    expect(group).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
