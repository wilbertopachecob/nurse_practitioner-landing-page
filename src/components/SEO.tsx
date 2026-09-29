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

    const title = SEO_CONSTANTS.titles[currentLang] || SEO_CONSTANTS.titles.en;
    const description =
      SEO_CONSTANTS.descriptions[currentLang] || SEO_CONSTANTS.descriptions.en;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', title);
    }

    document.title = title;

    const socialSelectors = [
      'meta[property="og:title"]',
      'meta[property="twitter:title"]',
      'meta[name="twitter:title"]',
    ];
    socialSelectors.forEach((selector) => {
      document.querySelector(selector)?.setAttribute('content', title);
    });

    const socialDescriptions = [
      'meta[property="og:description"]',
      'meta[property="twitter:description"]',
      'meta[name="twitter:description"]',
    ];
    socialDescriptions.forEach((selector) => {
      document.querySelector(selector)?.setAttribute('content', description);
    });

    // Update canonical URL with language parameter
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentLang === 'es' ? `${BASE_URL}?lang=es` : BASE_URL);
    }
  }, [currentLang]);

  return null; // This component doesn't render anything
};

export default SEO;
