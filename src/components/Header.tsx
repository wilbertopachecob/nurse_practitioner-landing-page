import { useTranslation } from 'react-i18next';
import { FaCalendarCheck } from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import LanguageToggle from '@/components/LanguageToggle';
import { CONTACT } from '@/constants';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-container container">
        <Navigation />
        <div className="header-controls">
          <LanguageToggle />
          <a
            href={CONTACT.phone.tel}
            className="header-cta"
            aria-label={`${t('profile.cta')} - ${t('aria.call')} ${CONTACT.phone.display}`}
          >
            <FaCalendarCheck aria-hidden="true" />
            <span className="header-cta-text">{t('profile.cta')}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
