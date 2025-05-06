import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, ChevronLeft, User, Vote, Shield, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const Voting: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [votingComplete, setVotingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [showVoteCount, setShowVoteCount] = useState(false);

  // Sample candidates data with more details
  const candidates = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      party: language === 'ar' ? 'حزب المستقبل' : 'Future Party',
      image: '/candidates/candidate1.jpg',
      description: language === 'ar' 
        ? 'مرشح عن حزب المستقبل، يهدف إلى تطوير البنية التحتية وتحسين الخدمات العامة'
        : 'Candidate from Future Party, aims to develop infrastructure and improve public services',
      votes: 1250,
      color: '#6D28D9'
    },
    {
      id: 2,
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      party: language === 'ar' ? 'حزب التقدم' : 'Progress Party',
      image: '/candidates/candidate2.jpg',
      description: language === 'ar'
        ? 'مرشحة عن حزب التقدم، تركز على التعليم والرعاية الصحية'
        : 'Candidate from Progress Party, focuses on education and healthcare',
      votes: 980,
      color: '#10B981'
    },
    {
      id: 3,
      name: language === 'ar' ? 'محمد علي' : 'Mohammed Ali',
      party: language === 'ar' ? 'حزب الإصلاح' : 'Reform Party',
      image: '/candidates/candidate3.jpg',
      description: language === 'ar'
        ? 'مرشح عن حزب الإصلاح، يدعو إلى الشفافية والإصلاح الاقتصادي'
        : 'Candidate from Reform Party, advocates for transparency and economic reform',
      votes: 840,
      color: '#F59E0B'
    }
  ];

  const steps = [
    {
      title: language === 'ar' ? 'مرحباً بك في نظام التصويت الإلكتروني' : 'Welcome to Electronic Voting',
      description: language === 'ar'
        ? 'تعرف على كيفية استخدام نظام التصويت الإلكتروني'
        : 'Learn how to use the electronic voting system',
      icon: <Shield className="w-8 h-8" />
    },
    {
      title: language === 'ar' ? 'اختيار المرشح' : 'Select Candidate',
      description: language === 'ar'
        ? 'اختر المرشح الذي تريد التصويت له'
        : 'Choose the candidate you want to vote for',
      icon: <User className="w-8 h-8" />
    },
    {
      title: language === 'ar' ? 'تأكيد التصويت' : 'Confirm Vote',
      description: language === 'ar'
        ? 'راجع اختيارك وتأكد من صحة المعلومات'
        : 'Review your choice and confirm the information',
      icon: <Vote className="w-8 h-8" />
    }
  ];

  // Simulate live vote count
  useEffect(() => {
    if (showVoteCount) {
      const interval = setInterval(() => {
        setTotalVotes(prev => prev + Math.floor(Math.random() * 5));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showVoteCount]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      setProgress((currentStep + 1) * 33.33);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setProgress((currentStep - 1) * 33.33);
    }
  };

  const handleVote = () => {
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    setShowConfirmation(false);
    setVotingComplete(true);
    setProgress(100);
    setShowVoteCount(true);
    
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  {steps[0].icon}
                  <div>
                    <CardTitle>{steps[0].title}</CardTitle>
                    <CardDescription>{steps[0].description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-primary/10">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">
                          {language === 'ar' ? 'كيف يعمل التصويت الإلكتروني؟' : 'How Electronic Voting Works'}
                        </h3>
                        <p className="text-sm">
                          {language === 'ar'
                            ? 'نظام التصويت الإلكتروني يوفر طريقة آمنة وشفافة للمشاركة في العملية الديمقراطية'
                            : 'The electronic voting system provides a secure and transparent way to participate in the democratic process'}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/10">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">
                          {language === 'ar' ? 'مميزات النظام' : 'System Features'}
                        </h3>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-primary" />
                            {language === 'ar' ? 'تصويت آمن ومشفر' : 'Secure and encrypted voting'}
                          </li>
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-primary" />
                            {language === 'ar' ? 'نتائج فورية' : 'Instant results'}
                          </li>
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-primary" />
                            {language === 'ar' ? 'سهولة الاستخدام' : 'User-friendly interface'}
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  <Button
                    onClick={handleNext}
                    className="w-full bg-[#c8102e] hover:bg-[#c8102e]/90"
                  >
                    {language === 'ar' ? 'ابدأ التصويت' : 'Start Voting'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  {steps[1].icon}
                  <div>
                    <CardTitle>{steps[1].title}</CardTitle>
                    <CardDescription>{steps[1].description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${
                          selectedCandidate === candidate.id
                            ? 'border-primary ring-2 ring-primary'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div 
                              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                              style={{ backgroundColor: `${candidate.color}20` }}
                            >
                              <span className="text-2xl">👤</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.party}</p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{candidate.description}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {language === 'ar' ? 'الأصوات:' : 'Votes:'}
                            </span>
                            <span className="text-sm font-medium" style={{ color: candidate.color }}>
                              {candidate.votes.toLocaleString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {language === 'ar' ? 'السابق' : 'Back'}
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!selectedCandidate}
                    className="bg-[#c8102e] hover:bg-[#c8102e]/90"
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  {steps[2].icon}
                  <div>
                    <CardTitle>{steps[2].title}</CardTitle>
                    <CardDescription>{steps[2].description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      {language === 'ar' ? 'المرشح المختار' : 'Selected Candidate'}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                        style={{ backgroundColor: `${candidates.find(c => c.id === selectedCandidate)?.color}20` }}
                      >
                        <span className="text-xl">👤</span>
                      </div>
                      <div>
                        <p className="font-medium">{candidates.find(c => c.id === selectedCandidate)?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {candidates.find(c => c.id === selectedCandidate)?.party}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {language === 'ar' ? 'السابق' : 'Back'}
                    </Button>
                    <Button
                      onClick={handleVote}
                      className="bg-[#c8102e] hover:bg-[#c8102e]/90"
                    >
                      {language === 'ar' ? 'تأكيد التصويت' : 'Confirm Vote'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };
  
  return (
    <PageTransition>
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black via-[#c8102e] to-black text-transparent bg-clip-text">
                {t('التصويت الإلكتروني', 'Electronic Voting')}
            </h1>
              <p className="text-muted-foreground">
                {t(
                  'قم باتباع الخطوات أدناه لإكمال عملية التصويت',
                  'Follow the steps below to complete the voting process'
                )}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`text-sm ${
                      currentStep > index + 1
                        ? 'text-primary'
                        : currentStep === index + 1
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'ar' ? 'تأكيد التصويت' : 'Confirm Your Vote'}
                  </DialogTitle>
                  <DialogDescription>
                    {language === 'ar'
                      ? 'هل أنت متأكد من اختيارك؟ لا يمكن تغيير التصويت بعد التأكيد.'
                      : 'Are you sure about your choice? You cannot change your vote after confirmation.'}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmation(false)}
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button
                    onClick={confirmVote}
                    className="bg-[#c8102e] hover:bg-[#c8102e]/90"
                  >
                    {language === 'ar' ? 'تأكيد' : 'Confirm'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Success Message */}
            <AnimatePresence>
              {votingComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                >
                  <Card className="max-w-md mx-auto p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">
                      {language === 'ar' ? 'تم التصويت بنجاح!' : 'Vote Cast Successfully!'}
                  </h2>
                    <p className="text-muted-foreground mb-4">
                      {language === 'ar'
                        ? 'شكراً لمشاركتك في العملية الديمقراطية'
                        : 'Thank you for participating in the democratic process'}
                    </p>
                    {showVoteCount && (
                      <div className="mb-4 p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">
                          {language === 'ar' ? 'إجمالي الأصوات حتى الآن:' : 'Total votes so far:'}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {totalVotes.toLocaleString()}
                        </p>
                      </div>
                    )}
                    <Button
                      onClick={() => window.location.href = '/'}
                      className="w-full bg-[#c8102e] hover:bg-[#c8102e]/90"
                    >
                      {language === 'ar' ? 'العودة للرئيسية' : 'Return to Home'}
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
      </PageTransition>
  );
};

export default Voting;
