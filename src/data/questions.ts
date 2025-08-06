// Question bank with personality weights
export interface Question {
  id: string;
  text: string;
  options: string[];
  chaosWeight: number[];
  vintageWeight: number[];
  questionableWeight: number[];
  category: 'time' | 'food' | 'choice' | 'social' | 'productivity';
}

export const questions: Question[] = [
  {
    id: 'wake-up',
    text: "What's your ideal wake-up time? ⏰",
    options: [
      "5 AM (I'm basically a rooster)",
      "7 AM (Productive human being)",
      "10 AM (Reasonable adult)",
      "12 PM (Don't judge me)",
      "Whenever my body decides (Chaos mode)"
    ],
    chaosWeight: [0, 20, 40, 60, 100],
    vintageWeight: [80, 60, 40, 20, 10],
    questionableWeight: [10, 20, 30, 70, 90],
    category: 'time'
  },
  {
    id: 'food-combo',
    text: "Which food combination speaks to your soul? 🍕",
    options: [
      "Pizza with pineapple (Classic controversial)",
      "Fries dipped in ice cream (Sweet & salty)",
      "Cereal with orange juice (Milk is for weaklings)",
      "Pickles with peanut butter (Don't knock it)",
      "Sushi with ranch dressing (I live dangerously)"
    ],
    chaosWeight: [30, 50, 80, 70, 100],
    vintageWeight: [60, 40, 20, 30, 10],
    questionableWeight: [40, 50, 90, 80, 100],
    category: 'food'
  },
  {
    id: 'questionable-choice',
    text: "What's your most questionable life decision? 🤔",
    options: [
      "Bought something at 3 AM from an infomercial",
      "Tried to cut my own hair (during quarantine)",
      "Stalked my crush's ex on social media",
      "Ate food that fell on the floor (5-second rule)",
      "Started a conversation with 'As an AI...'"
    ],
    chaosWeight: [60, 80, 70, 40, 100],
    vintageWeight: [70, 30, 20, 50, 10],
    questionableWeight: [80, 90, 85, 60, 100],
    category: 'choice'
  },
  {
    id: 'social-habit',
    text: "How do you handle awkward social situations? 😅",
    options: [
      "Make a joke and hope for the best",
      "Pretend my phone is ringing",
      "Double down and make it weirder",
      "Slowly back away like a scared cat",
      "Start explaining blockchain technology"
    ],
    chaosWeight: [40, 30, 100, 60, 90],
    vintageWeight: [70, 50, 20, 40, 30],
    questionableWeight: [30, 60, 90, 70, 100],
    category: 'social'
  },
  {
    id: 'productivity',
    text: "What's your productivity secret weapon? ⚡",
    options: [
      "Color-coded everything with backup plans",
      "Panic-induced last-minute genius",
      "Procrastinate until the universe aligns",
      "Work in 3 AM creative bursts",
      "Ask ChatGPT to do my thinking"
    ],
    chaosWeight: [20, 80, 90, 70, 60],
    vintageWeight: [90, 30, 20, 40, 10],
    questionableWeight: [10, 70, 80, 60, 90],
    category: 'productivity'
  }
];

export const getQuestion = (index: number): Question | null => {
  return questions[index] || null;
};

export const getTotalQuestions = (): number => {
  return questions.length;
};