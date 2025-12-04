# Mobile Performance Optimization Plan

## Executive Summary

**Current Issues:**
- 14 heavy components (7 canvas, 2 WebGL, 5+ Framer Motion)
- 687-line monolithic `page.tsx` with 167+ `motion.*` elements
- Full-viewport canvas animations running on mobile
- Missing `React.memo` on several expensive components
- Game loop uses `setInterval` instead of `requestAnimationFrame`
- No Suspense boundaries for progressive loading

**Expected Results After Optimization:**
- 20-40% bundle size reduction
- 60fps consistent on mobile
- Lighthouse score 90+
- Modular, maintainable codebase
- Battery-efficient animations

---

## Research Findings Summary

### React 19 + React Compiler
- **Automatic memoization** - No need for manual `useMemo`/`useCallback` in most cases
- **Use `useTransition`** for smooth animations during heavy state updates
- **Server Components** - Convert static sections to reduce client JS by 30-50%

### Framer Motion v12
- **Use `LazyMotion`** - Reduces bundle from 34KB to 4.6KB
- **Motion values don't re-render** - Use `useMotionValue` for continuous animations
- **GPU-accelerated properties only** - `x`, `y`, `scale`, `rotate`, `opacity`
- **Variants pattern** - Define once, reuse everywhere

### Canvas/WebGL Performance
- **Replace `setInterval` with `requestAnimationFrame`** - Syncs with display, pauses in background
- **Adaptive canvas scaling** - Cap at 1.5x on budget devices
- **Visibility detection** - Pause when tab is hidden (90% battery savings)

### Next.js 16 Code Splitting
- **Separate Suspense boundaries** - Avoid sequential loading waterfall
- **Skeleton screens > spinners** - Better perceived performance
- **Preload on idle** - Use `requestIdleCallback` for below-fold components

---

## Part 1: Heavy Components Analysis

### Critical Priority (Disable on Mobile)

| Component | Issue | Impact |
|-----------|-------|--------|
| **Noise.tsx** | Full-screen 60fps grain canvas | HIGH - 100% viewport RAF loop |
| **RetroGrid.tsx** | Full viewport 3D perspective canvas | HIGH - Complex gradient calculations |
| **Dither.tsx** | WebGL + GLSL shaders + mouse tracking | HIGH - Battery drain |
| **Particles.tsx** | 200 OGL particles with hover detection | HIGH - Not memoized |

### High Priority (Optimize for Mobile)

| Component | Issue | Recommendation |
|-----------|-------|----------------|
| **ClickSpark.tsx** | RAF loop + ResizeObserver, not memoized | Disable on mobile, wrap in memo |
| **Magnet.tsx** | Mouse tracking for magnet effect | Disable on mobile |
| **Hero particles** | 20 background particles | Reduce to 5 on mobile |
| **Cartridge.tsx** | 3D rotateX/Y transforms + spring | Use 2D transforms on mobile |
| **BentoGrid.tsx** | 7 staggered children | Disable stagger on mobile |

### Medium Priority (Already Optimized)

| Component | Status |
|-----------|--------|
| **BackgroundEffects** | ✅ Uses SVG GridPattern on mobile |
| **Squares.tsx** | ✅ FPS throttled, only shows on high quality |
| **PixelCard.tsx** | ✅ Lazy loaded, memoized |

---

## Part 2: page.tsx Refactoring Plan

### Current Structure (687 lines, monolithic)

```
page.tsx
├── Hero Section (lines 66-206) - ~140 lines
├── Features Bento Grid (lines 208-328) - ~120 lines
├── Products Grid (lines 330-446) - ~116 lines
├── CoffreFortSection (imported) ✅
├── Collections Section (lines 451-570) - ~120 lines
├── Testimonials Section (lines 572-607) - ~35 lines
├── Community Section (lines 609-680) - ~70 lines
└── FooterSection (imported) ✅
```

### Proposed Component Structure

```
src/
├── components/
│   └── sections/
│       ├── HeroSection.tsx       (NEW - Server-side capable)
│       ├── FeaturesSection.tsx   (NEW - Server-side capable)
│       ├── ProductsSection.tsx   (NEW - Server-side capable)
│       ├── CollectionsSection.tsx (NEW)
│       ├── TestimonialsSection.tsx (NEW)
│       ├── CommunitySection.tsx  (NEW)
│       ├── CoffreFortSection.tsx (EXISTS ✅)
│       └── index.ts              (Barrel export)
│
├── app/
│   └── page.tsx                  (~50 lines - composition only)
```

