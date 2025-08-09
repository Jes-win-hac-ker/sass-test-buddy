import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuestionFlow } from '@/components/QuestionFlow';
import { SassyResponse } from '@/components/SassyResponse';
import { PersonalityReport } from '@/components/PersonalityReport';
import { ProgressBar } from '@/components/ProgressBar';
import { questions, getTotalQuestions } from '@/data/questions';
import { generateSassyResponse, generatePersonalityReport } from '@/services/geminiapi';
import { calculatePersonalityMetrics, determineArchetype, findWeirdestAnswer } from '@/utils/personalityCalculator';
import type { AnswerData } from '@/utils/personalityCalculator';
import { getMemeForArchetype } from '@/data/memes'; // Import the new meme function

type TestState = 'welcome' | 'question' | 'response' | 'report';

export const PersonalityTest = () => {
  const [state, setState] = useState<TestState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [personalityReport, setPersonalityReport] = useState('');
  const [ratings, setRatings] = useState<number[]>([]);
  const [savageryLevel, setSavageryLevel] = useState<'normal' | 'savage'>('normal');
  const [memeUrl, setMemeUrl] = useState(''); // State to hold the meme URL

  const totalQuestions = getTotalQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setState('question');
  };

  const handleAnswerSelect = async (answerIndex: number, answerText: string) => {
    const newAnswer: AnswerData = {
      questionId: currentQuestion.id,
      answerIndex,
      answerText
    };

    setAnswers(prev => [...prev, newAnswer]);
    setIsLoadingResponse(true);
    setState('response');

    try {
      const response = await generateSassyResponse({
        answer: answerText,
        category: currentQuestion.category,
        questionText: currentQuestion.text,
        savagery: savageryLevel 
      });
      setCurrentResponse(response);
    } catch (error) {
      console.error('Failed to generate response:', error);
      setCurrentResponse("My sass circuits are overloaded! 😵‍💫 But your answer was... interesting.");
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setRatings(prev => [...prev, rating]);
    if (rating <= 2) {
      setSavageryLevel('savage');
    } else {
      setSavageryLevel('normal');
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setState('question');
    } else {
      generateFinalReport();
    }
  };

  const generateFinalReport = async () => {
    setState('report');
    setIsLoadingReport(true);

    try {
      const metrics = calculatePersonalityMetrics(answers);
      const archetype = determineArchetype(metrics);
      const weirdestAnswer = findWeirdestAnswer(answers);
      
      // Get the meme for the calculated archetype
      const meme = getMemeForArchetype(archetype);
      setMemeUrl(meme);

      const report = await generatePersonalityReport({
        chaosIndex: metrics.chaosIndex,
        vintageVibes: metrics.vintageVibes,
        questionableChoices: metrics.questionableChoices,
        archetype,
        weirdestAnswer
      });

      setPersonalityReport(report);
    } catch (error) {
      console.error('Failed to generate report:', error);
      setPersonalityReport("Your personality broke my AI brain... which is actually quite impressive!");
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleRestart = () => {
    setState('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentResponse('');
    setPersonalityReport('');
    setRatings([]);
    setSavageryLevel('normal');
    setMemeUrl(''); // Reset the meme URL
  };

  const getProgressStep = () => {
    switch (state) {
      case 'welcome': return 0;
      case 'question': return currentQuestionIndex + 1;
      case 'response': return currentQuestionIndex + 1;
      case 'report': return totalQuestions;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {state !== 'welcome' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ProgressBar 
              currentStep={getProgressStep()} 
              totalSteps={totalQuestions}
            />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {state === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <WelcomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {state === 'question' && currentQuestion && (
            <motion.div key={`question-${currentQuestionIndex}`} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}>
              <QuestionFlow 
                question={currentQuestion}
                onAnswerSelect={handleAnswerSelect}
              />
            </motion.div>
          )}

          {state === 'response' && (
            <motion.div key={`response-${currentQuestionIndex}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }}>
              <SassyResponse
                response={currentResponse}
                isLoading={isLoadingResponse}
                onRatingChange={handleRatingChange}
                onContinue={handleContinue}
              />
            </motion.div>
          )}

          {state === 'report' && (
            <motion.div key="report" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }}>
              <div className="w-full max-w-4xl mx-auto relative">
                {/* Meme Display */}
                {memeUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.5 }}
                    className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 z-10 -mt-8 -mr-8"
                  >
                    <img src={memeUrl} alt="Personality Meme" className="rounded-lg shadow-2xl w-full h-full object-cover border-4 border-white" />
                  </motion.div>
                )}
                
                <PersonalityReport
                  metrics={calculatePersonalityMetrics(answers)}
                  archetype={determineArchetype(calculatePersonalityMetrics(answers))}
                  report={personalityReport}
                  isLoading={isLoadingReport}
                  onRestart={handleRestart}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
