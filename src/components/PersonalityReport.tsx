import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PersonalityMetrics } from '@/utils/personalityCalculator';
import { Download, Share2, Trophy, Zap, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PersonalityReportProps {
  metrics: PersonalityMetrics;
  archetype: string;
  report: string;
  isLoading: boolean;
  onRestart: () => void;
  className?: string;
}

export const PersonalityReport = ({ 
  metrics, 
  archetype, 
  report, 
  isLoading,
  onRestart,
  className = '' 
}: PersonalityReportProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!isLoading && report) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, report]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = async () => {
    const reportElement = document.getElementById('personality-report');
    if (!reportElement) return;

    try {
      const canvas = await html2canvas(reportElement, {
        backgroundColor: '#1a1625',
        scale: 2,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`personality-roast-${archetype.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `My Personality Roast: ${archetype}`,
      text: `I just got roasted by an AI! My personality type is ${archetype}. Check out this sassy personality test!`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        // You might want to show a toast here
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'chaos': return <Zap className="text-neon-pink" size={24} />;
      case 'vintage': return <Heart className="text-lavender" size={24} />;
      case 'questionable': return <Trophy className="text-sunset-orange" size={24} />;
      default: return null;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'chaos': return 'from-neon-pink to-electric-blue';
      case 'vintage': return 'from-lavender to-neon-pink';
      case 'questionable': return 'from-sunset-orange to-lime-green';
      default: return 'from-primary to-secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center"
        >
          <Trophy size={32} className="text-white" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Generating your personality roast report...
          </h2>
          <p className="text-muted-foreground">
            This is where the real sass happens 🔥
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <motion.div
        id="personality-report"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-white font-bold text-lg">
            <Trophy size={24} />
            <span>Personality Roast Report</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            {archetype}
          </motion.h1>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Chaos Index', value: metrics.chaosIndex, key: 'chaos' },
            { label: 'Vintage Vibes', value: metrics.vintageVibes, key: 'vintage' },
            { label: 'Questionable Choices', value: metrics.questionableChoices, key: 'questionable' }
          ].map((metric, index) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 text-center space-y-4 bg-gradient-to-br from-card to-card/80 border-primary/20">
                <div className="flex items-center justify-center">
                  {getMetricIcon(metric.key)}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-foreground">{metric.label}</h3>
                  <div className="text-3xl font-bold text-foreground">
                    {metric.value}%
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress 
                    value={metric.value} 
                    className="h-3"
                  />
                  <div className={`h-2 rounded-full bg-gradient-to-r ${getMetricColor(metric.key)} opacity-60`} 
                       style={{ width: `${metric.value}%` }} />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Report */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-xl">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  The Official Roast 🔥
                </h2>
                <p className="text-muted-foreground">
                  SassBot has spoken...
                </p>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary"
              >
                <div className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-line">
                  {report}
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleShare}
            variant="outline"
            size="lg"
            className="group border-primary/50 hover:bg-primary/10"
          >
            <Share2 size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Share the Sass
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="outline"
            size="lg"
            className="group border-secondary/50 hover:bg-secondary/10"
          >
            <Download size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Download Report
          </Button>
          
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-gradient-accent hover:opacity-90 transition-opacity"
          >
            Take Test Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};