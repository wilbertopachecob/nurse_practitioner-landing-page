import { useTranslation } from 'react-i18next';
import { FaCertificate, FaIdCard, FaHeartbeat, FaBriefcase, FaLanguage } from 'react-icons/fa';
import { SECTIONS } from '@/constants';
import IconWrapper from '@/components/IconWrapper/IconWrapper';

const Credentials: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="credentials section" id={SECTIONS.credentials} aria-labelledby="credentials-heading">
      <div className="section-head">
        <span className="eyebrow">{t('credentials.eyebrow')}</span>
        <h2 id="credentials-heading">{t('credentials.title')}</h2>
      </div>
      <div className="credentials-grid">
        <article className="credential-item parent-hover">
          <IconWrapper size="medium" className="icon-wrapper-rotate-left">
            <FaCertificate />
          </IconWrapper>
          <div className="credential-content">
            <h3>{t('credentials.certification')}</h3>
            <p>{t('credentials.certificationSub')}</p>
          </div>
        </article>
        <article className="credential-item parent-hover">
          <IconWrapper size="medium" className="icon-wrapper-rotate-left">
            <FaIdCard />
          </IconWrapper>
          <div className="credential-content">
            <h3>{t('credentials.license')}</h3>
            <p>{t('credentials.licenseSub')}</p>
          </div>
        </article>
        <article className="credential-item parent-hover">
          <IconWrapper size="medium" className="icon-wrapper-rotate-left">
            <FaIdCard />
          </IconWrapper>
          <div className="credential-content">
            <h3>{t('credentials.rn')}</h3>
            <p>{t('credentials.rnSub')}</p>
          </div>
        </article>
        <article className="credential-item parent-hover">
          <IconWrapper size="medium" className="icon-wrapper-rotate-left">
            <FaHeartbeat />
          </IconWrapper>
          <div className="credential-content">
            <h3>{t('credentials.certs')}</h3>
            <p>{t('credentials.certsSub')}</p>
          </div>
        </article>
        <article className="credential-item parent-hover">
          <IconWrapper size="medium" className="icon-wrapper-rotate-left">
            <FaBriefcase />
          </IconWrapper>
          <div className="credential-content">
            <h3>{t('credentials.position')}</h3>
            <p>{t('credentials.positionSub')}</p>
          </div>
        </article>
        <article className="credential-item parent-hover">
          <IconWrapper size="medium" className="icon-wrapper-rotate-left">
            <FaLanguage />
          </IconWrapper>
          <div className="credential-content">
            <h3>{t('credentials.languages')}</h3>
            <p>{t('credentials.languagesSub')}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Credentials;
