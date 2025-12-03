# React Bits Components Documentation

All components are TypeScript + Tailwind CSS versions from the `@react-bits` registry.

## Table of Contents

1. [Backgrounds](#backgrounds)
   - [Dither](#dither)
   - [Aurora](#aurora)
   - [DotGrid](#dotgrid)
   - [Waves](#waves)
   - [Squares](#squares)
   - [Noise](#noise)
   - [Particles](#particles)
2. [Text Animations](#text-animations)
   - [CountUp](#countup)
   - [SplitText](#splittext)
   - [TextType](#texttype)
   - [Shuffle](#shuffle)
   - [BlurText](#blurtext)
   - [TrueFocus](#truefocus)
   - [ASCIIText](#asciitext)
   - [FallingText](#fallingtext)
   - [ScrollReveal](#scrollreveal)
3. [Content Animations](#content-animations)
   - [FadeContent](#fadecontent)
   - [AnimatedContent](#animatedcontent)
4. [Interactive Effects](#interactive-effects)
   - [GlareHover](#glarehover)
   - [Magnet](#magnet)
   - [ClickSpark](#clickspark)
   - [TargetCursor](#targetcursor)
5. [Cards & Layout](#cards--layout)
   - [PixelCard](#pixelcard)
   - [DecayCard](#decaycard)
   - [Stack](#stack)
6. [Navigation & UI](#navigation--ui)
   - [LogoLoop](#logoloop)
   - [Stepper](#stepper)

---

## Backgrounds

### Dither

Retro dithered noise shader background - PERFECT for GameBoy aesthetic!

**Import:**
```tsx
import Dither from '@/components/Dither'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `waveSpeed` | `number` | `0.05` | Animation speed |
| `waveFrequency` | `number` | `3` | Wave frequency |
| `waveAmplitude` | `number` | `0.3` | Wave amplitude |
| `waveColor` | `[number, number, number]` | `[0.5, 0.5, 0.5]` | RGB color (0-1) |
| `colorNum` | `number` | `4` | Number of colors in palette |
| `pixelSize` | `number` | `2` | Dither pixel size |
| `disableAnimation` | `boolean` | `false` | Disable animation |
| `enableMouseInteraction` | `boolean` | `true` | Enable mouse effects |
| `mouseRadius` | `number` | `1` | Mouse interaction radius |

**Use Case - Hero Section Background:**
```tsx
<section className="relative min-h-screen">
  <div className="absolute inset-0">
    <Dither
      waveColor={[0.06, 0.22, 0.06]} // GameBoy dark green
      colorNum={4}
      pixelSize={3}
      waveSpeed={0.03}
      enableMouseInteraction={true}
    />
  </div>
  <div className="relative z-10">
    {/* Your hero content */}
  </div>
</section>
```

**GameBoy Green Palette:**
```tsx
// GameBoy colors as RGB (0-1)
const gameboyDark = [0.06, 0.22, 0.06]   // #0f380f
const gameboyGreen = [0.61, 0.74, 0.06]  // #9bbc0f
const gameboyLight = [0.55, 0.67, 0.06]  // #8bac0f
```

---

### Aurora

Flowing aurora gradient background.

**Import:**
```tsx
import Aurora from '@/components/Aurora'
```

**Use Case - Modern Hero:**
```tsx
<div className="absolute inset-0">
  <Aurora />
</div>
```

---

### DotGrid

Animated dot grid with cursor interactions.

**Import:**
```tsx
import DotGrid from '@/components/DotGrid'
```

**Use Case - Interactive Shelf Section:**
```tsx
<section className="relative bg-neutral-900">
  <div className="absolute inset-0 opacity-30">
    <DotGrid />
  </div>
  <div className="relative z-10">
    {/* GameBoy and cartridges */}
  </div>
</section>
```

---

### Waves

Layered lines forming smooth wave patterns.

**Import:**
```tsx
import Waves from '@/components/Waves'
```

**Use Case - Section Divider:**
```tsx
<div className="h-32 overflow-hidden">
  <Waves />
</div>
```

---

### Squares

Animated squares with scaling and direction.

**Import:**
```tsx
import Squares from '@/components/Squares'
```

**Use Case - Retro Grid Background:**
```tsx
<div className="absolute inset-0 opacity-20">
  <Squares />
</div>
```

---

### Noise

Animated film grain overlay for vintage feel.

**Import:**
```tsx
import Noise from '@/components/Noise'
```

**Use Case - Add Retro Texture to Any Section:**
```tsx
<section className="relative">
  {/* Your content */}
  <div className="absolute inset-0 pointer-events-none z-50">
    <Noise />
  </div>
</section>
```

---

### Particles

Configurable particle system.

**Import:**
```tsx
import Particles from '@/components/Particles'
```

**Use Case - Ambient Background:**
```tsx
<div className="absolute inset-0">
  <Particles />
</div>
```

---

## Text Animations

### CountUp

Animated number counter with spring physics.

**Import:**
```tsx
import CountUp from '@/components/CountUp'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | `number` | Required | Target number |
| `from` | `number` | `0` | Starting number |
| `direction` | `'up' \| 'down'` | `'up'` | Count direction |
| `delay` | `number` | `0` | Delay in seconds |
| `duration` | `number` | `2` | Animation duration |
| `separator` | `string` | `''` | Thousands separator |
| `onStart` | `() => void` | - | Callback on start |
| `onEnd` | `() => void` | - | Callback on end |

**Use Case - Hero Stats:**
```tsx
{/* Replace static numbers with animated counters */}
<div className="flex items-center gap-8">
  <div>
    <div className="text-2xl font-bold text-[#1a1a1a]">
      <CountUp to={500} duration={2.5} />+
    </div>
    <div className="text-sm text-gray-500">Jeux Restaures</div>
  </div>
  <div className="w-px h-10 bg-gray-200" />
  <div>
    <div className="text-2xl font-bold text-[#1a1a1a]">
      <CountUp to={100} duration={2} />%
    </div>
    <div className="text-sm text-gray-500">Authenticite</div>
  </div>
  <div className="w-px h-10 bg-gray-200" />
  <div>
    <div className="text-2xl font-bold text-[#1a1a1a]">
      <CountUp to={90} duration={1.8} />j
    </div>
    <div className="text-sm text-gray-500">Garantie</div>
  </div>
</div>
```

**Use Case - Community Stats:**
```tsx
<div className="grid grid-cols-3 gap-8">
  <div>
    <div className="text-3xl font-bold text-white">
      <CountUp to={1.2} duration={2} separator="," />K+
    </div>
    <div className="text-gray-500 text-sm">Collectionneurs</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-white">
      <CountUp to={4.9} duration={2} />/5
    </div>
    <div className="text-gray-500 text-sm">Satisfaction</div>
  </div>
  <div>
    <div className="text-3xl font-bold text-white">
      <CountUp to={50} duration={2.5} />K+
    </div>
    <div className="text-gray-500 text-sm">Jeux Catalogues</div>
  </div>
</div>
```

---

### SplitText

Splits text into characters/words for staggered animation.

**Import:**
```tsx
import SplitText from '@/components/SplitText'
```

**Use Case - Animated Headings:**
```tsx
<h1 className="text-5xl font-bold">
  <SplitText text="Revivez l'Ere Retro" />
</h1>
```

---

### TextType

Typewriter effect with blinking cursor.

**Import:**
```tsx
import TextType from '@/components/TextType'
```

**Use Case - Hero Subtitle:**
```tsx
<p className="text-lg text-gray-600">
  <TextType
    text="Jeux vintage premium, authentifies et restaures avec soin."
    speed={50}
  />
</p>
```

---

### Shuffle

Characters shuffle before settling into final text.

**Import:**
```tsx
import Shuffle from '@/components/Shuffle'
```

**Use Case - Section Titles:**
```tsx
<h2 className="text-4xl font-bold">
  <Shuffle text="Le Coffre-Fort" />
</h2>
```

---

### BlurText

Text starts blurred then crisply resolves.

**Import:**
```tsx
import BlurText from '@/components/BlurText'
```

**Use Case - Reveal Headlines:**
```tsx
<BlurText text="Collections Curees" className="text-4xl font-bold" />
```

---

### TrueFocus

Dynamic blur/clarity across a series of words.

**Import:**
```tsx
import TrueFocus from '@/components/TrueFocus'
```

**Use Case - Hero Tagline:**
```tsx
<TrueFocus
  words={["Nostalgie", "Curee.", "Etat", "Mint."]}
  className="text-xl"
/>
```

---

### ASCIIText

Text with animated ASCII background - perfect for retro!

**Import:**
```tsx
import ASCIIText from '@/components/ASCIIText'
```

**Use Case - Retro Headers:**
```tsx
<ASCIIText text="RETRO COLLECT" className="text-6xl font-mono" />
```

---

### FallingText

Physics-based text animation where words fall and can be dragged with mouse. Uses Matter.js physics engine.

**Import:**
```tsx
import FallingText from '@/components/FallingText'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `''` | Text to display |
| `highlightWords` | `string[]` | `[]` | Words to highlight (cyan + bold) |
| `trigger` | `'auto' \| 'scroll' \| 'click' \| 'hover'` | `'auto'` | When to start animation |
| `backgroundColor` | `string` | `'transparent'` | Background color |
| `wireframes` | `boolean` | `false` | Show physics wireframes |
| `gravity` | `number` | `1` | Gravity strength |
| `mouseConstraintStiffness` | `number` | `0.2` | Mouse drag stiffness |
| `fontSize` | `string` | `'1rem'` | Font size |

**Use Case - Interactive Hero Text:**
```tsx
<div className="h-[400px] w-full">
  <FallingText
    text="Revivez l'Ere Retro avec notre collection curee"
    highlightWords={["Retro", "collection"]}
    trigger="scroll"
    gravity={0.8}
    fontSize="2rem"
  />
</div>
```

**Use Case - 404 Page:**
```tsx
<FallingText
  text="Oops! Page non trouvee. Les pixels se sont echappes..."
  highlightWords={["404", "echappes"]}
  trigger="auto"
  gravity={1.2}
/>
```

**Use Case - Interactive Game Over Screen:**
```tsx
<FallingText
  text="GAME OVER Inserez une piece pour continuer"
  highlightWords={["GAME", "OVER"]}
  trigger="click"
  fontSize="3rem"
/>
```

---

### ScrollReveal

Scroll-triggered text reveal with rotation, opacity, and blur effects.

**Import:**
```tsx
import ScrollReveal from '@/components/ScrollReveal'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Text content (string) |
| `enableBlur` | `boolean` | `true` | Enable blur effect |
| `baseOpacity` | `number` | `0.1` | Starting opacity |
| `baseRotation` | `number` | `3` | Starting rotation degrees |
| `blurStrength` | `number` | `4` | Blur amount in pixels |
| `containerClassName` | `string` | `''` | Container CSS classes |
| `textClassName` | `string` | `''` | Text CSS classes |
| `rotationEnd` | `string` | `'bottom bottom'` | GSAP scroll end position |
| `wordAnimationEnd` | `string` | `'bottom bottom'` | Word animation end position |

**Use Case - Section Headings:**
```tsx
<ScrollReveal
  enableBlur={true}
  baseOpacity={0.2}
  baseRotation={5}
  textClassName="text-4xl font-bold"
>
  Notre Engagement Qualite
</ScrollReveal>
```

**Use Case - Hero Tagline:**
```tsx
<ScrollReveal
  blurStrength={6}
  baseRotation={3}
  containerClassName="max-w-2xl mx-auto"
>
  Jeux vintage premium authentifies et restaures avec soin
</ScrollReveal>
```

**Use Case - Feature Description:**
```tsx
<ScrollReveal
  enableBlur={false}
  baseOpacity={0.3}
  textClassName="text-gray-600"
>
  Chaque cartouche passe par notre atelier de restauration
</ScrollReveal>
```

---

## Content Animations

### FadeContent

Scroll-triggered fade with optional blur.

**Import:**
```tsx
import FadeContent from '@/components/FadeContent'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blur` | `boolean` | `false` | Add blur effect |
| `duration` | `number` | `1` | Animation duration |
| `delay` | `number` | `0` | Delay in seconds |
| `threshold` | `number` | `0.1` | Viewport threshold |
| `onComplete` | `() => void` | - | Callback on complete |

**Use Case - Wrap All Sections:**
```tsx
<FadeContent blur duration={0.8}>
  <section className="py-24">
    <h2>Section Title</h2>
    <p>Section content...</p>
  </section>
</FadeContent>
```

**Use Case - Staggered Cards:**
```tsx
{collections.map((collection, index) => (
  <FadeContent key={index} delay={index * 0.1} blur>
    <CollectionCard {...collection} />
  </FadeContent>
))}
```

---

### AnimatedContent

Wrapper that animates children on scroll or mount.

**Import:**
```tsx
import AnimatedContent from '@/components/AnimatedContent'
```

**Use Case - Directional Animations:**
```tsx
<AnimatedContent direction="left" distance={50}>
  <div>Slides in from left</div>
</AnimatedContent>

<AnimatedContent direction="up" distance={30}>
  <div>Slides up</div>
</AnimatedContent>
```

---

## Interactive Effects

### GlareHover

Adds realistic moving glare on hover.

**Import:**
```tsx
import GlareHover from '@/components/GlareHover'
```

**Use Case - Collection Cards:**
```tsx
<GlareHover>
  <div className="rounded-2xl overflow-hidden">
    <Image src={collection.image} alt={collection.title} />
    <div className="p-6">
      <h3>{collection.title}</h3>
    </div>
  </div>
</GlareHover>
```

---

### Magnet

Elements magnetically ease toward cursor.

**Import:**
```tsx
import Magnet from '@/components/Magnet'
```

**Use Case - Interactive Buttons:**
```tsx
<Magnet>
  <button className="bg-[#1a1a1a] text-white px-7 py-4 rounded-full">
    Parcourir la Collection
  </button>
</Magnet>
```

---

### ClickSpark

Creates particle sparks at click position.

**Import:**
```tsx
import ClickSpark from '@/components/ClickSpark'
```

**Use Case - Global Click Effects:**
```tsx
// Wrap your layout
<ClickSpark>
  <main>{children}</main>
</ClickSpark>
```

---

### TargetCursor

Targeting cursor with spinning corners that snap to elements. Perfect for gaming/retro themes!

**Import:**
```tsx
import TargetCursor from '@/components/TargetCursor'
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetSelector` | `string` | `'.cursor-target'` | CSS selector for target elements |
| `spinDuration` | `number` | `2` | Rotation speed in seconds |
| `hideDefaultCursor` | `boolean` | `true` | Hide browser cursor |
| `hoverDuration` | `number` | `0.2` | Snap animation duration |
| `parallaxOn` | `boolean` | `true` | Enable parallax effect |

**Use Case - Gaming Cursor for Entire Page:**
```tsx
// In your layout.tsx
export default function Layout({ children }) {
  return (
    <body>
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={3}
      />
      {children}
    </body>
  )
}

// Then add .cursor-target class to interactive elements
<button className="cursor-target">Play Game</button>
<div className="cursor-target">Cartridge Card</div>
```

**Use Case - Target Buttons and Cards:**
```tsx
<TargetCursor targetSelector="button, .card, a" />
```

**Use Case - Faster Spinning for Arcade Feel:**
```tsx
<TargetCursor
  spinDuration={1}
  hoverDuration={0.1}
  parallaxOn={true}
/>
```

**GameBoy Theme - Target Cartridges:**
```tsx
// Add to layout
<TargetCursor targetSelector=".cartridge, .gameboy-btn" />

// Mark elements
<div className="cartridge">Zelda</div>
<button className="gameboy-btn">Start</button>
```

---

## Cards & Layout

### PixelCard

Card content revealed through pixel expansion.

**Import:**
```tsx
import PixelCard from '@/components/PixelCard'
```

**Use Case - Game Cards:**
```tsx
<PixelCard>
  <div className="p-6">
    <img src={game.image} alt={game.title} />
    <h3 className="font-bold">{game.title}</h3>
    <p className="text-gray-500">{game.price}</p>
  </div>
</PixelCard>
```

---

### DecayCard

Hover effect that disintegrates card content.

**Import:**
```tsx
import DecayCard from '@/components/DecayCard'
```

**Use Case - Mystery Cartridge:**
```tsx
<DecayCard>
  <div className="bg-neutral-800 p-6 rounded-xl">
    <span className="text-gray-400">???</span>
    <p>Origine: Inconnue</p>
  </div>
</DecayCard>
```

---

### Stack

Layered stack with swipe animations.

**Import:**
```tsx
import Stack from '@/components/Stack'
```

**Use Case - Cartridge Stack:**
```tsx
<Stack>
  {cartridges.map(cartridge => (
    <CartridgeCard key={cartridge.id} {...cartridge} />
  ))}
</Stack>
```

---

## Navigation & UI

### LogoLoop

Continuously looping marquee of logos.

**Import:**
```tsx
import LogoLoop from '@/components/LogoLoop'
```

**Use Case - Console Brands Marquee:**
```tsx
<LogoLoop>
  <img src="/logos/nintendo.svg" alt="Nintendo" />
  <img src="/logos/sega.svg" alt="Sega" />
  <img src="/logos/sony.svg" alt="Sony" />
  <img src="/logos/atari.svg" alt="Atari" />
</LogoLoop>
```

---

### Stepper

Animated multi-step progress indicator.

**Import:**
```tsx
import Stepper from '@/components/Stepper'
```

**Use Case - Restoration Process:**
```tsx
<Stepper
  steps={[
    "Reception",
    "Authentification",
    "Nettoyage",
    "Test",
    "Expedition"
  ]}
  currentStep={2}
/>
```

---

## Landing Page Enhancement Ideas

### Hero Section Enhancements

1. **Add Dither background** for retro GameBoy feel
2. **Use CountUp** for stats animation
3. **Add SplitText** for animated heading
4. **Add Noise** overlay for vintage texture
5. **Wrap buttons in Magnet** for magnetic effect

```tsx
<section className="relative min-h-screen">
  {/* Dither Background */}
  <div className="absolute inset-0">
    <Dither waveColor={[0.06, 0.22, 0.06]} pixelSize={3} />
  </div>

  {/* Noise Overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-30">
    <Noise />
  </div>

  <div className="relative z-10">
    {/* Animated Heading */}
    <h1>
      <SplitText text="Revivez l'Ere Retro" />
    </h1>

    {/* Typewriter Subtitle */}
    <TextType text="Jeux vintage premium..." />

    {/* Magnetic Button */}
    <Magnet>
      <button>Parcourir la Collection</button>
    </Magnet>

    {/* Animated Stats */}
    <CountUp to={500} />
  </div>
</section>
```

### Interactive Shelf Section

1. **Add DotGrid** as background
2. **Use PixelCard** for cartridge cards
3. **Add ClickSpark** for click effects
4. **Use Shuffle** for section title

### Collection Cards

1. **Wrap in GlareHover** for shine effect
2. **Use FadeContent** for scroll reveal
3. **Add DecayCard** for mystery items

### Community Section

1. **Use Aurora** or **Waves** background
2. **Add CountUp** for all statistics
3. **Use BlurText** for heading

### Global Enhancements

1. **Add Noise** component to layout for consistent retro feel
2. **Use ClickSpark** wrapper for particle effects
3. **Add LogoLoop** for console brand showcase

---

## Quick Reference

| Component | Best For | Import Path |
|-----------|----------|-------------|
| Dither | Retro backgrounds | `@/components/Dither` |
| CountUp | Animated stats | `@/components/CountUp` |
| FadeContent | Scroll animations | `@/components/FadeContent` |
| SplitText | Animated headings | `@/components/SplitText` |
| Noise | Vintage texture | `@/components/Noise` |
| GlareHover | Card shine | `@/components/GlareHover` |
| Magnet | Magnetic buttons | `@/components/Magnet` |
| PixelCard | Game cards | `@/components/PixelCard` |
| TextType | Typewriter | `@/components/TextType` |
| ClickSpark | Click particles | `@/components/ClickSpark` |
