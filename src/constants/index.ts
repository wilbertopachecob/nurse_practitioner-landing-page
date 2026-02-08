/**
 * Application Constants
 * 
 * Centralized location for all constants used across the application.
 * This file serves as a single source of truth for:
 * - Contact information (phone, website, practice details)
 * - Social media URLs
 * - Maps and location URLs
 * - Design constants (breakpoints, max-width, scroll offsets)
 * - Section IDs for navigation
 * - Image paths
 * - SEO metadata
 * 
 * @module constants
 */

// Contact Information
export const CONTACT = {
  phone: {
    display: '(918) 940-7158',
    tel: 'tel:+19189407158',
  },
  email: {
    address: 'mical.pacheco.pmhnp@gmail.com',
    mailto: 'mailto:mical.pacheco.pmhnp@gmail.com',
  },
  website: {
    url: 'https://choosecouragecounseling.com',
    display: 'choosecouragecounseling.com',
  },
  practice: {
    name: 'Choose Courage Counseling Services, PLLC',
    location: 'Broken Arrow, Oklahoma',
    fullAddress: 'Choose Courage Counseling Services, PLLC, Oklahoma',
  },
} as const;

// Social Media URLs
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/mical_pmhmp_bc',
  facebook: 'https://www.facebook.com/share/1DDE8X49tk/?mibextid=wwXIfr',
  linkedin: 'https://www.linkedin.com/in/mical-pacheco',
} as const;

// Maps & URLs
export const MAPS = {
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.0353155873504!2d-95.8159775!3d36.019431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b68fec138063a9%3A0xd943730f976ad4fc!2sChoose%20Courage%20Counseling%20Services%2C%20PLLC!5e0!3m2!1sen!2sus!4v1769993515324!5m2!1sen!2sus',
  linkUrl: 'https://maps.app.goo.gl/7YCbg6GRQkDDahCXA?g_st=ic',
} as const;

// Base URL for SEO
export const BASE_URL = 'https://micalpacheco.com/' as const;

// Design Constants
export const DESIGN = {
  maxWidth: 1200,
  breakpoints: {
    tablet: 968,
    mobile: 768,
    small: 480,
  },
  scrollOffset: 20, // Header offset for smooth scrolling
} as const;

// Section IDs for Navigation
export const SECTIONS = {
  home: 'home',
  about: 'about',
  services: 'services',
  credentials: 'credentials',
  contact: 'contact',
} as const;

// Image Paths (query string busts cache when you deploy a new image)
export const IMAGES = {
  profile: {
    // Responsive image sources for different viewport sizes
    src500: '/images/MPFInalImages-4_Original_500w.jpeg?v=2',
    src1000: '/images/MPFInalImages-4_Original_1000w.jpeg?v=2',
    src1200: '/images/MPFInalImages-4_Original.jpeg?v=2', // Fallback/desktop
  },
  businessCardQr: '/images/bussiness_card_work.png',
} as const;

// SEO Meta Descriptions
export const SEO = {
  descriptions: {
    en: 'Board-certified Psychiatric Mental Health Nurse Practitioner providing comprehensive psychiatric evaluation and medication management. Accepting new patients. Bilingual services (English/Spanish). Telehealth available. Located in Broken Arrow, Oklahoma.',
    es: 'Enfermera Practicante de Salud Mental Psiquiátrica certificada que brinda evaluación psiquiátrica integral y manejo de medicamentos. Aceptando nuevos pacientes. Servicios bilingües (Inglés/Español). Telemedicina disponible. Ubicada en Broken Arrow, Oklahoma.',
  },
  titles: {
    en: 'Mical Pacheco, PMHNP-BC | Board-Certified Psychiatric Nurse Practitioner | Broken Arrow, OK',
    es: 'Mical Pacheco, PMHNP-BC | Enfermera Practicante Psiquiátrica Certificada | Broken Arrow, OK',
  },
} as const;
