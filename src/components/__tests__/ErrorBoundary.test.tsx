import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import ErrorBoundary from '@/components/ErrorBoundary';

// Component that throws an error
interface ThrowErrorProps {
  shouldThrow: boolean;
}

const ThrowError = ({ shouldThrow }: ThrowErrorProps): React.JSX.Element => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Suppress console.error for error boundary tests
const originalError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Reset error state
    vi.clearAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('catches errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const details = screen.getByText('Error Details (Development Only)');
    expect(details).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('hides error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const details = screen.queryByText('Error Details (Development Only)');
    expect(details).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('refresh button triggers page reload', () => {
    // Mock window.location.reload
    const reloadMock = vi.fn();
    delete (window as { location?: { reload: () => void } }).location;
    (window as { location: { reload: () => void } }).location = { reload: reloadMock };

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByRole('button', { name: /refresh page/i });
    fireEvent.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });

  it('has correct role attribute for accessibility', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorBoundary = screen.getByRole('alert');
    expect(errorBoundary).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when no error', async () => {
    const { container } = render(
      <ErrorBoundary>
        <div>No error</div>
      </ErrorBoundary>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
