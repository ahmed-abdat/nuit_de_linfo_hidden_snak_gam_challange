'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { GlowingEffect } from '@/components/ui/GlowingEffect';

interface NeoGeoPocketProps {
  className?: string;
  activeCartridge?: string | null;
  onCartridgeEject?: () => void;
  soundEnabled?: boolean;
}

// Cartridge states: empty, booting, showcase (shows demo screen - stays here)
type CartridgeState = 'empty' | 'booting' | 'showcase';

// Neo Geo Pocket color palette (teal/cyan LCD style)
interface ShowcaseColors {
  bg: string;
  light: string;
  dark: string;
  accent: string;
}

// ============================================
// SHOWCASE SCREEN DRAWING FUNCTIONS
// These render "demo" screens styled for Neo Geo Pocket's color LCD
// ============================================

function drawZeldaShowcase(ctx: CanvasRenderingContext2D, w: number, h: number, colors: ShowcaseColors) {
  const { bg, light, dark, accent } = colors;
  const cx = w / 2;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = accent;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ZELDA', cx, 20);
  ctx.font = '7px monospace';
  ctx.fillStyle = light;
  ctx.fillText("Link's Awakening", cx, 32);

  // Triforce
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(cx, 42);
  ctx.lineTo(cx - 12, 60);
  ctx.lineTo(cx + 12, 60);
  ctx.closePath();
  ctx.fill();

  // Link (simple)
  ctx.fillStyle = dark;
  ctx.fillRect(cx - 5, 70, 10, 15);
  ctx.fillRect(cx - 4, 64, 8, 7);

  // Sword
  ctx.fillStyle = light;
  ctx.fillRect(cx + 6, 68, 2, 14);

  // Hearts
  ctx.fillStyle = accent;
  ctx.font = '8px monospace';
  ctx.textAlign = 'left';
  for (let i = 0; i < 3; i++) {
    ctx.fillText('♥', 8 + i * 12, 105);
  }

  // Ground
  ctx.fillStyle = dark;
  ctx.fillRect(0, 115, w, 3);

  // Demo label
  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('- DEMO -', cx, h - 8);
}

function drawMarioShowcase(ctx: CanvasRenderingContext2D, w: number, h: number, colors: ShowcaseColors) {
  const { bg, light, dark, accent } = colors;
  const cx = w / 2;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = accent;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SUPER MARIO', cx, 18);
  ctx.font = '8px monospace';
  ctx.fillStyle = light;
  ctx.fillText('DELUXE', cx, 30);

  // Clouds
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(30, 50, 8, 0, Math.PI * 2);
  ctx.arc(42, 47, 10, 0, Math.PI * 2);
  ctx.fill();

  // Question block
  ctx.fillStyle = accent;
  ctx.fillRect(65, 60, 14, 14);
  ctx.strokeStyle = dark;
  ctx.lineWidth = 1;
  ctx.strokeRect(65, 60, 14, 14);
  ctx.fillStyle = dark;
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('?', 72, 71);

  // Mario sprite
  ctx.fillStyle = accent;
  ctx.fillRect(35, 80, 10, 4); // hat
  ctx.fillStyle = light;
  ctx.fillRect(35, 84, 10, 7); // head
  ctx.fillStyle = dark;
  ctx.fillRect(33, 91, 14, 10); // body

  // Ground
  ctx.fillStyle = dark;
  ctx.fillRect(0, 105, w, 12);
  ctx.strokeStyle = light;
  ctx.lineWidth = 0.5;
  for (let x = 0; x < w; x += 14) {
    ctx.strokeRect(x, 105, 14, 6);
  }

  // Score
  ctx.fillStyle = accent;
  ctx.font = '6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('MARIO', 5, 130);
  ctx.fillText('012400', 5, 138);

  // Demo label
  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('- DEMO -', cx, h - 4);
}

