// Personality metrics calculation and archetype determination
export interface PersonalityMetrics {
  chaosIndex: number;
  vintageVibes: number;
  questionableChoices: number;
}

export interface AnswerData {
  questionId: string;
  answerIndex: number;
  answerText: string;
}

export const calculatePersonalityMetrics = (answers: AnswerData[]): PersonalityMetrics => {
  // Import questions data
  const questions = [
    {
      id: 'wake-up',
      chaosWeight: [0, 20, 40, 60, 100],
      vintageWeight: [80, 60, 40, 20, 10],
      questionableWeight: [10, 20, 30, 70, 90]
    },
    {
      id: 'food-combo',
      chaosWeight: [30, 50, 80, 70, 100],
      vintageWeight: [60, 40, 20, 30, 10],
      questionableWeight: [40, 50, 90, 80, 100]
    },
    {
      id: 'questionable-choice',
      chaosWeight: [60, 80, 70, 40, 100],
      vintageWeight: [70, 30, 20, 50, 10],
      questionableWeight: [80, 90, 85, 60, 100]
    },
    {
      id: 'social-habit',
      chaosWeight: [40, 30, 100, 60, 90],
      vintageWeight: [70, 50, 20, 40, 30],
      questionableWeight: [30, 60, 90, 70, 100]
    },
    {
      id: 'productivity',
      chaosWeight: [20, 80, 90, 70, 60],
      vintageWeight: [90, 30, 20, 40, 10],
      questionableWeight: [10, 70, 80, 60, 90]
    }
  ];

  let totalChaos = 0;
  let totalVintage = 0;
  let totalQuestionable = 0;

  answers.forEach((answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && answer.answerIndex >= 0 && answer.answerIndex < question.chaosWeight.length) {
      totalChaos += question.chaosWeight[answer.answerIndex];
      totalVintage += question.vintageWeight[answer.answerIndex];
      totalQuestionable += question.questionableWeight[answer.answerIndex];
    }
  });

  // Normalize to 0-100 scale
  const chaosIndex = Math.round(totalChaos / answers.length);
  const vintageVibes = Math.round(totalVintage / answers.length);
  const questionableChoices = Math.round(totalQuestionable / answers.length);

  return {
    chaosIndex: Math.min(100, Math.max(0, chaosIndex)),
    vintageVibes: Math.min(100, Math.max(0, vintageVibes)),
    questionableChoices: Math.min(100, Math.max(0, questionableChoices))
  };
};

export const determineArchetype = (metrics: PersonalityMetrics): string => {
  const { chaosIndex, vintageVibes, questionableChoices } = metrics;

  // Archetype determination logic
  if (chaosIndex >= 70 && questionableChoices >= 70) {
    return "Chaos Goblin 👹";
  } else if (vintageVibes >= 70 && chaosIndex <= 30) {
    return "Vintage Soul 📻";
  } else if (questionableChoices >= 80) {
    return "Professional Weirdo 🤪";
  } else if (chaosIndex >= 60 && vintageVibes >= 60) {
    return "Nostalgic Rebel 🕰️";
  } else if (chaosIndex <= 30 && vintageVibes <= 30 && questionableChoices <= 30) {
    return "Suspiciously Normal 🤔";
  } else if (chaosIndex >= 50 && questionableChoices >= 50) {
    return "Beautiful Disaster 🌪️";
  } else if (vintageVibes >= 50 && questionableChoices <= 40) {
    return "Old Soul 👴";
  } else if (chaosIndex >= 40 && chaosIndex <= 60) {
    return "Controlled Chaos 🎯";
  } else if (questionableChoices >= 60 && vintageVibes <= 40) {
    return "Modern Mess 📱";
  } else {
    return "Enigma Wrapped in Mystery 🎭";
  }
};

export const findWeirdestAnswer = (answers: AnswerData[]): string => {
  // Find the answer with highest questionable score
  const questions = [
    {
      id: 'wake-up',
      questionableWeight: [10, 20, 30, 70, 90],
      options: [
        "5 AM (I'm basically a rooster)",
        "7 AM (Productive human being)",
        "10 AM (Reasonable adult)",
        "12 PM (Don't judge me)",
        "Whenever my body decides (Chaos mode)"
      ]
    },
    {
      id: 'food-combo',
      questionableWeight: [40, 50, 90, 80, 100],
      options: [
        "Pizza with pineapple (Classic controversial)",
        "Fries dipped in ice cream (Sweet & salty)",
        "Cereal with orange juice (Milk is for weaklings)",
        "Pickles with peanut butter (Don't knock it)",
        "Sushi with ranch dressing (I live dangerously)"
      ]
    },
    {
      id: 'questionable-choice',
      questionableWeight: [80, 90, 85, 60, 100],
      options: [
        "Bought something at 3 AM from an infomercial",
        "Tried to cut my own hair (during quarantine)",
        "Stalked my crush's ex on social media",
        "Ate food that fell on the floor (5-second rule)",
        "Started a conversation with 'As an AI...'"
      ]
    },
    {
      id: 'social-habit',
      questionableWeight: [30, 60, 90, 70, 100],
      options: [
        "Make a joke and hope for the best",
        "Pretend my phone is ringing",
        "Double down and make it weirder",
        "Slowly back away like a scared cat",
        "Start explaining blockchain technology"
      ]
    },
    {
      id: 'productivity',
      questionableWeight: [10, 70, 80, 60, 90],
      options: [
        "Color-coded everything with backup plans",
        "Panic-induced last-minute genius",
        "Procrastinate until the universe aligns",
        "Work in 3 AM creative bursts",
        "Ask ChatGPT to do my thinking"
      ]
    }
  ];

  let weirdestAnswer = "being perfectly normal";
  let maxWeirdness = 0;

  answers.forEach((answer) => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && answer.answerIndex >= 0 && answer.answerIndex < question.questionableWeight.length) {
      const weirdness = question.questionableWeight[answer.answerIndex];
      if (weirdness > maxWeirdness) {
        maxWeirdness = weirdness;
        weirdestAnswer = question.options[answer.answerIndex];
      }
    }
  });

  return weirdestAnswer;
};