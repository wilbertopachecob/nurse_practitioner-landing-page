import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SEO = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Update document language
    document.documentElement.lang = currentLang;

    // Update meta description based on language
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (currentLang === 'es') {
        metaDescription.setAttribute(
          'content',
          'Enfermera Practicante de Salud Mental Psiquiátrica certificada que brinda evaluación psiquiátrica integral y manejo de medicamentos. Aceptando nuevos pacientes. Servicios bilingües (Inglés/Español). Telemedicina disponible. Ubicada en Broken Arrow, Oklahoma.'
        );
      } else {
        metaDescription.setAttribute(
          'content',
          'Board-certified Psychiatric Mental Health Nurse Practitioner providing comprehensive psychiatric evaluation and medication management. Accepting new patients. Bilingual services (English/Spanish). Telehealth available. Located in Broken Arrow, Oklahoma.'
        );
      }
    }

    // Update title based on language
    if (currentLang === 'es') {
      document.title = 'Mical Pacheco, PMHNP-BC | Enfermera Practicante Psiquiátrica Certificada | Broken Arrow, OK';
    } else {
      document.title = 'Mical Pacheco, PMHNP-BC | Board-Certified Psychiatric Nurse Practitioner | Broken Arrow, OK';
    }

    // Update canonical URL with language parameter
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const baseUrl = 'https://choosecouragecounseling.com/';
      canonical.setAttribute('href', currentLang === 'es' ? `${baseUrl}?lang=es` : baseUrl);
    }
  }, [currentLang, t]);

  return null; // This component doesn't render anything
};

export default SEO;
