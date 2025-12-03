# Contributing to GameBoy Snake

Welcome! This guide will help you get started contributing to the RetroCollect GameBoy Snake project.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Key Patterns](#key-patterns)
- [Common Tasks](#common-tasks)

---

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd gameboy-snake
pnpm install

# 2. Start development server
pnpm dev

# 3. Open in browser
open http://localhost:3000
```

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (port 3000) |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm start` | Start production server |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main landing page
│   ├── globals.css        # Global styles + Tailwind theme
│   └── variants/          # Landing page variants
│       ├── arcade/        # Neon arcade style
│       ├── modern/        # Clean e-commerce
│       ├── museum/        # Gallery exhibition
│       └── premium/       # Luxury collector
│
├── components/            # React components
│   ├── GameBoy/          # 🎮 Main game module (see below)
│   ├── sections/         # Page sections
│   ├── ui/               # Reusable UI components (shadcn)
│   └── [Feature].tsx     # Feature components
│
├── store/                # State management
│   ├── gameStore.ts      # Zustand stores
│   └── index.ts          # Barrel export
│
├── constants/            # Configuration
│   ├── game.ts           # Game constants
│   └── index.ts          # Barrel export
│
├── hooks/                # Custom React hooks
│   ├── useRetroSounds.ts # 8-bit sound effects
│   └── index.ts          # Barrel export
│
├── data/                 # Static data
│   ├── cartridges.ts     # Cartridge definitions
│   ├── consoles.ts       # Console definitions
│   └── products.ts       # Product catalog
│
├── types/                # TypeScript definitions
│   └── index.ts          # Shared types
│
└── lib/                  # Utilities
    └── utils.ts          # cn() helper for Tailwind
```

### GameBoy Module Structure

The GameBoy is the core feature - a modular component split for maintainability:

```
src/components/GameBoy/
├── index.tsx           # Main component (orchestrates everything)
├── GameBoyScreen.tsx   # Canvas rendering (snake, food, UI)
├── GameBoyControls.tsx # D-pad, A/B buttons, Start/Select
├── useGameReducer.ts   # Game state with useReducer
├── showcaseScreens.ts  # Demo screens (Zelda, Mario, etc.)
└── types.ts            # TypeScript interfaces
```

---

## Development Workflow

### 1. Understanding the Game Flow

```
User drags cartridge → CoffreFortSection detects drop
                            ↓
                    GameBoy receives cartridge ID
                            ↓
              isCartridgeCompatible() checks if SNAKE
                     ↓              ↓
                  YES: Boot      NO: Show error
                  sequence       & auto-eject
                     ↓
              Game becomes playable
```

### 2. State Management

We use **two Zustand stores**:

```typescript
// Global state (persisted to localStorage)
import { useGameStore } from '@/store';

const { highScore, soundEnabled, toggleSound } = useGameStore();

// Snake game state (not persisted)
import { useSnakeGameStore } from '@/store';

const { snake, food, direction, moveSnake } = useSnakeGameStore();
```

### 3. Adding New Features

**Adding a new cartridge:**
```typescript
// src/data/cartridges.ts
export const cartridges: CartridgeData[] = [
  // ... existing cartridges
  {
    id: 'your-game',
    name: 'Your Game',
    color: '#hexcolor',
    labelColor: '#hexcolor',
    year: '1990',
    isCompatible: false, // Only SNAKE is true!
  },
];
```

**Adding a showcase screen:**
```typescript
// src/components/GameBoy/showcaseScreens.ts
export function drawYourGameShowcase(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: typeof COLORS
) {
  // Your pixel art drawing code
}
```

---

## Coding Standards

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `GameBoyScreen.tsx` |
| Hooks | camelCase with `use` prefix | `useRetroSounds.ts` |
| Utils/Constants | camelCase | `gameStore.ts` |
| Types | PascalCase | `types.ts` |

### Component Structure

```tsx
'use client'; // Only if needed (hooks, state, browser APIs)

import { useState } from 'react';
import { motion } from 'framer-motion';
// External imports first, then internal

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  // 1. Hooks
  const [state, setState] = useState(false);

  // 2. Derived values
  const isActive = state && title.length > 0;

  // 3. Handlers
  const handleClick = () => {
    onAction?.();
  };

  // 4. Render
  return (
    <div className="...">
      {title}
    </div>
  );
}
```

### Styling with Tailwind

```tsx
// ✅ Good - Use cn() for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)} />

// ❌ Avoid - Inline styles
<div style={{ color: 'red' }} />
```

### TypeScript

```typescript
// ✅ Good - Explicit types
interface Position {
  x: number;
  y: number;
}

const food: Position = { x: 5, y: 10 };

// ❌ Avoid - any type
const food: any = { x: 5, y: 10 };
```

---

## Key Patterns

### 1. Canvas Game Rendering

```typescript
// Game loop with setInterval
useEffect(() => {
  if (!isActive || gameOver || isPaused) return;

  const gameLoop = setInterval(() => {
    // Update game state
    moveSnake();
  }, speed);

  return () => clearInterval(gameLoop);
}, [isActive, gameOver, isPaused, speed]);
```

### 2. Direction Ref Pattern

Prevents 180° turns by using ref + state:

```typescript
const directionRef = useRef<Direction>('RIGHT');
const [direction, setDirection] = useState<Direction>('RIGHT');

const changeDirection = (newDir: Direction) => {
  const opposites = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };

  if (newDir !== opposites[directionRef.current]) {
    setDirection(newDir);
    directionRef.current = newDir; // Update BOTH!
  }
};
```

### 3. Hydration-Safe Random Values

```typescript
// ❌ Bad - Causes hydration mismatch
const [index] = useState(Math.random());

