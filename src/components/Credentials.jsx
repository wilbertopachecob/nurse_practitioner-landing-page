import { useTranslation } from 'react-i18next';
import { FaCertificate, FaIdCard, FaHeartbeat, FaBriefcase, FaLanguage } from 'react-icons/fa';
import './Credentials.css';

const Credentials = () => {
  const { t } = useTranslation();

  return (
    <section className="credentials section" id="credentials" aria-labelledby="credentials-heading">
      <h2 id="credentials-heading">{t('credentials.title')}</h2>
      <div className="credentials-grid">
        <article className="credential-item">
          <div className="credential-icon-wrapper">
            <FaCertificate aria-hidden="true" />
          </div>
          <div className="credential-content">
            <h3>{t('credentials.certification')}</h3>
          </div>
        </article>
        <article className="credential-item">
          <div className="credential-icon-wrapper">
            <FaIdCard aria-hidden="true" />
          </div>
          <div className="credential-content">
            <h3>{t('credentials.license')}</h3>
          </div>
        </article>
        <article className="credential-item">
          <div className="credential-icon-wrapper">
            <FaIdCard aria-hidden="true" />
          </div>
          <div className="credential-content">
            <h3>{t('credentials.rn')}</h3>
          </div>
        </article>
        <article className="credential-item">
          <div className="credential-icon-wrapper">
            <FaHeartbeat aria-hidden="true" />
          </div>
          <div className="credential-content">
            <h3>{t('credentials.certs')}</h3>
          </div>
        </article>
        <article className="credential-item">
          <div className="credential-icon-wrapper">
            <FaBriefcase aria-hidden="true" />
          </div>
          <div className="credential-content">
            <h3>{t('credentials.position')}</h3>
          </div>
        </article>
        <article className="credential-item">
          <div className="credential-icon-wrapper">
            <FaLanguage aria-hidden="true" />
          </div>
          <div className="credential-content">
            <h3>{t('credentials.languages')}</h3>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Credentials;
