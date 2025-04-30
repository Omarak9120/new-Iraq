import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card relative max-w-[300px] max-h-[320px] rounded-xl p-8 m-3 
                 overflow-hidden z-0 bg-gradient-to-b from-white/10 to-white/5
                 border border-white/10 backdrop-blur-sm
                 transition-all duration-300 group"
    >
      <div className="go-corner absolute top-0 right-0 w-8 h-8 flex items-center justify-center
                      overflow-hidden bg-gradient-to-br from-primary to-primary/80 
                      rounded-tr-xl rounded-bl-3xl">
        <div className="go-arrow text-white -mt-1 -mr-1 font-mono">→</div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
          <div className="w-4 h-4 text-primary/80">{icon}</div>
        </div>
        <h3 className="text-sm font-medium text-white/90">
          {title}
        </h3>
      </div>
      
      <p className="small-desc text-base text-white/70 
                    group-hover:text-white/90 transition-colors duration-300">
        {description}
      </p>

      <div className="card-hover-effect absolute -z-10 top-0 right-0 w-8 h-8 
                      bg-gradient-to-br from-primary to-primary/80 rounded-full 
                      group-hover:scale-[28] transition-transform duration-300 
                      origin-center" />
    </motion.div>
  );
};

export default FeatureCard; 