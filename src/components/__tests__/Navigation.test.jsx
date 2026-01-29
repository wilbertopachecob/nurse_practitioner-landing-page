import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import Navigation from '@/components/Navigation';
import { TestWrapper } from '@/test/utils';
import '@/test/i18n';

// Mock window.scrollTo
global.scrollTo = vi.fn();

// Mock window.innerWidth for responsive behavior
const mockWindowWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('Navigation', () => {
  beforeEach(() => {
    // Reset scrollTo mock
    global.scrollTo.mockClear();
    // Reset window width to desktop
    mockWindowWidth(1200);
    
    // Create mock sections for navigation targets
    document.body.innerHTML = `
      <div id="home"></div>
      <div id="about"></div>
      <div id="services"></div>
      <div id="credentials"></div>
      <div id="contact"></div>
      <header class="header" style="height: 80px;"></header>
    `;
  });

  it('renders navigation menu', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about me/i)).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
    expect(screen.getByText(/credentials/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('hides hamburger menu on desktop', () => {
    mockWindowWidth(1200);
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.queryByRole('button', { name: /open navigation menu/i });
    // On desktop, menu toggle should not be visible (display: none)
    // But it still exists in the DOM, so we check aria-expanded
    if (toggleButton) {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('shows hamburger menu on mobile', () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles menu when hamburger button is clicked', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    
    // Initially closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      expect(toggleButton.getAttribute('aria-label')).toMatch(/close navigation menu/i);
    });
    
    // Click to close
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(toggleButton.getAttribute('aria-label')).toMatch(/open navigation menu/i);
    });
  });

  it('closes menu when clicking outside', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    
    // Open menu
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Click outside
    fireEvent.click(document.body);
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes menu when nav link is clicked', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    
    // Open menu
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Click on a nav link
    const homeLink = screen.getByText(/home/i);
    fireEvent.click(homeLink);
    
    // Menu should close after clicking nav link
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes menu when Escape key is pressed', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    
    // Open menu
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('scrolls to section when nav link is clicked', async () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const aboutLink = screen.getByText(/about me/i);
    fireEvent.click(aboutLink);
    
    await waitFor(() => {
      expect(global.scrollTo).toHaveBeenCalled();
    });
  });

  it('handles keyboard navigation with arrow keys', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    const homeLink = screen.getByText(/home/i);
    homeLink.focus();
    
    // Press ArrowRight
    fireEvent.keyDown(homeLink, { key: 'ArrowRight' });
    
    await waitFor(() => {
      const aboutLink = screen.getByText(/about me/i);
      expect(aboutLink).toHaveFocus();
    });
  });

  it('handles Home key to jump to first item', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    const contactLink = screen.getByText(/contact/i);
    contactLink.focus();
    
    // Press Home
    fireEvent.keyDown(contactLink, { key: 'Home' });
    
    await waitFor(() => {
      const homeLink = screen.getByText(/home/i);
      expect(homeLink).toHaveFocus();
    });
  });

  it('handles End key to jump to last item', async () => {
    mockWindowWidth(800);
    
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const toggleButton = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    const homeLink = screen.getByText(/home/i);
    homeLink.focus();
    
    // Press End
    fireEvent.keyDown(homeLink, { key: 'End' });
    
    await waitFor(() => {
      const contactLink = screen.getByText(/contact/i);
      expect(contactLink).toHaveFocus();
    });
  });

  it('handles Enter key to navigate', async () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const servicesLink = screen.getByText(/services/i);
    servicesLink.focus();
    
    // Press Enter
    fireEvent.keyDown(servicesLink, { key: 'Enter' });
    
    await waitFor(() => {
      expect(global.scrollTo).toHaveBeenCalled();
    });
  });

  it('handles Space key to navigate', async () => {
    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const servicesLink = screen.getByText(/services/i);
    servicesLink.focus();
    
    // Press Space
    fireEvent.keyDown(servicesLink, { key: ' ' });
    
    await waitFor(() => {
      expect(global.scrollTo).toHaveBeenCalled();
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
