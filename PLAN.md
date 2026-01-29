# Nurse Practitioner Landing Page Implementation Plan

## Project Setup

1. **Initialize Git Repository**
   - Run `git init` in the project root
   - Create initial `.gitignore` for React/Node projects

2. **Create React Application**
   - Use `create-react-app` or `vite` (prefer Vite for better performance)
   - Set up project structure with modern tooling
   - Configure for production build optimization

## Content Extraction from Images and Resume

**From Instagram Post (promotional graphic):**
- Name: Mical Pacheco, PMHNP-BC
- Title: Board-Certified Psychiatric Nurse Practitioner
- Services: Psychiatric Medication Management
- Key Message: "Accepting New Patients"
- Call to Action: "BOOK AN APPOINTMENT - TELEHEALTH AVAILABLE"
- Contact: Phone (918) 940-7158, Website: choosecouragecounseling.com

**From Resume (notes.md):**
- Full Name: Mical Pacheco, MSN, APRN, PMHNP-BC
- Location: Broken Arrow, Oklahoma
- Bilingual: English / Spanish
- Current Position: Psychiatric Mental Health Nurse Practitioner at Choose Courage Counseling Services, PLLC (2026–Present)
- Education: 
  - Master of Science in Nursing – Psychiatric Mental Health Nurse Practitioner, Saint Louis University (December 2025, GPA: 3.72)
  - Bachelor of Science in Nursing, Northeastern State University (2021)
  - Associate Degree in Nursing, Tulsa Community College (2016)
- Licensure & Certifications: PMHNP-BC (ANCC), APRN – Oklahoma, RN Compact License, BLS, ACLS, CPR
- Languages: English (Native), Spanish (Clinical/Conversational)
- Services: Comprehensive psychiatric evaluations, DSM-5-TR diagnostic assessments, medication management, suicide/violence risk assessments, safety planning, crisis intervention, bilingual psychiatric care
- Psychotherapeutic Modalities: Cognitive Behavioral Therapy (CBT), Supportive Psychotherapy, Motivational Interviewing, Trauma-Informed Care, Psychoeducation
- Extensive RN experience: Inpatient Psychiatry, Hospice & Home Health, Acute Care, Public Health

**Social Media Links:**
- Instagram: https://www.instagram.com/ebellina555?igsh=MXI3NWN2cnI3Ymd1ZA%3D%3D&utm_source=qr
- Facebook: https://www.facebook.com/share/1DDE8X49tk/?mibextid=wwXIfr

**Location:**
- Choose Courage Counseling Services: https://maps.app.goo.gl/7YCbg6GRQkDDahCXA?g_st=ic
- Include embedded Google Map in Contact section

**Profile Picture Selection:**
- Use `images/MPFInalImages-4_Original.jpeg` as the main profile picture (professional portrait with dark blazer, seated on black stool)
- This image features excellent composition, professional attire, warm smile, and clean off-white background
- Additional images available: `IMG_0479.png`, `MPFInalImages-1_Original.jpeg`, `MPFInalImages-2_Original.jpeg`, `MPFInalImages-3_Original.jpeg` (alternative professional portraits)
- Promotional graphic: `images/Instagram Post.png` (contains design inspiration and content)

## Landing Page Structure

Create the following sections based on typical PMHNP landing pages and extracted content:

1. **Hero Section**
   - Large profile picture
   - Name and credentials (Mical Pacheco, PMHNP-BC)
   - Title: Board-Certified Psychiatric Nurse Practitioner
   - Key message: "Accepting New Patients"
   - Primary CTA button: "Book Appointment"
   - Secondary CTA: "Telehealth Available"

2. **About Section**
   - Professional Summary: Board-certified PMHNP providing comprehensive psychiatric evaluation and medication management across the lifespan
   - Highlight: Over a decade of nursing experience across inpatient psychiatry, outpatient behavioral health, hospice, acute care, and public health
   - Approach: Culturally responsive, trauma-informed psychiatric care in both English and Spanish
   - Education: MSN from Saint Louis University (2025), BSN from Northeastern State University (2021), ADN from Tulsa Community College (2016)
   - Location: Broken Arrow, Oklahoma

3. **Services Section**
   - Comprehensive Psychiatric Evaluations (DSM-5-TR diagnostic assessments across the lifespan)
   - Medication Management (initiation, titration, and monitoring)
   - Suicide and Violence Risk Assessments & Safety Planning
   - Crisis Intervention
   - Bilingual Psychiatric Care (English/Spanish)
   - Telehealth Services (HIPAA-compliant)
   - Psychotherapeutic Modalities: CBT, Supportive Psychotherapy, Motivational Interviewing, Trauma-Informed Care, Psychoeducation
   - Interdisciplinary Care Coordination

