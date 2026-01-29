import { useState, useEffect, useRef } from 'react';
import type { StatItemProps, StatsProps } from '@/types';
import './Stats.css';

/**
 * Stats Component
 * Displays animated statistics that count up when scrolled into view
 */
const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  icon = null,
  duration = 2000,
  className = '',
}) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const statRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const currentRef = statRef.current;
    if (!currentRef) return;

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

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number): void => {
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

/**
 * Stats Container Component
 * Wrapper for multiple stat items
 */
const Stats: React.FC<StatsProps> & { Item: React.FC<StatItemProps> } = ({ children, className = '' }) => {
  return (
    <div className={`stats-container ${className}`.trim()}>
      {children}
    </div>
  );
};

Stats.Item = StatItem;

export default Stats;
