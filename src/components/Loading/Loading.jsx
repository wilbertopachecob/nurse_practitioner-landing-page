import PropTypes from 'prop-types';
import './Loading.css';

/**
 * Spinner Component
 * Loading spinner with customizable size and color
 */
export const Spinner = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`spinner spinner-${size} ${className}`.trim()} aria-label="Loading" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

/**
 * Skeleton Loader Component
 * Placeholder content while loading
 */
export const Skeleton = ({ width, height, className = '', rounded = true }) => {
  const style = {
    width: width || '100%',
    height: height || '1rem',
  };

  return (
    <div
      className={`skeleton ${rounded ? 'skeleton-rounded' : ''} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
};

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
};

/**
 * Progress Bar Component
 * Progress indicator with percentage
 */
export const ProgressBar = ({ value = 0, max = 100, showLabel = false, className = '' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`progress-bar ${className}`.trim()}>
      {showLabel && (
        <div className="progress-label">
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Shimmer Effect Component
 * Shimmer animation for loading states
 */
export const Shimmer = ({ children, className = '' }) => {
  return (
    <div className={`shimmer-wrapper ${className}`.trim()}>
      <div className="shimmer">{children}</div>
    </div>
  );
};

Shimmer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
