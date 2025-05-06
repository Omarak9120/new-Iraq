import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Button from './Button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#c8102e]/30 rounded-full filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#2d2d2d]/30 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,16,46,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,16,46,.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 border border-primary/20 text-foreground/80 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-primary/20 text-foreground text-xs px-2 py-0.5 rounded-full mr-2">
              {t('جديد', 'NEW')}
            </span>
            <span>{t('تجربة مبتكرة', 'Innovative Experience')}</span>
          </motion.div>
          
          {/* Main heading */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tight glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-gradient">{t('واجهة مستخدم', 'Modern UI')}</span>
            <br />
            {t('حديثة ومبتكرة', 'Creative Design')}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-foreground/80 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t(
              'تجربة مستخدم حديثة مع تصميم عربي أنيق وتأثيرات بصرية مذهلة. استكشف الإبداع والابتكار.',
              'Experience a modern user interface with elegant design and stunning visual effects. Explore creativity and innovation.'
            )}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="primary" size="lg" className="min-w-[10rem]">
              {t('ابدأ الآن', 'Get Started')}
            </Button>
            <Button variant="outline" size="lg" className="min-w-[10rem]">
              {t('عرض توضيحي', 'View Demo')}
            </Button>
          </motion.div>
        </div>
        
        {/* Floating card */}
        <motion.div 
          className="relative mt-20 w-full max-w-4xl mx-auto glass-card rounded-xl p-1 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 rounded-xl blur opacity-30"></div>
          <div className="relative bg-card rounded-lg aspect-video overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-lg font-medium text-foreground/60">{t('محتوى العرض التوضيحي', 'Demo Content Placeholder')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
