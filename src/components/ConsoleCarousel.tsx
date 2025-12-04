'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { GameBoy } from '@/components/GameBoy/index';
import { NeoGeoPocket } from '@/components/NeoGeoPocket';
import { consoles, getDefaultStartIndex, ConsoleId } from '@/data/consoles';
import { cn } from '@/lib/utils';

// Hydration-safe default index using useSyncExternalStore
const emptySubscribe = () => () => {};
let cachedDefaultIndex: number | null = null;
const getClientDefaultIndex = () => {
  if (cachedDefaultIndex === null) {
    cachedDefaultIndex = getDefaultStartIndex();
  }
  return cachedDefaultIndex;
};
const getServerDefaultIndex = () => getDefaultStartIndex();

interface ConsoleCarouselProps {
  activeCartridge: string | null;
  onCartridgeEject: () => void;
  onConsoleChange?: (consoleId: ConsoleId) => void;
  variant?: 'premium' | 'arcade' | 'museum' | 'modern';
  className?: string;
}

// Console components mapped by ID
const ConsoleComponents: Record<
  ConsoleId,
  React.ComponentType<{
    activeCartridge?: string | null;
    onCartridgeEject?: () => void;
    className?: string;
  }>
> = {
  gameboy: GameBoy,
  'neogeo-pocket': NeoGeoPocket,
};

export function ConsoleCarousel({
  activeCartridge,
  onCartridgeEject,
  onConsoleChange,
  variant = 'premium',
  className,
}: ConsoleCarouselProps) {
  // Hydration-safe default starting index (NeoGeoPocket to hide GameBoy)
  const initialIndex = useSyncExternalStore(
    emptySubscribe,
    getClientDefaultIndex,
    getServerDefaultIndex
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Motion values for smooth drag feedback
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-200, 0, 200], [-3, 0, 3]);
  const dragScale = useTransform(dragX, [-200, 0, 200], [0.98, 1, 0.98]);

  const currentConsole = consoles[activeIndex];
  const CurrentConsoleComponent = ConsoleComponents[currentConsole.id];

  // Notify parent when console changes
  useEffect(() => {
    onConsoleChange?.(currentConsole.id);
  }, [currentConsole.id, onConsoleChange]);

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + consoles.length) % consoles.length);
    setIsAnimating(true);
  }, [isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % consoles.length);
    setIsAnimating(true);
  }, [isAnimating]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      setIsAnimating(true);
    },
    [isAnimating, activeIndex]
  );

  // Keyboard navigation (only when game is not active)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with game controls when playing
      if (activeCartridge && currentConsole.id === 'gameboy') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, activeCartridge, currentConsole.id]);

  // Handle swipe gestures
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50;
      const velocityThreshold = 300;

      // Reset drag position with spring animation
      dragX.set(0);

      // Don't allow swiping when game is active
      if (activeCartridge && currentConsole.id === 'gameboy') return;

      if (
        info.offset.x > swipeThreshold ||
        info.velocity.x > velocityThreshold
      ) {
        goToPrevious();
      } else if (
        info.offset.x < -swipeThreshold ||
        info.velocity.x < -velocityThreshold
      ) {
        goToNext();
      }
    },
    [goToPrevious, goToNext, activeCartridge, currentConsole.id, dragX]
  );

  // Variant-specific styles (removed arrow styles)
  const variantStyles = {
    premium: {
      dotActive: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]',
      dotInactive: 'bg-neutral-700 hover:bg-neutral-600',
      labelColor: 'text-white',
      brandColor: 'text-emerald-400',
      priceColor: 'text-emerald-300',
      cardBg: 'bg-neutral-900/50',
    },
    arcade: {
      dotActive: 'bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.5)]',
      dotInactive: 'bg-slate-700 hover:bg-slate-600',
      labelColor: 'text-white',
      brandColor: 'text-cyan-400',
      priceColor: 'text-cyan-300',
      cardBg: 'bg-slate-900/50',
    },
    museum: {
      dotActive: 'bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.4)]',
      dotInactive: 'bg-stone-400 hover:bg-stone-500',
      labelColor: 'text-stone-800',
      brandColor: 'text-amber-700',
      priceColor: 'text-amber-600',
      cardBg: 'bg-stone-200/50',
    },
    modern: {
      dotActive: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      dotInactive: 'bg-slate-300 hover:bg-slate-400',
      labelColor: 'text-slate-800',
      brandColor: 'text-blue-600',
      priceColor: 'text-blue-500',
      cardBg: 'bg-white/50',
    },
  };

  const styles = variantStyles[variant];

  // Animation variants - smooth sliding with gentle easing
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <div className={cn('relative', className)}>
      {/* Console Display Area with Swipe Support */}
      <motion.div
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
      >
        {/* Console Container */}
        <motion.div
          className="relative overflow-visible min-h-[560px] md:min-h-[600px] flex items-center justify-center"
          style={{ rotate: dragRotate, scale: dragScale }}
        >
          <AnimatePresence
            mode="popLayout"
            custom={direction}
            onExitComplete={() => setIsAnimating(false)}
          >
            <motion.div
              key={currentConsole.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 260, damping: 26 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className="flex flex-col items-center"
            >
              <CurrentConsoleComponent
                activeCartridge={activeCartridge}
                onCartridgeEject={onCartridgeEject}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Console Info Card */}
      <motion.div
        key={currentConsole.id + '-info'}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={cn(
          'text-center mt-6 py-4 px-6 rounded-2xl mx-auto max-w-xs backdrop-blur-sm',
          styles.cardBg
        )}
      >
        <h3 className={cn('text-xl md:text-2xl font-bold', styles.labelColor)}>
          {currentConsole.name}
        </h3>
        <p className={cn('text-sm mt-1', styles.brandColor)}>
          {currentConsole.brand} &bull; {currentConsole.year}
        </p>
        <p className={cn('text-lg font-bold mt-2', styles.priceColor)}>
          {currentConsole.price}
        </p>
      </motion.div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {consoles.map((console, index) => (
          <motion.button
            key={console.id}
            onClick={() => goToIndex(index)}
            disabled={isAnimating}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              'transition-all duration-300 rounded-full',
              index === activeIndex
                ? cn('w-8 h-3', styles.dotActive)
                : cn('w-3 h-3', styles.dotInactive)
            )}
            aria-label={`Aller a ${console.name}`}
            aria-current={index === activeIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p
        className={cn(
          'text-center text-xs mt-4 opacity-60',
          variant === 'museum' || variant === 'modern'
            ? 'text-stone-500'
            : 'text-gray-400'
        )}
      >
        Glissez pour changer de console
      </p>
    </div>
  );
}
