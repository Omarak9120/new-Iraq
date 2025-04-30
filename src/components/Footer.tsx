import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const footerLinks = {
    main: [
      { title: t('الرئيسية', 'Home'), href: '/' },
      { title: t('المرشحون', 'Candidates'), href: '/candidates' },
      { title: t('التصويت', 'Voting'), href: '/voting' },
      { title: t('النتائج', 'Results'), href: '/results' },
    ],
    about: [
      { title: t('عن المنصة', 'About Platform'), href: '/about' },
      { title: t('سياسة الخصوصية', 'Privacy Policy'), href: '/privacy' },
      { title: t('الشروط والأحكام', 'Terms & Conditions'), href: '/terms' },
      { title: t('الأسئلة الشائعة', 'FAQ'), href: '/faq' },
    ],
    contact: [
      { icon: <Mail className="w-4 h-4" />, text: 'info@iraqelections.com' },
      { icon: <Phone className="w-4 h-4" />, text: '+964 750 123 4567' },
      { icon: <MapPin className="w-4 h-4" />, text: t('بغداد، العراق', 'Baghdad, Iraq') },
    ],
    social: [
      { icon: <Facebook className="w-5 h-5" />, href: '#' },
      { icon: <Twitter className="w-5 h-5" />, href: '#' },
      { icon: <Instagram className="w-5 h-5" />, href: '#' },
      { icon: <Linkedin className="w-5 h-5" />, href: '#' },
    ],
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              {t(
                'منصة رقمية متطورة لتسهيل العملية الانتخابية وضمان الشفافية والنزاهة',
                'An advanced digital platform to facilitate the electoral process and ensure transparency and integrity'
              )}
            </p>
          </div>

          {/* Main Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t('روابط سريعة', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t('عن المنصة', 'About')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              {t('اتصل بنا', 'Contact Us')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerLinks.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {t('انتخابات العراق', 'Iraq Elections')}.{' '}
              {t('جميع الحقوق محفوظة', 'All rights reserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 