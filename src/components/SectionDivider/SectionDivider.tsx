import type { SectionDividerProps } from '@/types';
import './SectionDivider.css';

/**
 * SectionDivider Component
 * Decorative dividers between sections with multiple style variants
 */
const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  flip = false,
  className = '',
}) => {
  return (
    <div
      className={`section-divider section-divider-${variant} ${flip ? 'section-divider-flip' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      {variant === 'wave' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="divider-svg"
        >
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      )}
      {variant === 'curve' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="divider-svg"
        >
          <path
            d="M0,120 Q600,0 1200,120"
            fill="currentColor"
          />
        </svg>
      )}
      {variant === 'diagonal' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="divider-svg"
        >
          <polygon points="0,0 1200,120 1200,0" fill="currentColor" />
        </svg>
      )}
      {variant === 'gradient' && (
        <div className="divider-gradient" />
      )}
    </div>
  );
};

export default SectionDivider;
