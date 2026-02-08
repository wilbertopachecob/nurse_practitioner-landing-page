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
          <img
            src={IMAGES.profile}
            alt={`${t('profile.name')} - ${t('profile.title')}`}
            loading="eager"
            fetchPriority="high"
            width="500"
            height="667"
            sizes="(max-width: 768px) 100vw, (max-width: 968px) 400px, 500px"
          />
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
              aria-label={`${t('about.location')} - View on Google Maps`}
            >
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{t('about.location')}</span>
            </a>
          </header>
          <nav className="profile-cta" aria-label="Call to action">
            <a
              href={CONTACT.phone.tel}
              className="btn btn-primary"
              aria-label={`${t('profile.cta')} - Call ${CONTACT.phone.display}`}
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
