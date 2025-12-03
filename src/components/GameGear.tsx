'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { GlowingEffect } from '@/components/ui/GlowingEffect';

interface GameGearProps {
  className?: string;
  activeCartridge?: string | null;
  onCartridgeEject?: () => void;
  soundEnabled?: boolean;
}

// Cartridge states: empty, booting, incompatible (always ends here - this is a decoy console!)
type CartridgeState = 'empty' | 'booting' | 'incompatible';

export function GameGear({
  className = '',
  activeCartridge = null,
  onCartridgeEject,
  soundEnabled = true,
}: GameGearProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cartridgeState, setCartridgeState] = useState<CartridgeState>('empty');
  const [bootPhase, setBootPhase] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  // Sound effects
  const { playSound } = useRetroSounds({ enabled: soundEnabled, volume: 0.25 });

  // Handle cartridge insertion - ALL cartridges show incompatible (this is a decoy!)
  // Boot sequence effect - intentionally triggers state transitions
  useEffect(() => {
    if (activeCartridge) {
      // Start boot sequence
      setCartridgeState('booting');
      setBootPhase(0);
      playSound('click');

      // Boot animation then ALWAYS show error (this console doesn't work!)
      const bootSequence = [
        setTimeout(() => setBootPhase(1), 400),
        setTimeout(() => setBootPhase(2), 900),
        setTimeout(() => {
          setCartridgeState('incompatible');
          playSound('error');
          setScreenShake(true);
          setTimeout(() => setScreenShake(false), 300);
        }, 1400),
        // Auto-eject after showing error
        setTimeout(() => {
          if (onCartridgeEject) {
            playSound('click');
            onCartridgeEject();
          }
        }, 3800),
      ];

      return () => bootSequence.forEach(clearTimeout);
    } else {
      setCartridgeState('empty');
    }
  }, [activeCartridge, playSound, onCartridgeEject]);

  const screenWidth = 160;
  const screenHeight = 144;

  // Decorative button press (doesn't do anything - console doesn't work!)
  const handleButtonPress = useCallback(
    (button: string) => {
      if (cartridgeState === 'empty') return;
      playSound('click');
      setButtonPressed(button);
      setTimeout(() => setButtonPressed(null), 100);
    },
    [cartridgeState, playSound]
  );

  // Render screen on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game Gear screen colors (blue-tinted backlit LCD)
    const bgColor = '#000d1a';
    const lightColor = '#001a33';
    const darkColor = '#000a14';
    const accentColor = '#00aaff';

    // Clear screen
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    if (cartridgeState === 'empty') {
      // Static "off" screen with blue tint
      ctx.fillStyle = lightColor;
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      // Subtle noise pattern (blue-ish)
      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = `rgba(0, 26, 51, ${Math.random() * 0.5})`;
        ctx.fillRect(
          Math.random() * screenWidth,
          Math.random() * screenHeight,
          2,
          2
        );
      }

      // "Insert Cartridge" text
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('INSEREZ', screenWidth / 2, screenHeight / 2 - 8);
      ctx.fillText('CARTOUCHE', screenWidth / 2, screenHeight / 2 + 6);
      ctx.font = 'bold 8px monospace';
      ctx.fillStyle = '#0066ff';
      ctx.fillText('SEGA', screenWidth / 2, screenHeight / 2 + 24);
      return;
    }

    if (cartridgeState === 'booting') {
      // Boot sequence animation
      if (bootPhase === 0) {
        // Flicker effect (blue tinted)
        ctx.fillStyle = Math.random() > 0.5 ? bgColor : '#000520';
        ctx.fillRect(0, 0, screenWidth, screenHeight);
      } else if (bootPhase === 1) {
        // SEGA logo
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        // SEGA text with glow effect
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 10;
        ctx.fillStyle = accentColor;
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SEGA', screenWidth / 2, screenHeight / 2 + 5);
        ctx.shadowBlur = 0;
      } else {
        // Loading bar
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        ctx.fillStyle = accentColor;
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CHARGEMENT...', screenWidth / 2, screenHeight / 2 - 10);

        // Loading bar background
        ctx.fillStyle = darkColor;
        ctx.fillRect(30, screenHeight / 2, 100, 10);

        // Loading bar progress (animated via bootPhase)
        ctx.fillStyle = accentColor;
        ctx.fillRect(30, screenHeight / 2, 70, 10);
      }
      return;
    }

    // Incompatible state - show error (this console NEVER works!)
    if (cartridgeState === 'incompatible') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      // Error icon (X) with red color
      ctx.strokeStyle = '#ff3333';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(screenWidth / 2 - 12, screenHeight / 2 - 40);
      ctx.lineTo(screenWidth / 2 + 12, screenHeight / 2 - 16);
      ctx.moveTo(screenWidth / 2 + 12, screenHeight / 2 - 40);
      ctx.lineTo(screenWidth / 2 - 12, screenHeight / 2 - 16);
      ctx.stroke();

      ctx.fillStyle = '#ff3333';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FORMAT INVALIDE', screenWidth / 2, screenHeight / 2 + 5);
      ctx.font = '7px monospace';
      ctx.fillStyle = accentColor;
      ctx.fillText('Cartouche Sega', screenWidth / 2, screenHeight / 2 + 20);
      ctx.fillText('requise', screenWidth / 2, screenHeight / 2 + 32);
      ctx.font = '6px monospace';
      ctx.fillStyle = lightColor;
      ctx.fillText('Ejection auto...', screenWidth / 2, screenHeight / 2 + 50);
      return;
    }
  }, [cartridgeState, bootPhase, screenWidth, screenHeight]);

  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        x: screenShake ? [0, -5, 5, -5, 5, 0] : 0,
        rotate: screenShake ? [0, -0.5, 0.5, -0.5, 0.5, 0] : 0,
      }}
      transition={{
        duration: screenShake ? 0.3 : 0.6,
        x: { duration: 0.3, ease: 'easeInOut' },
        rotate: { duration: 0.3, ease: 'easeInOut' },
      }}
    >
      {/* Game Gear Body - LANDSCAPE orientation */}
      <div className="relative w-[380px] h-[220px] md:w-[420px] md:h-[250px] bg-[#1a1a1a] rounded-[16px] shadow-2xl">
        {/* Glowing Effect */}
        <GlowingEffect
          blur={8}
          borderWidth={2}
          spread={30}
          glow={cartridgeState !== 'empty'}
          disabled={cartridgeState === 'empty'}
          proximity={80}
          inactiveZone={0.5}
        />

        {/* Top edge detail */}
        <div className="absolute top-0 left-8 right-8 h-2 bg-[#2a2a2a] rounded-t-lg" />

        {/* D-Pad (Left side) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-5">
          <div className="relative w-[65px] h-[65px] md:w-[70px] md:h-[70px]">
            {/* Up */}
            <motion.button
              onClick={() => handleButtonPress('UP')}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[22px] h-[22px] md:w-[24px] md:h-[24px] bg-[#2a2a2a] rounded-t-sm cursor-pointer touch-manipulation"
              animate={{
                backgroundColor: buttonPressed === 'UP' ? '#1a1a1a' : '#2a2a2a',
                scale: buttonPressed === 'UP' ? 0.95 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Up"
            />
            {/* Down */}
            <motion.button
              onClick={() => handleButtonPress('DOWN')}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[22px] h-[22px] md:w-[24px] md:h-[24px] bg-[#2a2a2a] rounded-b-sm cursor-pointer touch-manipulation"
              animate={{
                backgroundColor:
                  buttonPressed === 'DOWN' ? '#1a1a1a' : '#2a2a2a',
                scale: buttonPressed === 'DOWN' ? 0.95 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Down"
            />
            {/* Left */}
            <motion.button
              onClick={() => handleButtonPress('LEFT')}
              className="absolute top-1/2 -translate-y-1/2 left-0 w-[22px] h-[22px] md:w-[24px] md:h-[24px] bg-[#2a2a2a] rounded-l-sm cursor-pointer touch-manipulation"
              animate={{
                backgroundColor:
                  buttonPressed === 'LEFT' ? '#1a1a1a' : '#2a2a2a',
                scale: buttonPressed === 'LEFT' ? 0.95 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Left"
            />
            {/* Right */}
            <motion.button
              onClick={() => handleButtonPress('RIGHT')}
              className="absolute top-1/2 -translate-y-1/2 right-0 w-[22px] h-[22px] md:w-[24px] md:h-[24px] bg-[#2a2a2a] rounded-r-sm cursor-pointer touch-manipulation"
              animate={{
                backgroundColor:
                  buttonPressed === 'RIGHT' ? '#1a1a1a' : '#2a2a2a',
                scale: buttonPressed === 'RIGHT' ? 0.95 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Right"
            />
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] md:w-[24px] md:h-[24px] bg-[#2a2a2a]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-[#1a1a1a] rounded-full" />
          </div>
        </div>

        {/* Screen Housing (Center) */}
        <motion.div
          className="absolute top-4 left-[90px] md:left-[100px] w-[200px] md:w-[220px] h-[180px] md:h-[200px] bg-[#0a0a0a] rounded-lg p-2"
          animate={{
            boxShadow:
              cartridgeState !== 'empty'
                ? 'inset 0 0 20px rgba(0, 170, 255, 0.15)'
                : 'none',
          }}
        >
          {/* Screen Bezel */}
          <div className="relative h-full bg-[#050510] rounded p-2">
            {/* Power LED */}
            <motion.div
              className={`absolute -top-1 -right-6 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                cartridgeState !== 'empty' ? 'bg-red-600' : 'bg-[#300000]'
              }`}
              animate={{
                boxShadow:
                  cartridgeState !== 'empty'
                    ? ['0 0 8px #dc2626', '0 0 12px #dc2626', '0 0 8px #dc2626']
                    : 'none',
              }}
              transition={{
                repeat: cartridgeState !== 'empty' ? Infinity : 0,
                duration: 1.5,
              }}
            />

            {/* Canvas Screen */}
            <canvas
              ref={canvasRef}
              width={screenWidth}
              height={screenHeight}
              className="w-full h-full rounded"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </motion.div>

        {/* 1/2 Buttons (Right side) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-5 md:right-6 flex gap-3">
          <div className="flex flex-col items-center">
            <motion.button
              onClick={() => handleButtonPress('1')}
              className="w-[38px] h-[38px] md:w-[42px] md:h-[42px] bg-[#0066ff] rounded-full shadow-lg border-2 border-[#0055dd] cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === '1' ? 0.9 : 1,
                backgroundColor: buttonPressed === '1' ? '#0055dd' : '#0066ff',
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Button 1"
            />
            <span className="text-[8px] text-[#4a4a4a] font-bold mt-1">1</span>
          </div>
          <div className="flex flex-col items-center -mt-3">
            <motion.button
              onClick={() => handleButtonPress('2')}
              className="w-[38px] h-[38px] md:w-[42px] md:h-[42px] bg-[#0066ff] rounded-full shadow-lg border-2 border-[#0055dd] cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === '2' ? 0.9 : 1,
                backgroundColor: buttonPressed === '2' ? '#0055dd' : '#0066ff',
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Button 2"
            />
            <span className="text-[8px] text-[#4a4a4a] font-bold mt-1">2</span>
          </div>
        </div>

        {/* START Button (Below screen) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <motion.button
            onClick={() => handleButtonPress('START')}
            className="w-[40px] h-[12px] bg-[#2a2a2a] rounded-full shadow-inner cursor-pointer touch-manipulation"
            animate={{
              scale: buttonPressed === 'START' ? 0.9 : 1,
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Start"
          />
          <span className="block text-[6px] text-[#4a4a4a] font-bold text-center mt-1">
            START
          </span>
        </div>

        {/* SEGA Branding */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <div className="text-[#0066ff] font-bold text-sm tracking-widest">
            GAME GEAR
          </div>
        </div>

        {/* Speaker grills (left side, bottom) */}
        <div className="absolute bottom-4 left-[85px] md:left-[95px] flex gap-1 rotate-90">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-[3px] h-[15px] bg-[#0a0a0a] rounded-full" />
          ))}
        </div>

        {/* Speaker grills (right side, bottom) */}
        <div className="absolute bottom-4 right-[85px] md:right-[95px] flex gap-1 rotate-90">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-[3px] h-[15px] bg-[#0a0a0a] rounded-full" />
          ))}
        </div>

        {/* Volume wheel (left edge) */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-[8px] h-[30px] bg-[#3a3a3a] rounded-l-sm">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-[#1a1a1a] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-[#1a1a1a] rounded-full" />
          <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-[#1a1a1a] rounded-full" />
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-3 left-8 right-8 h-6 bg-black/20 blur-xl rounded-full" />
    </motion.div>
  );
}
