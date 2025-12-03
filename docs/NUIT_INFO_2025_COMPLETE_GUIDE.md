# 🌙 NUIT DE L'INFO 2025 - COMPLETE TEAM GUIDE
## For Ahmed & Team (Mauritania) 🇲🇷

**Event Date:** December 4-5, 2025
**Duration:** 16h36 (sunset) → 08h04 (sunrise) = ~15.5 hours
**Max Défis:** 5 per team + National Subject (mandatory)

---

## 👨‍💻 YOUR TEAM PROFILE

### Ahmed's Tech Stack
| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15, React 19 |
| **Styling** | TailwindCSS, Framer Motion |
| **Database** | PostgreSQL, Supabase, Neon, Convex |
| **AI/ML** | Vercel AI SDK, Claude Code, OpenAI API |
| **Deployment** | Vercel |
| **Other** | TypeScript, shadcn/ui, Firebase |

### Team Strengths
✅ Full-stack web development
✅ Modern React ecosystem
✅ AI integration experience (Sorety AI project)
✅ Real-time database (Supabase/Convex)
✅ Animation/UX (Framer Motion)
✅ Rapid development with Claude Code

### Potential Gaps
⚠️ Chrome extension development (Manifest V3)
⚠️ Audio processing (MediaRecorder API)
⚠️ Pose detection/Computer Vision
⚠️ Old-school tech (HTML4, CSS2.1, jQuery 1)

---

# 📋 COMPLETE DÉFIS ANALYSIS

---

## 🐍 DÉFI #483 - AUTOCUT
### "Hidden Snake Game"

**URL:** https://www.nuitdelinfo.com/inscription/defis/483

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** AUTOCUT
> 
> **Prix:**
> - 1er : 250€ de cartes-cadeau Amazon
> - 2ᵉ : 100€ de cartes-cadeau Amazon
> 
> **Le Défi:**
> Cachez au sein de votre site un jeu de snake

### 🔍 ANALYSIS

**What They Really Want:**
- A hidden Easter egg in your main application
- Classic Snake game (Nokia-style)
- Must be discoverable but not obvious
- Shows creativity and fun coding

**Difficulty:** ⭐ (1/5) - VERY EASY
**Time Estimate:** 1-2 hours
**Competition Level:** 🟢 LOW (simple challenge, not prestigious)
**Prize Value:** €250 / €100

### 💡 CREATIVE IMPLEMENTATION IDEAS

**Trigger Ideas:**
1. **Konami Code** - ↑↑↓↓←→←→BA (classic!)
2. **Click logo 5 times** rapidly
3. **Type "snake"** anywhere on page
4. **Secret URL** - `/snake` or `?game=snake`
5. **Hold S key for 3 seconds**
6. **Right-click specific element**

**Game Variations:**
1. **Ocean Snake** - Snake swims through water, eats fish (ties to national subject theme)
2. **Pixel Snake** - 8-bit retro style
3. **Neon Snake** - Glowing trail effect
4. **Speed Mode** - Gets progressively faster

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// components/SnakeGame.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

interface Position { x: number; y: number; }

export function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Game logic here...
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-green-400">Score: {score}</span>
          <button onClick={onClose} className="text-red-400">✕</button>
        </div>
        <canvas 
          width={GRID_SIZE * CELL_SIZE} 
          height={GRID_SIZE * CELL_SIZE}
          className="border-2 border-green-500"
        />
      </div>
    </div>
  );
}

