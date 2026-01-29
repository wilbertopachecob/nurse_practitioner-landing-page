/**
 * Detects browser language and returns 'en' or 'es'
 * Defaults to 'en' if Spanish is not detected
 */
export const detectBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  // Check if Spanish is detected
  if (langCode === 'es') {
    return 'es';
  }
  
  // Check navigator.languages array for Spanish
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      if (lang.toLowerCase().startsWith('es')) {
        return 'es';
      }
    }
  }
  
  return 'en';
};
