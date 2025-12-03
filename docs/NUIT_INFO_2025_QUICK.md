# NUIT DE L'INFO 2025 - QUICK CONTEXT

## Event
- **What:** French hackathon, 15.5 hours overnight
- **When:** Dec 4-5, 2025 (16h36 → 08h04 France time)
- **Team:** Ahmed from Mauritania + team

## Tech Stack
Next.js 15, TypeScript, TailwindCSS, Framer Motion, shadcn/ui, Supabase, Vercel AI SDK

## 5 Challenges to Build

| # | Challenge | Prize | What to Build |
|---|-----------|-------|---------------|
| 483 | AUTOCUT | €250 | Hidden Snake game (Konami code trigger) |
| 481 | MECI | Goodies | Creative auth - "Ali Baba" theme magic door |
| 453 | IUT LCO | Raspberry Pi | Retro gaming style (CRT effect, pixel font) |
| 499 | SFEIR | €200 | Dynamic form (contact/donate/volunteer) + personalized thank-you with 2025 |
| 474 | AI4GOOD | $200 | Educational AI demo for youth (chatbot or image classifier) |

## Winning Formula (from past winners)
1. Make it a GAME
2. Visual feedback (scores, animations)
3. Simple mechanic (30 sec to understand)
4. Story/character element
5. Don't lecture - educate through play

## Key Deadlines
- **21h30 France / 20h30 Mauritania:** Register all défis (HARD DEADLINE)
- **08h04:** Event ends

## Unique Angle
Bilingual FR/AR support (RTL for Arabic) = accessibility bonus

## Quick Patterns

**Konami Code:**
```tsx
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
```

**CRT Effect:**
```css
.crt::before {
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px);
}
```

**Framer Motion Transition:**
```tsx
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
```

## How to Ask for Help
```
Build [COMPONENT] for défi #[NUMBER].
Requirements: [LIST]
Tech: Next.js 15, TypeScript, TailwindCSS
Give complete code with imports.
```
