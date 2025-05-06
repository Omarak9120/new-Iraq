import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Percent, Clock, Check } from 'lucide-react';

const oldStats = [
  { ar: '١٨ محافظة عراقية', en: '18 Iraqi Provinces' },
  { ar: 'أكثر من ٢٠ مليون ناخب', en: 'Over 20 Million Voters' },
  { ar: '٣٢٩ مقعد برلماني', en: '329 Parliamentary Seats' },
  { ar: '١٠٠٪‎ شفافية في النتائج', en: '100% Result Transparency' },
  { ar: 'نظام تصويت إلكتروني آمن', en: 'Secure E-Voting System' },
];

const newStats = [
  {
    icon: Users,
    title: { ar: 'الناخبين المسجلين', en: 'Registered Voters' },
    value: '25M',
    description: {
      ar: 'إجمالي عدد الناخبين المسجلين في النظام',
      en: 'Total number of registered voters in the system'
    }
  },
  {
    icon: Percent,
    title: { ar: 'نسبة المشاركة', en: 'Participation Rate' },
    value: '65%',
    description: {
      ar: 'نسبة المشاركة في الانتخابات',
      en: 'Voter participation rate in the elections'
    }
  },
  {
    icon: Clock,
    title: { ar: 'وقت التصويت', en: 'Voting Time' },
    value: '48 Hours',
    description: {
      ar: 'المدة المخصصة للتصويت',
      en: 'Allocated time for voting'
    }
  }
];

const ElectionStats: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-20">
      {/* Old Statistics Section */}
      <section className="py-16 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 flex justify-center"
        >
          <div className="relative flex flex-col gap-6 p-6 w-[304px] 
                        bg-[#2d2d2d] rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `
                radial-gradient(at 88% 40%, #2d2d2d 0px, transparent 85%),
                radial-gradient(at 49% 30%, #2d2d2d 0px, transparent 85%),
                radial-gradient(at 14% 26%, #2d2d2d 0px, transparent 85%),
                radial-gradient(at 0% 64%, #c8102e 0px, transparent 85%),
                radial-gradient(at 41% 94%, #c8102e 0px, transparent 85%),
                radial-gradient(at 100% 99%, #c8102e 0px, transparent 85%)
              `,
              boxShadow: '0px -16px 24px 0px rgba(200, 16, 46, 0.25) inset'
            }}
          >
            <div className="card-border absolute z-[-1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[calc(100%+2px)] h-[calc(100%+2px)] rounded-2xl overflow-hidden
                          bg-gradient-to-b from-white/50 via-white/40 to-white/30 pointer-events-none
                          before:content-[''] before:absolute before:z-[-1] before:top-1/2 before:left-1/2 
                          before:-translate-x-1/2 before:-translate-y-1/2 before:w-[200%] before:h-40
                          before:bg-gradient-to-b before:from-transparent before:via-[#c8102e] before:to-transparent
                          before:animate-rotate" />

            <div className="card_title__container space-y-2">
              <h3 className="text-base font-medium text-white">
                {t('إحصائيات الانتخابات', 'Election Statistics')}
              </h3>
              <p className="mt-1 w-[65%] text-[0.5rem] text-[#d4d4d4]">
                {t(
                  'نظام انتخابي شامل يغطي جميع محافظات العراق',
                  'Comprehensive electoral system covering all of Iraq'
                )}
              </p>
            </div>

            <hr className="w-full h-[0.1rem] bg-[#2b2d3b] border-none my-2" />

            <ul className="flex flex-col gap-3">
              {oldStats.map((stat, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-4 h-4 bg-[#c8102e] rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-[0.75rem] text-white">{stat[language]}</span>
                </motion.li>
              ))}
            </ul>

            <button className="mt-4 py-2 w-full bg-gradient-to-r from-[#c8102e] to-[#2d2d2d]
                            text-[0.75rem] text-white rounded-full
                            shadow-[inset_0_-2px_25px_-4px_rgba(255,255,255,0.4)]">
              {t('تعرف على المزيد', 'Learn More')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* New Statistics Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
              {t('إحصائيات تفصيلية', 'Detailed Statistics')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                'نظرة عامة على إحصائيات الانتخابات البرلمانية العراقية ٢٠٢٥',
                'Overview of the 2025 Iraqi Parliamentary Elections statistics'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {newStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 rounded-lg p-8 text-center hover:bg-card/70 transition-all duration-300 hover:scale-105
                          border border-white/5 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="p-4 bg-[#c8102e]/10 rounded-full">
                    <stat.icon className="w-8 h-8 text-[#c8102e]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {stat.title[language]}
                  </h3>
                  <div className="text-4xl font-bold text-[#c8102e] mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">
                    {stat.description[language]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElectionStats; 