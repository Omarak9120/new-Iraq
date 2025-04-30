import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center px-4 transition-opacity hover:opacity-80"
    >
      <img
        src="/sharek-logo.png"
        alt="Sharek logo - شارك"
        className="h-12 md:h-16 w-auto object-contain"
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
