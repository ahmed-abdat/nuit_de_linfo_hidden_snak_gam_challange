'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface GameBoyProps {
  className?: string;
  asImage?: boolean; // When true, looks completely static like an image
  activeCartridge?: string | null; // Controls which cartridge is inserted
  onCartridgeEject?: () => void; // Callback when cartridge is ejected
}

const GRID_SIZE = 16;
const INITIAL_SPEED = 200; // Slower for better playability

type CartridgeState = 'empty' | 'incompatible' | 'booting' | 'ready';

export function GameBoy({ className = '', asImage = false, activeCartridge = null, onCartridgeEject }: GameBoyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const [cartridgeState, setCartridgeState] = useState<CartridgeState>('empty');
  const [bootPhase, setBootPhase] = useState(0);
  const directionRef = useRef<Direction>('RIGHT');

  // Handle cartridge insertion
  useEffect(() => {
    if (activeCartridge === 'prototype-483') {
      // Secret cartridge - boot sequence then Snake game
      setCartridgeState('booting');
      setBootPhase(0);

      // Boot sequence animation
      const bootSequence = [
        setTimeout(() => setBootPhase(1), 300),
        setTimeout(() => setBootPhase(2), 800),
        setTimeout(() => {
          setCartridgeState('ready');
          setDiscovered(true);
          setGameStarted(false);
          setGameOver(false);
          resetGame();
        }, 1500),
      ];

      return () => bootSequence.forEach(clearTimeout);
    } else if (activeCartridge) {
      // Other cartridges show error
      setCartridgeState('incompatible');
      setDiscovered(false);
      setGameStarted(false);
    } else {
      // No cartridge
      setCartridgeState('empty');
      setDiscovered(false);
      setGameStarted(false);
      setIsActive(false);
    }
  }, [activeCartridge]);

  const screenWidth = 160;
  const screenHeight = 144;
  const cellWidth = screenWidth / GRID_SIZE;
  const cellHeight = screenHeight / GRID_SIZE;

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setIsActive(true);
  }, []);

  // D-Pad button handlers - this is the secret!
  const handleDPadPress = (dir: Direction) => {
    // Secret discovery - pressing D-pad activates the game!
    if (!discovered) {
      setDiscovered(true);
    }

    if (!gameStarted && !gameOver) {
      setGameStarted(true);
      setIsActive(true);
    }

    if (gameOver) return;

    // Prevent 180-degree turns
    if (dir === 'UP' && directionRef.current !== 'DOWN') {
      setDirection('UP');
      directionRef.current = 'UP';
    } else if (dir === 'DOWN' && directionRef.current !== 'UP') {
      setDirection('DOWN');
      directionRef.current = 'DOWN';
    } else if (dir === 'LEFT' && directionRef.current !== 'RIGHT') {
      setDirection('LEFT');
      directionRef.current = 'LEFT';
    } else if (dir === 'RIGHT' && directionRef.current !== 'LEFT') {
      setDirection('RIGHT');
      directionRef.current = 'RIGHT';
    }
  };

  // A button restarts, B button does nothing visible
  const handleAPress = () => {
    if (!discovered) setDiscovered(true);
    if (gameOver) {
      resetGame();
    } else if (!gameStarted) {
      setGameStarted(true);
      setIsActive(true);
    }
  };

  const handleStartPress = () => {
    if (!discovered) setDiscovered(true);
    if (!gameStarted) {
      setGameStarted(true);
      setIsActive(true);
    } else if (gameOver) {
      resetGame();
    }
  };

  // Keyboard controls (once discovered)
  useEffect(() => {
    if (!discovered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent page scrolling for game controls
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handleDPadPress('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          handleDPadPress('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          handleDPadPress('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          handleDPadPress('RIGHT');
          break;
        case ' ':
        case 'Enter':
          handleAPress();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [discovered, gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!isActive || !gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const head = { ...currentSnake[0] };

        switch (directionRef.current) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Wrap around walls (no wall collision death)
        if (head.x < 0) head.x = GRID_SIZE - 1;
        if (head.x >= GRID_SIZE) head.x = 0;
        if (head.y < 0) head.y = GRID_SIZE - 1;
        if (head.y >= GRID_SIZE) head.y = 0;

        // Self collision (only way to die)
        if (currentSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        const newSnake = [head, ...currentSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED - Math.min(score * 0.5, 80)); // Gradual speed increase

    return () => clearInterval(gameLoop);
  }, [isActive, gameStarted, gameOver, food, generateFood, score]);

  // Render game on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game Boy green colors
    const bgColor = '#9bbc0f';
    const lightGreen = '#8bac0f';
    const darkGreen = '#306230';
    const darkestGreen = '#0f380f';

    // Clear with Game Boy green
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, screenWidth, screenHeight);

    // Handle different cartridge states
    if (cartridgeState === 'empty') {
      // Show static "off" screen - looks like a decorative image
      ctx.fillStyle = lightGreen;
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      // Subtle noise pattern to look like old LCD
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(139, 172, 15, ${Math.random() * 0.3})`;
        ctx.fillRect(
          Math.random() * screenWidth,
          Math.random() * screenHeight,
          2, 2
        );
      }

      // "Insert Cartridge" hint
      ctx.fillStyle = darkGreen;
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('INSEREZ', screenWidth / 2, screenHeight / 2 - 5);
      ctx.fillText('CARTOUCHE', screenWidth / 2, screenHeight / 2 + 8);
      return;
    }

    if (cartridgeState === 'incompatible') {
      // Error screen for wrong cartridge
      ctx.fillStyle = darkestGreen;
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      ctx.fillStyle = bgColor;
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ERREUR', screenWidth / 2, screenHeight / 2 - 15);
      ctx.fillText('CARTOUCHE', screenWidth / 2, screenHeight / 2 + 5);
      ctx.font = '8px monospace';
      ctx.fillText('Non compatible', screenWidth / 2, screenHeight / 2 + 22);
      return;
    }

    if (cartridgeState === 'booting') {
      // Boot sequence animation
      if (bootPhase === 0) {
        // Flicker effect
        ctx.fillStyle = Math.random() > 0.5 ? bgColor : darkestGreen;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
      } else if (bootPhase === 1) {
        // Nintendo-style logo
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        ctx.fillStyle = darkestGreen;
        ctx.font = 'bold 14px serif';
        ctx.textAlign = 'center';
        ctx.fillText('PROJET', screenWidth / 2, screenHeight / 2 - 10);
        ctx.fillText('483', screenWidth / 2, screenHeight / 2 + 15);
      } else {
        // Loading
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        ctx.fillStyle = darkestGreen;
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CHARGEMENT...', screenWidth / 2, screenHeight / 2);
      }
      return;
    }

    if (!discovered) {
      // Fallback for old behavior (button press discovery)
      ctx.fillStyle = lightGreen;
      ctx.fillRect(0, 0, screenWidth, screenHeight);

      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(139, 172, 15, ${Math.random() * 0.3})`;
        ctx.fillRect(
          Math.random() * screenWidth,
          Math.random() * screenHeight,
          2, 2
        );
      }
      return;
    }

    // Draw grid pattern (subtle)
    ctx.strokeStyle = lightGreen;
    ctx.lineWidth = 0.3;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, screenHeight);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(screenWidth, i * cellHeight);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = darkestGreen;
    ctx.beginPath();
    ctx.arc(
      food.x * cellWidth + cellWidth / 2,
      food.y * cellHeight + cellHeight / 2,
      cellWidth / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? darkestGreen : darkGreen;
      ctx.fillRect(
        segment.x * cellWidth + 1,
        segment.y * cellHeight + 1,
        cellWidth - 2,
        cellHeight - 2
      );
    });

    // Start screen (after discovery, before game start)
    if (!gameStarted && !gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.7)';
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      ctx.fillStyle = bgColor;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PROJET 483', screenWidth / 2, screenHeight / 2 - 20);
      ctx.font = '10px monospace';
      ctx.fillText('USAGE INTERNE', screenWidth / 2, screenHeight / 2);
      ctx.font = '8px monospace';
      ctx.fillText('Appuyez START', screenWidth / 2, screenHeight / 2 + 18);
    }

    // Game over screen
    if (gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.85)';
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      ctx.fillStyle = bgColor;
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('DONNEES', screenWidth / 2, screenHeight / 2 - 20);
      ctx.fillText('CORROMPUES', screenWidth / 2, screenHeight / 2 - 5);
      ctx.font = '10px monospace';
      ctx.fillText(`Score: ${score}`, screenWidth / 2, screenHeight / 2 + 12);
      ctx.font = '8px monospace';
      ctx.fillText('A = Rejouer', screenWidth / 2, screenHeight / 2 + 28);
    }

  }, [snake, food, screenWidth, screenHeight, cellWidth, cellHeight, gameStarted, gameOver, score, discovered, cartridgeState, bootPhase]);

  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Game Boy Body - Larger for better mobile interaction */}
      <div className="relative w-[320px] h-[540px] md:w-[340px] md:h-[580px] bg-[#c4c4b4] rounded-[24px] rounded-br-[70px] shadow-2xl">

        {/* Top Ridge */}
        <div className="absolute top-0 left-5 right-5 h-3 bg-[#a8a898] rounded-t-lg" />

        {/* Screen Housing */}
        <div className="absolute top-10 left-7 right-7 h-[220px] md:h-[240px] bg-[#5c5856] rounded-lg p-3">
          {/* Screen Bezel */}
          <div className="relative h-full bg-[#4a4848] rounded p-2">
            {/* DOT MATRIX Label */}
            <div className="absolute -top-1 left-2 text-[6px] text-[#5c5d5c] font-bold tracking-wider">
              DOT MATRIX WITH STEREO SOUND
            </div>

            {/* Power LED - glows based on cartridge state */}
            <div
              className={`absolute top-2 -left-6 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                cartridgeState === 'ready' || cartridgeState === 'booting'
                  ? 'bg-red-600 shadow-[0_0_10px_#dc2626]'
                  : cartridgeState === 'incompatible'
                  ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b] animate-pulse'
                  : 'bg-[#4a0000]'
              }`}
            />
            <div className="absolute top-5 -left-9 text-[5px] text-[#8b8b7a] font-bold rotate-[-90deg]">
              BATTERY
            </div>

            {/* Actual Screen - Canvas */}
            <canvas
              ref={canvasRef}
              width={screenWidth}
              height={screenHeight}
              className="w-full h-full rounded"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>

        {/* Nintendo Logo Area */}
        <div className="absolute top-[270px] md:top-[295px] left-1/2 -translate-x-1/2">
          <div className="text-[#6c6c6b] font-bold text-lg tracking-wider italic text-center">
            Nintendo
          </div>
          <div className="text-center text-[#4a4a4a] font-bold text-xl tracking-widest mt-0.5">
            GAME BOY<span className="text-[#2196f3] text-sm align-top ml-0.5">™</span>
          </div>
        </div>

        {/* D-Pad - LARGER FOR MOBILE! */}
        <div className="absolute top-[340px] md:top-[365px] left-8">
          <div className="relative w-[90px] h-[90px] md:w-[95px] md:h-[95px]">
            {/* Up Button */}
            <button
              onClick={() => handleDPadPress('UP')}
              onTouchStart={(e) => { e.preventDefault(); handleDPadPress('UP'); }}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#2c2c2c] rounded-t-sm hover:bg-[#3c3c3c] active:bg-[#1c1c1c] active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="Up"
            />
            {/* Down Button */}
            <button
              onClick={() => handleDPadPress('DOWN')}
              onTouchStart={(e) => { e.preventDefault(); handleDPadPress('DOWN'); }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#2c2c2c] rounded-b-sm hover:bg-[#3c3c3c] active:bg-[#1c1c1c] active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="Down"
            />
            {/* Left Button */}
            <button
              onClick={() => handleDPadPress('LEFT')}
              onTouchStart={(e) => { e.preventDefault(); handleDPadPress('LEFT'); }}
              className="absolute top-1/2 -translate-y-1/2 left-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#2c2c2c] rounded-l-sm hover:bg-[#3c3c3c] active:bg-[#1c1c1c] active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="Left"
            />
            {/* Right Button */}
            <button
              onClick={() => handleDPadPress('RIGHT')}
              onTouchStart={(e) => { e.preventDefault(); handleDPadPress('RIGHT'); }}
              className="absolute top-1/2 -translate-y-1/2 right-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#2c2c2c] rounded-r-sm hover:bg-[#3c3c3c] active:bg-[#1c1c1c] active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="Right"
            />
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#2c2c2c]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-[#1a1a1a] rounded-full pointer-events-none" />
          </div>
        </div>

        {/* A/B Buttons - LARGER FOR MOBILE! */}
        <div className="absolute top-[350px] md:top-[375px] right-7 flex gap-4 -rotate-[25deg]">
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                if (!discovered) setDiscovered(true);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                if (!discovered) setDiscovered(true);
              }}
              className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] bg-[#9c1b4d] rounded-full shadow-lg border-2 border-[#7a1540] hover:bg-[#ac2b5d] active:bg-[#8c0b3d] active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="B Button"
            />
            <span className="text-[9px] text-[#4a4a4a] font-bold mt-1">B</span>
          </div>
          <div className="flex flex-col items-center -mt-5">
            <button
              onClick={handleAPress}
              onTouchStart={(e) => { e.preventDefault(); handleAPress(); }}
              className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] bg-[#9c1b4d] rounded-full shadow-lg border-2 border-[#7a1540] hover:bg-[#ac2b5d] active:bg-[#8c0b3d] active:scale-95 transition-all cursor-pointer touch-manipulation"
              aria-label="A Button"
            />
            <span className="text-[9px] text-[#4a4a4a] font-bold mt-1">A</span>
          </div>
        </div>

        {/* Select/Start Buttons - LARGER FOR MOBILE! */}
        <div className="absolute top-[455px] md:top-[485px] left-1/2 -translate-x-1/2 flex gap-8">
          <div className="flex flex-col items-center">
            <button
              onClick={() => {
                if (!discovered) setDiscovered(true);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                if (!discovered) setDiscovered(true);
              }}
              className="w-[36px] h-[10px] bg-[#6c6c6b] rounded-full shadow-inner -rotate-[25deg] hover:bg-[#7c7c7b] active:bg-[#5c5c5b] transition-colors cursor-pointer touch-manipulation"
              aria-label="Select"
            />
            <span className="text-[7px] text-[#4a4a4a] font-bold mt-2">SELECT</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={handleStartPress}
              onTouchStart={(e) => { e.preventDefault(); handleStartPress(); }}
              className="w-[36px] h-[10px] bg-[#6c6c6b] rounded-full shadow-inner -rotate-[25deg] hover:bg-[#7c7c7b] active:bg-[#5c5c5b] transition-colors cursor-pointer touch-manipulation"
              aria-label="Start"
            />
            <span className="text-[7px] text-[#4a4a4a] font-bold mt-2">START</span>
          </div>
        </div>

        {/* Speaker Grills */}
        <div className="absolute bottom-7 right-7 flex flex-col gap-1.5 -rotate-[25deg]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-1.5">
              {[...Array(i < 3 ? i + 1 : 6 - i)].map((_, j) => (
                <div key={j} className="w-[5px] h-[12px] bg-[#4a4a4a] rounded-full" />
              ))}
            </div>
          ))}
        </div>

        {/* Score display - shows when playing */}
        {discovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
          >
            <span className="text-sm font-semibold text-gray-700">
              Score: <span className="text-emerald-600">{score}</span>
            </span>
          </motion.div>
        )}

      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-6 right-6 h-10 bg-black/20 blur-xl rounded-full" />
    </motion.div>
  );
}
