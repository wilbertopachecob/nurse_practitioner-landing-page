import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Profile from '@/components/Profile';
import About from '@/components/About';
import Services from '@/components/Services';
import Credentials from '@/components/Credentials';
import Footer from '@/components/Footer';
import '@/styles/global.css';
import '@/styles/utilities.css';
import '@/styles/patterns.css';
import { initScrollAnimations } from '@/utils/animations';

// Lazy load Contact component (contains heavy Google Maps iframe)
const Contact = lazy(() => import('@/components/Contact'));

const AppContent: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize scroll-triggered animations
    initScrollAnimations();
  }, []);

  return (
    <>
      <SEO />
      <div className="app">
        <Header />
        <main>
          <Profile />
          <About />
          <Services />
          <Credentials />
          <Suspense fallback={<div style={{ minHeight: '400px' }} aria-label={t('aria.loadingContactSection')} />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