function drawTetrisShowcase(ctx: CanvasRenderingContext2D, w: number, h: number, colors: ShowcaseColors) {
  const { bg, light, dark, accent } = colors;
  const cx = w / 2;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = accent;
  ctx.font = 'bold 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TETRIS', cx - 20, 16);

  // Tetris well
  const wellX = 20;
  const wellY = 25;
  const wellW = 65;
  const wellH = 95;
  const blockSize = 6;

  ctx.fillStyle = dark;
  ctx.fillRect(wellX, wellY, wellW, wellH);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(wellX, wellY, wellW, wellH);

  // Stack
  const stack = [
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ];

  stack.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === 1) {
        const bx = wellX + 2 + ci * blockSize;
        const by = wellY + wellH - (stack.length - ri) * blockSize - 2;
        ctx.fillStyle = ri % 2 === 0 ? accent : light;
        ctx.fillRect(bx, by, blockSize - 1, blockSize - 1);
      }
    });
  });

  // Falling L-piece
  ctx.fillStyle = accent;
  const px = wellX + 20;
  const py = wellY + 35;
  ctx.fillRect(px, py, blockSize - 1, blockSize - 1);
  ctx.fillRect(px, py + blockSize, blockSize - 1, blockSize - 1);
  ctx.fillRect(px, py + blockSize * 2, blockSize - 1, blockSize - 1);
  ctx.fillRect(px + blockSize, py + blockSize * 2, blockSize - 1, blockSize - 1);

  // Right panel
  const panelX = 95;
  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SCORE', panelX, 32);
  ctx.fillStyle = accent;
  ctx.font = '7px monospace';
  ctx.fillText('024680', panelX, 42);

  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.fillText('LEVEL', panelX, 58);
  ctx.fillStyle = accent;
  ctx.fillText('05', panelX, 68);

  ctx.fillStyle = light;
  ctx.fillText('NEXT', panelX, 85);
  ctx.strokeStyle = light;
  ctx.lineWidth = 1;
  ctx.strokeRect(panelX, 88, 25, 18);

  // Demo label
  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('- DEMO -', cx, h - 6);
}

function drawPokemonShowcase(ctx: CanvasRenderingContext2D, w: number, h: number, colors: ShowcaseColors) {
  const { bg, light, dark, accent } = colors;
  const cx = w / 2;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = accent;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('POKEMON', cx, 18);
  ctx.fillStyle = light;
  ctx.font = '7px monospace';
  ctx.fillText('Crystal', cx, 30);

  // Enemy Pokemon (Pikachu-ish)
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.ellipse(115, 52, 12, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  // Ears
  ctx.beginPath();
  ctx.moveTo(105, 44);
  ctx.lineTo(108, 34);
  ctx.lineTo(113, 42);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(117, 42);
  ctx.lineTo(122, 34);
  ctx.lineTo(125, 44);
  ctx.fill();
  // Eyes
  ctx.fillStyle = dark;
  ctx.fillRect(110, 50, 3, 3);
  ctx.fillRect(117, 50, 3, 3);

  // Enemy HP
  ctx.fillStyle = light;
  ctx.font = '5px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('PIKACHU Lv25', 8, 42);
  ctx.fillStyle = dark;
  ctx.fillRect(8, 45, 55, 5);
  ctx.fillStyle = accent;
  ctx.fillRect(8, 45, 35, 5);

  // Player Pokemon (back)
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.ellipse(45, 82, 15, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(45, 68, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Player HP box
  ctx.strokeStyle = light;
  ctx.lineWidth = 1;
  ctx.strokeRect(80, 70, 70, 18);
  ctx.fillStyle = light;
  ctx.font = '5px monospace';
  ctx.fillText('TOTODILE', 83, 78);
  ctx.fillStyle = dark;
  ctx.fillRect(95, 80, 50, 4);
  ctx.fillStyle = accent;
  ctx.fillRect(95, 80, 40, 4);

  // Battle menu
  ctx.fillStyle = dark;
  ctx.fillRect(0, 100, w, 52);
  ctx.strokeStyle = light;
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 100, w, 52);
  ctx.beginPath();
  ctx.moveTo(80, 100);
  ctx.lineTo(80, 152);
  ctx.stroke();

  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('What will', 6, 115);
  ctx.fillText('TOTODILE do?', 6, 127);

  ctx.fillStyle = accent;
  ctx.fillText('FIGHT', 88, 115);
  ctx.fillText('PKMN', 128, 115);
  ctx.fillText('ITEM', 88, 132);
  ctx.fillText('RUN', 128, 132);
  ctx.fillText('>', 82, 115);
}

function drawSnakeShowcase(ctx: CanvasRenderingContext2D, w: number, h: number, colors: ShowcaseColors) {
  const { bg, light, dark, accent } = colors;
  const cx = w / 2;

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Title
  ctx.fillStyle = accent;
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SNAKE', cx, 20);
  ctx.font = '7px monospace';
  ctx.fillStyle = light;
  ctx.fillText('Classic', cx, 32);

  // Grid
  ctx.strokeStyle = dark;
  ctx.lineWidth = 0.3;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(20 + i * 10, 40);
    ctx.lineTo(20 + i * 10, 110);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(20, 40 + i * 6);
    ctx.lineTo(130, 40 + i * 6);
    ctx.stroke();
  }

  // Snake body
  const snakeSegments = [
    { x: 70, y: 70 },
    { x: 60, y: 70 },
    { x: 50, y: 70 },
    { x: 40, y: 70 },
    { x: 40, y: 76 },
  ];

  snakeSegments.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? accent : light;
    ctx.fillRect(seg.x, seg.y, 9, 5);
  });

  // Food
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(100, 85, 4, 0, Math.PI * 2);
  ctx.fill();

  // Score
  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SCORE: 40', 20, 125);

  // Demo label
  ctx.fillStyle = light;
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('- DEMO -', cx, h - 8);
}

