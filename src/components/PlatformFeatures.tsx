import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, CheckCircle2, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

const PlatformFeatures: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('التصويت الآمن', 'Secure Voting'),
      description: t(
        'نظام تصويت آمن وموثوق به مع تشفير متقدم وتقنيات blockchain لضمان نزاهة الانتخابات',
        'Secure voting system with advanced encryption technology'
      ),
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: t('التحقق من الهوية', 'Identity Verification'),
      description: t(
        'عملية تحقق قوية من هوية الناخبين لمنع التزوير مع الحفاظ على خصوصية البيانات',
        'Robust voter identity verification process to prevent data privacy'
      ),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('النتائج في الوقت الحقيقي', 'Real-time Results'),
      description: t(
        'عرض نتائج التصويت في الوقت الحقيقي',
        'Display voting results in real-time'
      ),
    },
  ];

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            {t('مميزات المنصة ', 'Platform Features')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'نقدم لكم منصة متكاملة للتصويت الإلكتروني مع ضمان الأمان والشفافية',
              'We provide a comprehensive electronic voting platform with guaranteed security and transparency'
            )}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <div key={index} className="min-h-[300px] w-full">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures; 