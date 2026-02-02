import type { BadgeProps } from '@/types';
import '@/components/Badge/Badge.css';

/**
 * Badge Component
 * Status badges, notification badges, and decorative badges
 */
const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'medium',
  icon = null,
  className = '',
  children,
}) => {
  return (
    <span
      className={`badge badge-${variant} badge-${size} ${icon ? 'badge-with-icon' : ''} ${className}`.trim()}
    >
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-content">{children}</span>
    </span>
  );
};

export default Badge;
