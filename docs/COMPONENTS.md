# UI Components Documentation

This document provides usage examples for all installed UI components.

## Table of Contents

1. [Smooth Cursor](#smooth-cursor)
2. [Highlighter](#highlighter)
3. [Comet Card](#comet-card)
4. [Carousel](#carousel)
5. [Draggable Card](#draggable-card)
6. [Circular Gallery](#circular-gallery)
7. [Pointer Highlight](#pointer-highlight)
8. [Animated Modal](#animated-modal)
9. [Glowing Effect](#glowing-effect)
10. [Pixelated Canvas](#pixelated-canvas)

---

## Smooth Cursor

A physics-based smooth cursor animation component.

### Import

```tsx
import { SmoothCursor } from "@/components/ui/smooth-cursor"
```

### Basic Usage

```tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-none">
      <SmoothCursor />
      {children}
    </div>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cursor` | `React.ReactNode` | `<DefaultCursorSVG />` | Custom cursor component |
| `springConfig` | `SpringConfig` | See below | Spring animation config |

### Spring Config

```typescript
{
  damping: 45,      // How quickly animation settles
  stiffness: 400,   // Spring stiffness
  mass: 1,          // Virtual mass
  restDelta: 0.001  // Animation complete threshold
}
```

### Custom Cursor Example

```tsx
<SmoothCursor
  cursor={<div className="w-4 h-4 bg-gameboy-green rounded-full" />}
  springConfig={{ damping: 30, stiffness: 300, mass: 0.5, restDelta: 0.001 }}
/>
```

### CSS for Hiding Default Cursor

```css
* {
  cursor: none !important;
}

/* Keep text cursor for inputs */
input, textarea, select {
  cursor: text !important;
}
```

---

## Highlighter

A text highlighter that mimics hand-drawn marker strokes.

### Import

```tsx
import { Highlighter } from "@/components/ui/highlighter"
```

### Basic Usage

```tsx
<p>
  The{" "}
  <Highlighter action="underline" color="#FF9800">
    Magic UI Highlighter
  </Highlighter>{" "}
  makes important{" "}
  <Highlighter action="highlight" color="#87CEFA">
    text stand out
  </Highlighter>{" "}
  effortlessly.
</p>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to highlight |
| `action` | `"highlight" \| "underline" \| "box" \| "circle" \| "strike-through" \| "crossed-off" \| "bracket"` | `"highlight"` | Annotation type |
| `color` | `string` | `"#ffd1dc"` | Highlight color |
| `strokeWidth` | `number` | `1.5` | Stroke width in px |
| `animationDuration` | `number` | `600` | Animation duration in ms |
| `iterations` | `number` | `2` | Draw iterations (sketchy effect) |
| `padding` | `number` | `2` | Padding in px |
| `multiline` | `boolean` | `true` | Support multiple lines |
| `isView` | `boolean` | `false` | Animate on viewport entry |

### GameBoy Theme Example

```tsx
<Highlighter action="highlight" color="#9bbc0f">
  Retro Gaming
</Highlighter>

<Highlighter action="underline" color="#0f380f">
  Snake Game
</Highlighter>

<Highlighter action="circle" color="#8bac0f">
  High Score!
</Highlighter>
```

---

## Comet Card

A 3D rotating card with mouse tracking effect.

### Import

```tsx
import { CometCard } from "@/components/ui/comet-card"
```

### Basic Usage

```tsx
<CometCard>
  <div className="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</CometCard>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rotateDepth` | `number` | `17.5` | 3D rotation depth on mouse move |
| `translateDepth` | `number` | `20` | Translation depth on mouse move |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `React.ReactNode` | Required | Card content |

### Example with Custom Depth

```tsx
<CometCard rotateDepth={25} translateDepth={30} className="bg-gameboy-dark">
  <div className="p-8 text-gameboy-green">
    <h2 className="text-2xl font-bold">Snake Game</h2>
    <p>Classic retro gaming experience</p>
  </div>
</CometCard>
```

---

## Carousel

A slide-based image carousel with controls.

### Import

```tsx
import { Carousel } from "@/components/ui/carousel"
```

### Basic Usage

```tsx
const slides = [
  {
    title: "Welcome to Snake",
    button: "Play Now",
    src: "/images/slide1.jpg"
  },
  {
    title: "Retro Gaming",
    button: "Learn More",
    src: "/images/slide2.jpg"
  },
  {
    title: "High Scores",
    button: "View Scores",
    src: "/images/slide3.jpg"
  }
]

<Carousel slides={slides} />
```

### SlideData Interface

```typescript
interface SlideData {
  title: string   // Slide title
  button: string  // Button text
  src: string     // Image source URL
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `slides` | `SlideData[]` | Yes | Array of slide objects |

---

## Draggable Card

Cards that can be dragged around the screen.

### Import

```tsx
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card"
```

### Basic Usage (Single Card)

```tsx
<DraggableCardContainer className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-clip">
  <DraggableCardBody>
    <img
      src="/images/game-screenshot.jpg"
      alt="Snake Game"
      className="pointer-events-none relative z-10 h-80 w-full object-cover"
    />
    <p className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
      Classic Snake
    </p>
  </DraggableCardBody>
</DraggableCardContainer>
```

### Multiple Cards (Scattered Layout)

```tsx
const items = [
  {
    title: "Level 1",
    image: "/images/level1.jpg",
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
  },
  {
    title: "Level 2",
    image: "/images/level2.jpg",
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
  },
  {
    title: "Level 3",
    image: "/images/level3.jpg",
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
  {
    title: "Boss Level",
    image: "/images/boss.jpg",
    className: "absolute top-32 left-[55%] rotate-[10deg]",
  },
]

export function GameLevelsShowcase() {
  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        Drag to explore game levels
      </p>
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  )
}
```

### Props

**DraggableCardContainer**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string?` | `undefined` | Container CSS classes |
| `children` | `React.ReactNode?` | `undefined` | Container content |

**DraggableCardBody**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string?` | `undefined` | Card CSS classes |
| `children` | `React.ReactNode?` | `undefined` | Card content |

---

## Circular Gallery

An interactive circular image gallery.

### Import

```tsx
import { CircularGallery } from "@/components/ui/circular-gallery-2"
```

### Basic Usage

```tsx
const images = [
  { src: "/images/game1.jpg", alt: "Game 1" },
  { src: "/images/game2.jpg", alt: "Game 2" },
  { src: "/images/game3.jpg", alt: "Game 3" },
  { src: "/images/game4.jpg", alt: "Game 4" },
]

<CircularGallery images={images} />
```

---

## Pointer Highlight

An animated highlight effect that follows pointer interactions.

### Import

```tsx
import { PointerHighlight } from "@/components/ui/pointer-highlight"
```

### Basic Usage

```tsx
<div className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl">
  There has to be some
  <PointerHighlight
    rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
    pointerClassName="text-yellow-500"
  >
    <span className="relative z-10">background to animate too</span>
  </PointerHighlight>
</div>
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | Yes | - | Content to wrap with highlight effect |
| `rectangleClassName` | `string` | No | - | CSS classes for animated rectangle border |
| `pointerClassName` | `string` | No | - | CSS classes for pointer icon |
| `containerClassName` | `string` | No | - | CSS classes for container div |

### Grid Layout Example

```tsx
import { PointerHighlight } from "@/components/ui/pointer-highlight"

export function PointerHighlightDemo() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 py-20 sm:grid-cols-3">
      {/* Card 1 - Yellow accent */}
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-to-r from-blue-200 to-sky-200" />
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          <PointerHighlight
            rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">collab tool</span>
          </PointerHighlight>
          of the century with max benefits and minimal effort.
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Our state of the art collab tool of the century with max benefits.
        </p>
      </div>

      {/* Card 2 - Blue accent */}
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-to-r from-blue-200 to-purple-200" />
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          Discover our
          <PointerHighlight
            rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 leading-loose"
            pointerClassName="text-blue-500 h-3 w-3"
            containerClassName="inline-block mx-1"
          >
            <span className="relative z-10">innovative </span>
          </PointerHighlight>
          solutions for your business needs.
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Transforming ideas into reality with cutting-edge technology.
        </p>
      </div>

      {/* Card 3 - Green accent */}
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-45 from-green-200 to-yellow-200" />
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          Experience the future with our
          <PointerHighlight
            rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
            pointerClassName="text-green-500 h-3 w-3"
            containerClassName="inline-block ml-1"
          >
            <span className="relative z-10">sustainable technology</span>
          </PointerHighlight>
          .
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Eco-friendly solutions designed for a better tomorrow.
        </p>
      </div>
    </div>
  )
}
```

### GameBoy Theme Example

```tsx
<PointerHighlight
  rectangleClassName="bg-gameboy-light/20 border-gameboy-green leading-loose"
  pointerClassName="text-gameboy-green h-3 w-3"
  containerClassName="inline-block mx-1"
>
  <span className="relative z-10">Snake Game</span>
</PointerHighlight>
```

---

## Animated Modal

A customizable, compound modal component with animated transitions.

### Import

```tsx
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal"
```

### Basic Usage

```tsx
<Modal>
  <ModalTrigger className="bg-black text-white px-4 py-2 rounded-md">
    Open Modal
  </ModalTrigger>
  <ModalBody>
    <ModalContent>
      <h4 className="text-lg font-bold text-center mb-4">
        Modal Title
      </h4>
      <p>Your modal content goes here.</p>
    </ModalContent>
    <ModalFooter className="gap-4">
      <button className="px-4 py-2 bg-gray-200 rounded-md">
        Cancel
      </button>
      <button className="px-4 py-2 bg-black text-white rounded-md">
        Confirm
      </button>
    </ModalFooter>
  </ModalBody>
</Modal>
```

### Props

**Modal**

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Content inside the modal |

**ModalTrigger**

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Trigger button content |
| `className` | `string?` | Additional CSS classes |

**ModalBody**

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Modal body content |
| `className` | `string?` | Additional CSS classes |

**ModalContent**

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Modal main content |
| `className` | `string?` | Additional CSS classes |

**ModalFooter**

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Footer content (buttons) |
| `className` | `string?` | Additional CSS classes |

### Advanced Example with Animated Trigger

```tsx
"use client"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal"
import { motion } from "motion/react"

export function GameModalDemo() {
  const screenshots = [
    "/images/game1.jpg",
    "/images/game2.jpg",
    "/images/game3.jpg",
  ]

  return (
    <Modal>
      <ModalTrigger className="bg-gameboy-dark text-gameboy-green flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Play Snake
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-gameboy-green z-20">
          🐍
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
            Welcome to{" "}
            <span className="px-1 py-0.5 rounded-md bg-gameboy-light/20 border border-gameboy-green">
              Snake Game
            </span>
            ! 🐍
          </h4>
          <div className="flex justify-center items-center">
            {screenshots.map((image, idx) => (
              <motion.div
                key={idx}
                style={{ rotate: Math.random() * 20 - 10 }}
                whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                className="rounded-xl -mr-4 mt-4 p-1 bg-gameboy-dark border border-gameboy-green shrink-0 overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Screenshot ${idx + 1}`}
                  className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover"
                />
              </motion.div>
            ))}
          </div>
          <div className="py-10 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center">
              <span className="mr-2">🎮</span>
              <span className="text-sm">Arrow Keys Control</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🍎</span>
              <span className="text-sm">Collect Food</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏆</span>
              <span className="text-sm">Beat High Score</span>
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button className="px-4 py-2 bg-gray-200 text-black rounded-md">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gameboy-dark text-gameboy-green border border-gameboy-green rounded-md">
            Start Game
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  )
}
```

### Hook: useOutsideClick

Detect clicks outside an element:

```tsx
import { useOutsideClick } from "@/components/ui/animated-modal"

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => {
    console.log("Clicked outside!")
  })

  return <div ref={ref}>Content</div>
}
```

---

## Glowing Effect

A border glowing effect that adapts to any container or card, as seen on Cursor's website.

### Import

```tsx
import { GlowingEffect } from "@/components/ui/glowing-effect"
```

### Basic Usage

```tsx
<div className="relative rounded-2xl border p-2">
  <GlowingEffect
    blur={0}
    borderWidth={3}
    spread={80}
    glow={true}
    disabled={false}
    proximity={64}
  />
  <div className="p-6">
    Your content here
  </div>
</div>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blur` | `number` | `0` | Blur amount in pixels |
| `inactiveZone` | `number` | `0.7` | Center zone radius multiplier (0-1) |
| `proximity` | `number` | `0` | Distance beyond bounds where effect stays active |
| `spread` | `number` | `20` | Angular spread of glow in degrees |
| `variant` | `"default" \| "white"` | `"default"` | Color variant |
| `glow` | `boolean` | `false` | Force visible regardless of hover |
| `className` | `string` | `undefined` | Additional CSS classes |
| `disabled` | `boolean` | `true` | Disable the effect |
| `movementDuration` | `number` | `2` | Animation duration in seconds |
| `borderWidth` | `number` | `1` | Border width in pixels |

### Grid Layout Example

```tsx
"use client"
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface GridItemProps {
  area: string
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-black dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export function GlowingGridDemo() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4" />}
        title="Feature One"
        description="Description for feature one."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4" />}
        title="Feature Two"
        description="Description for feature two."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4" />}
        title="Feature Three"
        description="Description for feature three."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4" />}
        title="Feature Four"
        description="Description for feature four."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4" />}
        title="Feature Five"
        description="Description for feature five."
      />
    </ul>
  )
}
```

### GameBoy Theme Example

```tsx
<div className="relative rounded-2xl border border-gameboy-green/30 p-2">
  <GlowingEffect
    blur={0}
    borderWidth={2}
    spread={60}
    glow={true}
    disabled={false}
    proximity={50}
    variant="default"
  />
  <div className="rounded-xl bg-gameboy-dark p-6">
    <h3 className="text-xl font-bold text-gameboy-green">Snake Game</h3>
    <p className="text-gameboy-light">Classic retro gaming experience</p>
  </div>
</div>
```

---

## Pixelated Canvas

Convert any image to a pixelated canvas with mouse distortion effects, as seen on Tailwind CSS website.

### Import

```tsx
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas"
```

### Basic Usage

```tsx
<PixelatedCanvas
  src="/images/hero.jpg"
  width={800}
  height={600}
  cellSize={4}
  dotScale={0.9}
  shape="square"
  backgroundColor="#000000"
  interactive
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Source image URL (required) |
| `width` | `number` | `400` | Canvas width in pixels |
| `height` | `number` | `500` | Canvas height in pixels |
| `cellSize` | `number` | `3` | Size of each sampling cell |
| `dotScale` | `number` | `0.9` | Dot size as fraction of cell (0-1) |
| `shape` | `"circle" \| "square"` | `"square"` | Dot shape |
| `backgroundColor` | `string` | `"#000000"` | Canvas background color |
| `grayscale` | `boolean` | `false` | Convert to grayscale |
| `className` | `string` | `undefined` | Additional CSS classes |
| `responsive` | `boolean` | `false` | Redraw on window resize |
| `dropoutStrength` | `number` | `0.4` | Remove dots in low-contrast areas (0-1) |
| `interactive` | `boolean` | `true` | Enable pointer distortion |
| `distortionStrength` | `number` | `3` | Max dot offset in pixels |
| `distortionRadius` | `number` | `80` | Radius around pointer |
| `distortionMode` | `"repel" \| "attract" \| "swirl"` | `"swirl"` | Distortion behavior |
| `followSpeed` | `number` | `0.2` | Pointer follow smoothing (0-1) |
| `sampleAverage` | `boolean` | `true` | Average multiple samples per cell |
| `tintColor` | `string` | `"#FFFFFF"` | Color tint |
| `tintStrength` | `number` | `0.2` | Tint mix amount (0-1) |
| `maxFps` | `number` | `60` | Cap frame rate |
| `objectFit` | `"cover" \| "contain" \| "fill" \| "none"` | `"cover"` | Image fit behavior |
| `jitterStrength` | `number` | `4` | Random motion amplitude |
| `jitterSpeed` | `number` | `4` | Random motion speed |
| `fadeOnLeave` | `boolean` | `true` | Fade distortion on pointer leave |
| `fadeSpeed` | `number` | `0.1` | Fade smoothing (0-1) |

### Repel Effect Example

```tsx
<PixelatedCanvas
  src="https://images.unsplash.com/photo-1630487656049-6db93a53a7e9"
  width={800}
  height={600}
  cellSize={4}
  dotScale={0.9}
  shape="square"
  backgroundColor="#000000"
  dropoutStrength={0.1}
  interactive
  distortionStrength={0.1}
  distortionRadius={200}
  distortionMode="repel"
  followSpeed={0.2}
  jitterStrength={4}
  jitterSpeed={1}
  sampleAverage
  className="rounded-xl shadow-lg"
/>
```

### Swirl Effect with Tint

```tsx
<PixelatedCanvas
  src="/images/character.png"
  width={400}
  height={500}
  cellSize={3}
  dotScale={0.9}
  shape="square"
  backgroundColor="#000000"
  dropoutStrength={0.4}
  interactive
  distortionStrength={3}
  distortionRadius={80}
  distortionMode="swirl"
  followSpeed={0.2}
  jitterStrength={4}
  jitterSpeed={4}
  sampleAverage
  tintColor="#FFFFFF"
  tintStrength={0.2}
  className="rounded-xl border border-neutral-800 shadow-lg"
/>
```

### GameBoy Theme Example

```tsx
<PixelatedCanvas
  src="/images/snake-screenshot.png"
  width={600}
  height={400}
  cellSize={6}
  dotScale={0.85}
  shape="square"
  backgroundColor="#0f380f"
  interactive
  distortionStrength={2}
  distortionRadius={100}
  distortionMode="repel"
  tintColor="#9bbc0f"
  tintStrength={0.3}
  className="rounded-xl border-2 border-gameboy-green"
/>
```

---

## GameBoy Theme Colors

Use these colors for consistent theming across components:

```css
/* In globals.css */
@theme {
  --color-gameboy-green: #9bbc0f;
  --color-gameboy-dark: #0f380f;
  --color-gameboy-light: #8bac0f;
  --color-gameboy-lightest: #c4cfa1;
}
```

```tsx
// Usage in components
<Highlighter color="#9bbc0f">GameBoy Green</Highlighter>
<CometCard className="bg-gameboy-dark text-gameboy-green">
  Retro Content
</CometCard>
```

---

## Best Practices

1. **Smooth Cursor**: Add to layout, wrap content in `cursor-none` div
2. **Highlighter**: Use `isView={true}` for scroll-triggered animations
3. **Comet Card**: Adjust `rotateDepth` for subtle (10) to dramatic (30) effects
4. **Carousel**: Ensure images are optimized and properly sized
5. **Draggable Cards**: Use `pointer-events-none` on images inside cards
6. **All Components**: Test on mobile devices for touch interactions