4. **Credentials/Certifications Section**
   - PMHNP-BC (ANCC Board Certification)
   - APRN – Oklahoma License
   - RN Compact License
   - BLS, ACLS, CPR Certified
   - Current Position: Choose Courage Counseling Services, PLLC (2026–Present)
   - Languages: English (Native), Spanish (Clinical/Conversational)

5. **Contact Section**
   - Phone: (918) 940-7158
   - Website: choosecouragecounseling.com
   - Location: Choose Courage Counseling Services, PLLC, Oklahoma
   - Embedded Google Map showing practice location
   - Contact form (optional)
   - Office hours (if available)

6. **Footer**
   - Social media icons with links:
     - Instagram: https://www.instagram.com/ebellina555
     - Facebook: https://www.facebook.com/share/1DDE8X49tk
   - Copyright information
   - Additional links (privacy policy, terms if applicable)

## Design Implementation

**Styling Approach:**
- White background (`#FFFFFF` or `#FDFDFC` for slight warmth) for light theme
- Dark theme support with dark background and light text
- Clean, minimalist design inspired by the promotional graphic
- Soft accent colors (peach/pinkish-tan `#EFE8E5` or similar) for highlights in light theme
- Dark theme accent colors to be determined (maintain professional appearance)
- Professional typography: serif for headings, sans-serif for body
- Responsive design (mobile-first)
- Modern CSS with CSS Modules or styled-components
- CSS variables for theme switching (light/dark)

**Icons:**
- Social media: LinkedIn, Instagram, Facebook icons
- Professional icons: stethoscope, medical cross, heart, brain/mental health, calendar/appointment, phone, email, location pin
- Use React Icons library or similar for consistent iconography
- Language toggle icon (EN/ES)
- Theme toggle icon (sun/moon)

## Internationalization (i18n) & Language Support

**Spanish Translation:**
- Full website translation to Spanish
- All content sections must be translated:
  - Hero section (name, title, CTAs)
  - About section (professional summary, education, approach)
  - Services section (all service descriptions)
  - Credentials section (certifications and licenses)
  - Contact section (labels, form fields)
  - Footer (copyright, links)

**Language Detection & Toggle:**
- Browser language detection using `navigator.language` or `navigator.languages` API
- Auto-detect Spanish (`es`, `es-*`) and serve Spanish version by default
- Default to English for all other languages
- Language toggle button in header/navigation (EN/ES)
- Persist language preference in localStorage
- Update all text content dynamically when language changes

**Translation Implementation:**
- Create translation files: `src/locales/en.json` and `src/locales/es.json`
- Use React Context API or i18n library (react-i18next recommended) for translation management
- All components should use translation keys instead of hardcoded text
- Ensure proper Spanish translations for medical/clinical terminology

## Theme Management

**Dark Theme Support:**
- Dark theme toggle button (sun/moon icon) in header/navigation
- Toggle between light and dark themes
- Persist theme preference in localStorage
- Apply theme on initial page load based on saved preference
- Smooth theme transitions (CSS transitions)
- Ensure all components support both themes
- Maintain accessibility contrast ratios in both themes
- Professional color scheme for dark theme (not harsh black, use dark grays/blues)

## Technical Considerations for Raspberry Pi 5 Hosting

1. **Build Optimization**
   - Configure production build with optimizations
   - Minimize bundle size
   - Enable code splitting

2. **PM2 Configuration**
   - Create `ecosystem.config.js` for PM2
   - Configure for serving static React build
   - Set up process management

3. **Cloudflare Integration**
   - Ensure static assets are properly referenced
   - Configure for CDN delivery
   - Set up proper caching headers

## File Structure

```
nurse_practitioner-landing-page/
├── public/
│   ├── index.html
│   └── images/ (images already present)
│       ├── IMG_0479.png
│       ├── Instagram Post.png
│       ├── MPFInalImages-1_Original.jpeg
│       ├── MPFInalImages-2_Original.jpeg
│       ├── MPFInalImages-3_Original.jpeg
│       └── MPFInalImages-4_Original.jpeg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Credentials.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── SocialIcons.jsx
│   │   ├── LanguageToggle.jsx
│   │   └── ThemeToggle.jsx
│   ├── contexts/
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── locales/
│   │   ├── en.json
│   │   └── es.json
│   ├── styles/
│   │   ├── global.css
│   │   ├── themes.css (CSS variables for light/dark themes)
│   │   └── components/ (component-specific styles)
│   ├── utils/
│   │   └── languageDetector.js
│   ├── App.jsx
│   └── index.js
├── images/ (source images - will copy to public/images)
├── notes.md
├── .gitignore
├── package.json
├── ecosystem.config.js (for PM2)
└── README.md
```

