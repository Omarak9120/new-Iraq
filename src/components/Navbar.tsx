import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';
import './HamburgerMenu.css';

const Navbar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { title: t('الرئيسية', 'Home'), href: '/' },
    { title: t('المرشحون', 'Candidates'), href: '/candidates' },
    { title: t('التصويت', 'Voting'), href: '/voting' },
    { title: t('النتائج', 'Results'), href: '/results' },
  ];

  // Menu container variants
  const menuContainerVariants = {
    closed: {
      width: '48px',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      width: '240px',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  // Menu items variants
  const menuItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const handleNavigation = (path: string) => {
    setIsFloatingMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .floating-animation {
            animation: float 3s ease-in-out infinite;
          }
          .menu-backdrop {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      {/* Floating Menu Button */}
      <div className={`fixed top-6 ${language === 'ar' ? 'left-12' : 'right-12'} z-50`}>
        <motion.div
          className={`${!isFloatingMenuOpen ? 'floating-animation' : ''}`}
        >
          <motion.div
            className="menu-backdrop rounded-2xl overflow-hidden"
            variants={menuContainerVariants}
            initial="closed"
            animate={isFloatingMenuOpen ? "open" : "closed"}
          >
            {/* Menu Button */}
            <label className="hamburger">
              <input 
                type="checkbox" 
                checked={isFloatingMenuOpen}
                onChange={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
              />
              <svg viewBox="0 0 32 32">
                <path
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  className="line line-top-bottom"
                ></path>
                <path d="M7 16 27 16" className="line"></path>
              </svg>
            </label>

            {/* Menu Items */}
            <AnimatePresence>
              {isFloatingMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-2"
                >
                  {[
                    { text: t('تسجيل الدخول', 'Login'), onClick: () => handleNavigation('/login') },
                    { text: t('إنشاء حساب', 'Sign Up'), onClick: () => handleNavigation('/register') },
                    { text: language === 'ar' ? 'English' : 'العربية', onClick: toggleLanguage }
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      className="w-full text-left px-4 py-2.5 text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                      variants={menuItemVariants}
                      custom={i}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={item.onClick}
                    >
                      {item.text}
                    </motion.button>
                  ))}
                  <div className="px-4 py-2">
                    <ThemeSwitcher />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo */}
            <div className="w-1/4">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className={`flex items-center justify-center gap-6 bg-black/10 backdrop-blur-lg p-3 rounded-2xl ${
                language === 'ar' ? 'space-x-reverse' : ''
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
                      className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl
                        ${location.pathname === item.href 
                          ? 'text-white bg-white/20 backdrop-blur-md shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Empty div for balance */}
            <div className="w-1/4"></div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
