import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

const TestWrapper = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );
    
    const button = screen.getByLabelText(/switch to/i);
    expect(button).toBeInTheDocument();
  });

  it('displays moon icon for light theme', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
