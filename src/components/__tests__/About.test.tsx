import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TestWrapper } from '@/test/utils';
import About from '@/components/About';

describe('About', () => {
  it('renders about section', () => {
    render(
      <TestWrapper>
        <About />
      </TestWrapper>
    );

    const aboutSection = document.querySelector('.about');
    expect(aboutSection).toBeInTheDocument();
  });

  it('displays section title', () => {
    render(
      <TestWrapper>
        <About />
      </TestWrapper>
    );

    const title = screen.getByText('About Me');
    expect(title).toBeInTheDocument();
  });

  it('displays education information', () => {
    render(
      <TestWrapper>
        <About />
      </TestWrapper>
    );

    const educationTitle = screen.getByText(/Education/i);
    expect(educationTitle).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <About />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
