
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center rounded-full p-2 text-white bg-secondary overflow-hidden group hover-lift"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <Globe size={18} className="mr-2" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'ع'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
