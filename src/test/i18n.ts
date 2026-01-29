import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

// Initialize i18n for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
  },
});

export default i18n;
