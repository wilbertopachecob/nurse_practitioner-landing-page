import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import '@/components/LanguageToggle.css';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <button
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={`${t('aria.switchTo')} ${language === 'en' ? t('aria.spanish') : t('aria.english')}`}
    >
      <FaGlobe />
      <span>{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default LanguageToggle;
