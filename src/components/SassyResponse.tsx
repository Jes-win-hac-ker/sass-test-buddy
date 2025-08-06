import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { RatingSystem } from './RatingSystem';
import { Loader2, Bot } from 'lucide-react';

interface SassyResponseProps {
  response: string;
  isLoading: boolean;
  onRatingChange: (rating: number) => void;
  onContinue: () => void;
  className?: string;
}

export const SassyResponse = ({ 
  response, 
  isLoading, 
  onRatingChange, 
  onContinue,
  className = '' 
}: SassyResponseProps) => {
  const [showResponse, setShowResponse] = useState(false);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (!isLoading && response) {
      setShowResponse(true);
      const timer = setTimeout(() => setShowRating(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, response]);

  const handleRating = (rating: number) => {
    onRatingChange(rating);
    setTimeout(onContinue, 1000); // Auto-continue after rating
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-4 rounded-full bg-gradient-primary"
              >
                <Bot size={48} className="text-white" />
              </motion.div>
            </div>
            <div className="space-y-2">
              <motion.h3
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-lg font-medium text-foreground"
              >
                SassBot is cooking up some spice... 🔥
              </motion.h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm">Generating premium sass...</span>
              </div>
            </div>
          </motion.div>
        ) : showResponse ? (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-primary">
                    <Bot size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">SassBot says:</h3>
                    <p className="text-xs text-muted-foreground">AI-powered roast incoming</p>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary"
                >
                  <p className="text-lg leading-relaxed text-foreground font-medium">
                    {response}
                  </p>
                </motion.div>
              </motion.div>
            </Card>

            <AnimatePresence>
              {showRating && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <RatingSystem 
                    onRatingChange={handleRating}
                    className="bg-card/50 rounded-lg p-4 border border-border/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};