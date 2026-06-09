import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '@/components/LanguageToggle.css';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <div className="language-toggle" role="group" aria-label={t('header.language')}>
      <button
        type="button"
        className={`language-toggle-option ${language === 'en' ? 'is-active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label={`${t('aria.switchTo')} ${t('aria.english')}`}
      >
        EN
      </button>
      <button
        type="button"
        className={`language-toggle-option ${language === 'es' ? 'is-active' : ''}`}
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        aria-label={`${t('aria.switchTo')} ${t('aria.spanish')}`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageToggle;
