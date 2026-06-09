import { useTranslation } from 'react-i18next';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    { n: '1', title: t('how.s1t'), text: t('how.s1p') },
    { n: '2', title: t('how.s2t'), text: t('how.s2p') },
    { n: '3', title: t('how.s3t'), text: t('how.s3p') },
  ];

  return (
    <section className="how section" id="approach" aria-labelledby="how-heading">
      <h2 id="how-heading">{t('how.title')}</h2>
      <p className="how-intro">{t('how.subtitle')}</p>
      <div className="how-grid">
        {steps.map((s) => (
          <article className="how-step" key={s.n}>
            <span className="num" aria-hidden="true">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
