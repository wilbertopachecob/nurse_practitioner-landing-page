import { ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface TestWrapperProps {
  children: ReactNode;
}

/**
 * TestWrapper Component
 * Shared wrapper for tests that provides Theme and Language contexts
 */
export const TestWrapper = ({ children }: TestWrapperProps): React.JSX.Element => (
  <ThemeProvider>
    <LanguageProvider>
      {children}
    </LanguageProvider>
  </ThemeProvider>
);
