import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export default function Results() {
  const { language, direction } = useLanguage();
  const t = translations[language];

  // Election results data - sample data for visualization
  const partyResults = [
    {
      name: language === 'ar' ? 'حزب المستقبل' : 'Future Party',
      votes: 1250000,
      seats: 87,
      color: '#6D28D9' // primary color
    },
    {
      name: language === 'ar' ? 'حزب التقدم' : 'Progress Party',
      votes: 980000,
      seats: 73,
      color: '#10B981' // secondary color
    },
    {
      name: language === 'ar' ? 'حزب الإصلاح' : 'Reform Party',
      votes: 840000,
      seats: 65,
      color: '#F59E0B'
    },
    {
      name: language === 'ar' ? 'حزب العدالة' : 'Justice Party',
      votes: 720000,
      seats: 52,
      color: '#EC4899'
    },
    {
      name: language === 'ar' ? 'حزب المساواة' : 'Equality Party',
      votes: 560000,
      seats: 42,
      color: '#3B82F6'
    },
    {
      name: language === 'ar' ? 'حزب الوحدة' : 'Unity Party',
      votes: 420000,
      seats: 31,
      color: '#8B5CF6'
    }
  ];

  // Participation rate over time (hours of the day)
  const participationData = [
    { hour: '08:00', participation: 8 },
    { hour: '10:00', participation: 22 },
    { hour: '12:00', participation: 37 },
    { hour: '14:00', participation: 52 },
    { hour: '16:00', participation: 68 },
    { hour: '18:00', participation: 76 },
    { hour: '20:00', participation: 82 },
  ];

  // Regional participation
  const regionalData = [
    { 
      name: language === 'ar' ? 'بغداد' : 'Baghdad', 
      participation: 76 
    },
    { 
      name: language === 'ar' ? 'البصرة' : 'Basra', 
      participation: 68 
    },
    { 
      name: language === 'ar' ? 'الموصل' : 'Mosul', 
      participation: 71 
    },
    { 
      name: language === 'ar' ? 'أربيل' : 'Erbil', 
      participation: 79 
    },
    { 
      name: language === 'ar' ? 'النجف' : 'Najaf', 
      participation: 73 
    },
    { 
      name: language === 'ar' ? 'كربلاء' : 'Karbala', 
      participation: 70 
    },
  ];

  // Format large numbers for display
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-IQ' : 'en-US').format(num);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-lighter p-4 border border-gray-700 rounded-lg shadow-lg">
          <p className="font-bold text-white">{label}</p>
          <p className="text-primary">
            {language === 'ar' ? 'مقاعد: ' : 'Seats: '}
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageTransition>
      <div className="pt-24">
      <Navbar />
        <main className="min-h-screen py-12 bg-dark">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
          >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.election.resultsTitle}</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.election.resultsSubtitle}</p>
            </motion.div>
          
          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Summary cards */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-lighter border-gray-700">
                    <CardHeader className="pb-2">
                      <CardDescription>{t.election.totalVoters}</CardDescription>
                      <CardTitle className="text-3xl">{formatNumber(5360000)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary text-sm font-medium">
                        {t.election.participationRate}: 82%
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-lighter border-gray-700">
                    <CardHeader className="pb-2">
                      <CardDescription>{t.election.totalSeats}</CardDescription>
                      <CardTitle className="text-3xl">350</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary text-sm font-medium">
                        {t.election.parliamentFormed}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-lighter border-gray-700">
                    <CardHeader className="pb-2">
                      <CardDescription>{t.election.votingCenters}</CardDescription>
                      <CardTitle className="text-3xl">{formatNumber(1250)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary text-sm font-medium">
                        {t.election.acrossIraq}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="bg-dark-lighter border-gray-700">
                    <CardHeader className="pb-2">
                      <CardDescription>{t.election.countingCompletion}</CardDescription>
                      <CardTitle className="text-3xl">100%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary text-sm font-medium">
                        {t.election.completedOn}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Tabs for different visualizations */}
              <motion.div variants={itemVariants}>
                <Tabs defaultValue="parties" className="space-y-6">
                  <TabsList className="bg-dark-lighter border border-gray-700 p-1">
                    <TabsTrigger value="parties" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      {t.election.partyResults}
                    </TabsTrigger>
                    <TabsTrigger value="participation" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      {t.election.participationRate}
                    </TabsTrigger>
                    <TabsTrigger value="regional" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      {t.election.regionalResults}
                    </TabsTrigger>
                  </TabsList>

                  {/* Party Results Tab */}
                  <TabsContent value="parties" className="space-y-6">
                    <Card className="bg-dark-lighter border-gray-700">
                      <CardHeader>
                        <CardTitle>{t.election.seatDistribution}</CardTitle>
                        <CardDescription>
                          {t.election.totalSeatsInParliament}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout={direction === 'rtl' ? 'vertical' : 'horizontal'}
                              data={partyResults}
                              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              {direction === 'rtl' ? (
                                <>
                                  <XAxis type="number" />
                                  <YAxis dataKey="name" type="category" />
                                </>
                              ) : (
                                <>
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                </>
                              )}
                              <Tooltip content={<CustomTooltip />} />
                              <Bar 
                                dataKey="seats" 
                                radius={[4, 4, 0, 0]} 
                                barSize={direction === 'rtl' ? 20 : 40}
                              >
                                {partyResults.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-dark-lighter border-gray-700">
                        <CardHeader>
                          <CardTitle>{t.election.votePercentage}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={partyResults}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="votes"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                  {partyResults.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-dark-lighter border-gray-700">
                        <CardHeader>
                          <CardTitle>{t.election.voteDistribution}</CardTitle>
                          <CardDescription>
                            {t.election.totalVotes}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {partyResults.map((party, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{party.name}</span>
                                  <span className="text-sm text-gray-400">{formatNumber(party.votes)}</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                  <motion.div 
                                    className="h-2.5 rounded-full" 
                                    style={{ backgroundColor: party.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(party.votes / 5360000) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Participation Rate Tab */}
                  <TabsContent value="participation">
                    <Card className="bg-dark-lighter border-gray-700">
                      <CardHeader>
                        <CardTitle>{t.election.participationDuringElection}</CardTitle>
                        <CardDescription>
                          {t.election.participationEvolution}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={participationData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis dataKey="hour" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip />
                              <Line 
                                type="monotone" 
                                dataKey="participation" 
                                name={language === 'ar' ? 'نسبة المشاركة (%)' : 'Participation (%)'}
                                stroke="#6D28D9" 
                                strokeWidth={3}
                                dot={{ r: 6 }}
                                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Regional Results Tab */}
                  <TabsContent value="regional">
                    <Card className="bg-dark-lighter border-gray-700">
                      <CardHeader>
                        <CardTitle>{t.election.participationByRegion}</CardTitle>
                        <CardDescription>
                          {t.election.keyRegionsParticipation}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              layout={direction === 'rtl' ? 'vertical' : 'horizontal'}
                              data={regionalData}
                              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              {direction === 'rtl' ? (
                                <>
                                  <XAxis type="number" domain={[0, 100]} />
                                  <YAxis dataKey="name" type="category" />
                                </>
                              ) : (
                                <>
                                  <XAxis dataKey="name" />
                                  <YAxis domain={[0, 100]} />
                                </>
                              )}
                  <Tooltip />
                  <Bar 
                                dataKey="participation" 
                                name={language === 'ar' ? 'نسبة المشاركة (%)' : 'Participation (%)'}
                                fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                                barSize={direction === 'rtl' ? 20 : 40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
          </motion.div>
          </div>
        </main>
      </div>
      </PageTransition>
  );
}
