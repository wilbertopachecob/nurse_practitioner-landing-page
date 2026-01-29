import { useTranslation } from 'react-i18next';
import { FaPhone, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{t('contact.title')}</h2>
      <div className="contact-content">
        <address className="contact-info">
          <div className="contact-item">
            <FaPhone aria-hidden="true" />
            <div>
              <h3>{t('contact.phone')}</h3>
              <a href="tel:+19189407158" aria-label="Call (918) 940-7158">(918) 940-7158</a>
            </div>
          </div>
          <div className="contact-item">
            <FaGlobe aria-hidden="true" />
            <div>
              <h3>{t('contact.website')}</h3>
              <a href="https://choosecouragecounseling.com" target="_blank" rel="noopener noreferrer">
                choosecouragecounseling.com
              </a>
            </div>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt aria-hidden="true" />
            <div>
              <h3>{t('contact.location')}</h3>
              <p>{t('contact.practice')}</p>
            </div>
          </div>
        </address>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1234567890123!2d-95.7890123456789!3d36.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYsLTk1Ljc4!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${t('contact.location')} - Choose Courage Counseling Services`}
            aria-label={`Map showing location of ${t('contact.practice')}`}
          ></iframe>
          <p className="map-link">
            <a 
              href="https://maps.app.goo.gl/7YCbg6GRQkDDahCXA?g_st=ic" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {t('contact.location')} - View on Google Maps
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
