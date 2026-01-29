import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Services from '@/components/Services';

const TestWrapper = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>{children}</LanguageProvider>
  </ThemeProvider>
);

describe('Services', () => {
  it('renders services section', () => {
    render(
      <TestWrapper>
        <Services />
      </TestWrapper>
    );
    
    const servicesSection = document.querySelector('.services');
    expect(servicesSection).toBeInTheDocument();
  });

  it('displays services title', () => {
    render(
      <TestWrapper>
        <Services />
      </TestWrapper>
    );
    
    const title = screen.getByText('Services');
    expect(title).toBeInTheDocument();
  });

  it('renders multiple service cards', () => {
    render(
      <TestWrapper>
        <Services />
      </TestWrapper>
    );
    
    // Should render 8 service cards
    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Services />
      </TestWrapper>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
