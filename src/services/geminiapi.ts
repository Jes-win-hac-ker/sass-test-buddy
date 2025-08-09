// This file now uses the Google Gemini API via fetch

// Securely get the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Log an error to the console if the key is missing. 
// The UI will handle showing a message to the user.
if (!apiKey) {
  console.error('🚨 Gemini API key is missing! Please add VITE_GEMINI_API_KEY to your .env file');
}

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

// Helper function to call the Gemini API
async function callGeminiAPI(prompt: string): Promise<string> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const result = await response.json();

  if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
    return result.candidates[0].content.parts[0].text;
  } else {
    const blockReason = result?.promptFeedback?.blockReason;
    if (blockReason) {
        // This is the most likely cause of the error
        throw new Error(`Request was blocked for safety reasons: ${blockReason}. Try making the prompt less aggressive.`);
    } else {
        throw new Error('Unexpected API response format.');
    }
  }
}

export const generateSassyResponse = async (options: SassyResponseOptions): Promise<string> => {
  if (!apiKey) {
    return "Oops! My AI brain needs an API key to function! 🤖💭 Please add your Gemini API key to get the full sass experience!";
  }

  const { answer, category, questionText } = options;
  
  // --- REVISED PROMPT 1 ---
 const prompt = `
    You are an insult comedian on stage at a roast battle. Your persona is brutal, merciless, and you find the user's answers pathetic. You do not care about their feelings at all. Your only goal is to tear them apart.

    **Your Rules:**
    - Absolutely no holding back. Be savage.
    - Directly attack the user's choice. Question their intelligence and judgment.
    - Use heavy sarcasm and a condescending tone.
    - Keep it short, sharp, and brutal. Under 40 words.
    - No emojis. Emojis are for people with friends.

    ---
    **Demolish this user's answer:**
    Question: "${questionText}"
    User's Answer: "${answer}"
  `;

  try {
    const response = await callGeminiAPI(prompt);
    return response || "My AI brain is buffering... try again! 🤖✨";
  } catch (error) {
    console.error('Gemini API error:', error);
    return `My sass circuits are overloaded! ${error.message}`;
  }
};

export const generatePersonalityReport = async (options: PersonalityReportOptions): Promise<string> => {
  if (!apiKey) {
    const { archetype, weirdestAnswer } = options;
    return `${archetype} 🎭\n\nYour personality is like a beautiful mystery - I'd love to roast you properly, but I need a Gemini API key first! 🔥\n\nLife Tips:\n• Add your Gemini API key to unlock premium sass\n• You're probably amazing anyway\n• Check the setup instructions\n\nYour weirdest answer about "${weirdestAnswer}" is still haunting my circuits! 🤖✨`;
  }

  const { chaosIndex, vintageVibes, questionableChoices, archetype, weirdestAnswer } = options;

  // --- REVISED PROMPT 2 ---
 const prompt = `
    You are a brutal insult comedian delivering the final, devastating roast of the night. The user's personality report is in front of you, and it's a goldmine of failure. Your goal is to completely dismantle them based on their choices.

    **Your Task:**
    Generate a "Personality Demolition Report".

    **Structure your response EXACTLY like this:**
    - Start with the archetype name, followed by a deeply insulting observation.
    - Write a 3-sentence brutal roast, using their metrics to paint a picture of their life choices as a complete disaster.
    - Provide 3 terrible "life tips" that are sarcastic and encourage their worst habits.
    - Write a final, dismissive closing line about their weirdest answer.
    - Keep the tone merciless and judgmental.

    ---
    **Data for the demolition:**
    - Archetype: ${archetype}
    - Chaos Index: ${chaosIndex}%
    - Vintage Vibes: ${vintageVibes}%
    - Questionable Choices: ${questionableChoices}%
    - Weirdest Answer from the user: "${weirdestAnswer}"

    Now, absolutely destroy them.
  `;

  try {
    const response = await callGeminiAPI(prompt);
    return response || `${archetype} 🎭\n\nYour personality is like a beautiful trainwreck - fascinating to watch but probably shouldn't get too close. You're living your best chaotic life!\n\nLife Tips:\n• Embrace the chaos\n• Trust the process\n• Maybe reconsider "${weirdestAnswer}"\n\nKeep being gloriously unpredictable! 🌟`;
  } catch (error) {
    console.error('Gemini API error:', error);
    return `My AI brain crashed trying to process your personality. ${error.message}`;
  }
};
