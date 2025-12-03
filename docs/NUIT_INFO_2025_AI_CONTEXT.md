# 🌙 LA NUIT DE L'INFO 2025 - COMPLETE AI ASSISTANT CONTEXT

Copy this entire document to any AI assistant (ChatGPT, Gemini, Claude, etc.) to give them full context about the hackathon.

---

## 📋 QUICK REFERENCE

**Event:** La Nuit de l'Info 2025 (France's largest student hackathon)
**Date:** December 4-5, 2025
**Duration:** 16h36 (sunset) → 08h04 (sunrise) = ~15.5 hours
**Team:** Ahmed (lead developer) + team members from Mauritania
**Languages:** French, Arabic, English
**Max Challenges:** 5 sponsor défis + 1 national subject (mandatory)

---

## 👨‍💻 DEVELOPER PROFILE

### Primary Developer: Ahmed
- **Role:** Full-stack web developer
- **Location:** Mauritania (GMT timezone, 1 hour behind France)
- **Education:** Master's in Electronics Engineering (thesis on TinyML)
- **Languages:** Arabic (native), French (fluent), English (technical)

### Tech Stack (USE THESE BY DEFAULT)
```
Framework:    Next.js 15 (App Router)
Language:     TypeScript (strict mode)
Styling:      TailwindCSS + shadcn/ui
Animation:    Framer Motion
Forms:        react-hook-form + zod
Database:     Supabase (PostgreSQL + Realtime)
AI:           Vercel AI SDK (@ai-sdk/openai)
Deployment:   Vercel
```

### Alternative Technologies (if specifically needed)
- Database: Convex, Neon, Firebase
- Auth: NextAuth.js, Clerk, Better Auth
- Storage: Supabase Storage, Cloudinary

### Coding Standards
1. Always use TypeScript with proper types (no 'any')
2. Use 'use client' directive only when necessary
3. Prefer Server Components when possible
4. Use App Router conventions (page.tsx, layout.tsx)
5. Mobile-first responsive design
6. Add French comments for team collaboration
7. Keep files under 200 lines

---

## 🎯 SELECTED CHALLENGES (DÉFIS)

The team will complete these 5 sponsor challenges + the national subject:

### DÉFI #483 - AUTOCUT (Priority 1)
**Prize:** €250 Amazon (1st), €100 (2nd)
**Difficulty:** ⭐ Very Easy | **Time:** 1-2 hours

**REQUIREMENT:**
> "Cachez au sein de votre site un jeu de snake"
> (Hide a Snake game within your website)

**IMPLEMENTATION:**
- Konami code trigger (↑↑↓↓←→←→BA)
- Canvas-based Snake game
- Score tracking with localStorage
- Must be hidden/Easter egg style

**CODE PATTERN:**
```tsx
// Konami Code Hook
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];

export function useKonamiCode(onActivate: () => void) {
  useEffect(() => {
    let i = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.code === KONAMI[i]) { i++; if (i === KONAMI.length) { onActivate(); i = 0; } }
      else i = 0;
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onActivate]);
}
```

---

### DÉFI #481 - EES-MECI (Priority 2)
**Sponsor:** Eiffage Énergie Systèmes (IoT/energy metering company)
**Prize:** Goodies pack (mug, bag, USB, etc.)
**Difficulty:** ⭐⭐ Easy | **Time:** 2-3 hours

**REQUIREMENT:**
> "Concevoir une interface ou imaginer une méthode originale, amusante ou surprenante de s'identifier. N'oubliez pas, ce qui prime c'est l'imagination... car il faut absolument qu'Ali en reste Baba..."
> (Create an original, fun authentication method. NOT traditional login/password. Hint: "Ali Baba" = "Open Sesame")

**IMPLEMENTATION IDEAS:**
1. **Magic Door** - Animated door that opens with correct knock pattern
2. **Emoji Password** - Select emojis in correct sequence
3. **Voice Command** - Say "Open Sesame" (Web Speech API)
4. **Gesture Drawing** - Draw a symbol on canvas
5. **Rhythm Pattern** - Tap a musical pattern