## Implementation Steps

1. Initialize git repository
2. Create React app with Vite (faster, lighter than CRA)
3. Set up project structure and install dependencies (including react-i18next)
4. Copy images from `images/` folder to `public/images/` for use in the React app
5. Set up i18n configuration with English and Spanish translation files
6. Create LanguageContext and ThemeContext for state management
7. Implement browser language detection utility
8. Create LanguageToggle and ThemeToggle components
9. Set up CSS variables for theme switching (light/dark)
10. Create component structure
11. Translate all content to Spanish and populate translation files
12. Implement Hero section with profile picture and extracted content (with i18n)
13. Build remaining sections with full resume content (About, Services, Credentials sections) - all with i18n
14. Add social media icons and professional icons
15. Style with white background and professional design (light theme)
16. Implement dark theme styling
17. Make responsive for mobile/tablet/desktop
18. Test language switching and theme switching
19. Configure PM2 ecosystem file
20. Test production build
21. Create README with deployment instructions

## Dependencies

- React + ReactDOM
- React Router (if multi-page navigation needed)
- React Icons (for social media and professional icons)
- react-i18next & i18next (for internationalization/translation)
- CSS Modules or styled-components (for styling)
- Vite (build tool)

## Additional Implementation Details

**Google Map Integration:**
- Use Google Maps Embed API or iframe to display Choose Courage Counseling Services location
- Map link: https://maps.app.goo.gl/7YCbg6GRQkDDahCXA?g_st=ic
- Extract address from map or use iframe embed code
- Ensure map is responsive and works on mobile devices

**Content Notes:**
- All resume content has been extracted and included in the plan
- Social media links are provided and should be linked correctly
- Bilingual services (English/Spanish) should be prominently featured
- Telehealth availability should be highlighted throughout

**Translation Requirements:**
- All user-facing text must be translatable
- Medical terminology should be accurately translated to Spanish
- Maintain professional tone in both languages
- Consider cultural nuances in Spanish translations
- Test with native Spanish speakers if possible

**Theme Requirements:**
- Light theme: White/off-white background with dark text
- Dark theme: Dark background (dark gray/blue) with light text
- Ensure readability and accessibility in both themes
- Maintain brand colors and professional appearance
- Smooth transitions between themes

## Todo List

- [ ] Initialize git repository and create .gitignore
- [ ] Create React app using Vite with TypeScript support
- [ ] Set up project folder structure (components, styles, assets, contexts, locales, utils)
- [ ] Install dependencies (react-i18next, i18next, react-icons)
- [ ] Copy images from images/ folder to public/images/ directory for React app
- [ ] Set up i18n configuration and create translation files (en.json, es.json)
- [ ] Create LanguageContext for language state management
- [ ] Create ThemeContext for theme state management
- [ ] Implement browser language detection utility (navigator.language API)
- [ ] Create LanguageToggle component with EN/ES button
- [ ] Create ThemeToggle component with sun/moon icon
- [ ] Set up CSS variables for light and dark themes
- [ ] Translate all content to Spanish and populate es.json
- [ ] Create Hero component with profile picture and extracted content (with i18n)
- [ ] Create About section with full professional summary, education, and approach to care from resume (with i18n)
- [ ] Create Services section with Psychiatric Medication Management (with i18n)
- [ ] Create Credentials/Certifications section (with i18n)
- [ ] Create Contact section with phone, website, and embedded Google Map (with i18n)
- [ ] Integrate embedded Google Map for Choose Courage Counseling Services location
- [ ] Create Footer with social media icons (Instagram and Facebook with actual links) (with i18n)
- [ ] Add professional icons throughout sections (medical, appointment, etc.)
- [ ] Implement light theme styling (white background design with professional styling)
- [ ] Implement dark theme styling (dark background with light text)
- [ ] Make responsive for mobile/tablet/desktop
- [ ] Test language switching functionality (EN/ES toggle)
- [ ] Test theme switching functionality (light/dark toggle)
- [ ] Test browser language detection on initial load
- [ ] Verify localStorage persistence for language and theme preferences
- [ ] Create PM2 ecosystem.config.js for Raspberry Pi deployment
- [ ] Test production build and verify all assets load correctly
- [ ] Test production build with both languages and themes
