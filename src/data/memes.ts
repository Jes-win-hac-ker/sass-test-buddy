// This object maps your personality archetypes to the image files in your public/memes/ folder.
export const memes: Record<string, string> = {
  "Chaos Goblin 👹": "/memes/chaos-goblin.gif",
  "Vintage Soul 📻": "/memes/vintage-soul.jpg",
  "Professional Weirdo 🤪": "/memes/professional-weirdo.png",
  "Nostalgic Rebel 🕰️": "/memes/nostalgic-rebel.gif",
  "Suspiciously Normal 🤔": "/memes/suspiciously-normal.jpg",
  "Beautiful Disaster 🌪️": "/memes/beautiful-disaster.png",
  "Old Soul 👴": "/memes/old-soul.gif",
  "Controlled Chaos 🎯": "/memes/controlled-chaos.jpg",
  "Modern Mess 📱": "/memes/modern-mess.png",
  "Enigma Wrapped in Mystery 🎭": "/memes/enigma.gif",
};

// This function finds the correct meme for a given archetype, with a fallback if none is found.
export const getMemeForArchetype = (archetype: string): string => {
  return memes[archetype] || "/memes/default-meme.gif"; // A default meme for safety
};
