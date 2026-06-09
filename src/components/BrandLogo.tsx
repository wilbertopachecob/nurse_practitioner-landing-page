import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@/constants';
import '@/components/BrandLogo.css';

interface BrandLogoProps {
  variant?: 'header' | 'footer';
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'header' }) => {
  const { t } = useTranslation();

  return (
    <a
      href={`#${SECTIONS.home}`}
      className={`brand-logo brand-logo--${variant}`}
      aria-label={t('brand.home')}
    >
      <span className="brand-mark" aria-hidden="true">
        MP
      </span>
      <span className="brand-text">
        <span className="brand-name">Mical Pacheco</span>
        <span className="brand-credentials">{t('brand.credentials')}</span>
      </span>
    </a>
  );
};

export default BrandLogo;
