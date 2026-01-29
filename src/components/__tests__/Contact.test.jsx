import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Contact from '@/components/Contact';

const TestWrapper = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>{children}</LanguageProvider>
  </ThemeProvider>
);

describe('Contact', () => {
  it('renders contact section', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );
    
    const contactSection = document.querySelector('.contact');
    expect(contactSection).toBeInTheDocument();
  });

  it('displays phone number', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );
    
    const phoneLink = screen.getByText(/918.*940.*7158/);
    expect(phoneLink).toBeInTheDocument();
  });

  it('displays website link', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );
    
    const websiteLink = screen.getByText(/choosecouragecounseling/i);
    expect(websiteLink).toBeInTheDocument();
  });

  it('renders map iframe', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );
    
    const iframe = screen.getByTitle(/Location.*Choose Courage/i);
    expect(iframe).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );
    
    // Remove iframe from container before testing as axe has issues with iframes in jsdom
    const iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.remove();
    }
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
