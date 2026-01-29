import Navigation from '@/components/Navigation';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container container">
        <Navigation />
        <div className="header-controls">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
