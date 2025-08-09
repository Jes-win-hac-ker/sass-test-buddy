import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Heart, Trophy } from 'lucide-react';
import { ApiKeySetup } from './ApiKeySetup';
import { useState } from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
  className?: string;
}

export const WelcomeScreen = ({ onStart, className = '' }: WelcomeScreenProps) => {
  const [showApiSetup, setShowApiSetup] = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Show API setup if no key is configured
  if (!apiKey && !showApiSetup) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${className}`}>
        <ApiKeySetup onContinueAnyway={() => setShowApiSetup(true)} />
      </div>
    );
  }

  // Show API setup if user requested it
  if (showApiSetup && !apiKey) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${className}`}>
        <ApiKeySetup onContinueAnyway={onStart} />
      </div>
    );
  }
  return (
    <div className={`w-full max-w-4xl mx-auto text-center space-y-8 ${className}`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
          className="mx-auto w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-2xl"
        >
          <Sparkles size={48} className="text-white" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            Vaayil Thonniyathu
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Ninte vaayil thonniyathu para... njangalathinu oru <span className="text-neon-pink font-bold">ookkal</span> aakkitharam! 🔥
          </motion.p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: <Zap className="text-neon-pink" size={32} />,
            title: "AI-Powered Kalakkal",
            description: "Get roasted by a Gemini-powered AI with surgical precision and comedic timing"
          },
          {
            icon: <Heart className="text-lavender" size={32} />,
            title: "Personality Insights",
            description: "Discover your chaos index, vintage vibes, and questionable choices"
          },
          {
            icon: <Trophy className="text-sunset-orange" size={32} />,
            title: "Share the Burn",
            description: "Download your roast report and share your personality archetype"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
          >
            <Card className="p-6 h-full bg-gradient-to-br from-card to-card/80 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="space-y-4 text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:shadow-lg transition-shadow"
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">
            Warning: Side effects may include laughter, self-reflection, and mild emotional damage 😈
          </p>
          <p className="text-sm text-muted-foreground/80">
            Takes about 2 minutes • 5 questions • 100% sass guaranteed
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl shadow-xl group"
          >
            <span>Start the Roast</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              🔥
            </motion.div>
          </Button>
        </motion.div>

        <p className="text-xs text-muted-foreground/60">
          By continuing, you agree to get absolutely demolished by artificial intelligence
        </p>
      </motion.div>
    </div>
  );
};
