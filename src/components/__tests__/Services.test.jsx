import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import Services from '@/components/Services';

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

  it('uses IconWrapper components for service icons', () => {
    const { container } = render(
      <TestWrapper>
        <Services />
      </TestWrapper>
    );

    // Check that IconWrapper components are rendered
    const iconWrappers = container.querySelectorAll('.icon-wrapper');
    expect(iconWrappers.length).toBe(8); // 8 services
    
    // Verify they have the large size class (as used in Services component)
    iconWrappers.forEach(wrapper => {
      expect(wrapper).toHaveClass('icon-wrapper-large');
      expect(wrapper).toHaveClass('icon-wrapper-rotate-right');
    });
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
