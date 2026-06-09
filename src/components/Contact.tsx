import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaCalendarCheck } from 'react-icons/fa';
import { CONTACT, MAPS, SECTIONS } from '@/constants';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="contact section" id={SECTIONS.contact} aria-labelledby="contact-heading">
      <div className="section-head">
        <span className="eyebrow">{t('contact.eyebrow')}</span>
        <h2 id="contact-heading">{t('contact.title')}</h2>
        <p>{t('contact.subtitle')}</p>
      </div>
      <div className="contact-content">
        <div className="contact-card">
          <h3>{t('contact.detailsTitle')}</h3>
          <ul className="contact-list">
            <li>
              <a href={CONTACT.phone.tel} aria-label={`${t('aria.call')} ${CONTACT.phone.display}`}>
                <span className="ico" aria-hidden="true"><FaPhone /></span>
                <span>
                  <small>{t('contact.phone')}</small>
                  <b>{CONTACT.phone.display}</b>
                </span>
              </a>
            </li>
            <li>
              <a href={CONTACT.email.mailto}>
                <span className="ico" aria-hidden="true"><FaEnvelope /></span>
                <span>
                  <small>{t('contact.email')}</small>
                  <b>{CONTACT.email.address}</b>
                </span>
              </a>
            </li>
            <li>
              <a
                href={MAPS.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('contact.location')} - ${t('aria.viewOnGoogleMaps')}`}
              >
                <span className="ico" aria-hidden="true"><FaMapMarkerAlt /></span>
                <span>
                  <small>{t('contact.location')}</small>
                  <b>{t('contact.practice')}</b>
                </span>
              </a>
            </li>
            <li>
              <a
                href={CONTACT.website.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('aria.visit')} ${CONTACT.website.display}`}
              >
                <span className="ico" aria-hidden="true"><FaGlobe /></span>
                <span>
                  <small>{t('contact.website')}</small>
                  <b>{CONTACT.website.display}</b>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="book-card">
          <span className="eyebrow">{t('book.eyebrow')}</span>
          <h3>{t('book.title')}</h3>
          <p>{t('book.subtitle')}</p>
          <div className="book-actions">
            <a className="btn btn-primary" href={CONTACT.phone.tel}>
              <FaPhone aria-hidden="true" />
              <span>{t('book.call')}</span>
            </a>
            <a
              className="btn btn-secondary"
              href={CONTACT.email.mailto}
            >
              <FaEnvelope aria-hidden="true" />
              <span>{t('book.email')}</span>
            </a>
          </div>
          <p className="book-note">
            <FaCalendarCheck aria-hidden="true" />
            <span>{t('book.note')}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
