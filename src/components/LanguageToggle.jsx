import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <button 
      className="language-toggle" 
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <FaGlobe />
      <span>{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default LanguageToggle;
