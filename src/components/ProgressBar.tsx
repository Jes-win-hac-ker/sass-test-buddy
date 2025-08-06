import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar = ({ currentStep, totalSteps, className = '' }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full space-y-2 ${className}`}>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Question Progress</span>
        <span className="text-foreground font-medium">
          {currentStep} of {totalSteps}
        </span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Progress 
          value={progress} 
          variant="sassy"
          className="h-3 transition-all duration-500"
        />
      </motion.div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Just started</span>
        <span>Getting sassy</span>
        <span>Roast ready! 🔥</span>
      </div>
    </div>
  );
};