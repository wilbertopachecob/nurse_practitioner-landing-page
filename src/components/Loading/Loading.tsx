import type { SpinnerProps, SkeletonProps, ProgressBarProps, ShimmerProps } from '@/types';
import './Loading.css';

/**
 * Spinner Component
 * Loading spinner with customizable size and color
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`spinner spinner-${size} ${className}`.trim()} aria-label="Loading" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Skeleton Loader Component
 * Placeholder content while loading
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className = '',
  rounded = true,
}) => {
  const style: React.CSSProperties = {
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

/**
 * Progress Bar Component
 * Progress indicator with percentage
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  showLabel = false,
  className = '',
}) => {
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

/**
 * Shimmer Effect Component
 * Shimmer animation for loading states
 */
export const Shimmer: React.FC<ShimmerProps> = ({ children, className = '' }) => {
  return (
    <div className={`shimmer-wrapper ${className}`.trim()}>
      <div className="shimmer">{children}</div>
    </div>
  );
};
