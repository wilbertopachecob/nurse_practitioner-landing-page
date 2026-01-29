import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

const TestWrapper = ({ children }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('LanguageToggle', () => {
  it('renders language toggle button', () => {
    render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays current language', () => {
    render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('EN');
  });

  it('has accessible label', () => {
    render(
      <TestWrapper>
        <LanguageToggle />
      </TestWrapper>
    );
    
    const button = screen.getByLabelText(/switch to/i);
    expect(button).toBeInTheDocument();
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
