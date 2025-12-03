'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { isCartridgeCompatible } from '@/data/cartridges';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { GlowingEffect } from '@/components/ui/GlowingEffect';

import { GameBoyScreen } from './GameBoyScreen';
import { DPad, ActionButtons, StartSelectButtons, SpeakerGrills } from './GameBoyControls';
import type { Position, Direction, CartridgeState, GameBoyProps } from './types';
import {
  GRID_SIZE,
  INITIAL_SPEED,
  SPEED_INCREMENT,
  MAX_SPEED_REDUCTION,
  TIMING,
  INITIAL_SNAKE_POSITION,
  INITIAL_FOOD_POSITION,
  INITIAL_DIRECTION,
} from '@/constants/game';

/**
 * GameBoy - Main component for the interactive Game Boy console
 *
 * Features:
 * - Canvas-based Snake game rendering
 * - Cartridge insertion with boot sequence
 * - Showcase screens for non-snake cartridges
 * - Full button controls (D-pad, A/B, Start/Select)
 * - Keyboard support
 * - Retro sound effects
 *
 * @example
 * ```tsx
 * <GameBoy
 *   activeCartridge={insertedCartridge}
 *   onCartridgeEject={handleEject}
 *   soundEnabled={true}
 * />
 * ```
 */
export function GameBoy({
  className = '',
  asImage = false,
  activeCartridge = null,
  onCartridgeEject,
  soundEnabled = true,
}: GameBoyProps) {
  // Game state
  const [snake, setSnake] = useState<Position[]>([INITIAL_SNAKE_POSITION]);
  const [food, setFood] = useState<Position>(INITIAL_FOOD_POSITION);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // UI state
  const [discovered, setDiscovered] = useState(false);
  const [cartridgeState, setCartridgeState] = useState<CartridgeState>('empty');
  const [bootPhase, setBootPhase] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  // Refs
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const prevScoreRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sound effects
  const { playSound } = useRetroSounds({ enabled: soundEnabled, volume: 0.25 });

  // Generate random food position
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

  // Reset game state
  const resetGame = useCallback(() => {
    setSnake([INITIAL_SNAKE_POSITION]);
    setFood(INITIAL_FOOD_POSITION);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setIsActive(true);
  }, []);

  // Handle cartridge insertion
  // Boot sequence effect - intentionally triggers state transitions in response to cartridge changes
  useEffect(() => {
    if (activeCartridge) {
      const compatible = isCartridgeCompatible(activeCartridge);

      if (compatible) {
        // Snake cartridge - boot the game!
        setCartridgeState('booting');
        setBootPhase(0);

        const bootSequence = [
          setTimeout(() => setBootPhase(1), TIMING.bootPhase1Delay),
          setTimeout(() => {
            setBootPhase(2);
            playSound('boot');
          }, TIMING.bootPhase2Delay),
          setTimeout(() => {
            setCartridgeState('ready');
            setDiscovered(true);
            setGameStarted(false);
            setGameOver(false);
            resetGame();
          }, TIMING.bootCompleteDelay),
        ];

        return () => bootSequence.forEach(clearTimeout);
      } else {
        // Non-snake cartridge - show showcase demo screen
        setCartridgeState('booting');
        setBootPhase(0);

        const showcaseSequence = [
          setTimeout(() => setBootPhase(1), TIMING.bootPhase1Delay),
          setTimeout(() => {
            setBootPhase(2);
            playSound('boot');
          }, TIMING.bootPhase2Delay),
          setTimeout(() => {
            setCartridgeState('showcase');
          }, TIMING.bootCompleteDelay),
        ];

        return () => showcaseSequence.forEach(clearTimeout);
      }
    } else {
      // No cartridge
      setCartridgeState('empty');
      setDiscovered(false);
      setGameStarted(false);
      setIsActive(false);
    }
  }, [activeCartridge, playSound, resetGame]);

  // D-Pad button handlers - visual feedback for all cartridges, game control only for Snake
  const handleDPadPress = useCallback((dir: Direction) => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges (hides which one is special)
    setButtonPressed(dir);
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);

    // Only Snake cartridge actually controls the game
    if (cartridgeState !== 'ready') return;

    if (!gameStarted && !gameOver) {
      setGameStarted(true);
      setIsActive(true);
      playSound('start');
    }

    if (gameOver || isPaused) return;

    // Prevent 180-degree turns
    const opposites: Record<Direction, Direction> = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT',
    };

    if (dir !== opposites[directionRef.current]) {
      setDirection(dir);
      directionRef.current = dir;
    }
  }, [cartridgeState, gameStarted, gameOver, isPaused, playSound]);

  // A button handler - visual feedback for all cartridges, game control only for Snake
  const handleAPress = useCallback(() => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges
    setButtonPressed('A');
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);

    // Only Snake cartridge actually controls the game
    if (cartridgeState !== 'ready') return;

    if (gameOver) {
      playSound('start');
      resetGame();
    } else if (!gameStarted) {
      playSound('start');
      setGameStarted(true);
      setIsActive(true);
    }
  }, [cartridgeState, gameOver, gameStarted, playSound, resetGame]);

  // B button handler - visual feedback for all cartridges
  const handleBPress = useCallback(() => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges
    setButtonPressed('B');
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);
  }, [cartridgeState]);

  // START button handler - visual feedback for all cartridges, game control only for Snake
  const handleStartPress = useCallback(() => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges
    setButtonPressed('START');
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);

    // Only Snake cartridge actually controls the game
    if (cartridgeState !== 'ready') return;

    if (!gameStarted) {
      playSound('start');
      setGameStarted(true);
      setIsActive(true);
      setIsPaused(false);
    } else if (gameOver) {
      playSound('start');
      resetGame();
      setIsPaused(false);
    } else {
      setIsPaused(prev => {
        if (prev) {
          playSound('start');
        }
        return !prev;
      });
    }
  }, [cartridgeState, gameStarted, gameOver, playSound, resetGame]);

  // SELECT button handler - visual feedback for all cartridges, game control only for Snake
  const handleSelectPress = useCallback(() => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges
    setButtonPressed('SELECT');
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);

    // Only Snake cartridge actually controls the game
    if (cartridgeState !== 'ready') return;

    if (gameStarted || gameOver) {
      playSound('error');
      setGameStarted(false);
      setGameOver(false);
      setIsActive(false);
      setIsPaused(false);
      setScore(0);
      setSnake([INITIAL_SNAKE_POSITION]);
      setFood(INITIAL_FOOD_POSITION);
      setDirection(INITIAL_DIRECTION);
      directionRef.current = INITIAL_DIRECTION;
    }
  }, [cartridgeState, gameStarted, gameOver, playSound]);

  // Play eat sound when score increases
  useEffect(() => {
    if (score > prevScoreRef.current && gameStarted) {
      playSound('eat');
    }
    prevScoreRef.current = score;
  }, [score, gameStarted, playSound]);

  // Play game over sound and shake screen - intentional visual feedback
  useEffect(() => {
    if (gameOver && gameStarted) {
      playSound('gameOver');
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), TIMING.screenShakeDuration);
    }
  }, [gameOver, gameStarted, playSound]);

  // Keyboard controls - respond to all cartridges for visual feedback
  useEffect(() => {
    // No keyboard response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter', 'Escape'].includes(e.key)) {
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
        case 'Escape':
        case 'p':
        case 'P':
          handleStartPress();
          break;
        case 'r':
        case 'R':
          handleSelectPress();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cartridgeState, handleDPadPress, handleAPress, handleStartPress, handleSelectPress]);

  // Game loop
  useEffect(() => {
    if (!isActive || !gameStarted || gameOver || isPaused) return;

    const speed = INITIAL_SPEED - Math.min(score * SPEED_INCREMENT, MAX_SPEED_REDUCTION);

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

        // Wrap around walls
        if (head.x < 0) head.x = GRID_SIZE - 1;
        if (head.x >= GRID_SIZE) head.x = 0;
        if (head.y < 0) head.y = GRID_SIZE - 1;
        if (head.y >= GRID_SIZE) head.y = 0;

        // Self collision
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
    }, speed);

    return () => clearInterval(gameLoop);
  }, [isActive, gameStarted, gameOver, isPaused, food, generateFood, score]);

  // Controls only disabled when no cartridge or booting (allows visual feedback for showcase)
  const controlsDisabled = cartridgeState === 'empty' || cartridgeState === 'booting';

  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        x: screenShake ? [0, -5, 5, -5, 5, 0] : 0,
        rotate: screenShake ? [0, -1, 1, -1, 1, 0] : 0,
      }}
      transition={{
        duration: screenShake ? 0.4 : 0.6,
        x: { duration: 0.4, ease: 'easeInOut' },
        rotate: { duration: 0.4, ease: 'easeInOut' },
      }}
    >
      {/* Game Boy Body */}
      <div className="relative w-[320px] h-[540px] md:w-[340px] md:h-[580px] bg-[#c4c4b4] rounded-[24px] rounded-br-[70px] shadow-2xl">

        {/* Glowing Effect when game is active */}
        <GlowingEffect
          blur={10}
          borderWidth={2}
          spread={40}
          glow={cartridgeState === 'ready' && gameStarted}
          disabled={cartridgeState !== 'ready' || !gameStarted}
          proximity={100}
          inactiveZone={0.5}
        />

        {/* Top Ridge */}
        <div className="absolute top-0 left-5 right-5 h-3 bg-[#a8a898] rounded-t-lg" />

        {/* Screen Housing */}
        <motion.div
          className="absolute top-10 left-7 right-7 h-[220px] md:h-[240px] bg-[#5c5856] rounded-lg p-3"
          animate={{
            boxShadow: cartridgeState === 'ready'
              ? 'inset 0 0 20px rgba(155, 188, 15, 0.3)'
              : 'none'
          }}
        >
          {/* Screen Bezel */}
          <div className="relative h-full bg-[#4a4848] rounded p-2">
            {/* DOT MATRIX Label - hidden during gameplay to show score */}
            {!(cartridgeState === 'ready' && gameStarted && !gameOver && !isPaused) && (
              <div className="absolute -top-1 left-2 text-[7px] text-[#2d2d2d] font-bold tracking-wider drop-shadow-sm">
                DOT MATRIX WITH STEREO SOUND
              </div>
            )}

            {/* Score display - shown during active gameplay */}
            {cartridgeState === 'ready' && gameStarted && !gameOver && !isPaused && (
              <div className="absolute -top-1 left-2 right-2 flex justify-between items-center">
                <span className="text-[9px] text-[#1a1a1a] font-bold font-mono drop-shadow-sm">
                  SCORE:{score}
                </span>
                <span className="text-[7px] text-[#2d2d2d] font-bold font-mono">
                  SNAKE
                </span>
              </div>
            )}

            {/* Power LED */}
            <motion.div
              className={`absolute top-2 -left-6 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                cartridgeState === 'ready' || cartridgeState === 'booting' || cartridgeState === 'showcase'
                  ? 'bg-red-600'
                  : 'bg-[#4a0000]'
              }`}
              animate={{
                boxShadow: cartridgeState === 'ready' || cartridgeState === 'booting' || cartridgeState === 'showcase'
                  ? ['0 0 10px #dc2626', '0 0 15px #dc2626', '0 0 10px #dc2626']
                  : 'none'
              }}
              transition={{
                repeat: cartridgeState === 'ready' || cartridgeState === 'showcase' ? Infinity : 0,
                duration: 1.5
              }}
            />
            <div className="absolute top-5 -left-9 text-[5px] text-[#8b8b7a] font-bold rotate-[-90deg]">
              BATTERY
            </div>

            {/* Screen Canvas */}
            <GameBoyScreen
              snake={snake}
              food={food}
              score={score}
              gameStarted={gameStarted}
              gameOver={gameOver}
              isPaused={isPaused}
              discovered={discovered}
              cartridgeState={cartridgeState}
              bootPhase={bootPhase}
              activeCartridge={activeCartridge}
              canvasRef={canvasRef}
            />
          </div>
        </motion.div>

        {/* Nintendo Logo Area */}
        <div className="absolute top-[270px] md:top-[295px] left-1/2 -translate-x-1/2">
          <div className="text-[#6c6c6b] font-bold text-lg tracking-wider italic text-center">
            Nintendo
          </div>
          <div className="text-center text-[#4a4a4a] font-bold text-xl tracking-widest mt-0.5">
            GAME BOY<span className="text-[#2196f3] text-sm align-top ml-0.5">™</span>
          </div>
        </div>

        {/* D-Pad */}
        <div className="absolute top-[340px] md:top-[365px] left-8">
          <DPad
            onPress={handleDPadPress}
            buttonPressed={buttonPressed}
            disabled={controlsDisabled}
          />
        </div>

        {/* A/B Buttons */}
        <div className="absolute top-[350px] md:top-[375px] right-7">
          <ActionButtons
            onAPress={handleAPress}
            onBPress={handleBPress}
            buttonPressed={buttonPressed}
            disabled={controlsDisabled}
          />
        </div>

        {/* Start/Select Buttons */}
        <div className="absolute top-[455px] md:top-[485px] left-1/2 -translate-x-1/2">
          <StartSelectButtons
            onStartPress={handleStartPress}
            onSelectPress={handleSelectPress}
            buttonPressed={buttonPressed}
            disabled={controlsDisabled}
          />
        </div>

        {/* Speaker Grills */}
        <div className="absolute bottom-7 right-7">
          <SpeakerGrills />
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-6 right-6 h-10 bg-black/20 blur-xl rounded-full" />
    </motion.div>
  );
}

// Re-export types for consumers
export type { GameBoyProps, Position, Direction, CartridgeState } from './types';
