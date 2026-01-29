import type { IconWrapperProps } from '@/types';
import './IconWrapper.css';

/**
 * IconWrapper Component
 * Reusable wrapper for icons with consistent styling and hover effects
 */
const IconWrapper: React.FC<IconWrapperProps> = ({
  size = 'medium',
  variant = 'primary',
  className = '',
  children,
  ariaHidden = true,
  badge = null,
  animated = false,
}) => {
  return (
    <div
      className={`icon-wrapper icon-wrapper-${size} icon-wrapper-${variant} ${animated ? 'icon-wrapper-animated' : ''} ${className}`.trim()}
      aria-hidden={ariaHidden}
    >
      {children}
      {badge && <span className="icon-badge">{badge}</span>}
    </div>
  );
};

export default IconWrapper;
