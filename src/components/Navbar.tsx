import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: t('الرئيسية', 'Home'), href: '/' },
    { title: t('المرشحون', 'Candidates'), href: '/candidates' },
    { title: t('التصويت', 'Voting'), href: '/voting' },
    { title: t('النتائج', 'Results'), href: '/results' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center">
            <div className={`flex items-center ${
              language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'
            }`}>
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative"
                >
                  <Link
                    to={item.href}
                    className={`text-foreground/80 hover:text-foreground transition-colors text-sm font-medium px-4 ${
                      location.pathname === item.href ? 'text-primary' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Right side - Auth buttons & Language */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSwitcher />
            
            <div className="hidden md:flex space-x-2 items-center">
              <Button variant="outline" size="sm">
                {t('تسجيل الدخول', 'Login')}
              </Button>
              <Button variant="primary" size="sm">
                {t('إنشاء حساب', 'Sign Up')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <motion.button 
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-card/95 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className={`block py-2 px-4 text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors ${
                    location.pathname === item.href ? 'text-primary bg-primary/10' : ''
                  } ${language === 'ar' ? 'text-right' : ''}`}
                  initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </motion.a>
              ))}
              <div className="flex space-x-2 mt-4 px-4">
                <Button variant="outline" size="sm" className="flex-1">
                  {t('تسجيل الدخول', 'Login')}
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  {t('إنشاء حساب', 'Sign Up')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
