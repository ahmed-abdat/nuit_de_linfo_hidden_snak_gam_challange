'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { isCartridgeCompatible } from '@/data/cartridges';
import { useRetroSounds } from '@/hooks/useRetroSounds';
import { GlowingEffect } from '@/components/ui/GlowingEffect';

import { GameBoyScreen } from './GameBoyScreen';
import { DPad, ActionButtons, StartSelectButtons, SpeakerGrills } from './GameBoyControls';
import type { Position, Direction, CartridgeState, GameBoyProps, Difficulty, GameScreen, Obstacle, ScorePopup } from './types';
import {
  GRID_SIZE,
  TIMING,
  INITIAL_SNAKE_POSITION,
  INITIAL_FOOD_POSITION,
  INITIAL_DIRECTION,
  DIFFICULTY_LEVELS,
  DIFFICULTY_ORDER,
  EFFECTS,
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

  // Enhanced game features
  const [difficulty, setDifficulty] = useState<Difficulty>('NORMAL');
  const [gameScreen, setGameScreen] = useState<GameScreen>('title');
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [lastObstacleScore, setLastObstacleScore] = useState(0);

  // UI state
  const [discovered, setDiscovered] = useState(false);
  const [cartridgeState, setCartridgeState] = useState<CartridgeState>('empty');
  const [bootPhase, setBootPhase] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  // Refs
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const prevScoreRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sound effects
  const { playSound } = useRetroSounds({ enabled: soundEnabled, volume: 0.25 });

  // Generate random food position (avoid snake and obstacles)
  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
      obstacles.some(obs => obs.x === newFood.x && obs.y === newFood.y)
    );
    return newFood;
  }, [snake, obstacles]);

  // Generate random obstacle position (avoid snake, food, and existing obstacles)
  const generateObstacle = useCallback((): Obstacle | null => {
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const newObs: Obstacle = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };

      // Check it doesn't overlap with snake, food, or existing obstacles
      const overlapsSnake = snake.some(seg => seg.x === newObs.x && seg.y === newObs.y);
      const overlapsFood = food.x === newObs.x && food.y === newObs.y;
      const overlapsObstacle = obstacles.some(obs => obs.x === newObs.x && obs.y === newObs.y);

      // Also avoid spawning too close to snake head (give player reaction time)
      const head = snake[0];
      const tooCloseToHead = Math.abs(head.x - newObs.x) <= 2 && Math.abs(head.y - newObs.y) <= 2;

      if (!overlapsSnake && !overlapsFood && !overlapsObstacle && !tooCloseToHead) {
        return newObs;
      }

      attempts++;
    }

    return null; // Couldn't find valid position
  }, [snake, food, obstacles]);

  // Reset game state (keeps current difficulty)
  const resetGame = useCallback(() => {
    setSnake([INITIAL_SNAKE_POSITION]);
    setFood(INITIAL_FOOD_POSITION);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setScorePopups([]);
    setLastObstacleScore(0);
    setGameStarted(true);
    setIsActive(true);
    setGameScreen('playing');
  }, []);

  // Go back to difficulty menu
  const goToMenu = useCallback(() => {
    setSnake([INITIAL_SNAKE_POSITION]);
    setFood(INITIAL_FOOD_POSITION);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setScorePopups([]);
    setLastObstacleScore(0);
    setGameStarted(false);
    setIsActive(false);
    setIsPaused(false);
    setGameScreen('difficulty');
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
            setGameScreen('difficulty'); // Show difficulty menu first
            setObstacles([]);
            setScorePopups([]);
            setLastObstacleScore(0);
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

    // Handle difficulty menu navigation
    if (gameScreen === 'difficulty') {
      if (dir === 'UP' || dir === 'DOWN') {
        playSound('select');
        setDifficulty(current => {
          const currentIndex = DIFFICULTY_ORDER.indexOf(current);
          if (dir === 'UP') {
            return DIFFICULTY_ORDER[(currentIndex - 1 + DIFFICULTY_ORDER.length) % DIFFICULTY_ORDER.length];
          } else {
            return DIFFICULTY_ORDER[(currentIndex + 1) % DIFFICULTY_ORDER.length];
          }
        });
      }
      return;
    }

    // Handle game playing state
    if (gameScreen === 'playing') {
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
    }
  }, [cartridgeState, gameScreen, gameOver, isPaused, playSound]);

  // A button handler - visual feedback for all cartridges, game control only for Snake
  const handleAPress = useCallback(() => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges
    setButtonPressed('A');
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);

    // Only Snake cartridge actually controls the game
    if (cartridgeState !== 'ready') return;

    // Difficulty menu - A also starts the game (easier to tap)
    if (gameScreen === 'difficulty') {
      playSound('confirm');
      resetGame();
      return;
    }

    // Game over - replay with same difficulty
    if (gameOver) {
      playSound('start');
      resetGame();
    }
  }, [cartridgeState, gameScreen, gameOver, playSound, resetGame]);

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

    // Difficulty menu - start game
    if (gameScreen === 'difficulty') {
      playSound('confirm');
      resetGame();
      return;
    }

    // Game over - replay
    if (gameOver) {
      playSound('start');
      resetGame();
      return;
    }

    // Playing - toggle pause
    if (gameScreen === 'playing' && gameStarted) {
      setIsPaused(prev => {
        if (prev) {
          playSound('start');
          setGameScreen('playing');
        } else {
          setGameScreen('paused');
        }
        return !prev;
      });
    }
  }, [cartridgeState, gameScreen, gameStarted, gameOver, playSound, resetGame]);

  // SELECT button handler - visual feedback for all cartridges, game control only for Snake
  const handleSelectPress = useCallback(() => {
    // No response without a cartridge or during boot
    if (cartridgeState === 'empty' || cartridgeState === 'booting') return;

    // Visual feedback for ALL cartridges
    setButtonPressed('SELECT');
    setTimeout(() => setButtonPressed(null), TIMING.buttonFeedbackDuration);

    // Only Snake cartridge actually controls the game
    if (cartridgeState !== 'ready') return;

    // Go back to difficulty menu from any game state
    if (gameScreen === 'playing' || gameScreen === 'paused' || gameOver) {
      playSound('select');
      goToMenu();
    }
  }, [cartridgeState, gameScreen, gameOver, playSound, goToMenu]);

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

  // Game loop with difficulty-based speed and obstacle collision
  useEffect(() => {
    if (!isActive || !gameStarted || gameOver || isPaused) return;

    // Get difficulty config for speed
    const diffConfig = DIFFICULTY_LEVELS[difficulty];
    const speed = diffConfig.initialSpeed - Math.min(score * diffConfig.speedIncrement, diffConfig.maxSpeedReduction);

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
          setGameScreen('gameOver');
          return currentSnake;
        }

        // Obstacle collision
        if (obstacles.some(obs => obs.x === head.x && obs.y === head.y)) {
          playSound('hit');
          setGameOver(true);
          setGameScreen('gameOver');
          return currentSnake;
        }

        const newSnake = [head, ...currentSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          setFood(generateFood());

          // Add score popup at food location
          setScorePopups(prev => [...prev, {
            x: food.x,
            y: food.y,
            value: 10,
            startTime: Date.now(),
          }]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [isActive, gameStarted, gameOver, isPaused, food, generateFood, score, difficulty, obstacles, playSound]);

  // Obstacle spawning based on score
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const diffConfig = DIFFICULTY_LEVELS[difficulty];
    const targetObstacleCount = Math.floor(score / diffConfig.obstacleSpawnRate);

    // Check if we should spawn a new obstacle
    if (
      obstacles.length < targetObstacleCount &&
      obstacles.length < diffConfig.maxObstacles &&
      score > lastObstacleScore
    ) {
      const newObstacle = generateObstacle();
      if (newObstacle) {
        setObstacles(prev => [...prev, newObstacle]);
        setLastObstacleScore(score);
        playSound('levelUp');

        // Screen flash effect
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), EFFECTS.obstacleSpawnFlashDuration);
      }
    }
  }, [score, gameStarted, gameOver, isPaused, difficulty, obstacles.length, lastObstacleScore, generateObstacle, playSound]);

  // Clean up expired score popups
  useEffect(() => {
    if (scorePopups.length === 0) return;

    const cleanup = setInterval(() => {
      const now = Date.now();
      setScorePopups(prev =>
        prev.filter(popup => now - popup.startTime < EFFECTS.scorePopupDuration)
      );
    }, 100);

    return () => clearInterval(cleanup);
  }, [scorePopups.length]);

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
            {!(cartridgeState === 'ready' && gameScreen === 'playing' && gameStarted && !gameOver && !isPaused) && (
              <div className="absolute -top-1 left-2 text-[7px] text-[#2d2d2d] font-bold tracking-wider drop-shadow-sm">
                DOT MATRIX WITH STEREO SOUND
              </div>
            )}

            {/* Score display - shown during active gameplay */}
            {cartridgeState === 'ready' && gameScreen === 'playing' && gameStarted && !gameOver && !isPaused && (
              <div className="absolute -top-1 left-2 right-2 flex justify-between items-center">
                <span className="text-[9px] text-[#1a1a1a] font-bold font-mono drop-shadow-sm">
                  SCORE:{score}
                </span>
                <span className="text-[7px] text-[#2d2d2d] font-bold font-mono">
                  {DIFFICULTY_LEVELS[difficulty].name}
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
              difficulty={difficulty}
              gameScreen={gameScreen}
              obstacles={obstacles}
              scorePopups={scorePopups}
              screenFlash={screenFlash}
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
export type { GameBoyProps, Position, Direction, CartridgeState, Difficulty, GameScreen, Obstacle, ScorePopup } from './types';
