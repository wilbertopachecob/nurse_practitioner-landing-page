import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Profile from '@/components/Profile';

const TestWrapper = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>{children}</LanguageProvider>
  </ThemeProvider>
);

describe('Profile', () => {
  it('renders profile section', () => {
    render(
      <TestWrapper>
        <Profile />
      </TestWrapper>
    );
    
    const profileSection = document.querySelector('.profile');
    expect(profileSection).toBeInTheDocument();
  });

  it('displays profile image', () => {
    render(
      <TestWrapper>
        <Profile />
      </TestWrapper>
    );
    
    const image = screen.getByAltText(/Mical Pacheco, PMHNP-BC/);
    expect(image).toBeInTheDocument();
  });

  it('renders call to action button', () => {
    render(
      <TestWrapper>
        <Profile />
      </TestWrapper>
    );
    
    const ctaLink = screen.getByText('Book Appointment');
    expect(ctaLink).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Profile />
      </TestWrapper>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
