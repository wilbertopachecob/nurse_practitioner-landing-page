import { useTranslation } from 'react-i18next';
import { FaCalendarCheck, FaVideo, FaMapMarkerAlt, FaLanguage, FaShieldAlt } from 'react-icons/fa';
import { IMAGES, MAPS, SECTIONS } from '@/constants';
import { scrollToSection } from '@/utils/scroll';
import '@/components/Profile.css';

const Profile: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="profile" id={SECTIONS.home} aria-label={t('profile.name')}>
      <div className="profile-container container">
        {/* Text column — left */}
        <article className="profile-content" data-reveal>
          <span className="profile-pill">
            <span className="dot" aria-hidden="true" />
            {t('hero.pill')}
          </span>

          <h1 className="profile-name">
            {t('hero.h1a')} <em>{t('hero.h1b')}</em>
          </h1>

          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-meta">
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
            <span><FaLanguage aria-hidden="true" />{t('hero.bilingual')}</span>
            <span><FaVideo aria-hidden="true" />{t('hero.tele')}</span>
          </div>

          <nav className="profile-cta" aria-label={t('aria.callToAction')}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToSection(SECTIONS.contact)}
              aria-label={t('cta.book')}
            >
              <FaCalendarCheck aria-hidden="true" />
              {t('cta.book')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollToSection(SECTIONS.approach)}
            >
              {t('cta.how')}
            </button>
          </nav>

          <p className="hero-note">{t('hero.note')}</p>
        </article>

        {/* Image column — right */}
        <div className="profile-image" data-reveal>
          <div className="portrait-frame">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={`${IMAGES.profile.src500} 500w, ${IMAGES.profile.src1000} 1000w`}
                sizes="100vw"
              />
              <source
                media="(max-width: 968px)"
                srcSet={`${IMAGES.profile.src500} 500w, ${IMAGES.profile.src1000} 1000w`}
                sizes="400px"
              />
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
            <div className="portrait-badge" aria-label={t('badge.title')}>
              <span className="portrait-badge-ico" aria-hidden="true">
                <FaShieldAlt />
              </span>
              <span>
                <b>{t('badge.title')}</b>
                <small>{t('badge.sub')}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
