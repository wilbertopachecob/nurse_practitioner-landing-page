import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import Contact from '@/components/Contact';

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

    const phoneLinks = screen.getAllByRole('link', { name: /918.*417.*2969/ });
    expect(phoneLinks.length).toBeGreaterThan(0);
  });

  it('displays website link', () => {
    render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const websiteLink = screen.getByText(/mindrejuvenation/i);
    expect(websiteLink).toBeInTheDocument();
  });

  it('renders booking actions', () => {
    const { container } = render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    expect(container.querySelector('.book-actions .btn-primary')).toHaveAttribute('href', 'tel:+19184172969');
    expect(screen.getByRole('link', { name: /send a message/i })).toHaveAttribute(
      'href',
      'mailto:mical.pacheco.pmhnp@gmail.com'
    );
  });

  it('uses inline contact icons', () => {
    const { container } = render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const icons = container.querySelectorAll('.contact-list .ico');
    expect(icons.length).toBe(4);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Contact />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
