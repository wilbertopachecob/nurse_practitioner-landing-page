import { useTranslation } from 'react-i18next';
import { FaCalendarCheck, FaVideo, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { CONTACT, IMAGES, MAPS, SECTIONS } from '@/constants';
import SocialIcons from '@/components/SocialIcons';
import '@/components/Profile.css';

const Profile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="profile" id={SECTIONS.home} aria-label={t('profile.name')}>
      <div className="profile-container container">
        <div className="profile-image">
          <picture>
            {/* Mobile: 100vw, serve 500w for 1x, 1000w for 2x */}
            <source
              media="(max-width: 768px)"
              srcSet={`${IMAGES.profile.src500} 500w, ${IMAGES.profile.src1000} 1000w`}
              sizes="100vw"
            />
            {/* Tablet: 400px, serve 500w for 1x, 1000w for 2x */}
            <source
              media="(max-width: 968px)"
              srcSet={`${IMAGES.profile.src500} 500w, ${IMAGES.profile.src1000} 1000w`}
              sizes="400px"
            />
            {/* Desktop: 500px, serve 500w for 1x, 1000w for 2x */}
            <img
              src={IMAGES.profile.src500}
              srcSet={`${IMAGES.profile.src500} 500w, ${IMAGES.profile.src1000} 1000w, ${IMAGES.profile.src1200} 1200w`}
              sizes="(max-width: 768px) 100vw, (max-width: 968px) 400px, 500px"
              alt={`${t('profile.name')} - ${t('profile.title')}`}
              loading="eager"
              fetchPriority="high"
              width="500"
              height="667"
            />
          </picture>
        </div>
        <article className="profile-content">
          <header>
            <h1 className="profile-name">{t('profile.name')}</h1>
            <h2 className="profile-title">{t('profile.title')}</h2>
            <a 
              href={MAPS.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-location"
              aria-label={`${t('about.location')} - ${t('aria.viewOnGoogleMaps')}`}
            >
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{t('about.location')}</span>
            </a>
          </header>
          <nav className="profile-cta" aria-label={t('aria.callToAction')}>
            <a
              href={CONTACT.phone.tel}
              className="btn btn-primary"
              aria-label={`${t('profile.cta')} - ${t('aria.call')} ${CONTACT.phone.display}`}
            >
              <FaCalendarCheck aria-hidden="true" />
              {t('profile.cta')}
            </a>
            <span className="telehealth-badge" aria-label={t('profile.telehealth')}>
              <FaVideo aria-hidden="true" />
              {t('profile.telehealth')}
            </span>
          </nav>
          <div className="profile-contact-group">
            <a href={CONTACT.email.mailto} className="location email-link">
              <FaEnvelope aria-hidden="true" />
              <span>{CONTACT.email.address}</span>
            </a>
          </div>
          <SocialIcons />
        </article>
      </div>
    </section>
  );
};

export default Profile;
