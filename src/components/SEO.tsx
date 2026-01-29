import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BASE_URL, SEO as SEO_CONSTANTS } from '@/constants';
import type { Language } from '@/types';

const SEO: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as Language;

  useEffect(() => {
    // Update document language
    document.documentElement.lang = currentLang;

    // Update meta description based on language
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        SEO_CONSTANTS.descriptions[currentLang] || SEO_CONSTANTS.descriptions.en
      );
    }

    // Update title based on language
    document.title = SEO_CONSTANTS.titles[currentLang] || SEO_CONSTANTS.titles.en;

    // Update canonical URL with language parameter
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentLang === 'es' ? `${BASE_URL}?lang=es` : BASE_URL);
    }
  }, [currentLang]);

  return null; // This component doesn't render anything
};

export default SEO;
