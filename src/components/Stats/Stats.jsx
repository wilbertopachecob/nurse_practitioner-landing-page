import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Stats.css';

/**
 * Stats Component
 * Displays animated statistics that count up when scrolled into view
 * 
 * @param {number} value - Target number to count to
 * @param {string} label - Label text below the number
 * @param {string} prefix - Optional prefix (e.g., "$", "+")
 * @param {string} suffix - Optional suffix (e.g., "%", "+")
 * @param {ReactNode} icon - Optional icon element
 * @param {number} duration - Animation duration in milliseconds
 * @param {string} className - Additional CSS classes
 */
const StatItem = ({ value, label, prefix = '', suffix = '', icon = null, duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div ref={statRef} className={`stat-item ${className}`.trim()}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-value">
        {prefix}
        <span className="stat-number">{count}</span>
        {suffix}
      </div>
      {label && <div className="stat-label">{label}</div>}
    </div>
  );
};

StatItem.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  icon: PropTypes.node,
  duration: PropTypes.number,
  className: PropTypes.string,
};

/**
 * Stats Container Component
 * Wrapper for multiple stat items
 */
const Stats = ({ children, className = '' }) => {
  return (
    <div className={`stats-container ${className}`.trim()}>
      {children}
    </div>
  );
};

Stats.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Stats.Item = StatItem;

export default Stats;
