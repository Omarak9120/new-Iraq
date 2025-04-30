import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import './PyramidLoader.css';

const PyramidLoader: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className={`flex justify-center items-center py-12 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ perspective: '1000px' }}
        className="pyramid-container"
      >
        <div className="pyramid-loader">
          <div className="wrapper">
            <span className="side side1" />
            <span className="side side2" />
            <span className="side side3" />
            <span className="side side4" />
            <span className="shadow" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PyramidLoader; 