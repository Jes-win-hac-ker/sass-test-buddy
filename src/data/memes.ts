// This object maps your personality archetypes to the image files in your public/memes/ folder.
export const memes: Record<string, string> = {
  "Beautiful Disaster 🌪️": "beautifuldisaster.jpg",
  "Chaos Goblin 👹": "chaosgoblin.jpg",
  "Controlled Chaos 🎯": "controlledchaos.jpg",
  "Nostalgic Rebel 🕰️": "nostalgicrebel.jpg",
  "Professional Weirdo 🤪": "professionalweirdo.jpg",
  "Suspiciously Normal 🤔": "suspiciouslynormal.jpg",
  "Vintage Soul 📻": "vintagesoul.jpg",
};

// This function finds the correct meme for a given archetype, with a fallback if none is found.
export const getMemeForArchetype = (archetype: string): string => {
  const base = import.meta.env.BASE_URL;
  const memeFileName = memes[archetype] || "default-meme.gif"; // A default meme for safety
  return `${base}memes/${memeFileName}`;
};