### New page.tsx Structure (Target: ~50 lines)

```tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BackgroundEffects from '@/components/BackgroundEffects';
import { Header } from '@/components/Header';
import FooterSection from '@/components/FooterOne';

// Server Components (no 'use client' needed)
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import CollectionsSection from '@/components/sections/CollectionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CommunitySection from '@/components/sections/CommunitySection';

// Client Component - Interactive game (lazy loaded)
const CoffreFortSection = dynamic(
  () => import('@/components/sections/CoffreFortSection').then(m => ({ default: m.CoffreFortSection })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="dark min-h-screen bg-background text-foreground overflow-hidden">
      <BackgroundEffects />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <Suspense fallback={<div className="h-screen" />}>
        <CoffreFortSection variant="arcade" />
      </Suspense>
      <CollectionsSection />
      <TestimonialsSection />
      <CommunitySection />
      <FooterSection />
    </main>
  );
}
```

---

## Part 3: Next.js 16+ Best Practices

### 1. Server vs Client Components

**Current:** Entire page is `'use client'` (677 lines)

**Optimized:**
```
Server Components (No JS shipped):
├── HeroSection (static content, BlurText can be server)
├── FeaturesSection (static bento grid)
├── ProductsSection (static product cards)
├── CollectionsSection (static collections)
├── TestimonialsSection (slider can be client island)
└── CommunitySection (mostly static)

Client Components (Only interactive parts):
├── CoffreFortSection (game logic)
├── Header (if has state)
├── ClickSpark, Magnet (interactive effects)
└── TestimonialSlider (carousel)
```

**Impact:** 30-50% reduction in client-side JavaScript

### 2. Dynamic Imports Strategy

```tsx
// Already implemented ✅
const PixelCard = dynamic(() => import('@/components/PixelCard'), { ssr: false });
const Squares = dynamic(() => import('@/components/Squares'), { ssr: false });
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });

// Should add (MISSING)
const CircularGallery = dynamic(() => import('@/components/CircularGallery2'), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-slate-900/20 animate-pulse rounded-xl" />
});

// Consider lazy loading heavy sections
const CollectionsSection = dynamic(() => import('@/components/sections/CollectionsSection'), {
  ssr: true, // Can be server-rendered
  loading: () => <SectionSkeleton />
});
```

### 3. React 19 + React Compiler

**Already enabled** ✅ (`reactCompiler: true` in next.config.ts)

Benefits:
- Automatic memoization (no manual `useMemo`/`useCallback`)
- 12% faster page loads
- 2.5x faster interactions

### 4. Bundle Optimization

**Add bundle analyzer:**
```bash
pnpm add -D @next/bundle-analyzer
```

**Potential savings:**
| Package | Size | Action |
|---------|------|--------|
| `motion` (duplicate) | ~80KB | Remove - using `framer-motion` |
| `matter-js` | ~200KB | Check if used, remove if not |
| Icon tree-shaking | ~20KB | Use direct imports |

### 5. Image Optimization

**Already using `next/image`** ✅

Enhancements:
```tsx
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Add blur placeholders
/>
```

---

## Part 4: Mobile-Specific Optimizations

### 1. Disable Heavy Effects on Mobile

Create wrapper component:

```tsx
// src/components/DesktopOnly.tsx
'use client';
import { useIsMobile } from '@/hooks';

export function DesktopOnly({ children, fallback = null }: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return isMobile ? fallback : children;
}
```

Usage in page.tsx:
```tsx
<DesktopOnly>
  <Magnet padding={40} magnetStrength={2}>
    <ClickSpark sparkColor="#06b6d4">
      <Button>Click Me</Button>
    </ClickSpark>
  </Magnet>
</DesktopOnly>
```

### 2. Reduce Animations on Mobile

```tsx
// In each section component
const isMobile = useIsMobile();
const animationProps = isMobile
  ? {} // No animation on mobile
  : {
      initial: FADE_IN_UP,
      whileInView: FADE_IN_UP_VISIBLE,
      viewport: VIEWPORT_ONCE
    };

<motion.div {...animationProps}>
```

