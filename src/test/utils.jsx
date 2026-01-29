import PropTypes from 'prop-types';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

/**
 * TestWrapper Component
 * Shared wrapper for tests that provides Theme and Language contexts
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Components to wrap
 */
export const TestWrapper = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>
      {children}
    </LanguageProvider>
  </ThemeProvider>
);

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
