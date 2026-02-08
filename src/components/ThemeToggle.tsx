import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import '@/components/ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`${t('aria.switchTo')} ${theme === 'light' ? t('aria.dark') : t('aria.light')} ${t('aria.theme')}`}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
