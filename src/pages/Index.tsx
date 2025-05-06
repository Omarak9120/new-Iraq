import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { Vote, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import PlatformFeatures from '../components/PlatformFeatures';
import ElectionStats from '../components/ElectionStats';
import PyramidLoader from '../components/PyramidLoader';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import VantaBackground from '../components/VantaBackground';
import './Index.css';

const container = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
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

  const handleStartVoting = () => {
    navigate('/voting');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent">
      <PageTransition>
        <VantaBackground />
        <Navbar />
        <main className="relative">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ y: springY, opacity, scale }}
              className="container mx-auto px-4 pt-32 relative z-10"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-block mb-8"
                  >
                    <Vote className="w-16 h-16 text-primary animate-bounce" />
                  </motion.div>

                  <motion.span
                    variants={container(0.5)}
                    initial="hidden"
                    animate="visible"
                    className="block text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
                  >
                    {t('ما هي شارك ؟', 'What is Sharek ?')}
                  </motion.span>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
                  >
                    {t(
                      'منصة رقمية متطورة لتسهيل العملية الانتخابية وضمان الشفافية والنزاهة',
                      'An advanced digital platform to facilitate the electoral process and ensure transparency and integrity'
                    )}
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#c8102e] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#a00d24]"
                    onClick={handleStartVoting}
                  >
                    {t('ابدأ التصويت', 'Start Voting')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Platform Features Section with Pyramid */}
          <section className="py-20">
            <div className="container mx-auto">
              <div className="flex items-center justify-center gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                    {t('كيف تعمل', 'How it works')}
                  </h2>
                  <p className="text-white/90 max-w-2xl mx-auto">
                    {t(
                      'شارك يربط المواطنين بممثليهم عبر أدوات تفاعلية لطرح الأسئلة، التصويت، والمشاركة المجتمعية',
                      'Sharek connects citizens with their representatives through interactive tools for questions, voting, and civic engagement.'
                    )}
                  </p>
                </motion.div>
                <div className="hidden md:block">
                  <PyramidLoader />
                </div>
              </div>
              
              <PlatformFeatures />
            </div>
          </section>

          {/* Election Statistics Section */}
          <ElectionStats />
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Index;
