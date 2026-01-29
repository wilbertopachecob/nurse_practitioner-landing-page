import { useTranslation } from 'react-i18next';
import SocialIcons from '@/components/SocialIcons';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-copyright">{t('footer.copyright')}</p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
