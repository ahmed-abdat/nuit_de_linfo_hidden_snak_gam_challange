'use client';

import { useEffect, useRef, useMemo } from 'react';
import type { Position, CartridgeState, ShowcaseColors, Difficulty, GameScreen, Obstacle, ScorePopup } from './types';
import {
  COLORS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GRID_SIZE,
  SCALE_FACTOR,
  CELL_WIDTH,
  CELL_HEIGHT,
  DIFFICULTY_LEVELS,
  DIFFICULTY_ORDER,
  OBSTACLE_COLORS,
  EFFECTS,
} from '@/constants/game';
import { drawShowcaseScreen } from './showcaseScreens';

/**
 * GameBoyScreen - Canvas rendering component for the GameBoy display
 * Handles all visual rendering: game state, boot sequence, showcase screens
 */

interface GameBoyScreenProps {
  // Game state
  snake: Position[];
  food: Position;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
  isPaused: boolean;
  discovered: boolean;

  // Cartridge state
  cartridgeState: CartridgeState;
  bootPhase: number;
  activeCartridge: string | null;

  // Enhanced game features
  difficulty: Difficulty;
  gameScreen: GameScreen;
  obstacles: Obstacle[];
  scorePopups: ScorePopup[];
  screenFlash: boolean;

  // Canvas ref (passed from parent for external access)
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export function GameBoyScreen({
  snake,
  food,
  score,
  gameStarted,
  gameOver,
  isPaused,
  discovered,
  cartridgeState,
  bootPhase,
  activeCartridge,
  difficulty,
  gameScreen,
  obstacles,
  scorePopups,
  screenFlash,
  canvasRef: externalRef,
}: GameBoyScreenProps) {
  const internalRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = externalRef ?? internalRef;
  // Cache canvas context for performance
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Memoize cell dimensions (constants, but prevents recalculation)
  const cellWidth = CELL_WIDTH;
  const cellHeight = CELL_HEIGHT;

  // Memoize showcase colors to prevent object recreation
  const showcaseColors = useMemo<ShowcaseColors>(() => ({
    bg: COLORS.background,
    light: COLORS.light,
    dark: COLORS.dark,
    darkest: COLORS.darkest,
  }), []);

  // Main rendering effect with requestAnimationFrame for smoother updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get and cache context (with optimization hint for write-heavy operations)
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d', { alpha: false });
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { background, light, dark, darkest } = COLORS;

    // Clear with Game Boy green (use scaled canvas dimensions)
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Handle empty state
    if (cartridgeState === 'empty') {
      renderEmptyScreen(ctx, light, dark);
      return;
    }

    // Handle booting state
    if (cartridgeState === 'booting') {
      renderBootScreen(ctx, background, darkest, bootPhase);
      return;
    }

    // Handle showcase mode (non-snake cartridges)
    if (cartridgeState === 'showcase' && activeCartridge) {
      drawShowcaseScreen(ctx, activeCartridge, CANVAS_WIDTH, CANVAS_HEIGHT, showcaseColors, SCALE_FACTOR);
      return;
    }

    // Handle pre-discovery fallback
    if (!discovered) {
      renderEmptyScreen(ctx, light, dark);
      return;
    }

    // Handle difficulty selection screen
    if (gameScreen === 'difficulty') {
      renderDifficultyMenu(ctx, difficulty, { background, light, dark, darkest });
      return;
    }

    // Render active game
    renderGameScreen(ctx, {
      snake,
      food,
      score,
      gameStarted,
      gameOver,
      isPaused,
      difficulty,
      obstacles,
      scorePopups,
      cellWidth,
      cellHeight,
      colors: { background, light, dark, darkest },
    });

    // Apply screen flash effect (overlay after game render)
    if (screenFlash) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, [
    snake,
    food,
    score,
    gameStarted,
    gameOver,
    isPaused,
    discovered,
    cartridgeState,
    bootPhase,
    activeCartridge,
    difficulty,
    gameScreen,
    obstacles,
    scorePopups,
    screenFlash,
    cellWidth,
    cellHeight,
    canvasRef,
    showcaseColors,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="w-full h-full rounded"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

/**
 * Render empty screen with "Insert Cartridge" message
 */
function renderEmptyScreen(
  ctx: CanvasRenderingContext2D,
  light: string,
  dark: string
): void {
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Subtle noise pattern for old LCD look (scaled)
  const noiseSize = 2 * SCALE_FACTOR;
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(139, 172, 15, ${Math.random() * 0.3})`;
    ctx.fillRect(
      Math.random() * CANVAS_WIDTH,
      Math.random() * CANVAS_HEIGHT,
      noiseSize,
      noiseSize
    );
  }

  // "Insert Cartridge" message (scaled font)
  ctx.fillStyle = dark;
  ctx.font = `${8 * SCALE_FACTOR}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('INSEREZ', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 5 * SCALE_FACTOR);
  ctx.fillText('CARTOUCHE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 8 * SCALE_FACTOR);
}

/**
 * Render boot sequence animation
 */
function renderBootScreen(
  ctx: CanvasRenderingContext2D,
  background: string,
  darkest: string,
  bootPhase: number
): void {
  if (bootPhase === 0) {
    // Flicker effect
    ctx.fillStyle = Math.random() > 0.5 ? background : darkest;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else if (bootPhase === 1) {
    // Nintendo-style logo (scaled)
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = darkest;
    ctx.font = `bold ${12 * SCALE_FACTOR}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText('RETRO', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10 * SCALE_FACTOR);
    ctx.fillText('COLLECT', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10 * SCALE_FACTOR);
  } else {
    // Loading (scaled)
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = darkest;
    ctx.font = `${10 * SCALE_FACTOR}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('CHARGEMENT...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
}

/**
 * Render difficulty selection menu
 */
function renderDifficultyMenu(
  ctx: CanvasRenderingContext2D,
  selectedDifficulty: Difficulty,
  colors: { background: string; light: string; dark: string; darkest: string }
): void {
  const { background, light, dark, darkest } = colors;

  // Background
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Title
  ctx.fillStyle = darkest;
  ctx.font = `bold ${10 * SCALE_FACTOR}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('DIFFICULTE', CANVAS_WIDTH / 2, 25 * SCALE_FACTOR);

  // Decorative line
  ctx.strokeStyle = dark;
  ctx.lineWidth = 1 * SCALE_FACTOR;
  ctx.beginPath();
  ctx.moveTo(40 * SCALE_FACTOR, 32 * SCALE_FACTOR);
  ctx.lineTo(120 * SCALE_FACTOR, 32 * SCALE_FACTOR);
  ctx.stroke();

  // Difficulty options (centered vertically)
  const startY = 45 * SCALE_FACTOR;
  const itemHeight = 20 * SCALE_FACTOR;

  DIFFICULTY_ORDER.forEach((diffKey, index) => {
    const config = DIFFICULTY_LEVELS[diffKey];
    const isSelected = diffKey === selectedDifficulty;
    const y = startY + index * itemHeight;

    // Selection indicator (arrow)
    if (isSelected) {
      ctx.fillStyle = darkest;
      ctx.font = `${10 * SCALE_FACTOR}px monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('>', 15 * SCALE_FACTOR, y + 4 * SCALE_FACTOR);

      // Highlight box
      ctx.strokeStyle = darkest;
      ctx.lineWidth = 1.5 * SCALE_FACTOR;
      ctx.strokeRect(
        25 * SCALE_FACTOR,
        y - 10 * SCALE_FACTOR,
        110 * SCALE_FACTOR,
        22 * SCALE_FACTOR
      );
    }

    // Difficulty name
    ctx.fillStyle = isSelected ? darkest : dark;
    ctx.font = `${isSelected ? 'bold ' : ''}${9 * SCALE_FACTOR}px monospace`;
    ctx.textAlign = 'left';
    ctx.fillText(config.name, 30 * SCALE_FACTOR, y + 4 * SCALE_FACTOR);
  });

  // Instructions at bottom
  ctx.fillStyle = dark;
  ctx.font = `${7 * SCALE_FACTOR}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('UP/DOWN = Choisir', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20 * SCALE_FACTOR);
  ctx.fillStyle = darkest;
  ctx.fillText('A/START = Jouer', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 10 * SCALE_FACTOR);
}

/**
 * Render active game screen
 */
interface GameRenderProps {
  snake: Position[];
  food: Position;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
  isPaused: boolean;
  difficulty: Difficulty;
  obstacles: Obstacle[];
  scorePopups: ScorePopup[];
  cellWidth: number;
  cellHeight: number;
  colors: {
    background: string;
    light: string;
    dark: string;
    darkest: string;
  };
}

function renderGameScreen(
  ctx: CanvasRenderingContext2D,
  props: GameRenderProps
): void {
  const { snake, food, score, gameStarted, gameOver, isPaused, difficulty, obstacles, scorePopups, cellWidth, cellHeight, colors } = props;
  const { background, light, dark, darkest } = colors;

  // Draw grid pattern (subtle, scaled line width)
  ctx.strokeStyle = light;
  ctx.lineWidth = 0.3 * SCALE_FACTOR;
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellWidth, 0);
    ctx.lineTo(i * cellWidth, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(CANVAS_WIDTH, i * cellHeight);
    ctx.stroke();
  }

  // Draw food (scaled padding)
  const foodPadding = 2 * SCALE_FACTOR;
  ctx.fillStyle = darkest;
  ctx.beginPath();
  ctx.arc(
    food.x * cellWidth + cellWidth / 2,
    food.y * cellHeight + cellHeight / 2,
    cellWidth / 2 - foodPadding,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Draw snake (scaled padding)
  const snakePadding = 1 * SCALE_FACTOR;
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? darkest : dark;
    ctx.fillRect(
      segment.x * cellWidth + snakePadding,
      segment.y * cellHeight + snakePadding,
      cellWidth - snakePadding * 2,
      cellHeight - snakePadding * 2
    );
  });

  // Draw obstacles as retro brick/wall blocks with 3D pixel art effect
  obstacles.forEach((obstacle) => {
    const x = obstacle.x * cellWidth;
    const y = obstacle.y * cellHeight;
    const pad = 1 * SCALE_FACTOR;
    const w = cellWidth - pad * 2;
    const h = cellHeight - pad * 2;

    // Main brick body (dark)
    ctx.fillStyle = darkest;
    ctx.fillRect(x + pad, y + pad, w, h);

    // 3D highlight effect (top and left edges - lighter)
    ctx.fillStyle = dark;
    ctx.fillRect(x + pad, y + pad, w, 2 * SCALE_FACTOR); // Top edge
    ctx.fillRect(x + pad, y + pad, 2 * SCALE_FACTOR, h); // Left edge

    // 3D shadow effect (bottom and right edges - darkest)
    ctx.fillStyle = '#050a05';
    ctx.fillRect(x + pad, y + h - 1 * SCALE_FACTOR, w, 2 * SCALE_FACTOR); // Bottom edge
    ctx.fillRect(x + w - 1 * SCALE_FACTOR, y + pad, 2 * SCALE_FACTOR, h); // Right edge

    // Inner brick pattern (cross/X mark for danger)
    ctx.strokeStyle = dark;
    ctx.lineWidth = 1.5 * SCALE_FACTOR;
    ctx.beginPath();
    // X pattern
    const inset = 4 * SCALE_FACTOR;
    ctx.moveTo(x + pad + inset, y + pad + inset);
    ctx.lineTo(x + w - inset, y + h - inset);
    ctx.moveTo(x + w - inset, y + pad + inset);
    ctx.lineTo(x + pad + inset, y + h - inset);
    ctx.stroke();
  });

  // Draw score popups (floating "+10" text)
  const now = Date.now();
  scorePopups.forEach((popup) => {
    const elapsed = now - popup.startTime;
    const progress = elapsed / EFFECTS.scorePopupDuration;

    if (progress < 1) {
      // Fade out and float up
      const alpha = 1 - progress;
      const offsetY = progress * 20 * SCALE_FACTOR;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = darkest;
      ctx.font = `bold ${8 * SCALE_FACTOR}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(
        `+${popup.value}`,
        popup.x * cellWidth + cellWidth / 2,
        popup.y * cellHeight - offsetY
      );
      ctx.restore();
    }
  });

  // Start screen (scaled) - dark overlay with light text
  if (!gameStarted && !gameOver) {
    renderOverlay(ctx, darkest, 0.85);
    ctx.fillStyle = background;
    ctx.font = `bold ${12 * SCALE_FACTOR}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('SNAKE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 25 * SCALE_FACTOR);
    ctx.font = `${8 * SCALE_FACTOR}px monospace`;
    ctx.fillText('RETROCOLLECT', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 8 * SCALE_FACTOR);
    ctx.font = `${9 * SCALE_FACTOR}px monospace`;
    ctx.fillStyle = light;
    ctx.fillText('Appuyez START', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15 * SCALE_FACTOR);
  }

  // Pause screen (scaled) - dark overlay with light text
  if (isPaused && gameStarted && !gameOver) {
    renderOverlay(ctx, darkest, 0.88);
    ctx.fillStyle = background;
    ctx.font = `bold ${14 * SCALE_FACTOR}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('PAUSE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 15 * SCALE_FACTOR);
    ctx.font = `${8 * SCALE_FACTOR}px monospace`;
    ctx.fillText('START = Reprendre', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 8 * SCALE_FACTOR);
    ctx.font = `${7 * SCALE_FACTOR}px monospace`;
    ctx.fillStyle = light;
    ctx.fillText('SELECT = Reset', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 25 * SCALE_FACTOR);
  }

  // Game over screen (scaled) - use dark overlay with light text for visibility
  if (gameOver) {
    renderOverlay(ctx, darkest, 0.9);
    ctx.fillStyle = background;
    ctx.font = `bold ${12 * SCALE_FACTOR}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30 * SCALE_FACTOR);

    // Show difficulty
    const diffConfig = DIFFICULTY_LEVELS[difficulty];
    ctx.font = `${7 * SCALE_FACTOR}px monospace`;
    ctx.fillStyle = light;
    ctx.fillText(`Mode: ${diffConfig.name}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 15 * SCALE_FACTOR);

    ctx.fillStyle = background;
    ctx.font = `${10 * SCALE_FACTOR}px monospace`;
    ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 2 * SCALE_FACTOR);
    ctx.font = `${8 * SCALE_FACTOR}px monospace`;
    ctx.fillText('A = Rejouer', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20 * SCALE_FACTOR);
    ctx.font = `${7 * SCALE_FACTOR}px monospace`;
    ctx.fillStyle = light;
    ctx.fillText('SELECT = Menu', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35 * SCALE_FACTOR);
  }
}

/**
 * Render semi-transparent overlay
 */
function renderOverlay(
  ctx: CanvasRenderingContext2D,
  color: string,
  alpha: number
): void {
  // Convert hex to rgba
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
