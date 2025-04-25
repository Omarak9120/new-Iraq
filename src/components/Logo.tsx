
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Logo: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse-slow flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-background"></div>
      </div>
      <span className={`font-bold text-xl text-gradient ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
        الموقع
      </span>
    </div>
  );
};

export default Logo;
