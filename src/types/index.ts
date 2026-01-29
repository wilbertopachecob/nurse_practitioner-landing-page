import { ReactNode } from 'react';

/**
 * Shared Type Definitions
 * Centralized type definitions for the application
 */

// Component Prop Types
export interface IconWrapperProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
  ariaHidden?: boolean;
  badge?: string | null;
  animated?: boolean;
}

export interface BadgeProps {
  variant?: 'primary' | 'success' | 'info' | 'warning' | 'teal' | 'purple' | 'coral' | 'trust';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode | null;
  className?: string;
  children: ReactNode;
}

export interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'diagonal' | 'gradient';
  flip?: boolean;
  className?: string;
}

export interface StatItemProps {
  value: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  icon?: ReactNode | null;
  duration?: number;
  className?: string;
}

export interface StatsProps {
  children: ReactNode;
  className?: string;
}

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}

export interface ProgressBarProps {
  value?: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}

export interface ShimmerProps {
  children: ReactNode;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Context Types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface LanguageContextType {
  language: 'en' | 'es';
  toggleLanguage: () => void;
}

// Utility Function Types
export type ScrollToSectionFunction = (targetId: string, offset?: number) => void;

// DOM API Types (for ESLint)
declare global {
  interface IntersectionObserverInit {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
  }
}

export interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export type AnimationType = 'fadeInUp' | 'fadeIn' | 'slideInRight' | 'slideInLeft' | 'scaleIn' | 'rotateIn';

// Hook Return Types
export type UseMobileReturn = boolean;

// Constants Types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es';
export type IconSize = 'small' | 'medium' | 'large';
export type BadgeVariant = 'primary' | 'success' | 'info' | 'warning' | 'teal' | 'purple' | 'coral' | 'trust';
export type SectionId = 'home' | 'about' | 'services' | 'credentials' | 'contact';
