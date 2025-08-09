// This object maps your personality archetypes to the image files in your public/memes/ folder.
export const memes: Record<string, string> = {
  "Beautiful Disaster 🌪️": "/memes/beautiful-disaster.png",
  "Chaos Goblin 👹": "/memes/chaos-goblin.gif",
  "Controlled Chaos 🎯": "/memes/controlled-chaos.jpg",
  "Nostalgic Rebel 🕰️": "/memes/nostalgic-rebel.gif",
  "Professional Weirdo 🤪": "/memes/professional-weirdo.png",
  "Suspiciously Normal 🤔": "/memes/suspiciously-normal.jpg",
  "Vintage Soul 📻": "/memes/vintage-soul.jpg",
};

// This function finds the correct meme for a given archetype, with a fallback if none is found.
export const getMemeForArchetype = (archetype: string): string => {
  return memes[archetype] || "/memes/default-meme.gif"; // A default meme for safety
};
