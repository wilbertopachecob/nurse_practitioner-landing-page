import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectBrowserLanguage } from '@/utils/languageDetector';
import type { LanguageContextType, Language } from '@/types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps): React.JSX.Element => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      return savedLanguage;
    }
    // Detect browser language
    return detectBrowserLanguage();
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = (): void => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
