import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

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

  // Animation variants for the floating menu lines
  const lineVariants = {
    closed: (index: number) => ({
      y: index === 0 ? -2 : 2,
      rotate: 0,
      backgroundColor: "rgb(148, 0, 255)"
    }),
    hover: (index: number) => ({
      y: index === 0 ? -1 : 1,
      backgroundColor: "rgb(180, 85, 255)",
      scale: 1.1
    }),
    open: (index: number) => ({
      y: 0,
      rotate: index === 0 ? 45 : -45,
      backgroundColor: "rgb(180, 85, 255)"
    })
  };

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
            <motion.button
              className="relative w-12 h-12 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
              whileHover="hover"
              animate={isFloatingMenuOpen ? "open" : "closed"}
            >
              {/* Menu Lines */}
              {[0, 1].map((index) => (
                <motion.span
                  key={index}
                  className="w-6 h-0.5 rounded-full origin-center"
                  custom={index}
                  variants={lineVariants}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.button>

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
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1">
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
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