**RECOMMENDED: "Magic Door" with Framer Motion**
```tsx
// Door animation with knock pattern
const doorVariants = {
  closed: { rotateY: 0 },
  open: { rotateY: -100, transition: { duration: 0.8, ease: 'easeInOut' } }
};

// Knock pattern: timing in milliseconds
const SECRET_PATTERN = [0, 300, 600, 1000, 1500];
const TOLERANCE = 150; // ms tolerance for each knock
```

---

### DÉFI #453 - IUT LCO (Priority 3)
**Sponsor:** IUT du Littoral Côte d'Opale
**Prize:** Raspberry Pi 500 or Recalbox Kit (3 WINNERS!)
**Difficulty:** ⭐ Very Easy | **Time:** 1-2 hours

**REQUIREMENT:**
> "Ajouter un élément rétro gaming à l'une des pages OU modifier le style visuel d'une page entière pour lui donner un style rétro gaming. La personnalisation doit respecter le thème global du sujet national."

**IMPLEMENTATION:**
- CRT scanline effect (CSS overlay)
- Pixel font (Press Start 2P from Google Fonts)
- 8-bit color palette
- Boot sequence animation
- Retro sound effects (optional)

**CSS PATTERN:**
```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.retro-crt {
  font-family: 'Press Start 2P', cursive;
  background: #0f0f23;
  color: #00ff00;
}

.retro-crt::before {
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
```

---

### DÉFI #499 - SFEIR EST (Priority 4)
**Prize:** €200 (1st), €100 (2nd), €50 (3rd)
**Difficulty:** ⭐⭐ Easy-Medium | **Time:** 3-4 hours

**REQUIREMENT:**
> Create a "Portail d'Intention" - Dynamic form that adapts based on user's purpose

**SPECIFIC REQUIREMENTS:**
1. **Form Types:** Contact / Donate / Volunteer / Request Info
2. **Dynamic Fields:** Fields change based on selected purpose
3. **Personalized Confirmation:** Thank-you page with user's name
4. **Year Integration:** Must include year 2025 in confirmation
5. **Spam Protection:** Honeypot or validation
6. **Responsive:** Works on all devices

**EXAMPLE CONFIRMATION MESSAGES:**
- Contact: "Salutations, [Name]! Ton message a bien été acheminé vers nos serveurs."
- Donate: "Un immense 'GG', [Name]! Ton don de [Amount]€ est une bénédiction."
- Volunteer: "Bienvenue dans la guilde, [Name]!"

**IMPLEMENTATION:**
```tsx
// Dynamic form with AnimatePresence
<AnimatePresence mode="wait">
  <motion.div
    key={formType}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    {formType === 'contact' && <ContactForm />}
    {formType === 'donate' && <DonateForm />}
    {formType === 'volunteer' && <VolunteerForm />}
    {formType === 'info' && <InfoForm />}
  </motion.div>
</AnimatePresence>
```

---

### DÉFI #474 - AI4GOOD (Priority 5)
**Sponsor:** AI4GOOD Community
**Prize:** $200 USD (~€185) + Certificate for all participants
**Difficulty:** ⭐⭐ Easy-Medium | **Time:** 3-4 hours

**REQUIREMENT:**
> "Développer un prototype IA pédagogique qui permet de tester des concepts de l'IA (chatbot, reconnaissance d'image, classification) de manière ludique."
> (Create an educational AI prototype for youth to discover AI interactively)

**TARGET AUDIENCE:** Middle/high school students, beginners in programming

**MUST INCLUDE:**
1. Browser/mobile accessible
2. Interactive AI demonstration
3. Documentation explaining HOW the AI makes decisions
4. Fun, engaging interface

**IMPLEMENTATION IDEAS:**
1. **AI Chatbot** - Explain concepts with Vercel AI SDK
2. **Image Classifier** - TensorFlow.js MobileNet
3. **Sentiment Analyzer** - Text emotion detection
4. **Drawing Guesser** - Like Quick Draw

