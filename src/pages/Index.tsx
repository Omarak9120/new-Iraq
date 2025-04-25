import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { Vote, ArrowRight, Shield, CheckCircle2, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Floating elements animation
  const floatingBallots = Array(5).fill(null).map((_, i) => ({
    initialY: -20 - i * 30,
    delay: i * 0.2,
    x: (i % 2 === 0 ? 1 : -1) * (i + 1) * 50,
  }));

  // Features data
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: language === 'ar' ? 'تصويت آمن' : 'Secure Voting',
      description: language === 'ar'
        ? 'نظام مشفر لحماية أصواتك'
        : 'Encrypted system to protect your votes'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: language === 'ar' ? 'شفافية كاملة' : 'Full Transparency',
      description: language === 'ar'
        ? 'نتائج فورية وموثوقة'
        : 'Instant and reliable results'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'ar' ? 'سهولة الاستخدام' : 'User-Friendly',
      description: language === 'ar'
        ? 'واجهة بسيطة وبديهية'
        : 'Simple and intuitive interface'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" ref={containerRef}>
      <Navbar />
      <PageTransition>
        <main className="relative">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingBallots.map((ballot, index) => (
                <motion.div
                  key={index}
                  initial={{ y: ballot.initialY, x: ballot.x, opacity: 0 }}
                  animate={{
                    y: [ballot.initialY, 20, ballot.initialY],
                    x: [ballot.x, ballot.x + 20, ballot.x],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: ballot.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute"
                >
                  <Vote 
                    className="text-primary/30 w-12 h-12"
                    style={{ transform: `rotate(${index * 45}deg)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

            {/* Main content */}
            <motion.div
              style={{ y: springY, opacity, scale }}
              className="container mx-auto px-4 pt-32 relative z-10"
            >
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block mb-8"
                >
                  <Vote className="w-16 h-16 text-primary animate-bounce" />
                </motion.div>

                <motion.h1
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
                >
                  {t('انتخابات العراق ٢٠٢٥', 'Iraq Elections 2025')}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                >
                  {t(
                    'منصة رقمية متطورة لتسهيل العملية الانتخابية وضمان الشفافية والنزاهة',
                    'An advanced digital platform to facilitate the electoral process and ensure transparency and integrity'
                  )}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" className="text-lg">
                    {t('ابدأ التصويت', 'Start Voting')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg">
                    {t('تعرف على المرشحين', 'Meet the Candidates')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-card/50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">
                  {t('مميزات المنصة', 'Platform Features')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t(
                    'نقدم لكم منصة متكاملة للتصويت الإلكتروني مع ضمان الأمان والشفافية',
                    'We provide a comprehensive electronic voting platform with guaranteed security and transparency'
                  )}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    </div>
  );
};

export default Index;
