import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <PageTransition>
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
                {t('اتصل بنا', 'Contact Us')}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t(
                  'نحن هنا للإجابة على أسئلتكم وتقديم المساعدة',
                  'We are here to answer your questions and provide assistance'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
                    {t('معلومات الاتصال', 'Contact Information')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">info@sharek.iq</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">+964 750 123 4567</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        {t(
                          'بغداد، العراق',
                          'Baghdad, Iraq'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <form className="bg-card/50 backdrop-blur-sm p-6 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      {t('الاسم', 'Name')}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      {t('البريد الإلكتروني', 'Email')}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black dark:text-white">
                      {t('الرسالة', 'Message')}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t('إرسال', 'Send')}</span>
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Contact; 