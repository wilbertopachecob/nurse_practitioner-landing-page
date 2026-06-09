import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import TrustStrip from '@/components/TrustStrip';

describe('TrustStrip', () => {
  it('renders trust strip section', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/credentials at a glance/i)).toBeInTheDocument();
  });

  it('renders all trust items', () => {
    render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    );

    const items = document.querySelectorAll('.trust-item');
    expect(items.length).toBe(4);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <TrustStrip />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
