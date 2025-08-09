import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Make sure you have an Input component
import { Question } from '@/data/questions';
import { ChevronRight, Sparkles, Send } from 'lucide-react';

interface QuestionFlowProps {
  question: Question;
  onAnswerSelect: (answerIndex: number, answerText: string) => void;
  className?: string;
}

export const QuestionFlow = ({ question, onAnswerSelect, className = '' }: QuestionFlowProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customAnswer, setCustomAnswer] = useState('');

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setShowConfirm(true);
    setShowCustomInput(false); // Hide custom input if a predefined option is selected
  };

  const handleConfirm = () => {
    if (selectedAnswer !== null) {
      onAnswerSelect(selectedAnswer, question.options[selectedAnswer]);
    }
  };

  const handleOtherClick = () => {
    setShowCustomInput(true);
    setSelectedAnswer(null); // Deselect any previous answer
    setShowConfirm(false);
  };

  const handleCustomSubmit = () => {
    if (customAnswer.trim()) {
      // Use -1 as a special index for custom answers
      onAnswerSelect(-1, customAnswer);
    }
  };

  const getEmojiForCategory = (category: string) => {
    const emojis = {
      time: '⏰',
      food: '🍕',
      choice: '🤔',
      social: '😅',
      productivity: '⚡'
    };
    return emojis[category as keyof typeof emojis] || '❓';
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-xl">
          <div className="space-y-6">
            {/* Question Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>{getEmojiForCategory(question.category)}</span>
                <span className="capitalize">{question.category} Question</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {question.text}
              </h2>
              
              <p className="text-muted-foreground">
                Choose your fighter... I mean, answer 😈
              </p>
            </motion.div>

            {/* Answer Options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <Button
                    variant={selectedAnswer === index ? "default" : "outline"}
                    onClick={() => handleAnswerClick(index)}
                    className={`
                      w-full p-4 h-auto text-left justify-start transition-all duration-300
                      ${selectedAnswer === index 
                        ? 'bg-gradient-primary text-white shadow-lg scale-105 border-transparent' 
                        : 'hover:border-primary/50 hover:bg-primary/5 hover:scale-102'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base font-medium">{option}</span>
                      {selectedAnswer === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <Sparkles size={20} />
                        </motion.div>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
              {/* "Other" Button */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + question.options.length * 0.1, duration: 0.4 }}
                >
                  <Button
                    variant={showCustomInput ? "default" : "outline"}
                    onClick={handleOtherClick}
                    className={`
                      w-full p-4 h-auto text-left justify-start transition-all duration-300
                      ${showCustomInput
                        ? 'bg-gradient-primary text-white shadow-lg scale-105 border-transparent'
                        : 'hover:border-primary/50 hover:bg-primary/5 hover:scale-102'
                      }
                    `}
                  >
                    Other (Type your own)
                  </Button>
                </motion.div>
            </motion.div>

            {/* Custom Input Section */}
            <AnimatePresence>
              {showCustomInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="space-y-4 pt-4 overflow-hidden"
                >
                  <Input 
                    type="text"
                    placeholder="Spill the tea..."
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    className="text-base h-12"
                  />
                  <Button
                    onClick={handleCustomSubmit}
                    size="lg"
                    className="w-full bg-gradient-secondary hover:opacity-90 transition-opacity group"
                    disabled={!customAnswer.trim()}
                  >
                    <span>Submit My Sass</span>
                    <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirm Button for predefined answers */}
            <AnimatePresence>
              {showConfirm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center pt-4"
                >
                  <Button
                    onClick={handleConfirm}
                    size="lg"
                    className="bg-gradient-secondary hover:opacity-90 transition-opacity group"
                  >
                    <span>Lock it in</span>
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
