# SassBot Personality Test 🔥

A hilariously sassy AI-powered personality test built with React, OpenAI, and maximum attitude. Get roasted by ChatGPT while discovering your personality archetype!

## 🌟 Features

- **AI-Powered Sass**: Get personalized roasts from OpenAI's GPT-3.5-turbo
- **5 Personality Questions**: Covering wake-up times, food combos, questionable choices, social habits, and productivity
- **Dynamic Metrics**: Chaos Index, Vintage Vibes, and Questionable Choices calculations
- **Personality Archetypes**: From "Chaos Goblin" to "Suspiciously Normal"
- **Animated UI**: Smooth transitions and confetti celebrations
- **Share & Download**: Export your roast report as PDF or share on social media
- **Responsive Design**: Beautiful on desktop and mobile

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion + React Confetti
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **UI Components**: Radix UI + shadcn/ui
- **Export**: html2canvas + jsPDF
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd sass-test-buddy
npm install
```

### 2. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
VITE_OPENAI_API_KEY=sk-proj-your-api-key-here
```

### 3. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` file

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:8080` to see your sassy personality test!

## 🎯 How It Works

### Question System
- 5 carefully crafted questions with multiple choice answers
- Each answer has weighted scores for 3 personality metrics:
  - **Chaos Index**: How unpredictable you are
  - **Vintage Vibes**: Your appreciation for classic things
  - **Questionable Choices**: Your tendency to make... interesting decisions

### AI Integration
- **Sassy Responses**: After each answer, GPT generates a witty roast
- **Final Report**: AI creates a comprehensive personality analysis
- **Smart Prompting**: Category-specific prompts for better humor

### Personality Calculation
```typescript
// Metrics are calculated as weighted averages (0-100)
chaosIndex = sum(chaosWeights) / numberOfQuestions
vintageVibes = sum(vintageWeights) / numberOfQuestions  
questionableChoices = sum(questionableWeights) / numberOfQuestions

// Archetype determined by metric combinations
if (chaosIndex >= 70 && questionableChoices >= 70) {
  return "Chaos Goblin 👹";
}
// ... more archetype logic
```

## 🎨 Design System

The app uses a custom design system with:
- **Neon Pink** (`#FF6B9D`): Primary brand color
- **Electric Blue** (`#4ECDC4`): Secondary accent
- **Lime Green** (`#95E1D3`): Success states
- **Sunset Orange** (`#F8B500`): Warnings/ratings
- **Lavender** (`#B8B5FF`): Vintage elements

### Custom Gradients
```css
--gradient-primary: linear-gradient(135deg, hsl(320 85% 65%), hsl(280 65% 75%));
--gradient-chaos: linear-gradient(135deg, hsl(320 85% 65%), hsl(0 75% 60%), hsl(25 90% 65%));
```

## 📱 Component Architecture

```
src/
├── components/
│   ├── WelcomeScreen.tsx      # Landing page with features
│   ├── QuestionFlow.tsx       # Question display & answer selection
│   ├── SassyResponse.tsx      # AI response with rating system
│   ├── PersonalityReport.tsx  # Final results with metrics
│   ├── ProgressBar.tsx        # Test progress indicator
│   └── RatingSystem.tsx       # Star rating for sass level
├── data/
│   └── questions.ts           # Question bank with weights
├── services/
│   └── openai.ts             # AI API integration
├── utils/
│   └── personalityCalculator.ts # Metrics & archetype logic
└── pages/
    ├── Index.tsx             # Main test container
    └── PersonalityTest.tsx   # Test state management
```

## 🎭 Personality Archetypes

- **Chaos Goblin 👹**: High chaos + questionable choices
- **Vintage Soul 📻**: High vintage vibes, low chaos
- **Professional Weirdo 🤪**: Extremely questionable choices
- **Nostalgic Rebel 🕰️**: High chaos + vintage vibes
- **Suspiciously Normal 🤔**: Low scores across all metrics
- **Beautiful Disaster 🌪️**: Balanced chaos + questionable
- **Old Soul 👴**: High vintage, low questionable
- **Controlled Chaos 🎯**: Moderate chaos levels
- **Modern Mess 📱**: High questionable, low vintage
- **Enigma Wrapped in Mystery 🎭**: Balanced but mysterious

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel

# Set environment variable in Vercel dashboard
# VITE_OPENAI_API_KEY = your_api_key
```

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting provider
# Don't forget to set VITE_OPENAI_API_KEY in your hosting environment
```

## 🔧 Development

### Adding New Questions
1. Edit `src/data/questions.ts`
2. Add weights for each answer option
3. Update category types if needed

### Customizing AI Responses
1. Modify prompts in `src/services/openai.ts`
2. Adjust temperature for more/less creativity
3. Add category-specific humor hooks

### Styling Changes
1. Update design tokens in `src/index.css`
2. Modify Tailwind config in `tailwind.config.ts`
3. Create new component variants as needed

## 🎮 Testing

### Manual Testing Checklist
- [ ] All questions display correctly
- [ ] AI responses generate successfully
- [ ] Personality metrics calculate accurately
- [ ] Progress bar updates properly
- [ ] Final report generates with confetti
- [ ] Share functionality works
- [ ] Download PDF works
- [ ] Mobile responsive design
- [ ] Error handling for API failures

### Performance
- Initial bundle size: ~500KB gzipped
- AI response time: 1-3 seconds
- Smooth 60fps animations
- Mobile-first responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-sass`
3. Commit changes: `git commit -m 'Add amazing sass feature'`
4. Push to branch: `git push origin feature/amazing-sass`
5. Open a Pull Request

## 📄 License

MIT License - feel free to roast your friends responsibly!

## 🙏 Acknowledgments

- OpenAI for providing the sass engine
- The React community for amazing tools
- Everyone who enjoys getting roasted by AI

---

**Warning**: This app may cause uncontrollable laughter, existential questioning, and an unhealthy attachment to AI-generated insults. Use responsibly! 🔥✨