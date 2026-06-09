import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import BrandLogo from '@/components/BrandLogo';
import { CONTACT, SECTIONS } from '@/constants';

const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <BrandLogo variant="footer" />
            <p>{t('footer.blurb')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.explore')}</h4>
            <ul>
              <li><a href={`#${SECTIONS.about}`}>{t('nav.about')}</a></li>
              <li><a href={`#${SECTIONS.approach}`}>{t('nav.approach')}</a></li>
              <li><a href={`#${SECTIONS.services}`}>{t('nav.services')}</a></li>
              <li><a href={`#${SECTIONS.credentials}`}>{t('nav.credentials')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li><a href={CONTACT.phone.tel}>{CONTACT.phone.display}</a></li>
              <li><a href={CONTACT.email.mailto}>{CONTACT.email.address}</a></li>
              <li><a href={CONTACT.website.url}>{CONTACT.website.display}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
