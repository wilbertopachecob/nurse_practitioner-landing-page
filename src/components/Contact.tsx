import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaGlobe, FaMapMarkerAlt, FaExternalLinkAlt, FaQrcode } from 'react-icons/fa';
import { CONTACT, MAPS, SECTIONS, IMAGES } from '@/constants';
import IconWrapper from '@/components/IconWrapper/IconWrapper';
import '@/components/Contact.css';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [qrImageError, setQrImageError] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadMap(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before the map enters viewport
      }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="contact section" id={SECTIONS.contact} aria-labelledby="contact-heading">
      <h2 id="contact-heading">{t('contact.title')}</h2>
      <div className="contact-content">
        <address className="contact-info">
          <a 
            href={CONTACT.phone.tel}
            className="contact-item parent-hover"
            aria-label={`${t('aria.call')} ${CONTACT.phone.display}`}
          >
            <IconWrapper size="medium" className="icon-wrapper-rotate-right">
              <FaPhone />
            </IconWrapper>
            <div className="contact-content-wrapper">
              <h3>{t('contact.phone')}</h3>
              <p>{CONTACT.phone.display}</p>
            </div>
          </a>
          <a 
            href={CONTACT.website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item parent-hover"
            aria-label={`${t('aria.visit')} ${CONTACT.website.display}`}
          >
            <IconWrapper size="medium" className="icon-wrapper-rotate-right">
              <FaGlobe />
            </IconWrapper>
            <div className="contact-content-wrapper">
              <h3>{t('contact.website')}</h3>
              <p>{CONTACT.website.display}</p>
            </div>
          </a>
            <a 
            href={MAPS.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-item parent-hover"
            aria-label={`${t('contact.location')} - ${t('aria.viewOnGoogleMaps')}`}
          >
            <IconWrapper size="medium" className="icon-wrapper-rotate-right">
              <FaMapMarkerAlt />
            </IconWrapper>
            <div className="contact-content-wrapper">
              <h3>{t('contact.location')}</h3>
              <p>{t('contact.practice')}</p>
            </div>
          </a>
          <div className="contact-item contact-qr-card">
            <IconWrapper size="medium" className="icon-wrapper-rotate-right">
              <FaQrcode />
            </IconWrapper>
            <div className="contact-content-wrapper">
              <h3>{t('contact.businessCard')}</h3>
              <p>{t('contact.businessCardDesc')}</p>
              <div className="qr-code-container">
                {qrImageError ? (
                  <div className="qr-code-placeholder">
                    <FaQrcode className="qr-placeholder-icon" />
                    <p className="qr-placeholder-text">
                      QR code image not found.
                      <br />
                      Please add your QR code image to:
                      <br />
                      <code className="qr-placeholder-code">public/images/business-card-qr.png</code>
                    </p>
                  </div>
                ) : (
                  <img
                    src={IMAGES.businessCardQr}
                    alt={t('contact.businessCard')}
                    className="qr-code-image"
                    loading="lazy"
                    width="200"
                    height="200"
                    onError={() => setQrImageError(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </address>
        <div className="contact-map">
          <div className="contact-map-container" ref={mapContainerRef}>
            {shouldLoadMap ? (
              <iframe src={MAPS.embedUrl} 
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${t('contact.location')} - ${CONTACT.practice.name}`}
                aria-label={`${t('aria.mapShowingLocation')} ${CONTACT.practice.fullAddress}`}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                }}
                aria-label={t('aria.mapLoading')}
              >
                <FaMapMarkerAlt
                  style={{
                    fontSize: '3rem',
                    color: 'var(--text-tertiary)',
                    opacity: 0.5,
                  }}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <p className="map-link">
            <a
              href={MAPS.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('contact.location')} - {t('aria.viewOnGoogleMaps')}
              <FaExternalLinkAlt aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
