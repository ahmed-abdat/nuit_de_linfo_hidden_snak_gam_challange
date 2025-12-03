'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Position, Direction, CartridgeState } from '@/components/GameBoy/types';
import { INITIAL_SNAKE_POSITION, INITIAL_FOOD_POSITION, INITIAL_DIRECTION, GRID_SIZE } from '@/constants/game';

/**
 * Global game state store using Zustand
 * Manages state that needs to be shared across components:
 * - Cartridge insertion state
 * - High scores (persisted to localStorage)
 * - Sound settings
 */

interface GameStore {
  // Cartridge state (shared between CoffreFortSection and GameBoy)
  insertedCartridge: string | null;
  cartridgeState: CartridgeState;

  // Scores (persisted)
  highScore: number;
  currentScore: number;

  // Settings
  soundEnabled: boolean;

  // Game session state
  gameDiscovered: boolean;

  // Actions
  insertCartridge: (id: string) => void;
  ejectCartridge: () => void;
  setCartridgeState: (state: CartridgeState) => void;
  updateScore: (score: number) => void;
  resetScore: () => void;
  toggleSound: () => void;
  setGameDiscovered: (discovered: boolean) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      insertedCartridge: null,
      cartridgeState: 'empty',
      highScore: 0,
      currentScore: 0,
      soundEnabled: true,
      gameDiscovered: false,

      // Actions
      insertCartridge: (id: string) => {
        set({
          insertedCartridge: id,
          cartridgeState: 'booting',
        });
      },

      ejectCartridge: () => {
        set({
          insertedCartridge: null,
          cartridgeState: 'empty',
          currentScore: 0,
        });
      },

      setCartridgeState: (state: CartridgeState) => {
        set({ cartridgeState: state });
      },

      updateScore: (score: number) => {
        const { highScore } = get();
        set({
          currentScore: score,
          highScore: score > highScore ? score : highScore,
        });
      },

      resetScore: () => {
        set({ currentScore: 0 });
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      setGameDiscovered: (discovered: boolean) => {
        set({ gameDiscovered: discovered });
      },
    }),
    {
      name: 'retrocollect-game-storage',
      partialize: (state) => ({
        highScore: state.highScore,
        soundEnabled: state.soundEnabled,
        gameDiscovered: state.gameDiscovered,
      }),
    }
  )
);

/**
 * Snake game local state store
 * For game logic that doesn't need persistence or global access
 * Used with useReducer in GameBoy component
 */
interface SnakeGameStore {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  gameOver: boolean;
  isPaused: boolean;
  gameStarted: boolean;
  isActive: boolean;

  // Actions
  initGame: () => void;
  moveSnake: () => boolean; // Returns true if ate food
  changeDirection: (dir: Direction, currentDir: Direction) => boolean;
  setFood: (food: Position) => void;
  setGameOver: (gameOver: boolean) => void;
  togglePause: () => void;
  startGame: () => void;
  setActive: (active: boolean) => void;
  resetGame: () => void;
}

// Helper to generate random food position
const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

// Helper to check if direction change is valid (no 180° turns)
const isValidDirectionChange = (newDir: Direction, currentDir: Direction): boolean => {
  const opposites: Record<Direction, Direction> = {
    'UP': 'DOWN',
    'DOWN': 'UP',
    'LEFT': 'RIGHT',
    'RIGHT': 'LEFT',
  };
  return newDir !== opposites[currentDir];
};

export const useSnakeGameStore = create<SnakeGameStore>((set, get) => ({
  // Initial state
  snake: [INITIAL_SNAKE_POSITION],
  food: INITIAL_FOOD_POSITION,
  direction: INITIAL_DIRECTION,
  score: 0,
  gameOver: false,
  isPaused: false,
  gameStarted: false,
  isActive: false,

  // Actions
  initGame: () => {
    set({
      snake: [INITIAL_SNAKE_POSITION],
      food: INITIAL_FOOD_POSITION,
      direction: INITIAL_DIRECTION,
      score: 0,
      gameOver: false,
      isPaused: false,
      gameStarted: false,
      isActive: false,
    });
  },

  moveSnake: () => {
    const { snake, direction, food, gameOver, isPaused, gameStarted, isActive } = get();

    if (!isActive || !gameStarted || gameOver || isPaused) {
      return false;
    }

    const head = { ...snake[0] };

    // Move head
    switch (direction) {
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
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      set({ gameOver: true });
      return false;
    }

    const newSnake = [head, ...snake];

    // Check food collision
    const ateFood = head.x === food.x && head.y === food.y;

    if (ateFood) {
      const newFood = generateFood(newSnake);
      set((state) => ({
        snake: newSnake,
        food: newFood,
        score: state.score + 10,
      }));
    } else {
      newSnake.pop();
      set({ snake: newSnake });
    }

    return ateFood;
  },

  changeDirection: (newDir: Direction, currentDir: Direction) => {
    if (isValidDirectionChange(newDir, currentDir)) {
      set({ direction: newDir });
      return true;
    }
    return false;
  },

  setFood: (food: Position) => {
    set({ food });
  },

  setGameOver: (gameOver: boolean) => {
    set({ gameOver });
  },

  togglePause: () => {
    set((state) => ({ isPaused: !state.isPaused }));
  },

  startGame: () => {
    set({
      gameStarted: true,
      isActive: true,
      isPaused: false,
    });
  },

  setActive: (active: boolean) => {
    set({ isActive: active });
  },

  resetGame: () => {
    const newFood = generateFood([INITIAL_SNAKE_POSITION]);
    set({
      snake: [INITIAL_SNAKE_POSITION],
      food: newFood,
      direction: INITIAL_DIRECTION,
      score: 0,
      gameOver: false,
      isPaused: false,
      gameStarted: true,
      isActive: true,
    });
  },
}));
