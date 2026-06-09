import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import Credentials from '@/components/Credentials';

describe('Credentials', () => {
  it('renders credentials section', () => {
    render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    const credentialsSection = document.querySelector('.credentials');
    expect(credentialsSection).toBeInTheDocument();
  });

  it('displays section title', () => {
    render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Qualified, licensed, and accountable.',
    });
    expect(title).toBeInTheDocument();
  });

  it('renders all credential items', () => {
    render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    // Should render 6 credential items
    const credentialItems = document.querySelectorAll('.credential-item');
    expect(credentialItems.length).toBe(6);
  });

  it('displays certification credential', () => {
    render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    const certification = screen.getByRole('heading', { level: 3, name: 'PMHNP-BC' });
    expect(certification).toBeInTheDocument();
    expect(screen.getByText(/ANCC board certification/i)).toBeInTheDocument();
  });

  it('displays license credential', () => {
    render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    const license = screen.getByRole('heading', { level: 3, name: 'APRN' });
    expect(license).toBeInTheDocument();
    expect(screen.getByText(/Oklahoma license/i)).toBeInTheDocument();
  });

  it('displays RN credential', () => {
    render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    const rn = screen.getByText(/RN Compact License/i);
    expect(rn).toBeInTheDocument();
  });

  it('uses IconWrapper components', () => {
    const { container } = render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    // Check that IconWrapper components are rendered
    const iconWrappers = container.querySelectorAll('.icon-wrapper');
    expect(iconWrappers.length).toBe(6);

    // Verify they have the medium size class
    iconWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('icon-wrapper-medium');
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Credentials />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
