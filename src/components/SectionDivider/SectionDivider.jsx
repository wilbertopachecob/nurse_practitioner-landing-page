import PropTypes from 'prop-types';
import './SectionDivider.css';

/**
 * SectionDivider Component
 * Decorative dividers between sections with multiple style variants
 * 
 * @param {string} variant - Style variant: 'wave', 'curve', 'diagonal', 'gradient'
 * @param {boolean} flip - Flip the divider horizontally
 * @param {string} className - Additional CSS classes
 */
const SectionDivider = ({ variant = 'wave', flip = false, className = '' }) => {
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

SectionDivider.propTypes = {
  variant: PropTypes.oneOf(['wave', 'curve', 'diagonal', 'gradient']),
  flip: PropTypes.bool,
  className: PropTypes.string,
};

export default SectionDivider;
