import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import CrisisNotice from '@/components/CrisisNotice';

describe('CrisisNotice', () => {
  it('renders crisis notice with emergency text', () => {
    render(
      <TestWrapper>
        <CrisisNotice />
      </TestWrapper>
    );

    expect(screen.getByText(/in a crisis\? help is available right now/i)).toBeInTheDocument();
    expect(screen.getByText('911')).toBeInTheDocument();
    expect(screen.getByText('988')).toBeInTheDocument();
  });

  it('renders as note landmark', () => {
    render(
      <TestWrapper>
        <CrisisNotice />
      </TestWrapper>
    );

    const note = screen.getByRole('note');
    expect(note).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <CrisisNotice />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
