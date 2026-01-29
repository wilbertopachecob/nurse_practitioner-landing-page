import PropTypes from 'prop-types';
import './IconWrapper.css';

/**
 * IconWrapper Component
 * Reusable wrapper for icons with consistent styling and hover effects
 * 
 * @param {string} size - Size variant: 'small' (48px), 'medium' (56px), 'large' (70px)
 * @param {string} variant - Color variant: 'primary' (default), 'secondary'
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Icon element to wrap
 * @param {boolean} ariaHidden - Whether to hide icon from screen readers
 */
const IconWrapper = ({ size = 'medium', variant = 'primary', className = '', children, ariaHidden = true }) => {
  return (
    <div 
      className={`icon-wrapper icon-wrapper-${size} icon-wrapper-${variant} ${className}`.trim()}
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  );
};

IconWrapper.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  ariaHidden: PropTypes.bool,
};

export default IconWrapper;
