import { useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Profile from '@/components/Profile';
import About from '@/components/About';
import Services from '@/components/Services';
import Credentials from '@/components/Credentials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import '@/styles/global.css';
import '@/styles/utilities.css';
import '@/styles/patterns.css';
import { initScrollAnimations } from '@/utils/animations';

function App() {
  useEffect(() => {
    // Initialize scroll-triggered animations
    initScrollAnimations();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <SEO />
          <div className="app">
            <Header />
            <main>
              <Profile />
              <About />
              <Services />
              <Credentials />
              <Contact />
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