// ✅ Good - Use useSyncExternalStore
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
let cachedValue: number | null = null;
const getClient = () => cachedValue ?? (cachedValue = Math.random());
const getServer = () => 0;

function useRandomIndex() {
  return useSyncExternalStore(emptySubscribe, getClient, getServer);
}
```

### 4. Sound Effects

```typescript
import { useRetroSounds } from '@/hooks';

const { playSound } = useRetroSounds({ enabled: true, volume: 0.25 });

// Available sounds: 'click', 'start', 'eat', 'gameOver', 'boot', 'error'
playSound('eat');
```

---

## Common Tasks

### Adding a New Landing Page Variant

1. Create folder: `src/app/variants/your-variant/page.tsx`
2. Copy structure from existing variant
3. Customize colors in `globals.css`:

```css
.variant-your-variant {
  --primary: your-color;
  --accent: your-accent;
}
```

### Modifying Game Constants

Edit `src/constants/game.ts`:

```typescript
export const GRID_SIZE = 16;        // Game grid dimensions
export const INITIAL_SPEED = 200;   // Milliseconds between moves
export const SPEED_INCREMENT = 0.5; // Speed increase per food eaten
```

### Adding UI Components

We use shadcn/ui. Add new components:

```bash
pnpm dlx shadcn@latest add button
```

Components go to `src/components/ui/`.

### Testing Your Changes

```bash
# 1. Check for lint errors
pnpm lint

# 2. Build to catch type errors
pnpm build

# 3. Test all variants
open http://localhost:3000
open http://localhost:3000/variants/arcade
open http://localhost:3000/variants/modern
open http://localhost:3000/variants/museum
open http://localhost:3000/variants/premium
```

---

## Important Notes

### The Secret Game

**Remember:** The snake game is HIDDEN. Users discover it by trying cartridges.

- Only the SNAKE cartridge (`id: 'snake'`) works
- Other cartridges show error and auto-eject
- Do NOT add hints about which cartridge is correct

### Performance Tips

1. Use `next/image` for all images
2. Lazy load heavy components with `next/dynamic`
3. Memoize expensive calculations with `useMemo`
4. Use `useCallback` for handlers passed to children

### Getting Help

- Check existing code for patterns
- Read the `CLAUDE.md` file for AI assistant context
- Look at `docs/` folder for additional documentation

---

Happy coding! 🎮
