import { useTranslation } from 'react-i18next';
import { FaCertificate, FaLanguage, FaVideo, FaRegClock } from 'react-icons/fa';

const TrustStrip: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { icon: <FaCertificate aria-hidden="true" />, b: t('trust.certB'), rest: t('trust.certR') },
    { icon: <FaLanguage aria-hidden="true" />, b: t('trust.biB'), rest: t('trust.biR') },
    { icon: <FaVideo aria-hidden="true" />, b: t('trust.teleB'), rest: t('trust.teleR') },
    { icon: <FaRegClock aria-hidden="true" />, b: t('trust.expB'), rest: t('trust.expR') },
  ];

  return (
    <section className="trust-strip" aria-label={t('trust.aria')}>
      <div className="trust-strip-inner container">
        {items.map((it, i) => (
          <div className="trust-item" key={i}>
            {it.icon}
            <span><b>{it.b}</b> {it.rest}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;