// Konami Code Hook
export function useKonamiCode(callback: () => void) {
  useEffect(() => {
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let index = 0;
    
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === code[index]) {
        index++;
        if (index === code.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}
```

### ✅ WINNING STRATEGY
1. Use Canvas API for smooth rendering
2. Add high score with localStorage
3. Sound effects (optional but impressive)
4. Connect to theme: "Ocean Snake" eating fish
5. Celebratory animation on high score

### 👥 TEAM TASK ASSIGNMENT
| Member | Task | Time |
|--------|------|------|
| Dev 1 | Snake game logic | 45min |
| Dev 2 | Canvas rendering | 30min |
| Dev 1 | Konami code trigger | 15min |
| Both | Integration & testing | 30min |

---

## 🔐 DÉFI #481 - EES-MECI
### "Creative Authentication Interface"

**URL:** https://www.nuitdelinfo.com/inscription/defis/481

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** EES-MECI (Eiffage Énergie Systèmes)
> 
> **About MECI:**
> Meci, expert en comptage transactionnel et analyse du gaz naturel, du liquide et des énergies renouvelables. Meci est la marque expertise d'Eiffage Énergie Systèmes spécialisée dans le comptage et l'analyse transactionnels. Spécialiste du comptage et de l'analyse des nouvelles énergies et des hydrocarbures liquides et gazeux, Meci accompagne ses clients à chaque étape, de la production au transport, jusqu'à la distribution.
> 
> Reconnue à l'international pour son savoir-faire en comptage transactionnel, Meci conçoit, développe et met en œuvre des solutions de mesurage et d'analyse fiables et innovantes. Nos équipes assurent également la maintenance et la rénovation des équipements pour garantir la sécurité, la performance et la durabilité de la chaîne logistique des énergies vertes et des hydrocarbures.
> 
> **Conception et fabrication de matériels connectés:** Nos produits de comptages et de télé-transmissions, de très faibles consommation d'énergie, sont connectés via la 4G. Ils déposent leurs relevés et leurs calculs tous les jours sur un Cloud de notre conception. Ce sont aussi des appareils de télé-surveillance, transmettant des alarmes configurées sur des seuils de dépassement des mesures effectuées.
> 
> Nos clients peuvent consulter leur données sauvegardées mais aussi les acquérir via des Web Services (REST API). Sur certaines applications, notre Cloud est une passerelle vers le monde de l'Internet des Objets (IoT - Internet of Things).
> 
> **Prix:**
> - 1ère équipe : pour chaque membre un lot complet de 6 goodies (mug, sac en toile, porte-clés, stylo, carnet et clé USB)
> - 2ème équipe : pour chaque membre un lot de 3 goodies (porte-clés, stylo, et clé USB)
> - 3, 4 et 5ème équipe : pour chaque membre 1 goodie (porte-clés)
> 
> **Le Défi:**
> La plupart des sites WEB demande à l'utilisateur de s'identifier. Alors que les smartphones ou leurs applis proposent quelques interfaces différentes (code PIN, figure géométrique à dessiner, empreinte digitale, etc.), les sites WEB ne proposent quasi exclusivement que la fameuse interface login/password sous forme de TextBox.
> 
> Le but de ce défi est de concevoir une interface ou d'imaginer une méthode originale, amusante ou surprenante de s'identifier.
> 
> **N'oubliez pas, ce qui prime c'est l'imagination... car il faut absolument qu'Ali en reste Baba ... ;)**

### 🔍 ANALYSIS

**What They Really Want:**
- Replace boring username/password with something creative
- "Ali Baba" hint = "Open Sesame" = magic words/patterns
- Focus on IMAGINATION over security
- Fun, surprising, memorable experience
- Sponsor is IoT/energy company - not UX experts, so creativity wins!

**Difficulty:** ⭐⭐ (2/5) - EASY
**Time Estimate:** 2-3 hours
**Competition Level:** 🟢 VERY LOW (goodies not cash = fewer teams)
**Prize Value:** Goodies (~€50 value per person)

### 💡 CREATIVE IMPLEMENTATION IDEAS

**🏆 TOP PICK: "The Magic Door" (Ali Baba Theme)**
```
User sees a beautiful animated door
They must "knock" the correct rhythm pattern
Door animates open with magical effects
"Open Sesame!" voice feedback
```

**Alternative Ideas:**
1. **Emoji Passphrase** - Select 4 emojis in correct order
2. **Voice Authentication** - Say "Open Sesame" (Web Speech API)
3. **Gesture Drawing** - Draw a symbol on canvas
4. **Rhythm Knock** - Tap a pattern like Morse code
5. **Color Memory** - Remember and reproduce color sequence
6. **Musical Lock** - Play notes in correct order
7. **Shake to Unlock** - Device motion pattern (mobile)
8. **Face Expression** - Smile to unlock (face-api.js)

### 🛠️ TECHNICAL IMPLEMENTATION - "THE MAGIC DOOR"

```tsx
// components/MagicDoorAuth.tsx
'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET_PATTERN = [0, 300, 600, 1000, 1500]; // knock timing in ms
const TOLERANCE = 150; // ms tolerance

export function MagicDoorAuth({ onSuccess }: { onSuccess: () => void }) {
  const [knocks, setKnocks] = useState<number[]>([]);
  const [doorOpen, setDoorOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const startTime = useRef<number>(0);
  const audioContext = useRef<AudioContext | null>(null);

  const playKnockSound = () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    oscillator.frequency.value = 200;
    gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.1);
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + 0.1);
  };

  const handleKnock = () => {
    playKnockSound();
    
    if (knocks.length === 0) {
      startTime.current = Date.now();
      setKnocks([0]);
      setFeedback('🔔 Knock detected...');
    } else {
      const elapsed = Date.now() - startTime.current;
      const newKnocks = [...knocks, elapsed];
      setKnocks(newKnocks);
      
      if (newKnocks.length === SECRET_PATTERN.length) {
        // Check pattern
        const isCorrect = SECRET_PATTERN.every((time, i) => 
          Math.abs(newKnocks[i] - time) < TOLERANCE
        );
        
        if (isCorrect) {
          setDoorOpen(true);
          setFeedback('✨ Open Sesame! ✨');
          setTimeout(onSuccess, 1500);
        } else {
          setFeedback('❌ Wrong pattern! Try again...');
          setTimeout(() => {
            setKnocks([]);
            setFeedback('');
          }, 1500);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-900 to-amber-950">
      <h1 className="text-3xl font-bold text-amber-200 mb-8">
        🏺 The Cave of Wonders 🏺
      </h1>
      
      <p className="text-amber-300 mb-4">
        Knock the secret pattern to enter...
      </p>
      
      <div className="relative w-64 h-96 perspective-1000">
        <motion.div
          className="absolute inset-0 bg-amber-800 rounded-t-full border-8 border-amber-600 cursor-pointer shadow-2xl"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          animate={{ rotateY: doorOpen ? -100 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onClick={handleKnock}
          whileTap={{ scale: 0.98 }}
        >
          {/* Door handle */}
          <div className="absolute right-8 top-1/2 w-4 h-8 bg-amber-400 rounded-full" />
          
          {/* Door knocker */}
          <motion.div 
            className="absolute left-1/2 top-1/3 -translate-x-1/2"
            whileTap={{ rotate: [0, 15, -15, 0] }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center">
              <span className="text-2xl">🦁</span>
            </div>
          </motion.div>
          
          {/* Knock counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {SECRET_PATTERN.map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < knocks.length ? 'bg-green-400' : 'bg-amber-600'
                }`}
                animate={{ scale: i < knocks.length ? [1, 1.5, 1] : 1 }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Light behind door */}
        <AnimatePresence>
          {doorOpen && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-t-full -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
      
      <motion.p 
        className="mt-8 text-xl text-amber-200 h-8"
        animate={{ opacity: feedback ? 1 : 0 }}
      >
        {feedback}
      </motion.p>
      
      <p className="mt-4 text-sm text-amber-400/60">
        Hint: Knock... knock knock... knock... knock
      </p>
    </div>
  );
}
```

### ✅ WINNING STRATEGY
1. **Ali Baba theme** - Embrace the hint completely
2. **Beautiful animations** - Framer Motion is your superpower
3. **Sound effects** - Web Audio API for knock sounds
4. **Progressive feedback** - Show knock count
5. **Celebration animation** - Magical door opening
6. **Story context** - "Cave of Wonders" atmosphere

### 👥 TEAM TASK ASSIGNMENT
| Member | Task | Time |
|--------|------|------|
| Dev 1 | Door UI + Framer Motion animations | 1h |
| Dev 2 | Knock pattern detection logic | 45min |
| Dev 1 | Sound effects (Web Audio) | 30min |
| Dev 2 | Success animation + integration | 45min |

---

## 🤖 DÉFI #474 - AI4GOOD
### "Educational AI Prototype"

**URL:** https://www.nuitdelinfo.com/inscription/defis/474

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** AI4GOOD
> 
> AI4GOOD est une communauté dédiée à la promotion de l'intelligence artificielle au service du bien commun. Elle vise à encourager les jeunes talents, chercheurs et développeurs à créer des solutions technologiques responsables, éthiques et utiles à la société. À travers des projets et défis comme celui de la Nuit de l'Info, AI4GOOD met en avant le rôle de l'IA dans la lutte contre la désinformation, l'amélioration de l'inclusion numérique et la protection de l'environnement.
> 
> **Prix:**
> - Lot principal : 200 $ pour l'équipe gagnante
> - Bonus : Certificat de participation pour tous les participants
> 
> **Objectif:** Permettre aux jeunes de découvrir et d'expérimenter l'intelligence artificielle à travers une application simple et interactive. Les participants développeront un prototype IA pédagogique, qui permet de tester des concepts de l'IA (chatbot, reconnaissance d'image, classification simple, etc.) de manière ludique.
> 
> **Détails:**
> - L'application doit être accessible via navigateur ou mobile.
> - L'objectif pédagogique est de montrer le fonctionnement de l'IA tout en permettant aux jeunes d'interagir avec elle.
> - Les participants doivent expérimenter et documenter leur mini-projet : comment l'IA prend ses décisions, quels modèles sont utilisés, et quelles données sont manipulées.
> 
> **Public cible:** Collégiens, lycéens ou étudiants débutants en programmation et IA.
> 
> **Niveau requis:** Notions de base en programmation (Python, JavaScript, ou autre langage).

### 🔍 ANALYSIS

**What They Really Want:**
- Educational tool for youth to understand AI
- Interactive demonstration of AI concepts
- Clear explanation of HOW AI works
- Fun and engaging interface
- Documentation of the learning process

**Key Judging Criteria:**
1. Pedagogical value (do kids learn?)
2. Interactivity (hands-on experience)
3. Documentation (explain the AI)
4. Accessibility (works everywhere)

**Difficulty:** ⭐⭐ (2/5) - EASY-MEDIUM
**Time Estimate:** 3-4 hours
**Competition Level:** 🟡 MEDIUM
**Prize Value:** $200 USD (~€185) + Certificate

### 💡 CREATIVE IMPLEMENTATION IDEAS

**🏆 TOP PICK: "AI Explorer" - Interactive Learning Platform**
```
1. "Teach the AI" - Draw digits, train a simple model live
2. "Chat with AI" - Simple chatbot that explains its reasoning
3. "Image Detective" - Drag & drop images, AI identifies them
4. "Sentiment Analyzer" - Type text, see if AI thinks it's happy/sad
```

**Alternative Ideas:**
1. **AI Drawing Game** - You draw, AI guesses (like Quick Draw)
2. **Emotion Detector** - Webcam reads your face expression
3. **Voice Assistant Demo** - Simple voice commands
4. **Recommendation Engine** - "Movies you might like"
5. **Spam Detector** - Is this email spam?

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// app/ai-explorer/page.tsx
'use client';
import { useState } from 'react';
import { useChat } from 'ai/react';

export default function AIExplorer() {
  const [activeTab, setActiveTab] = useState<'chat' | 'image' | 'sentiment'>('chat');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        🤖 AI Explorer
      </h1>
      <p className="text-purple-200 text-center mb-8">
        Discover how Artificial Intelligence works!
      </p>
      
      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {['chat', 'image', 'sentiment'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === tab
                ? 'bg-purple-500 text-white'
                : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700'
            }`}
          >
            {tab === 'chat' && '💬 Chat with AI'}
            {tab === 'image' && '🖼️ Image Detective'}
            {tab === 'sentiment' && '😊 Mood Analyzer'}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'chat' && <ChatDemo />}
        {activeTab === 'image' && <ImageClassifier />}
        {activeTab === 'sentiment' && <SentimentAnalyzer />}
      </div>
      
      {/* Educational Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-white/10 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          🎓 How Does This AI Work?
        </h2>
        <ExplanationContent tab={activeTab} />
      </div>
    </div>
  );
}

// Chat Component using Vercel AI SDK
function ChatDemo() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl">
      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg ${
              m.role === 'user' 
                ? 'bg-purple-100 ml-12' 
                : 'bg-gray-100 mr-12'
            }`}
          >
            <span className="font-semibold">
              {m.role === 'user' ? '👤 You: ' : '🤖 AI: '}
            </span>
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-400 animate-pulse">AI is thinking...</div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// API Route using Vercel AI SDK
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: `You are a friendly AI assistant designed to teach young people about AI.
    - Explain concepts simply
    - Use examples and analogies
    - Be encouraging and patient
    - Add emojis to make it fun
    - After each response, briefly explain HOW you generated that response`,
    messages,
  });

  return result.toDataStreamResponse();
}
```

### ✅ WINNING STRATEGY
1. **Vercel AI SDK** - You already know this!
2. **Multi-feature demo** - Chat + Image + Sentiment
3. **Educational explanations** - Show the "behind the scenes"
4. **Kid-friendly UI** - Colorful, fun, encouraging
5. **Documentation** - Add "How it works" section

### 👥 TEAM TASK ASSIGNMENT
| Member | Task | Time |
|--------|------|------|
| Dev 1 | Chat component + API route | 1.5h |
| Dev 2 | Image classifier (TensorFlow.js) | 1.5h |
| Dev 1 | Sentiment analyzer | 45min |
| Dev 2 | Educational content + UI polish | 1h |

---

## 🎮 DÉFI #453 - IUT LCO
### "Retro Gaming Style"

**URL:** https://www.nuitdelinfo.com/inscription/defis/453

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** Département Informatique de l'IUT du Littoral Côte d'Opale
> 
> C'est le département avec la plus forte valeur de latitude nord, il est régulièrement élu meilleur IUT de France par les enseignants qui y enseignent :)
> 
> **Prix:**
> - 1er - Kit Starter Recalbox ou Kit raspberry pi 500 (modèle en fonction des stocks)
> - 2eme - Kit Starter Recalbox ou Kit raspberry pi 500 (modèle en fonction des stocks)
> - 3eme - Kit Starter Recalbox ou Kit raspberry pi 500 (modèle en fonction des stocks)
> 
> **Le Défi:**
> Dans le cadre du défi national de la nuit de l'info, vous êtes invités à plonger dans l'univers du retro-gaming. Votre mission, si vous l'acceptez, est :
> 
> - d'ajouter un élément rétro gaming à l'une des pages de votre production ; **OU**
> - de modifier le style visuel d'une page entière pour lui donner un style rétro gaming.
> 
> La personnalisation doit respecter le thème global du sujet du défi national et s'harmoniser avec son contenu.

### 🔍 ANALYSIS

**What They Really Want:**
- Retro gaming aesthetic (8-bit, 16-bit era)
- Can be ONE element OR entire page
- Must fit the national subject theme
- Shows creativity with constraints

**Difficulty:** ⭐ (1/5) - VERY EASY
**Time Estimate:** 1-2 hours
**Competition Level:** 🟢 LOW
**Prize Value:** Raspberry Pi 500 (~€80) - 3 WINNERS!

### 💡 CREATIVE IMPLEMENTATION IDEAS

**Option A: Retro Gaming Element**
1. **8-bit character mascot** that follows cursor
2. **Pixel art loading animation**
3. **"Insert Coin" splash screen**
4. **Retro sound effects** on interactions
5. **Health bar UI** for progress tracking

**Option B: Full Page Retro Style**
1. **CRT monitor effect** (scanlines, curved edges)
2. **Pixel font** (Press Start 2P)
3. **Limited color palette** (NES/SNES colors)
4. **Sprite animations**
5. **Chip-tune background music**

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// styles/retro.css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.retro-page {
  font-family: 'Press Start 2P', cursive;
  background-color: #0f0f23;
  color: #00ff00;
  image-rendering: pixelated;
}

/* CRT Effect */
.crt-effect {
  position: relative;
  overflow: hidden;
}

.crt-effect::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 100;
}

.crt-effect::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
  z-index: 100;
}

/* Pixel Button */
.pixel-button {
  background: #4a7c59;
  color: white;
  border: 4px solid;
  border-color: #6ab07a #2a4c39 #2a4c39 #6ab07a;
  padding: 12px 24px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.1s;
}

.pixel-button:active {
  border-color: #2a4c39 #6ab07a #6ab07a #2a4c39;
  transform: translate(2px, 2px);
}

/* Blinking cursor */
.retro-cursor::after {
  content: '▮';
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

```tsx
// components/RetroPage.tsx
'use client';
import { useEffect, useState } from 'react';

export function RetroPage({ children }: { children: React.ReactNode }) {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootText, setBootText] = useState('');
  
  const bootSequence = [
    'SYSTEM BOOT...',
    'LOADING NUIT INFO 2025...',
    'INITIALIZING GRAPHICS...',
    'LOADING SOUND CHIP...',
    'READY PLAYER ONE!',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setBootText(bootSequence[i]);
        i++;
      } else {
        setBootComplete(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!bootComplete) {
    return (
      <div className="retro-page crt-effect min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">🕹️</div>
          <p className="retro-cursor">{bootText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="retro-page crt-effect min-h-screen p-8">
      <div className="text-center mb-8">
        <h1 className="text-xl text-yellow-400 mb-2">
          ★ NUIT DE L'INFO 2025 ★
        </h1>
        <p className="text-xs text-green-400">PRESS START</p>
      </div>
      {children}
    </div>
  );
}
```

### ✅ WINNING STRATEGY
1. **CRT effect** is the quickest win
2. **Press Start 2P font** - instant retro feel
3. **Boot sequence** animation - memorable
4. **Keep it relevant** to national subject
5. **8-bit sound effects** (optional but impressive)

### 👥 TEAM TASK ASSIGNMENT
| Member | Task | Time |
|--------|------|------|
| Dev 1 | CRT CSS effects | 30min |
| Dev 2 | Boot sequence animation | 30min |
| Both | Integration with main app | 30min |

---

## 📝 DÉFI #499 - SFEIR EST
### "Dynamic Multi-Purpose Form"

**URL:** https://www.nuitdelinfo.com/inscription/defis/499

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** SFEIR EST
> 
> **Prix:**
> - Top 1: 200,00 €
> - Top 2: 100,00 €
> - Top 3: 50,00 €
> 
> **The Quest (Gamified description):**
> "Le Nexus Connecté : L'Écho Personnalisé"
> 
> **Objectif Primaire - Forger le "Portail d'Intention":**
> Concevoir et implémenter un "Formulaire d'Interaction Dynamique". Ce n'est pas un simple formulaire, mais une porte d'entrée intelligente.
> 
> **Requirements:**
> 1. **Sélection de la Voie:** L'utilisateur devra pouvoir choisir sa "Mission": "Établir le Contact", "Offrir un Don", "Rejoindre la Guilde des Bénévoles", "Demander des Informations".
> 
> 2. **Adaptation des Outils:** En fonction de la "Mission" choisie, les champs devront s'adapter. Pour un don, prévois des modules de contribution (montants, récurrence). Pour une requête, les canaux de message classiques suffiront.
> 
> 3. **Sécurité du Flux:** Assure-toi que ce portail est protégé des attaques de spam et que les données transitent via des canaux cryptés. La validation des données est primordiale.
> 
> 4. **Adaptabilité Universelle:** Le portail doit être responsive, s'adaptant à tous les terminaux.
> 
> **Déployer l'"Écho de Gratitude":**
> Une fois la mission accomplie, l'utilisateur sera redirigé vers une "Zone de Confirmation Personnalisée".
> 
> - **Salutation Ciblée:** La page devra afficher le nom d'utilisateur et faire référence à sa mission spécifique.
> - **Le Filtre Temporel:** La page devra intégrer l'année du cycle actuel [2025].
>   - Mentionne l'année
>   - Affiche un objectif annuel
>   - Invite à suivre l'évolution

### 🔍 ANALYSIS

**What They Really Want:**
- Multi-purpose form (contact/donate/volunteer/info)
- Dynamic fields based on selection
- Personalized thank-you page
- Year integration (2025)
- Form validation & spam protection
- Responsive design

**Difficulty:** ⭐⭐ (2/5) - EASY-MEDIUM
**Time Estimate:** 3-4 hours
**Competition Level:** 🟡 MEDIUM
**Prize Value:** €200 / €100 / €50

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// components/DynamicForm.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type MissionType = 'contact' | 'donate' | 'volunteer' | 'info';

const missionSchemas = {
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
  }),
  donate: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    amount: z.number().min(1),
    recurring: z.boolean(),
  }),
  volunteer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    skills: z.string(),
    availability: z.string(),
  }),
  info: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    question: z.string().min(10),
  }),
};

