import PropTypes from 'prop-types';
import './Badge.css';

/**
 * Badge Component
 * Status badges, notification badges, and decorative badges
 * 
 * @param {string} variant - Color variant: 'primary', 'success', 'info', 'warning', 'teal', 'purple', 'coral'
 * @param {string} size - Size variant: 'small', 'medium', 'large'
 * @param {ReactNode} icon - Optional icon element
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Badge content
 */
const Badge = ({ 
  variant = 'primary', 
  size = 'medium', 
  icon = null, 
  className = '', 
  children 
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

Badge.propTypes = {
  variant: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'teal', 'purple', 'coral', 'trust']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Badge;
