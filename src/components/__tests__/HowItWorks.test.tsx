import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import HowItWorks from '@/components/HowItWorks';

describe('HowItWorks', () => {
  it('renders how-it-works section', () => {
    render(
      <TestWrapper>
        <HowItWorks />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { name: /a calm, clear path to your first appointment/i })).toBeInTheDocument();
  });

  it('renders three process steps', () => {
    render(
      <TestWrapper>
        <HowItWorks />
      </TestWrapper>
    );

    const steps = document.querySelectorAll('.how-step');
    expect(steps.length).toBe(3);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <HowItWorks />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
