import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './SocialIcons.css';

const SocialIcons = () => {
  return (
    <div className="social-icons">
      <a 
        href="https://www.instagram.com/ebellina555?igsh=MXI3NWN2cnI3Ymd1ZA%3D%3D&utm_source=qr" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a 
        href="https://www.facebook.com/share/1DDE8X49tk/?mibextid=wwXIfr" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FaFacebook />
      </a>
    </div>
  );
};

export default SocialIcons;
