import type { Language } from '@/types';

/**
 * Detects browser language and returns 'en' or 'es'
 * @returns Detected language code
 */
export const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  return langCode === 'es' ? 'es' : 'en';
};
