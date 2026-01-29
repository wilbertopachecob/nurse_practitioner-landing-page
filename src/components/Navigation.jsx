import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';
import { SECTIONS } from '@/constants';
import { scrollToSection } from '@/utils/scroll';
import { useMobile } from '@/hooks/useMobile';
import './Navigation.css';

const Navigation = () => {
  const { t } = useTranslation();
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const navRefs = useRef([]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    scrollToSection(targetId);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { id: SECTIONS.home, label: t('nav.home') },
    { id: SECTIONS.about, label: t('nav.about') },
    { id: SECTIONS.services, label: t('nav.services') },
    { id: SECTIONS.credentials, label: t('nav.credentials') },
    { id: SECTIONS.contact, label: t('nav.contact') }
  ];

  const handleKeyDown = (e, index) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (index + 1) % navItems.length;
        setFocusedIndex(newIndex);
        navRefs.current[newIndex]?.focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (index - 1 + navItems.length) % navItems.length;
        setFocusedIndex(newIndex);
        navRefs.current[newIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        setFocusedIndex(newIndex);
        navRefs.current[newIndex]?.focus();
        break;
      case 'End':
        e.preventDefault();
        newIndex = navItems.length - 1;
        setFocusedIndex(newIndex);
        navRefs.current[newIndex]?.focus();
        break;
      case 'Enter':
        e.preventDefault();
        scrollToSection(navItems[index].id);
        navRefs.current[index]?.blur();
        break;
      case ' ':
        e.preventDefault();
        scrollToSection(navItems[index].id);
        break;
      case 'Escape':
        e.preventDefault();
        navRefs.current[index]?.blur();
        setFocusedIndex(-1);
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = (e) => {
    // Only reset if focus is moving outside the menu
    if (!e.currentTarget.parentElement.parentElement.contains(e.relatedTarget)) {
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      // Don't close if clicking on the toggle button or inside navigation menu
      if (e.target.closest('.menu-toggle') || e.target.closest('.navigation-menu')) {
        return;
      }
      // Close menu if clicking outside navigation
      if (!e.target.closest('.navigation')) {
        setFocusedIndex(-1);
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    // Use a small timeout to ensure button onClick runs first
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <nav className="navigation" aria-label="Main navigation">
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div 
        className={`navigation-menu ${isMenuOpen ? 'nav-open' : ''}`}
        id="main-navigation"
      >
        <ul className="nav-list" role="menubar">
          {navItems.map((item, index) => (
            <li key={item.id} role="none">
              <a
                ref={(el) => (navRefs.current[index] = el)}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                className={`nav-link ${focusedIndex === index ? 'nav-link-focused' : ''}`}
                role="menuitem"
                tabIndex={isMobile ? (isMenuOpen ? 0 : -1) : 0}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