**VERCEL AI SDK PATTERN:**
```tsx
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: `Tu es un assistant IA pédagogique pour les jeunes.
    - Explique simplement avec des exemples
    - Utilise des emojis 🎯
    - Après chaque réponse, explique COMMENT tu as généré cette réponse`,
    messages,
  });

  return result.toDataStreamResponse();
}

// Client component
'use client';
import { useChat } from 'ai/react';

export function ChatDemo() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // ... render chat UI
}
```

---

## 🏆 NATIONAL SUBJECT (Mandatory)

The national subject will be revealed at 16h36 on December 4th. Based on previous years:

### Historical Themes:
- **2024:** Ocean-Human Body Parallels (Race for Water)
- **2023:** Climate Change - True vs False (Réseau Action Climat)
- **2022:** Sexual Health Prevention through Games
- **2021:** Maritime Rescue History

### 2023 Winner Analysis (Ratigreen - 1st Place):
**Concept:** Interactive quiz where each answer affects Earth's temperature
**Why it won:**
- Gamification (quiz format)
- Immediate visual feedback (temperature changes)
- Simple core mechanic
- Clear objective ("Keep Earth green")
- Modern tech stack (Next.js)

### 2024 3rd Place (Ratiscrum):
**Concept:** Character linked to ocean health - heal organs by finding ocean equivalents
**Tech:** Next.js, TailwindCSS, shadcn/ui (same as your stack!)

### WINNING PATTERNS:
1. **Make it a GAME** - All top projects are interactive games
2. **Visual feedback** - Show impact immediately
3. **Simple mechanic** - Understandable in 30 seconds
4. **Story/Character** - Mascot or persona engages users
5. **Don't lecture** - Educate through play

---

## ⏰ TIME SCHEDULE

| Time (France) | Time (Mauritania) | Task |
|---------------|-------------------|------|
| 16h36 | 15h36 | 🚀 START - Read national subject |
| 16h36-17h00 | 15h36-16h00 | Team brainstorm |
| 17h00-18h00 | 16h00-17h00 | Setup project + deploy |
| 18h00-19h00 | 17h00-18h00 | Build #483 Snake game |
| 19h00-20h30 | 18h00-19h30 | Build #481 Magic Door auth |
| 20h30-21h30 | 19h30-20h30 | Add #453 Retro gaming style |
| **21h30** | **20h30** | ⚠️ REGISTER ALL DÉFIS (deadline!) |
| 21h30-00h30 | 20h30-23h30 | Build #499 Dynamic form |
| 00h30-02h30 | 23h30-01h30 | Build #474 AI4GOOD |
| 02h30-05h00 | 01h30-04h00 | Build National Subject |
| 05h00-07h00 | 04h00-06h00 | Polish + test |
| 07h00-08h04 | 06h00-07h04 | Final deploy + docs |
| **08h04** | **07h04** | 🏁 END |

---

## 💰 POTENTIAL PRIZES

| Défi | Best Case | Realistic |
|------|-----------|-----------|
| #483 AUTOCUT | €250 | €100 |
| #481 MECI | Goodies | Goodies |
| #453 IUT LCO | Raspberry Pi | Raspberry Pi |
| #499 SFEIR | €200 | €50 |
| #474 AI4GOOD | $200 | Certificate |
| **TOTAL** | **~€750+** | **~€300+** |

---

## 🇲🇷 UNIQUE COMPETITIVE ADVANTAGE

The team is from Mauritania - use this for:

1. **Bilingual Support (FR/AR)**
```tsx
const [lang, setLang] = useState<'fr' | 'ar'>('fr');
const dir = lang === 'ar' ? 'rtl' : 'ltr';

return (
  <html lang={lang} dir={dir}>
    <body className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
      {children}
    </body>
  </html>
);
```

2. **African Perspective** - Unique angle on climate/environmental themes
3. **Fresh Entry** - No previous Mauritanian participation = originality points
4. **Accessibility Bonus** - RTL support shows accessibility awareness

---

## 🛠️ PROJECT SETUP