### 3. FPS Throttling for Canvas

Already implemented in:
- `RetroGrid.tsx` (30fps default)
- `Squares.tsx` (30fps default)
- `usePerformanceMonitor.ts` (quality-based)

### 4. Touch-Friendly Alternatives

Replace hover effects with tap on mobile:
```tsx
const isMobile = useIsMobile();

<motion.div
  whileHover={isMobile ? undefined : PRODUCT_HOVER}
  whileTap={TAP_SCALE}
>
```

---

## Part 5: Implementation Tasks

### Phase 1: Critical Mobile Fixes (Day 1)
- [ ] Create `DesktopOnly` wrapper component
- [ ] Wrap `Magnet` and `ClickSpark` in `DesktopOnly` throughout page.tsx
- [ ] Add `isMobile` checks to disable 3D transforms in `Cartridge.tsx`
- [ ] Verify `Noise`, `RetroGrid`, `Dither` are disabled on mobile via BackgroundEffects

### Phase 2: Component Extraction (Day 2)
- [ ] Create `src/components/sections/HeroSection.tsx`
- [ ] Create `src/components/sections/FeaturesSection.tsx`
- [ ] Create `src/components/sections/ProductsSection.tsx`
- [ ] Create `src/components/sections/CollectionsSection.tsx`
- [ ] Create `src/components/sections/TestimonialsSection.tsx`
- [ ] Create `src/components/sections/CommunitySection.tsx`
- [ ] Update barrel export `src/components/sections/index.ts`
- [ ] Refactor `page.tsx` to use new section components

### Phase 3: Server Component Migration (Day 3)
- [ ] Convert static sections to Server Components (remove 'use client')
- [ ] Create client islands for interactive parts only
- [ ] Add Suspense boundaries around dynamic imports

### Phase 4: Bundle Optimization (Day 4)
- [ ] Add bundle analyzer and run analysis
- [ ] Remove duplicate `motion` package
- [ ] Check if `matter-js` is used, remove if not
- [ ] Implement icon tree-shaking

### Phase 5: Testing & Validation (Day 5)
- [ ] Run Lighthouse on mobile (target: 90+)
- [ ] Test on low-end Android device
- [ ] Verify all animations work on desktop
- [ ] Check for hydration errors
- [ ] Run `pnpm build` and verify no errors

---

## Part 6: File Changes Summary

### New Files to Create
```
src/components/DesktopOnly.tsx
src/components/sections/HeroSection.tsx
src/components/sections/FeaturesSection.tsx
src/components/sections/ProductsSection.tsx
src/components/sections/CollectionsSection.tsx
src/components/sections/TestimonialsSection.tsx
src/components/sections/CommunitySection.tsx
src/components/sections/index.ts
```

### Files to Modify
```
src/app/page.tsx - Refactor to use section components
src/components/Cartridge.tsx - Add mobile 2D fallback
src/components/ClickSpark.tsx - Add React.memo
src/components/Particles.tsx - Add React.memo
next.config.ts - Add bundle analyzer (optional)
package.json - Remove duplicate motion package
```

### Files Already Optimized ✅
```
src/components/BackgroundEffects.tsx - Mobile-aware
src/components/RetroGrid.tsx - FPS throttled, memoized
src/components/Squares.tsx - FPS throttled, memoized
src/components/Noise.tsx - Memoized
src/components/Dither.tsx - Memoized
src/components/PixelCard.tsx - Memoized
src/hooks/usePerformanceMonitor.ts - Quality detection
```

---

## Metrics to Track

| Metric | Current | Target |
|--------|---------|--------|
| Bundle Size (JS) | ~TBD | -20-40% |
| LCP (Mobile) | ~TBD | <2.5s |
| INP (Mobile) | ~TBD | <200ms |
| Lighthouse (Mobile) | ~TBD | 90+ |
| FPS on Mobile | ~30-40 | 60 stable |

---

## Quick Wins (Implement First)

1. **Wrap Magnet/ClickSpark in DesktopOnly** - 10 min, high impact
2. **Add React.memo to ClickSpark and Particles** - 5 min
3. **Remove duplicate motion package** - 2 min
4. **Verify BackgroundEffects mobile behavior** - 5 min

