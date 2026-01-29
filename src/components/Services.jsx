import { useTranslation } from 'react-i18next';
import { 
  FaStethoscope, 
  FaPills, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaLanguage,
  FaVideo,
  FaBrain,
  FaHandsHelping
} from 'react-icons/fa';
import { SECTIONS } from '@/constants';
import IconWrapper from '@/components/IconWrapper/IconWrapper';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaStethoscope />,
      title: t('services.evaluations'),
      description: t('services.evaluationsDesc')
    },
    {
      icon: <FaPills />,
      title: t('services.medication'),
      description: t('services.medicationDesc')
    },
    {
      icon: <FaShieldAlt />,
      title: t('services.risk'),
      description: t('services.riskDesc')
    },
    {
      icon: <FaExclamationTriangle />,
      title: t('services.crisis'),
      description: t('services.crisisDesc')
    },
    {
      icon: <FaLanguage />,
      title: t('services.bilingual'),
      description: t('services.bilingualDesc')
    },
    {
      icon: <FaVideo />,
      title: t('services.telehealth'),
      description: t('services.telehealthDesc')
    },
    {
      icon: <FaBrain />,
      title: t('services.therapy'),
      description: t('services.therapyDesc')
    },
    {
      icon: <FaHandsHelping />,
      title: t('services.coordination'),
      description: t('services.coordinationDesc')
    }
  ];

  return (
    <section className="services section pattern-dots" id={SECTIONS.services} aria-labelledby="services-heading">
      <h2 id="services-heading">{t('services.title')}</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <article key={index} className="service-card parent-hover">
            <IconWrapper size="large" className="icon-wrapper-rotate-right">
              {service.icon}
            </IconWrapper>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
