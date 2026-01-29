import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FaHome } from 'react-icons/fa';
import IconWrapper from '@/components/IconWrapper/IconWrapper';

describe('IconWrapper', () => {
  it('renders with default props', () => {
    const { container } = render(
      <IconWrapper>
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('icon-wrapper-medium');
    expect(wrapper).toHaveClass('icon-wrapper-primary');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders children (icon)', () => {
    render(
      <IconWrapper>
        <FaHome data-testid="test-icon" />
      </IconWrapper>
    );

    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
  });

  it('applies small size variant', () => {
    const { container } = render(
      <IconWrapper size="small">
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveClass('icon-wrapper-small');
    expect(wrapper).not.toHaveClass('icon-wrapper-medium');
    expect(wrapper).not.toHaveClass('icon-wrapper-large');
  });

  it('applies medium size variant (default)', () => {
    const { container } = render(
      <IconWrapper size="medium">
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveClass('icon-wrapper-medium');
  });

  it('applies large size variant', () => {
    const { container } = render(
      <IconWrapper size="large">
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveClass('icon-wrapper-large');
  });

  it('applies primary variant (default)', () => {
    const { container } = render(
      <IconWrapper variant="primary">
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveClass('icon-wrapper-primary');
  });

  it('applies secondary variant', () => {
    const { container } = render(
      <IconWrapper variant="secondary">
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveClass('icon-wrapper-secondary');
  });

  it('applies custom className', () => {
    const { container } = render(
      <IconWrapper className="custom-class another-class">
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveClass('custom-class');
    expect(wrapper).toHaveClass('another-class');
  });

  it('handles aria-hidden prop correctly', () => {
    const { container, rerender } = render(
      <IconWrapper ariaHidden={true}>
        <FaHome />
      </IconWrapper>
    );

    let wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');

    rerender(
      <IconWrapper ariaHidden={false}>
        <FaHome />
      </IconWrapper>
    );

    wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveAttribute('aria-hidden', 'false');
  });

  it('uses default aria-hidden when not provided', () => {
    const { container } = render(
      <IconWrapper>
        <FaHome />
      </IconWrapper>
    );

    const wrapper = container.querySelector('.icon-wrapper');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <IconWrapper>
        <FaHome />
      </IconWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with aria-hidden false', async () => {
    const { container } = render(
      <IconWrapper ariaHidden={false}>
        <FaHome />
      </IconWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
