/**
 * Animation constants to prevent inline object recreation
 * These are stable references that won't cause unnecessary re-renders
 */

import type { Variants, Transition } from 'framer-motion';

// Common viewport settings
export const VIEWPORT_ONCE = { once: true } as const;
export const VIEWPORT_ONCE_MARGIN = { once: true, margin: '-100px' } as const;

// Common transitions
export const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
};

export const EASE_OUT_TRANSITION: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

// Fade animations
export const FADE_IN = { opacity: 0 } as const;
export const FADE_IN_VISIBLE = { opacity: 1 } as const;

// Fade up animations
export const FADE_IN_UP = { opacity: 0, y: 20 } as const;
export const FADE_IN_UP_30 = { opacity: 0, y: 30 } as const;
export const FADE_IN_UP_VISIBLE = { opacity: 1, y: 0 } as const;

// Fade right animation
export const FADE_IN_RIGHT = { opacity: 0, x: 50 } as const;
export const FADE_IN_RIGHT_VISIBLE = { opacity: 1, x: 0 } as const;

// Hover effects for buttons/cards
export const HOVER_LIFT = { y: -8 } as const;
export const HOVER_SCALE = { scale: 1.05 } as const;
export const HOVER_SCALE_LIFT = { scale: 1.05, y: -8 } as const;

// Product card hover
export const PRODUCT_HOVER = {
  y: -8,
  boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)',
} as const;

// Button hover with glow
export const BUTTON_HOVER_GLOW = {
  scale: 1.05,
  boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)',
} as const;

export const BUTTON_HOVER_GLOW_STRONG = {
  scale: 1.05,
  boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
} as const;

export const BUTTON_HOVER_GLOW_WHITE = {
  scale: 1.05,
  boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
} as const;

// Tap effects
export const TAP_SCALE = { scale: 0.95 } as const;

// Scale animation for pulsing elements
export const PULSE_SCALE: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: { repeat: Infinity, duration: 2 },
  },
};

// Stagger delays for children
export const STAGGER_DELAY = 0.05;
export const STAGGER_DELAY_FAST = 0.03;
export const STAGGER_DELAY_SLOW = 0.1;

// Entry animation variants
export const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const FADE_UP_30_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Gallery animation
export const GALLERY_TRANSITION: Transition = {
  delay: 0.3,
  duration: 0.8,
};
