import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-content">
          <p className="footer-copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
