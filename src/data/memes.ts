// This object maps your personality archetypes to the image files in your public/memes/ folder.
export const memes: Record<string, string> = {
  "Beautiful Disaster 🌪️": "beautiful-disaster.png",
  "Chaos Goblin 👹": "chaos-goblin.gif",
  "Controlled Chaos 🎯": "controlled-chaos.jpg",
  "Nostalgic Rebel 🕰️": "nostalgic-rebel.gif",
  "Professional Weirdo 🤪": "professional-weirdo.png",
  "Suspiciously Normal 🤔": "suspiciously-normal.jpg",
  "Vintage Soul 📻": "vintage-soul.jpg",
};

// This function finds the correct meme for a given archetype, with a fallback if none is found.
export const getMemeForArchetype = (archetype: string): string => {
  const base = import.meta.env.BASE_URL;
  const memeFileName = memes[archetype] || "default-meme.gif"; // A default meme for safety
  return `${base}memes/${memeFileName}`;
};
