import { useTranslation } from 'react-i18next';
import { FaGraduationCap } from 'react-icons/fa';
import { SECTIONS } from '@/constants';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="about section" id={SECTIONS.about} aria-labelledby="about-heading">
      <div className="section-head">
        <span className="eyebrow">{t('about.eyebrow')}</span>
        <h2 id="about-heading">{t('about.title')}</h2>
      </div>
      <article className="about-content">
        <div className="about-text">
          <p className="about-summary">{t('about.paragraph1')}</p>
          <p className="about-experience">{t('about.paragraph2')}</p>
          <p className="about-approach">{t('about.paragraph3')}</p>
          <p className="about-approach">{t('about.paragraph4')}</p>
          <div className="about-sign">
            <span className="sig">Mical Pacheco</span>
            <span>MSN, APRN, PMHNP-BC</span>
          </div>
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
        </div>
      </article>
    </section>
  );
};

export default About;
