import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuestionFlow } from '@/components/QuestionFlow';
import { SassyResponse } from '@/components/SassyResponse';
import { PersonalityReport } from '@/components/PersonalityReport';
import { ProgressBar } from '@/components/ProgressBar';
import { questions, getTotalQuestions } from '@/data/questions';
import { generateSassyResponse, generatePersonalityReport } from '@/services/openai';
import { calculatePersonalityMetrics, determineArchetype, findWeirdestAnswer } from '@/utils/personalityCalculator';
import type { AnswerData } from '@/utils/personalityCalculator';

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
        questionText: currentQuestion.text
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
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setState('question');
    } else {
      // Generate final report
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
        {/* Progress Bar - Show only during test */}
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

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {state === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WelcomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {state === 'question' && currentQuestion && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionFlow 
                question={currentQuestion}
                onAnswerSelect={handleAnswerSelect}
              />
            </motion.div>
          )}

          {state === 'response' && (
            <motion.div
              key={`response-${currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <SassyResponse
                response={currentResponse}
                isLoading={isLoadingResponse}
                onRatingChange={handleRatingChange}
                onContinue={handleContinue}
              />
            </motion.div>
          )}

          {state === 'report' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <PersonalityReport
                metrics={calculatePersonalityMetrics(answers)}
                archetype={determineArchetype(calculatePersonalityMetrics(answers))}
                report={personalityReport}
                isLoading={isLoadingReport}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};