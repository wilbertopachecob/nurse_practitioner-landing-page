import { memo } from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { SOCIAL_MEDIA } from '@/constants';
import '@/components/SocialIcons.css';

const SocialIcons = memo(() => {
  return (
    <div className="social-icons">
      <a
        href={SOCIAL_MEDIA.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a
        href={SOCIAL_MEDIA.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FaFacebook />
      </a>
      <a
        href={SOCIAL_MEDIA.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>
    </div>
  );
});

SocialIcons.displayName = 'SocialIcons';

export default SocialIcons;
