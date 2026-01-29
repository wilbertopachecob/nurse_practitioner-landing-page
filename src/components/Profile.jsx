import { useTranslation } from 'react-i18next';
const profileImage = '/images/MPFInalImages-4_Original.jpeg';
import { FaCalendarCheck, FaVideo } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <section className="profile" id="home" aria-label={t('profile.name')}>
      <div className="profile-container">
        <div className="profile-image">
          <img 
            src={profileImage} 
            alt={`${t('profile.name')} - ${t('profile.title')}`}
            loading="eager"
            width="500"
            height="667"
          />
        </div>
        <article className="profile-content">
          <header>
            <h1 className="profile-name">{t('profile.name')}</h1>
            <h2 className="profile-title">{t('profile.title')}</h2>
          </header>
          <p className="profile-subtitle">{t('profile.subtitle')}</p>
          <nav className="profile-cta" aria-label="Call to action">
            <a 
              href="tel:+19189407158" 
              className="btn btn-primary"
              aria-label={`${t('profile.cta')} - Call (918) 940-7158`}
            >
              <FaCalendarCheck aria-hidden="true" />
              {t('profile.cta')}
            </a>
            <span className="telehealth-badge" aria-label={t('profile.telehealth')}>
              <FaVideo aria-hidden="true" />
              {t('profile.telehealth')}
            </span>
          </nav>
        </article>
      </div>
    </section>
  );
};

export default Profile;
