import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Building2 } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import '../components/CandidateCard.css';

const candidatesData = [
  {
    id: 1,
    name: { ar: 'أحمد الحسيني', en: 'Ahmed Al-Hussaini' },
    party: { ar: 'حزب التقدم', en: 'Progress Party' },
    description: {
      ar: 'خبرة ٢٠ عاماً في العمل السياسي والاجتماعي',
      en: '20 years of experience in political and social work'
    },
    image: 'photo-1605810230434-7631ac76ec81',
    achievements: [
      { ar: 'وزير سابق للتعليم', en: 'Former Minister of Education' },
      { ar: 'مؤسس جمعية التنمية المجتمعية', en: 'Founder of Community Development Association' },
      { ar: 'حاصل على جائزة التميز في العمل العام', en: 'Recipient of Excellence in Public Service Award' }
    ],
    experience: [
      { ar: 'وزير التعليم (٢٠١٥-٢٠٢٠)', en: 'Minister of Education (2015-2020)' },
      { ar: 'عضو البرلمان (٢٠١٠-٢٠١٥)', en: 'Member of Parliament (2010-2015)' },
      { ar: 'مدير عام وزارة التربية (٢٠٠٥-٢٠١٠)', en: 'Director General of Education (2005-2010)' }
    ],
    color: '#6D28D9'
  },
  {
    id: 2,
    name: { ar: 'فاطمة العبيدي', en: 'Fatima Al-Obeidi' },
    party: { ar: 'حزب المستقبل', en: 'Future Party' },
    description: {
      ar: 'متخصصة في التنمية الاقتصادية والإصلاح',
      en: 'Specialist in economic development and reform'
    },
    image: 'photo-1581092795360-fd1ca04f0952',
    achievements: [
      { ar: 'خبيرة اقتصادية دولية', en: 'International Economic Expert' },
      { ar: 'مؤلفة كتاب "الإصلاح الاقتصادي"', en: 'Author of "Economic Reform"' },
      { ar: 'مستشارة سابقة للبنك الدولي', en: 'Former World Bank Advisor' }
    ],
    experience: [
      { ar: 'مديرة مركز الدراسات الاقتصادية (٢٠١٨-٢٠٢٣)', en: 'Director of Economic Studies Center (2018-2023)' },
      { ar: 'مستشارة اقتصادية (٢٠١٣-٢٠١٨)', en: 'Economic Advisor (2013-2018)' },
      { ar: 'محللة اقتصادية (٢٠٠٨-٢٠١٣)', en: 'Economic Analyst (2008-2013)' }
    ],
    color: '#10B981'
  },
  {
    id: 3,
    name: { ar: 'محمد العامري', en: 'Mohammed Al-Ameri' },
    party: { ar: 'حزب الإصلاح', en: 'Reform Party' },
    description: {
      ar: 'قيادي في مجال التعليم والتنمية المجتمعية',
      en: 'Leader in education and community development'
    },
    image: 'photo-1519389950473-47ba0277781c',
    achievements: [
      { ar: 'رئيس سابق لجامعة بغداد', en: 'Former President of Baghdad University' },
      { ar: 'مؤسس برنامج التعليم للجميع', en: 'Founder of Education for All Program' },
      { ar: 'حاصل على جائزة التميز الأكاديمي', en: 'Recipient of Academic Excellence Award' }
    ],
    experience: [
      { ar: 'رئيس جامعة بغداد (٢٠١٦-٢٠٢١)', en: 'President of Baghdad University (2016-2021)' },
      { ar: 'عميد كلية التربية (٢٠١١-٢٠١٦)', en: 'Dean of Education College (2011-2016)' },
      { ar: 'أستاذ جامعي (٢٠٠٦-٢٠١١)', en: 'University Professor (2006-2011)' }
    ],
    color: '#F59E0B'
  }
];

const Candidates: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        <main className="container mx-auto px-4 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              {t('المرشحون', 'Candidates')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                'تعرف على المرشحين المؤهلين للانتخابات البرلمانية العراقية ٢٠٢٥',
                'Meet the qualified candidates for the 2025 Iraqi Parliamentary Elections'
              )}
            </p>
          </motion.div>

          {/* Tabs for filtering */}
          <div className="max-w-4xl mx-auto mb-8">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  {t('الكل', 'All')}
                </TabsTrigger>
                <TabsTrigger value="progress">
                  {t('حزب التقدم', 'Progress Party')}
                </TabsTrigger>
                <TabsTrigger value="future">
                  {t('حزب المستقبل', 'Future Party')}
                </TabsTrigger>
                <TabsTrigger value="reform">
                  {t('حزب الإصلاح', 'Reform Party')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Candidates Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {candidatesData.map((candidate) => (
              <motion.div
                key={candidate.id}
                variants={itemVariants}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <CandidateCard
                  name={candidate.name[language]}
                  party={candidate.party[language]}
                  image={`https://source.unsplash.com/${candidate.image}`}
                  likes={245}
                  comments={89}
                  views={1234}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Candidate Details Modal */}
          <AnimatePresence>
            {selectedCandidate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedCandidate(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={e => e.stopPropagation()}
                >
                  {(() => {
                    const candidate = candidatesData.find(c => c.id === selectedCandidate);
                    if (!candidate) return null;

                    return (
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={`https://source.unsplash.com/${candidate.image}`} />
                            <AvatarFallback>{candidate.name[language].charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="text-2xl font-bold">{candidate.name[language]}</h2>
                            <Badge 
                              className="mt-1"
                              style={{ backgroundColor: candidate.color }}
                            >
                              {candidate.party[language]}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                {t('الإنجازات', 'Achievements')}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {candidate.achievements.map((achievement, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Star className="w-4 h-4 text-primary mt-1" />
                                    <span>{achievement[language]}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                {t('الخبرات', 'Experience')}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {candidate.experience.map((exp, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Building2 className="w-4 h-4 text-primary mt-1" />
                                    <span>{exp[language]}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedCandidate(null)}
                          >
                            {t('إغلاق', 'Close')}
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </PageTransition>
    </div>
  );
};

export default Candidates;
