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
    display: '(918) 417-2969 ',
    tel: 'tel:+19184172969',
  },
  email: {
    address: 'mical.pacheco.pmhnp@gmail.com',
    mailto: 'mailto:mical.pacheco.pmhnp@gmail.com',
  },
  website: {
    url: 'https://www.mindrejuvenation.net/',
    display: 'www.mindrejuvenation.net',
  },
  practice: {
    name: 'Mind Rejuvenation',
    address: '4922 E 73rd St, Tulsa, OK 74136',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=4922+E+73rd+St+Tulsa+OK+74136',
  },
  drue: {
    name: 'Drue Day Counseling & Consulting',
    phone: {
      display: '(918) 609-0404',
      tel: 'tel:+19186090404',
    },
    website: {
      url: 'https://www.druedaycounseling.com/',
      display: 'www.druedaycounseling.com',
    },
    address: '1560 E 21st St Ste 320, Tulsa, OK 74114',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=1560+E+21st+St+Ste+320+Tulsa+OK+74114',
    booking: 'https://drueday.clientsecure.me',
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
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51607.65952950128!2d-95.99746227264406!3d36.057425945893876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b6924227674b4b%3A0x4dfb54d1248fb6f5!2sMind%20Rejuvenation!5e0!3m2!1sen!2sus!4v1771086885120!5m2!1sen!2sus',
  linkUrl: CONTACT.practice.mapsUrl,
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
  approach: 'approach',
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
    en: "Tulsa's #1 bilingual (English/Spanish) psychiatric nurse practitioner. Board-certified PMHNP at Mind Rejuvenation and Drue Day. Accepting new patients.",
    es: 'La enfermera practicante psiquiátrica bilingüe (inglés/español) #1 en Tulsa. PMHNP certificada en Mind Rejuvenation y Drue Day. Nuevos pacientes bienvenidos.',
  },
  titles: {
    en: "Mical Pacheco, PMHNP-BC | #1 Bilingual Psychiatric NP in Tulsa",
    es: 'Mical Pacheco, PMHNP-BC | NP psiquiátrica bilingüe #1 en Tulsa',
  },
} as const;
