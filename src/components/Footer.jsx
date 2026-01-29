import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import SocialIcons from '@/components/SocialIcons';
import './Footer.css';

const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-content">
          <p className="footer-copyright">{t('footer.copyright')}</p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
