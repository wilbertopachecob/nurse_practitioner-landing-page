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
  website: {
    url: 'https://choosecouragecounseling.com',
    display: 'choosecouragecounseling.com',
  },
  practice: {
    name: 'Choose Courage Counseling Services, PLLC',
    location: 'Broken Arrow, Oklahoma',
    fullAddress: 'Choose Courage Counseling Services, PLLC, Oklahoma',
  },
};

// Social Media URLs
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/ebellina555?igsh=MXI3NWN2cnI3Ymd1ZA%3D%3D&utm_source=qr',
  facebook: 'https://www.facebook.com/share/1DDE8X49tk/?mibextid=wwXIfr',
};

// Maps & URLs
export const MAPS = {
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1234567890123!2d-95.7890123456789!3d36.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYsLTk1Ljc4!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  linkUrl: 'https://maps.app.goo.gl/7YCbg6GRQkDDahCXA?g_st=ic',
};

// Base URL for SEO
export const BASE_URL = 'https://choosecouragecounseling.com/';

// Design Constants
export const DESIGN = {
  maxWidth: 1200,
  breakpoints: {
    tablet: 968,
    mobile: 768,
    small: 480,
  },
  scrollOffset: 20, // Header offset for smooth scrolling
};

// Section IDs for Navigation
export const SECTIONS = {
  home: 'home',
  about: 'about',
  services: 'services',
  credentials: 'credentials',
  contact: 'contact',
};

// Image Paths
export const IMAGES = {
  profile: '/images/MPFInalImages-4_Original.jpeg',
};

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
};
