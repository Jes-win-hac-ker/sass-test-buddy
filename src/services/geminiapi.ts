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
  savagery: 'normal' | 'savage'; // Add savagery level
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
        throw new Error(`Request was blocked for safety reasons: ${blockReason}. Try making the prompt less aggressive.`);
    } else {
        throw new Error('Unexpected API response format.');
    }
  }
}

export const generateSassyResponse = async (options: SassyResponseOptions): Promise<string> => {
  if (!apiKey) {
    return "Enda mone, API key illand enth cheyyana? Key add cheythitt vaa!";
  }

  const { answer, category, questionText, savagery } = options;
  
  // --- DYNAMIC PROMPT LOGIC ---
  let savageryInstruction = "Your tone is condescending and brutally honest, but clever.";
  if (savagery === 'savage') {
    savageryInstruction = "The user gave a low rating, so they want a real roast. Step it up. Be extra condescending and merciless. Question their life choices more directly.";
  }

  const prompt = `
    You are a sharp-tongued Thrissur 'ettan' (older brother) roasting your younger sibling. ${savageryInstruction}

    **Your Rules:**
    - Use natural Manglish with authentic Thrissur slang. Examples: 'ente gediye', 'what coconut are you speakng', 'thakali', 'thengeda moode', 'chali parayathe monew', 'mandatharam', 'nanayittund'.
    - **Avoid overly vulgar words, but be savage.** The roast should be clever and true.
    - Start with a condescending observation like "allada..." or "nee enthutta ...".
    - Directly question their logic and imply their choice is pointless and stupid.
    - Keep it short, like a sharp, roast comment.

    ---
    **User paranja ee answer vechitt nalla reethiyil onnu ookie vidu (severly roast this user's answer):**
    Question: "${questionText}"
    User's Answer: "${answer}"
  `;

  try {
    const response = await callGeminiAPI(prompt);
    return response || "Enthokkeyo oru preshnam... Pinne nokkam!";
  } catch (error) {
    console.error('Gemini API error:', error);
    return `Scene contra aayi! ${error.message}`;
  }
};

export const generatePersonalityReport = async (options: PersonalityReportOptions): Promise<string> => {
  if (!apiKey) {
    const { archetype, weirdestAnswer } = options;
    return `${archetype} 🎭\n\nIvide full scene aanallo! Oru report tharan enikk API key venam ketto. Veruthe alla ninne '${weirdestAnswer}' ennu parayunne!`;
  }

  const { chaosIndex, vintageVibes, questionableChoices, archetype, weirdestAnswer } = options;

  const prompt = `
    You are a sharp-tongued Thrissur 'ettan' (older brother) giving a final analysis of your younger sibling's personality. Your goal is to roast them mercilessly with cleverness and classic Thrissur charm.

    **Your Task:**
    Generate a "Personality 'Vaaral' Report" (Roast Report). **Do not use overly vulgar words.**

    **Structure your response EXACTLY like this:**
    - **Archetype:** Start with the archetype name, followed by a condescending, 'enda gediye ninte oru avastha' style observation.
    - **Analysis:** Write a 2-3 sentence savage ookal. Connect their metrics to a cringe, local Thrissur failure, like messing up a plan or making a 'ultimate stupid' decision.
    - **"Life Tips":** Provide 3 sarcastic 'upadeshams' (advice) that sound like an older brother roasting them for their silly and stupid life choices.
    - **Closing Line:** End with a final, dismissive and brutal roast comment about their weirdest answer, questioning how they function in daily life.
    - **Tone:** Condescending older brother, teasing and ookal, brutally honest and roasting, and 100% Thrissur.

    ---
    **Data for the report:**
    - Archetype: ${archetype}
    - Chaos Index: ${chaosIndex}%
    - Vintage Vibes: ${vintageVibes}%
    - Questionable Choices: ${questionableChoices}%
    - Weirdest Answer from the user: "${weirdestAnswer}"

    Now, generate the report, monnew!
  `;

  try {
    const response = await callGeminiAPI(prompt);
    return response || `${archetype} 🎭\n\nEnda mone, ninte report load cheyyan pattunnillallo! Ninte ee '${weirdestAnswer}' enna answer kanditt AI polum hang aayi!`;
  } catch (error) {
    console.error('Gemini API error:', error);
    return `Report edukkan poyappo pani kitti! ${error.message}`;
  }
};
