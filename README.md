# Nurse Practitioner Landing Page

Landing page for Mical Pacheco, PMHNP-BC - Board-Certified Psychiatric Mental Health Nurse Practitioner.

## Features

- 🌐 Bilingual support (English/Spanish) with browser language detection
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive design
- ♿ Accessible components
- 🧪 Unit tests with Vitest

## Tech Stack

- React 18
- Vite
- react-i18next for internationalization
- React Icons
- Vitest for testing

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Deployment

### Using PM2 on Raspberry Pi

1. Build the project:
```bash
npm run build
```

2. Install PM2 globally:
```bash
npm install -g pm2
npm install -g serve
```

3. Start the application:
```bash
pm2 start ecosystem.config.js
```

4. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Cloudflare Integration

The static build in the `dist` folder can be served via Cloudflare Pages or any static hosting service.

## Project Structure

```
src/
├── components/       # React components
├── contexts/        # React contexts (Theme, Language)
├── locales/         # Translation files (en.json, es.json)
├── styles/          # CSS files
├── utils/           # Utility functions
└── test/            # Test setup

```

## License

ISC
