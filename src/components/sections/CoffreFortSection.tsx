'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ConsoleCarousel } from '@/components/ConsoleCarousel';
import { Cartridge } from '@/components/Cartridge';
import { useState, useRef, useCallback } from 'react';
import { cartridges, ExtendedCartridgeData } from '@/data/cartridges';
import { ConsoleId } from '@/data/consoles';
import { cn } from '@/lib/utils';
import ClickSpark from '@/components/ClickSpark';
import Squares from '@/components/Squares';

interface CoffreFortSectionProps {
  variant?: 'premium' | 'arcade' | 'museum' | 'modern';
  className?: string;
}

export function CoffreFortSection({ variant = 'premium', className }: CoffreFortSectionProps) {
  const [activeCartridge, setActiveCartridge] = useState<string | null>(null);
  const [activeConsoleId, setActiveConsoleId] = useState<ConsoleId>('gameboy');
  const [isDragging, setIsDragging] = useState(false);
  const [isNearDropZone, setIsNearDropZone] = useState(false);
  const [insertingCartridge, setInsertingCartridge] = useState<ExtendedCartridgeData | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  // Use ref to track drop zone proximity - refs don't have stale closure issues
  const isNearDropZoneRef = useRef(false);

  // Handle cartridge insertion with animation
  const handleCartridgeInsert = useCallback((cartridgeId: string) => {
    const cartridge = cartridges.find(c => c.id === cartridgeId);
    if (cartridge) {
      // Start insertion animation
      setInsertingCartridge(cartridge);
      setIsDragging(false);
      setIsNearDropZone(false);

      // After animation, set active cartridge
      setTimeout(() => {
        setActiveCartridge(cartridgeId);
        setInsertingCartridge(null);
      }, 400);
    }
  }, []);

  // Handle cartridge eject
  const handleCartridgeEject = useCallback(() => {
    setActiveCartridge(null);
  }, []);

  // Check if point is near drop zone (larger threshold for better UX)
  const checkNearDropZone = useCallback((x: number, y: number) => {
    if (!dropZoneRef.current) return false;
    const rect = dropZoneRef.current.getBoundingClientRect();
    const threshold = 150;

    // Convert viewport rect to page coordinates (add scroll offset)
    // Framer Motion's info.point gives page coordinates, but getBoundingClientRect gives viewport coordinates
    const rectTop = rect.top + window.scrollY;
    const rectBottom = rect.bottom + window.scrollY;
    const rectLeft = rect.left + window.scrollX;
    const rectRight = rect.right + window.scrollX;

    return (
      x >= rectLeft - threshold &&
      x <= rectRight + threshold &&
      y >= rectTop - threshold &&
      y <= rectBottom + threshold
    );
  }, []);


  // Variant-specific styles
  const variantStyles = {
    premium: {
      bg: 'bg-gradient-to-b from-neutral-900 to-neutral-800',
      titleColor: 'text-white',
      subtitleColor: 'text-emerald-400',
      descColor: 'text-gray-400',
      hintColor: 'text-emerald-400/80',
      dropZoneBorder: 'border-emerald-400',
      dropZoneBg: 'bg-emerald-400/20',
      dropZoneShadow: 'shadow-[0_0_30px_rgba(52,211,153,0.6)]',
      sparkColor: '#34d399',
    },
    arcade: {
      bg: '', // Transparent - same as "Pourquoi Nous Choisir"
      titleColor: 'text-white',
      subtitleColor: 'text-cyan-400',
      descColor: 'text-slate-400',
      hintColor: 'text-cyan-400/80',
      dropZoneBorder: 'border-cyan-400',
      dropZoneBg: 'bg-cyan-400/20',
      dropZoneShadow: 'shadow-[0_0_30px_rgba(0,212,255,0.6)]',
      sparkColor: '#22d3ee',
    },
    museum: {
      bg: 'bg-gradient-to-b from-stone-100 to-stone-200',
      titleColor: 'text-stone-900',
      subtitleColor: 'text-amber-700',
      descColor: 'text-stone-600',
      hintColor: 'text-amber-700/80',
      dropZoneBorder: 'border-amber-600',
      dropZoneBg: 'bg-amber-600/20',
      dropZoneShadow: 'shadow-[0_0_30px_rgba(217,119,6,0.4)]',
      sparkColor: '#d97706',
    },
    modern: {
      bg: 'bg-gradient-to-b from-slate-50 to-white',
      titleColor: 'text-slate-900',
      subtitleColor: 'text-blue-600',
      descColor: 'text-slate-600',
      hintColor: 'text-blue-600/80',
      dropZoneBorder: 'border-blue-500',
      dropZoneBg: 'bg-blue-500/20',
      dropZoneShadow: 'shadow-[0_0_30px_rgba(59,130,246,0.6)]',
      sparkColor: '#3b82f6',
    },
  };

  const styles = variantStyles[variant];

  return (
    <section id="coffre-fort" className={cn('relative py-16 md:py-24 overflow-hidden', styles.bg, className)}>
      {/* Animated Squares Background */}
      <div className="absolute inset-0 opacity-30">
        <Squares
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(6, 182, 212, 0.3)"
          squareSize={50}
          hoverFillColor="rgba(6, 182, 212, 0.1)"
        />
      </div>
      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className={cn('text-sm font-bold uppercase tracking-wider', styles.subtitleColor)}>
            Testez Avant d&apos;Acheter
          </span>
          <h2 className={cn('text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight', styles.titleColor)}>
            Le Coffre-Fort
          </h2>
          <p className={styles.descColor}>
            Glissez une cartouche vers la console pour la tester.
          </p>
        </motion.div>

        {/* Vertical Layout: Cartridges on top, GameBoy below */}
        <div className="flex flex-col items-center gap-6">

          {/* Cartridge Row - Above GameBoy */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            {/* Hint text */}
            <p className={cn(
              'text-center text-sm mb-4 font-medium',
              styles.hintColor
            )}>
              {activeCartridge
                ? '↓ Cartouche inseree - Cliquez sur une autre pour changer'
                : '↓ Naviguez entre les consoles et testez vos cartouches'}
            </p>

            {/* Cartridge Grid - Horizontal row with fixed heights to prevent layout shift */}
            <ClickSpark sparkColor={styles.sparkColor} sparkCount={8} sparkRadius={35} duration={400}>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 min-h-[160px] md:min-h-[180px] items-start">
                {cartridges.map((cartridge, index) => (
                  <motion.div
                    key={cartridge.id}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0"
                    layout={false}
                  >
                    <Cartridge
                      {...cartridge}
                      isInserted={activeCartridge === cartridge.id || insertingCartridge?.id === cartridge.id}
                      onDragStart={() => {
                        setIsDragging(true);
                        isNearDropZoneRef.current = false; // Reset on drag start
                      }}
                      onDrag={(x, y) => {
                        const isNear = checkNearDropZone(x, y);
                        setIsNearDropZone(isNear);
                        // Also update ref - refs don't have stale closure issues
                        isNearDropZoneRef.current = isNear;
                      }}
                      onDragEnd={() => {
                        // Use ref value which is always current (no stale closure)
                        if (isNearDropZoneRef.current) {
                          handleCartridgeInsert(cartridge.id);
                        }
                        setIsDragging(false);
                        setIsNearDropZone(false);
                        isNearDropZoneRef.current = false;
                      }}
                      onTap={() => {
                        // Tap to insert/eject
                        if (activeCartridge === cartridge.id) {
                          handleCartridgeEject();
                        } else if (!insertingCartridge) {
                          handleCartridgeInsert(cartridge.id);
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </ClickSpark>
          </motion.div>

          {/* Console Carousel with Drop Zone */}
          <motion.div
            ref={carouselRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Drop Zone Overlay - matches console dimensions exactly */}
            <div
              ref={dropZoneRef}
              className={cn(
                'absolute top-[10px] md:top-[20px] left-1/2 -translate-x-1/2 w-[340px] md:w-[360px] h-[560px] md:h-[600px] rounded-3xl transition-all duration-300 z-10 flex flex-col items-center justify-start pt-4 pointer-events-none',
                isDragging
                  ? isNearDropZone
                    ? cn('border-3 border-dashed', styles.dropZoneBorder, styles.dropZoneBg, styles.dropZoneShadow)
                    : 'border-2 border-dashed border-gray-400/30 bg-gray-400/5'
                  : 'border-transparent'
              )}
            >
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 8, 0] }}
                  transition={{ y: { repeat: Infinity, duration: 1 } }}
                  className="flex flex-col items-center bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  <span className={cn('text-sm font-bold', isNearDropZone ? styles.subtitleColor : 'text-gray-300')}>
                    {isNearDropZone ? '↓ LACHER ICI!' : '↓ Deposez sur la console'}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Cartridge insertion animation */}
            <AnimatePresence>
              {insertingCartridge && (
                <motion.div
                  initial={{ y: -60, opacity: 1, scale: 0.8 }}
                  animate={{ y: 40, opacity: 0, scale: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeIn' }}
                  className="absolute top-[30px] left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                >
                  {/* Mini cartridge visual */}
                  <div
                    className="w-[80px] h-[60px] rounded-t-md rounded-b-lg shadow-xl"
                    style={{ backgroundColor: insertingCartridge.color }}
                  >
                    <div
                      className="mx-1 mt-3 mb-2 p-1 rounded-sm text-center"
                      style={{ backgroundColor: insertingCartridge.labelColor }}
                    >
                      <div className="font-bold text-[8px] text-white">
                        {insertingCartridge.title}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <ConsoleCarousel
              activeCartridge={activeCartridge}
              onCartridgeEject={handleCartridgeEject}
              onConsoleChange={setActiveConsoleId}
              variant={variant}
            />

            {/* Eject hint - only shows for correct cartridge (since wrong ones auto-eject) */}
            <AnimatePresence>
              {activeCartridge && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-center whitespace-nowrap',
                    variant === 'museum' || variant === 'modern'
                      ? 'text-gray-500'
                      : 'text-white/50'
                  )}
                >
                  Cliquez sur une autre cartouche pour changer
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Keyboard hint for desktop - only show when game is active on GameBoy */}
          {activeCartridge && activeConsoleId === 'gameboy' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn('text-center text-xs mt-4', styles.descColor)}
            >
              Clavier: Fleches/WASD = Deplacer | P/Echap = Pause | R = Reset
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