export function NeoGeoPocket({
  className = '',
  activeCartridge = null,
  onCartridgeEject,
  soundEnabled = true,
}: NeoGeoPocketProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cartridgeState, setCartridgeState] = useState<CartridgeState>('empty');
  const [bootPhase, setBootPhase] = useState(0);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  // Sound effects
  const { playSound } = useRetroSounds({ enabled: soundEnabled, volume: 0.25 });

  // Handle cartridge insertion - Shows demo screen (no playable game, just showcase)
  useEffect(() => {
    if (activeCartridge) {
      // Start boot sequence
      setCartridgeState('booting');
      setBootPhase(0);
      playSound('click');

      // Boot animation → Showcase demo (stays here until manually changed)
      const bootSequence = [
        setTimeout(() => setBootPhase(1), 300),
        setTimeout(() => {
          setBootPhase(2);
          playSound('boot');
        }, 700),
        // Show showcase/demo screen - stays here indefinitely
        setTimeout(() => {
          setCartridgeState('showcase');
        }, 1200),
      ];

      return () => bootSequence.forEach(clearTimeout);
    } else {
      setCartridgeState('empty');
    }
  }, [activeCartridge, playSound]);

  const screenWidth = 160;
  const screenHeight = 152;

  // Decorative button press (doesn't do anything - console doesn't work!)
  const handleButtonPress = useCallback((button: string) => {
    if (cartridgeState === 'empty') return;
    playSound('click');
    setButtonPressed(button);
    setTimeout(() => setButtonPressed(null), 100);
  }, [cartridgeState, playSound]);

  // Render screen on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Neo Geo Pocket screen colors (bluish-green LCD)
    const bgColor = '#1a332e';
    const lightColor = '#2a4a42';
    const darkColor = '#0f1f1c';
    const accentColor = '#4ecdc4';

    // Clear screen
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    if (cartridgeState === 'empty') {
      // Static "off" screen with noise
      ctx.fillStyle = lightColor;
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      // Subtle noise pattern
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = `rgba(42, 74, 66, ${Math.random() * 0.4})`;
        ctx.fillRect(
          Math.random() * screenWidth,
          Math.random() * screenHeight,
          2,
          2
        );
      }

      // "Insert Cartridge" text
      ctx.fillStyle = darkColor;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('INSEREZ', screenWidth / 2, screenHeight / 2 - 8);
      ctx.fillText('CARTOUCHE', screenWidth / 2, screenHeight / 2 + 6);
      ctx.font = '7px monospace';
      ctx.fillStyle = accentColor;
      ctx.fillText('SNK', screenWidth / 2, screenHeight / 2 + 22);
      return;
    }

    if (cartridgeState === 'booting') {
      // Boot sequence animation
      if (bootPhase === 0) {
        // Flicker effect
        ctx.fillStyle = Math.random() > 0.5 ? bgColor : darkColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
      } else if (bootPhase === 1) {
        // SNK logo
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        ctx.fillStyle = accentColor;
        ctx.font = 'bold 18px serif';
        ctx.textAlign = 'center';
        ctx.fillText('SNK', screenWidth / 2, screenHeight / 2 - 5);
        ctx.font = '8px monospace';
        ctx.fillText('NEO GEO', screenWidth / 2, screenHeight / 2 + 15);
      } else {
        // Loading
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        ctx.fillStyle = accentColor;
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CHARGEMENT...', screenWidth / 2, screenHeight / 2);
      }
      return;
    }

    // Showcase mode - display demo screen for the cartridge
    if (cartridgeState === 'showcase' && activeCartridge) {
      const colors: ShowcaseColors = {
        bg: bgColor,
        light: lightColor,
        dark: darkColor,
        accent: accentColor,
      };

      switch (activeCartridge) {
        case 'zelda':
          drawZeldaShowcase(ctx, screenWidth, screenHeight, colors);
          break;
        case 'mario':
          drawMarioShowcase(ctx, screenWidth, screenHeight, colors);
          break;
        case 'tetris':
          drawTetrisShowcase(ctx, screenWidth, screenHeight, colors);
          break;
        case 'pokemon':
          drawPokemonShowcase(ctx, screenWidth, screenHeight, colors);
          break;
        case 'snake':
          drawSnakeShowcase(ctx, screenWidth, screenHeight, colors);
          break;
        default:
          // Generic demo for unknown cartridges
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, screenWidth, screenHeight);
          ctx.fillStyle = accentColor;
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('DEMO MODE', screenWidth / 2, screenHeight / 2);
      }
      return;
    }
  }, [cartridgeState, bootPhase, screenWidth, screenHeight, activeCartridge]);

  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Neo Geo Pocket Body - Same size as GameBoy for consistent carousel */}
      <div className="relative w-[320px] h-[540px] md:w-[340px] md:h-[580px] bg-[#2d2d3d] rounded-[20px] shadow-2xl">
        {/* Glowing Effect - active when cartridge is inserted */}
        <GlowingEffect
          blur={8}
          borderWidth={2}
          spread={30}
          glow={cartridgeState !== 'empty'}
          disabled={cartridgeState === 'empty'}
          proximity={80}
          inactiveZone={0.5}
        />

        {/* Top Ridge */}
        <div className="absolute top-0 left-4 right-4 h-2.5 bg-[#3d3d4d] rounded-t-lg" />

        {/* Screen Housing - Adjusted for larger body */}
        <motion.div
          className="absolute top-10 left-7 right-7 h-[220px] md:h-[240px] bg-[#1a1a2a] rounded-lg p-3"
          animate={{
            boxShadow:
              cartridgeState !== 'empty'
                ? 'inset 0 0 15px rgba(78, 205, 196, 0.2)'
                : 'none',
          }}
        >
          {/* Screen Bezel */}
          <div className="relative h-full bg-[#0f0f1a] rounded p-2">
            {/* Screen Label */}
            <div className="absolute -top-1 left-2 text-[5px] text-[#4a4a5a] font-bold tracking-wider">
              TFT COLOR LCD
            </div>

            {/* Power LED */}
            <motion.div
              className={`absolute top-2 -left-5 w-2 h-2 rounded-full transition-all duration-300 ${
                cartridgeState !== 'empty' ? 'bg-green-500' : 'bg-[#1a1a1a]'
              }`}
              animate={{
                boxShadow:
                  cartridgeState !== 'empty'
                    ? ['0 0 8px #22c55e', '0 0 12px #22c55e', '0 0 8px #22c55e']
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

        {/* SNK Branding - Adjusted for larger body */}
        <div className="absolute top-[270px] md:top-[295px] left-1/2 -translate-x-1/2 text-center">
          <div className="text-[#e94560] font-bold text-xl tracking-wider">
            SNK
          </div>
          <div className="text-[#8a8a9a] font-bold text-sm tracking-widest mt-0.5">
            NEO GEO POCKET
          </div>
          <div className="text-[#6a6a7a] text-[10px] tracking-wider">
            COLOR
          </div>
        </div>

        {/* Joystick (instead of D-Pad) - Adjusted for larger body */}
        <div className="absolute top-[340px] md:top-[365px] left-8">
          <div className="relative w-[70px] h-[70px] md:w-[75px] md:h-[75px]">
            {/* Joystick base */}
            <div className="absolute inset-0 bg-[#1a1a2a] rounded-full border-4 border-[#3d3d4d]" />
            {/* Joystick stick */}
            <motion.button
              onClick={() => handleButtonPress('STICK')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] md:w-[44px] md:h-[44px] bg-[#4d4d5d] rounded-full border-2 border-[#5d5d6d] shadow-lg cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === 'STICK' ? 0.95 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Joystick"
            />
          </div>
        </div>

        {/* A/B Buttons - Adjusted for larger body */}
        <div className="absolute top-[350px] md:top-[375px] right-7 flex gap-4">
          <div className="flex flex-col items-center">
            <motion.button
              onClick={() => handleButtonPress('B')}
              className="w-[40px] h-[40px] md:w-[44px] md:h-[44px] bg-[#e94560] rounded-full shadow-lg border-2 border-[#c93550] cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === 'B' ? 0.9 : 1,
                backgroundColor: buttonPressed === 'B' ? '#d93550' : '#e94560',
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="B Button"
            />
            <span className="text-[8px] text-[#6a6a7a] font-bold mt-1">B</span>
          </div>
          <div className="flex flex-col items-center -mt-4">
            <motion.button
              onClick={() => handleButtonPress('A')}
              className="w-[40px] h-[40px] md:w-[44px] md:h-[44px] bg-[#e94560] rounded-full shadow-lg border-2 border-[#c93550] cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === 'A' ? 0.9 : 1,
                backgroundColor: buttonPressed === 'A' ? '#d93550' : '#e94560',
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="A Button"
            />
            <span className="text-[8px] text-[#6a6a7a] font-bold mt-1">A</span>
          </div>
        </div>

        {/* Option/Start Buttons - Adjusted for larger body */}
        <div className="absolute top-[455px] md:top-[485px] left-1/2 -translate-x-1/2 flex gap-8">
          <div className="flex flex-col items-center">
            <motion.button
              onClick={() => handleButtonPress('OPTION')}
              className="w-[32px] h-[10px] bg-[#4a4a5a] rounded-full shadow-inner cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === 'OPTION' ? 0.9 : 1,
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Option"
            />
            <span className="text-[6px] text-[#5a5a6a] font-bold mt-1.5">
              OPTION
            </span>
          </div>
          <div className="flex flex-col items-center">
            <motion.button
              onClick={() => handleButtonPress('START')}
              className="w-[32px] h-[10px] bg-[#4a4a5a] rounded-full shadow-inner cursor-pointer touch-manipulation"
              animate={{
                scale: buttonPressed === 'START' ? 0.9 : 1,
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Start"
            />
            <span className="text-[6px] text-[#5a5a6a] font-bold mt-1.5">
              START
            </span>
          </div>
        </div>

        {/* Volume slider (decorative) */}
        <div className="absolute bottom-7 left-7 flex items-center gap-2">
          <span className="text-[5px] text-[#4a4a5a] font-bold">VOL</span>
          <div className="w-[40px] h-[6px] bg-[#1a1a2a] rounded-full">
            <div className="w-[20px] h-full bg-[#4a4a5a] rounded-full" />
          </div>
        </div>

        {/* Speaker grills */}
        <div className="absolute bottom-7 right-7 flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-1">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="w-[4px] h-[8px] bg-[#1a1a2a] rounded-full"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-5 right-5 h-8 bg-black/20 blur-xl rounded-full" />
    </motion.div>
  );
}