---

## Part 7: New Code Patterns from Research

### 1. LazyMotion for Bundle Size (34KB → 4.6KB)

```tsx
// src/app/layout.tsx or page.tsx
import { LazyMotion, domAnimation } from 'framer-motion';
import * as m from 'framer-motion/m';

export default function Layout({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}

// In components, use m.div instead of motion.div
<m.div animate={{ opacity: 1 }} />
```

### 2. RequestAnimationFrame Game Loop

```tsx
// Replace setInterval in GameBoy/index.tsx
useEffect(() => {
  if (!isActive || gameOver || isPaused) return;

  let frameId: number;
  let lastUpdate = 0;
  const frameInterval = speed;

  const gameLoop = (timestamp: number) => {
    frameId = requestAnimationFrame(gameLoop);

    if (timestamp - lastUpdate >= frameInterval) {
      lastUpdate = timestamp;
      // Move snake, check collisions
      moveSnake();
    }
  };

  frameId = requestAnimationFrame(gameLoop);
  return () => cancelAnimationFrame(frameId);
}, [isActive, gameOver, isPaused, speed]);
```

### 3. Visibility Detection (Battery Saving)

```tsx
// src/hooks/useVisibilityPause.ts
export function useVisibilityPause(onHide: () => void, onShow: () => void) {
  useEffect(() => {
    const handler = () => {
      if (document.hidden) onHide();
      else onShow();
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [onHide, onShow]);
}

// Usage in GameBoy
useVisibilityPause(
  () => setIsPaused(true),  // Pause when tab hidden
  () => setIsPaused(false)  // Resume when visible
);
```

### 4. Adaptive Canvas Scaling

```tsx
// src/hooks/useAdaptiveCanvasScale.ts
export function useAdaptiveCanvasScale(baseWidth: number, baseHeight: number) {
  const { tier } = useDevicePerformanceTier();

  const dpr = window.devicePixelRatio || 1;
  const maxRatio = tier === 'low' ? 1.5 : tier === 'medium' ? 2 : dpr;
  const ratio = Math.min(dpr, maxRatio);

  return {
    width: Math.floor(baseWidth * ratio),
    height: Math.floor(baseHeight * ratio),
    cssWidth: baseWidth,
    cssHeight: baseHeight,
    scale: ratio,
  };
}
```

### 5. Suspense Boundaries Pattern

```tsx
// src/app/page.tsx
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      {/* Critical - no Suspense */}
      <Header />
      <HeroSection />

      {/* Below fold - separate boundaries */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsSection />
      </Suspense>

      <Suspense fallback={<GameSkeleton />}>
        <CoffreFortSection />
      </Suspense>

      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
    </main>
  );
}
```

### 6. useTransition for Smooth Animations

```tsx
// In CoffreFortSection for cartridge insertion
const [isPending, startTransition] = useTransition();

const handleCartridgeInsert = (id: string) => {
  startTransition(() => {
    // Heavy state updates here
    setActiveCartridge(id);
    initializeGame();
  });
};

// Animations stay smooth during transition
<motion.div animate={{ opacity: isPending ? 0.8 : 1 }} />
```

### 7. Preload on Idle

```tsx
// Preload below-fold components during idle time
useEffect(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('@/components/TestimonialSlider');
      import('@/components/CircularGallery2');
    });
  }
}, []);
```

---

## Notes

- React Compiler is already enabled, so manual memoization is less critical
- CircularGallery already only renders on desktop (lg: breakpoint)
- CoffreFortSection is already a separate component
- Quality-level system already adapts to device performance

---

## Priority Matrix

| Task | Impact | Effort | Priority |
|------|--------|--------|----------|
| DesktopOnly wrapper | HIGH | LOW | 1 |
| Replace setInterval with RAF | HIGH | MEDIUM | 2 |
| Add Suspense boundaries | HIGH | LOW | 3 |
| Extract section components | MEDIUM | HIGH | 4 |
| LazyMotion migration | MEDIUM | MEDIUM | 5 |
| Server Components | HIGH | HIGH | 6 |
| Visibility pause hook | MEDIUM | LOW | 7 |
| Adaptive canvas scaling | LOW | MEDIUM | 8 |