export function DynamicForm() {
  const [mission, setMission] = useState<MissionType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const currentYear = new Date().getFullYear();

  if (submitted && formData) {
    return (
      <ThankYouPage 
        mission={mission!} 
        data={formData} 
        year={currentYear}
        onReset={() => {
          setSubmitted(false);
          setMission(null);
          setFormData(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🚪 Portal of Intentions
      </h1>

      <AnimatePresence mode="wait">
        {!mission ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 gap-4"
          >
            <MissionCard
              icon="📞"
              title="Contact Us"
              description="Get in touch with our team"
              onClick={() => setMission('contact')}
            />
            <MissionCard
              icon="💰"
              title="Make a Donation"
              description="Support our cause"
              onClick={() => setMission('donate')}
            />
            <MissionCard
              icon="🤝"
              title="Volunteer"
              description="Join our guild"
              onClick={() => setMission('volunteer')}
            />
            <MissionCard
              icon="❓"
              title="Get Information"
              description="Ask us anything"
              onClick={() => setMission('info')}
            />
          </motion.div>
        ) : (
          <motion.div
            key={mission}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button 
              onClick={() => setMission(null)}
              className="mb-4 text-gray-500 hover:text-gray-700"
            >
              ← Back to missions
            </button>
            <FormFields 
              mission={mission}
              onSubmit={(data) => {
                setFormData(data);
                setSubmitted(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThankYouPage({ mission, data, year, onReset }) {
  const messages = {
    contact: {
      title: "Message Received!",
      body: `Your message has been transmitted to our central servers. Our support agents will respond shortly.`,
    },
    donate: {
      title: "GG, Champion!",
      body: `Your donation of €${data.amount} is a blessing for our cause. It will help us achieve our ${year} objectives!`,
    },
    volunteer: {
      title: "Welcome to the Guild!",
      body: `Your skills in "${data.skills}" will be invaluable to our mission in ${year}.`,
    },
    info: {
      title: "Question Logged!",
      body: `Our knowledge keepers will research your question and respond with wisdom.`,
    },
  };

  const msg = messages[mission];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl text-white"
    >
      <div className="text-6xl mb-4">✨</div>
      <h2 className="text-3xl font-bold mb-4">
        Greetings, {data.name}! 👋
      </h2>
      <h3 className="text-2xl mb-4">{msg.title}</h3>
      <p className="text-lg mb-6">{msg.body}</p>
      <p className="text-sm opacity-80 mb-6">
        Your support in {year} is crucial for our progression! 📈
        <br />
        Stay connected to follow our exploits throughout {year}!
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:bg-gray-100"
      >
        New Mission
      </button>
    </motion.div>
  );
}
```

### ✅ WINNING STRATEGY
1. **Framer Motion** for smooth transitions
2. **react-hook-form + Zod** for validation
3. **Personalized thank-you** with user's name
4. **Year integration** (2025) throughout
5. **Honeypot field** for spam protection
6. **Responsive design** with Tailwind

---

## 🔫 DÉFI #509 - LASERGAME EVOLUTION
### "Online Laser Tag on Your Page"

**URL:** https://www.nuitdelinfo.com/inscription/defis/509

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** Laser Game Evolution (110 centers in France)
> 
> **Prix:** Jusqu'à 10 places de lasergame pour l'équipe gagnante
> 
> **Le Défi:**
> Durant cette nuit active et dynamique, rien de tel qu'un peu d'action : pourquoi ne pas faire une partie de Lasergame en ligne, avec les éléments de la page du défi principal ?
> 
> - Transformez votre curseur de souris en pistolet laser
> - Tirez sur les différentes ressources (de la page)
> - Après quelques minutes, comptez les points
> - Affichez une table de score (de tous les joueurs ayant testé votre page)
> - **Comme au Lasergame, prévoyez que vos ennemis puissent vous tirer dessus**
> 
> Visez l'émotion !

### 🔍 ANALYSIS

**What They Really Want:**
- Turn website into a shooting gallery
- Custom laser cursor
- Destructible page elements
- Multiplayer scoreboard
- Two-way shooting (enemies shoot back!)
- Fun, energetic experience

**Key Technical Challenges:**
- Real-time multiplayer (WebSocket)
- Custom cursor
- Hit detection
- Scoreboard persistence
- Enemy AI or player-to-player

**Difficulty:** ⭐⭐⭐ (3/5) - MEDIUM
**Time Estimate:** 4-5 hours
**Competition Level:** 🟢 LOW (unique prize)
**Prize Value:** 10 Lasergame sessions

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// components/LaserGame.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Target {
  id: string;
  x: number;
  y: number;
  points: number;
  destroyed: boolean;
}

export function LaserGameMode() {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [shots, setShots] = useState<{x: number, y: number}[]>([]);
  const [health, setHealth] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);

  // Custom cursor
  useEffect(() => {
    if (active) {
      document.body.style.cursor = 'url(/laser-cursor.png) 16 16, crosshair';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => { document.body.style.cursor = 'default'; };
  }, [active]);

  // Enemy shooting back
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setHealth(h => Math.max(0, h - 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  // Timer
  useEffect(() => {
    if (!active || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [active, timeLeft]);

  const handleShoot = (e: React.MouseEvent) => {
    if (!active) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Add shot visual
    setShots(prev => [...prev, { x, y }]);
    setTimeout(() => {
      setShots(prev => prev.slice(1));
    }, 200);

    // Play sound
    const audio = new Audio('/laser-sound.mp3');
    audio.volume = 0.3;
    audio.play();

    // Check hit
    const hitTarget = targets.find(t => 
      !t.destroyed &&
      Math.abs(t.x - x) < 30 &&
      Math.abs(t.y - y) < 30
    );

    if (hitTarget) {
      setScore(s => s + hitTarget.points);
      setTargets(prev => 
        prev.map(t => t.id === hitTarget.id ? {...t, destroyed: true} : t)
      );
    }
  };

  if (!active) {
    return (
      <button
        onClick={() => setActive(true)}
        className="fixed bottom-4 right-4 px-6 py-3 bg-red-500 text-white rounded-full font-bold animate-pulse z-50"
      >
        🔫 ACTIVATE LASER MODE
      </button>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-auto"
      onClick={handleShoot}
    >
      {/* HUD */}
      <div className="fixed top-4 left-4 bg-black/80 text-white p-4 rounded-lg z-50 pointer-events-none">
        <div className="text-xl font-bold text-red-500">🎯 LASER MODE</div>
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
        <div className="flex items-center gap-2">
          Health: 
          <div className="w-24 h-3 bg-gray-700 rounded">
            <div 
              className="h-full bg-green-500 rounded transition-all"
              style={{ width: `${health}%` }}
            />
          </div>
        </div>
      </div>

      {/* Laser shots */}
      <AnimatePresence>
        {shots.map((shot, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none"
            style={{ left: shot.x - 8, top: shot.y - 8 }}
          />
        ))}
      </AnimatePresence>

      {/* Exit button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setActive(false);
        }}
        className="fixed top-4 right-4 px-4 py-2 bg-white text-black rounded z-50"
      >
        Exit Game
      </button>
    </div>
  );
}
```

### ✅ WINNING STRATEGY
1. **Custom cursor** as laser gun
2. **Visual feedback** on shots
3. **Sound effects** for immersion
4. **Health system** (enemies shoot back)
5. **Timer-based rounds**
6. **Leaderboard** with Supabase real-time

---

## 🎵 DÉFI #475 - CAPGEMINI
### "Retro Audio Visualizer"

**URL:** https://www.nuitdelinfo.com/inscription/defis/475

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** Capgemini (360,000+ employees, 50+ countries)
> 
> **Context:**
> Il fut une époque où nos lecteurs de musique faisaient bien plus encore ! Jadis, avant les applications de streaming de musique, en plus d'écouter nos titres préférés, nous pouvions profiter de visuels tous plus intriguants les uns que les autres pour stimuler notre vision et nous plonger dans la mélodie.
> 
> **Le Défi:**
> Étant donné que le rétro est un peu de mode, et si on relançait ce genre de fonctionnalité ? Nous attendons vos visuels enivrants, originaux ou juste drôles pour régaler nos rétines. Que cela soit avec de la musique, du son ou tout autre chose, si ça bouge, c'est bon !
> 
> **Critères d'évaluation:**
> - Inventivité de votre visualisation
> - Fonctionnement avec la source choisie
> - Amusement global qui ressort de votre projet
> 
> **Note:** Nous arbitrons chaque sujet durant 5 minutes avec au moins 2 examinateurs. Nous comptons sur vous pour éviter le contenu choquant.

### 🔍 ANALYSIS

**What They Really Want:**
- Winamp/Windows Media Player style visualizer
- Works with audio input
- Creative, fun, original
- Retro aesthetic appreciated

**Difficulty:** ⭐⭐⭐ (3/5) - MEDIUM
**Time Estimate:** 3-4 hours
**Competition Level:** 🟡 MEDIUM (Capgemini is prestigious)
**Prize Value:** Not specified (but Capgemini visibility!)

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// components/AudioVisualizer.tsx
'use client';
import { useRef, useEffect, useState } from 'react';

export function RetroVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setIsPlaying(true);
      draw();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const analyser = analyserRef.current;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const render = () => {
      requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);
      
      // Clear with dark background
      ctx.fillStyle = '#0f0f23';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw bars
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        
        // Gradient color based on frequency
        const hue = (i / bufferLength) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        
        // Draw bar
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        // Mirror effect
        ctx.globalAlpha = 0.3;
        ctx.fillRect(x, 0, barWidth, barHeight * 0.3);
        ctx.globalAlpha = 1;
        
        x += barWidth + 1;
      }
      
      // Add scanlines (retro effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }
    };
    
    render();
  };

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-green-400 font-mono">RETRO VISUALIZER v1.0</h2>
        <button
          onClick={startVisualization}
          disabled={isPlaying}
          className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400 disabled:opacity-50"
        >
          {isPlaying ? '▶ Playing' : '▶ Start'}
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="w-full border-2 border-green-500 rounded"
      />
      
      <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
        <span>BASS</span>
        <span>MID</span>
        <span>TREBLE</span>
      </div>
    </div>
  );
}
```

---

## 📊 DÉFI #486 - BDE MIAGE PARIS
### "Real-Time Team Leaderboard"

**URL:** https://www.nuitdelinfo.com/inscription/defis/486

### 📄 COMPLETE ORIGINAL TEXT
> **Sponsor:** BDE MIAGE Paris Cité
> 
> **Prix:** Cartes cadeaux d'une valeur de 100 €
> 
> **Le Défi:**
> Proposer une gamification du défi principal en développant une interface permettant de gérer les équipes et de visualiser leur progression. Il s'agit de créer une "sous-application" moderne et dynamique offrant un classement en temps réel avec mise à jour automatique depuis une base de données. Une intégration des bonnes pratiques d'accessibilité (WCAG) sera fortement apprécié par le jury.

### 🔍 ANALYSIS

**What They Really Want:**
- Team management dashboard
- Real-time leaderboard
- Database-driven updates
- **WCAG accessibility** (important!)
- Modern, dynamic UI

**Difficulty:** ⭐⭐⭐ (3/5) - MEDIUM
**Time Estimate:** 3-4 hours
**Competition Level:** 🟡 MEDIUM
**Prize Value:** €100

### 🛠️ TECHNICAL IMPLEMENTATION

```tsx
// Use Supabase for real-time updates
// app/leaderboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Team {
  id: string;
  name: string;
  score: number;
  avatar: string;
  rank: number;
}

export default function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Initial fetch
    fetchTeams();

    // Real-time subscription
    const channel = supabase
      .channel('teams')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'teams' },
        () => fetchTeams()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchTeams = async () => {
    const { data } = await supabase
      .from('teams')
      .select('*')
      .order('score', { ascending: false });
    
    if (data) {
      setTeams(data.map((t, i) => ({ ...t, rank: i + 1 })));
    }
  };

  return (
    <main 
      className="min-h-screen bg-gray-900 p-8"
      role="main"
      aria-label="Team Leaderboard"
    >
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        🏆 Live Leaderboard
      </h1>
      
      <div 
        className="max-w-2xl mx-auto space-y-4"
        role="list"
        aria-label="Team rankings"
      >
        <AnimatePresence>
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center gap-4 p-4 rounded-xl
                ${team.rank === 1 ? 'bg-yellow-500/20 border-2 border-yellow-500' : ''}
                ${team.rank === 2 ? 'bg-gray-400/20 border-2 border-gray-400' : ''}
                ${team.rank === 3 ? 'bg-amber-600/20 border-2 border-amber-600' : ''}
                ${team.rank > 3 ? 'bg-gray-800' : ''}
              `}
              role="listitem"
              aria-label={`${team.name}, rank ${team.rank}, score ${team.score}`}
            >
              {/* Rank */}
              <div 
                className="text-3xl font-bold w-12 text-center"
                aria-hidden="true"
              >
                {team.rank === 1 && '🥇'}
                {team.rank === 2 && '🥈'}
                {team.rank === 3 && '🥉'}
                {team.rank > 3 && <span className="text-gray-500">#{team.rank}</span>}
              </div>
              
              {/* Avatar */}
              <img 
                src={team.avatar || '/default-avatar.png'} 
                alt=""
                className="w-12 h-12 rounded-full"
                aria-hidden="true"
              />
              
              {/* Name */}
              <div className="flex-1">
                <div className="text-white font-semibold">{team.name}</div>
                <div className="text-gray-400 text-sm">
                  Score: {team.score.toLocaleString()}
                </div>
              </div>
              
              {/* Score bar */}
              <div 
                className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={team.score}
                aria-valuemin={0}
                aria-valuemax={1000}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(team.score / 1000) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded"
      >
        Skip to main content
      </a>
    </main>
  );
}
```

---

## 🎯 REMAINING DÉFIS (Lower Priority)

### DÉFI #485 - AJIR (UX/Gamification)
- **Prize:** Goodies + Norman products + visibility
- **Challenge:** Create engaging UX with gamification
- **Difficulty:** ⭐⭐⭐ (3/5)
- **Recommendation:** Medium priority, subjective judging

### DÉFI #501 - NEVERHACK (Chrome Extension)
- **Prize:** Not specified
- **Challenge:** Create Chrome Extension (Manifest V3)
- **Difficulty:** ⭐⭐⭐⭐ (4/5)
- **Recommendation:** SKIP - Different skill set required

### DÉFI #504 - RADIO OCCITANIA (Audio Recording)
- **Prize:** €100/€50 + Studio interview
- **Challenge:** Broadcast monitoring software
- **Difficulty:** ⭐⭐⭐⭐⭐ (5/5)
- **Recommendation:** SKIP - Too niche, audio processing complex

### DÉFI #497 - DECATHLON (Posture Detection)
- **Prize:** Not specified
- **Challenge:** Sports posture correction with ML
- **Difficulty:** ⭐⭐⭐⭐ (4/5)
- **Recommendation:** SKIP - Pose detection requires ML expertise

### DÉFI #506 - BORDEAUX (Old Tech Only)
- **Prize:** 3kg of candy
- **Challenge:** Modern page using HTML4, CSS2.1, jQuery 1 ONLY
- **Difficulty:** ⭐⭐⭐ (3/5) - Frustrating constraints
- **Recommendation:** SKIP - Against your modern stack

---

# 🏆 FINAL RECOMMENDATIONS

## Your 5 Défis Selection

| Priority | Défi | Prize | Time | Why |
|----------|------|-------|------|-----|
| 1️⃣ | **#483 AUTOCUT** | €250 | 1-2h | Quick win, your game dev skills |
| 2️⃣ | **#481 MECI** | Goodies | 2-3h | Framer Motion showcase, creative |
| 3️⃣ | **#453 IUT LCO** | Raspberry Pi | 1-2h | Easy CSS, great hardware prize |
| 4️⃣ | **#499 SFEIR** | €200 | 3-4h | Standard React forms |
| 5️⃣ | **#474 AI4GOOD** | $200 | 3-4h | Uses Vercel AI SDK |

## Alternative Option
Replace #474 with **#486 BDE MIAGE** (€100) if you prefer Supabase real-time over AI.

## Time Budget (15.5 hours total)

```
16h36-17h30  Setup + read national subject
17h30-18h30  🐍 #483 Snake game (DONE)
18h30-20h00  🔐 #481 Magic Door auth
20h00-21h00  🎮 #453 Retro gaming style
21h00-21h30  Register all 5 défis
21h30-00h00  📝 #499 Dynamic form
00h00-02h00  🤖 #474 AI Explorer
02h00-05h00  Main national subject + polish
05h00-07h00  Integration + testing
07h00-08h04  Final deploy + documentation
```

## Potential Winnings

| Défi | Best Case | Realistic |
|------|-----------|-----------|
| #483 AUTOCUT | €250 | €100 |
| #481 MECI | Goodies | Goodies |
| #453 IUT LCO | Raspberry Pi | Raspberry Pi |
| #499 SFEIR | €200 | €50 |
| #474 AI4GOOD | $200 | Certificate |
| **TOTAL** | ~€750+ | ~€300+ |

---

## 🇲🇷 MAURITANIA UNIQUE ANGLE

Add bilingual FR/AR support for accessibility bonus:

```tsx
// Simple i18n
const [lang, setLang] = useState<'fr' | 'ar'>('fr');

<html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
```

This could earn you extra points on any accessibility-focused défis!

---

Good luck Ahmed! 🚀 You and your team have everything needed to win multiple prizes!