### Initial Commands:
```bash
# Create project
npx create-next-app@latest nuit-info-2025 --typescript --tailwind --eslint --app

# Install dependencies
npm install framer-motion lucide-react
npm install react-hook-form zod @hookform/resolvers
npm install @supabase/supabase-js
npm install ai @ai-sdk/openai
npm install clsx tailwind-merge

# Setup shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card input form
```

### Environment Variables:
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
```

### Folder Structure:
```
/app
  /page.tsx              → Landing page
  /game/page.tsx         → National subject game
  /auth-demo/page.tsx    → #481 MECI demo
  /api/chat/route.ts     → #474 AI4GOOD
  /layout.tsx            → Root layout
  /globals.css           → Global styles + retro CSS

/components
  /snake/                → #483 Snake game
  /magic-door/           → #481 Auth interface
  /retro/                → #453 Retro styling
  /forms/                → #499 Dynamic forms
  /ai-demo/              → #474 AI components
  /ui/                   → shadcn components

/hooks
  /useKonamiCode.ts
  /useKnockPattern.ts
  /useLanguage.ts

/lib
  /utils.ts
  /supabase.ts
```

---

## 📝 HOW TO ASK FOR HELP

When requesting code, use this format:

```
Build [COMPONENT NAME] for [DÉFI NUMBER].

Requirements:
- [List specific requirements]

Tech stack: Next.js 15, TypeScript, TailwindCSS, Framer Motion

Give me complete, working code with:
1. All imports
2. File path as comment
3. Any needed environment variables
```

### Example Prompts:

**For Snake Game:**
```
Build the Snake game component for #483 AUTOCUT.

Requirements:
- Canvas-based rendering
- Arrow key controls
- Score tracking
- Game over detection
- Restart functionality

Tech stack: Next.js 15, TypeScript, TailwindCSS

Give me complete code for components/snake/SnakeGame.tsx
```

**For Quick Fixes:**
```
Fix this error in my Snake game:

Error: [paste error]

Current code:
[paste relevant code]

Just fix the bug, keep everything else.
```

**For Integration:**
```
Show me how to add the Konami code trigger to app/page.tsx that opens the Snake game in a modal.
```

---

## ⚠️ IMPORTANT REMINDERS

1. **Register défis by 21h30 (France time)** - This is a hard deadline!
2. **Judges have limited time** - Visual impact > technical complexity
3. **It's a hackathon** - Ship fast, polish later
4. **Reuse components** - Build once, use across défis
5. **Deploy early** - Use Vercel for instant deploys
6. **Keep it fun** - Don't stress, enjoy the night!

---

## 🔗 USEFUL RESOURCES

**Official:**
- Event site: https://www.nuitdelinfo.com/
- Défis list: https://www.nuitdelinfo.com/inscription/defis/liste

**Tech Documentation:**
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- shadcn/ui: https://ui.shadcn.com/
- Vercel AI SDK: https://sdk.vercel.ai/docs

**Past Winners:**
- 2023 1st Place: https://ratigreen.ratiscrum.fr/
- 2023 3rd Place: https://dinowosaur.vercel.app/
- 2024 Ratiscrum: https://www.ratiscrum.fr/2024

---

## 🎮 QUICK CODE SNIPPETS

### Framer Motion Page Transition
```tsx
import { AnimatePresence, motion } from 'framer-motion';

export function PageTransition({ children, pageKey }: { children: React.ReactNode; pageKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### Supabase Realtime Hook
```tsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useRealtimeData<T>(table: string) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    supabase.from(table).select('*').then(({ data }) => data && setData(data as T[]));

    const channel = supabase
      .channel(`realtime-${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        supabase.from(table).select('*').then(({ data }) => data && setData(data as T[]));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [table]);

  return data;
}
```

### Sound Effect Hook
```tsx
export function useSound(soundUrl: string) {
  const play = () => {
    const audio = new Audio(soundUrl);
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore autoplay restrictions
  };
  return { play };
}
```

---

**END OF CONTEXT DOCUMENT**

Copy everything above this line to give any AI assistant full context about La Nuit de l'Info 2025!
