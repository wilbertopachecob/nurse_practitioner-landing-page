import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about section" id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">{t('about.title')}</h2>
      <article className="about-content">
        <div className="about-text">
          <p className="about-summary">{t('about.summary')}</p>
          <p className="about-experience">{t('about.experience')}</p>
          <p className="about-approach">{t('about.approach')}</p>
        </div>
        <div className="about-details">
          <section className="education" aria-labelledby="education-heading">
            <h3 id="education-heading">
              <FaGraduationCap aria-hidden="true" />
              {t('about.education.title')}
            </h3>
            <ul>
              <li>{t('about.education.msn')}</li>
              <li>{t('about.education.bsn')}</li>
              <li>{t('about.education.adn')}</li>
            </ul>
          </section>
          <address className="location">
            <FaMapMarkerAlt aria-hidden="true" />
            <span>{t('about.location')}</span>
          </address>
        </div>
      </article>
    </section>
  );
};

export default About;
