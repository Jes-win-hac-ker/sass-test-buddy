import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface RatingSystemProps {
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  className?: string;
}

export const RatingSystem = ({ onRatingChange, maxRating = 5, className = '' }: RatingSystemProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    onRatingChange(value);
  };

  const getRatingText = (value: number) => {
    const texts = [
      "No sass detected 😴",
      "Mildly spicy 🌶️",
      "Getting warmer 🔥",
      "Proper roast! 💀",
      "Absolutely savage! 👹"
    ];
    return texts[value - 1] || "";
  };

  return (
    <div className={`text-center space-y-4 ${className}`}>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground">
          Rate the sass level! ⭐
        </h3>
        <p className="text-sm text-muted-foreground">
          How spicy was that AI roast?
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= (hoveredRating || rating);
          
          return (
            <motion.button
              key={index}
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHoveredRating(starValue)}
              onMouseLeave={() => setHoveredRating(0)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 transition-colors duration-200"
            >
              <Star
                size={32}
                className={`transition-all duration-200 ${
                  isActive 
                    ? 'fill-sunset-orange text-sunset-orange drop-shadow-lg' 
                    : 'text-muted-foreground hover:text-sunset-orange'
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      {(rating > 0 || hoveredRating > 0) && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-foreground"
        >
          {getRatingText(hoveredRating || rating)}
        </motion.p>
      )}
    </div>
  );
};