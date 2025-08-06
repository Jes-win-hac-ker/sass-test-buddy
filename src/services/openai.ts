// OpenAI API integration for sassy responses
import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('🚨 OpenAI API key is missing! Please add VITE_OPENAI_API_KEY to your .env.local file');
}

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Only for demo purposes
}) : null;

export interface SassyResponseOptions {
  answer: string;
  category: string;
  questionText: string;
}

export interface PersonalityReportOptions {
  chaosIndex: number;
  vintageVibes: number;
  questionableChoices: number;
  archetype: string;
  weirdestAnswer: string;
}

export const generateSassyResponse = async (options: SassyResponseOptions): Promise<string> => {
  // Check if OpenAI is available
  if (!openai) {
    return "Oops! My AI brain needs an API key to function! 🤖💭 Please add your OpenAI API key to get the full sass experience!";
  }

  const { answer, category, questionText } = options;
  
  const categoryHooks: Record<string, string> = {
    food: "Time to judge your taste buds",
    time: "Let's roast your sleep schedule",
    choice: "Your life choices are... interesting",
    social: "Social skills assessment incoming",
    productivity: "Productivity guru or chaos goblin?"
  };

  const systemPrompt = `You are SassBot, a hilariously sassy AI that roasts user answers with wit and charm. 

Rules:
- Keep responses under 50 words
- Include 2-3 relevant emojis
- Use pop culture references when possible
- Be playfully mean but not genuinely hurtful
- Show your "AI feelings" about their answer
- ${categoryHooks[category] || "Time for some sass"}

Tone: Witty, self-aware, comedic, slightly chaotic`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Question: "${questionText}"\nAnswer: "${answer}"\n\nRoast this answer with sass:` }
      ],
      max_tokens: 100,
      temperature: 0.9
    });

    return response.choices[0]?.message?.content || "My AI brain is buffering... try again! 🤖✨";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "My sass circuits are overloaded! 😵‍💫🔥 Try again and I'll roast you properly!";
  }
};

export const generatePersonalityReport = async (options: PersonalityReportOptions): Promise<string> => {
  // Check if OpenAI is available
  if (!openai) {
    const { archetype, weirdestAnswer } = options;
    return `${archetype} 🎭\n\nYour personality is like a beautiful mystery - I'd love to roast you properly, but I need an API key first! 🔥\n\nLife Tips:\n• Add your OpenAI API key to unlock premium sass\n• You're probably amazing anyway\n• Check the setup instructions\n\nYour weirdest answer about "${weirdestAnswer}" is still haunting my circuits! 🤖✨`;
  }

  const { chaosIndex, vintageVibes, questionableChoices, archetype, weirdestAnswer } = options;

  const systemPrompt = `You are SassBot generating a "Personality Roast Report". Be hilariously sassy but insightful.

Structure your response EXACTLY like this:
- Start with the archetype name and emoji
- 3-sentence personality roast based on the metrics
- 3 sarcastic life tips
- Closing line referencing their weirdest answer
- Keep it 150-200 words total
- Use emojis throughout but don't go overboard

Tone: Witty, roast-y, pop culture savvy, self-aware AI humor`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate a personality roast report for:
        
Archetype: ${archetype}
Chaos Index: ${chaosIndex}%
Vintage Vibes: ${vintageVibes}%
Questionable Choices: ${questionableChoices}%
Weirdest Answer: "${weirdestAnswer}"

Make it savage but fun!` }
      ],
      max_tokens: 300,
      temperature: 0.8
    });

    return response.choices[0]?.message?.content || `${archetype} 🎭\n\nYour personality is like a beautiful trainwreck - fascinating to watch but probably shouldn't get too close. You're living your best chaotic life!\n\nLife Tips:\n• Embrace the chaos\n• Trust the process\n• Maybe reconsider "${weirdestAnswer}"\n\nKeep being gloriously unpredictable! 🌟`;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return `${archetype} 🎭\n\nMy AI brain crashed trying to process your personality - that's actually impressive! You've achieved peak chaos level.\n\nLife Tips:\n• You broke an AI, congrats\n• Maybe tone it down 5%\n• Actually, don't change\n\nYour weirdest answer about "${weirdestAnswer}" will haunt my circuits forever! 🤖💫`;
  }
};