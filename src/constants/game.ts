/**
 * Game constants for the Snake game
 * Extracted from GameBoy.tsx for better maintainability
 */

// Grid and gameplay constants
export const GRID_SIZE = 16;
export const INITIAL_SPEED = 200; // ms between moves (slower for better playability)
export const SPEED_INCREMENT = 0.5; // Speed increase per point
export const MAX_SPEED_REDUCTION = 80; // Maximum speed increase

// High-DPI scaling factor for crisp rendering
// 2x = 320×288, 3x = 480×432 internal resolution
export const SCALE_FACTOR = 2;

// Screen dimensions (Game Boy resolution)
export const SCREEN_WIDTH = 160;
export const SCREEN_HEIGHT = 144;

// Scaled dimensions for high-DPI canvas
export const CANVAS_WIDTH = SCREEN_WIDTH * SCALE_FACTOR;
export const CANVAS_HEIGHT = SCREEN_HEIGHT * SCALE_FACTOR;

// Cell dimensions (scaled)
export const CELL_WIDTH = CANVAS_WIDTH / GRID_SIZE;
export const CELL_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

// Game Boy LCD color palette
export const COLORS = {
  background: '#9bbc0f',
  light: '#8bac0f',
  dark: '#306230',
  darkest: '#0f380f',
} as const;

// Game Boy body colors
export const GAMEBOY_COLORS = {
  body: '#c4c4b4',
  ridge: '#a8a898',
  screenHousing: '#5c5856',
  screenBezel: '#4a4848',
  button: '#2c2c2c',
  buttonPressed: '#1c1c1c',
  abButton: '#9c1b4d',
  abButtonBorder: '#7a1540',
  selectStart: '#6c6c6b',
  textDark: '#4a4a4a',
  textLight: '#6c6c6b',
} as const;

// Showcase screen layout constants (for demo screens)
export const SHOWCASE = {
  zelda: {
    tileSize: 16,
    linkX: 70,
    linkY: 65,
    enemyX: 120,
    enemyY: 80,
    chestX: 30,
    chestY: 90,
  },
  mario: {
    marioX: 55,
    marioY: 88,
    goombaX: 100,
    goombaY: 112,
    groundY: 120,
    pipeX: 120,
    pipeY: 95,
  },
  tetris: {
    wellX: 30,
    wellY: 8,
    wellWidth: 80,
    wellHeight: 128,
    blockSize: 8,
    panelX: 118,
  },
  pokemon: {
    pikaX: 120,
    pikaY: 35,
    charX: 35,
    charY: 85,
    menuY: 100,
  },
} as const;

// Animation timing constants
export const TIMING = {
  bootPhase1Delay: 300,
  bootPhase2Delay: 800,
  bootCompleteDelay: 1500,
  buttonFeedbackDuration: 150, // Increased for better visual feedback
  screenShakeDuration: 400,
} as const;

// Initial game state
export const INITIAL_SNAKE_POSITION = { x: 10, y: 10 };
export const INITIAL_FOOD_POSITION = { x: 15, y: 15 };
export const INITIAL_DIRECTION = 'RIGHT' as const;

// Difficulty level configurations
export const DIFFICULTY_LEVELS = {
  EASY: {
    id: 'EASY' as const,
    name: 'FACILE',
    description: 'Lent, peu obstacles',
    initialSpeed: 250,
    speedIncrement: 0.3,
    maxSpeedReduction: 60,
    obstacleSpawnRate: 50, // Spawn obstacle every N points
    maxObstacles: 5,
  },
  NORMAL: {
    id: 'NORMAL' as const,
    name: 'NORMAL',
    description: 'Equilibre parfait',
    initialSpeed: 200,
    speedIncrement: 0.5,
    maxSpeedReduction: 80,
    obstacleSpawnRate: 30,
    maxObstacles: 10,
  },
  HARD: {
    id: 'HARD' as const,
    name: 'DIFFICILE',
    description: 'Rapide, obstacles!',
    initialSpeed: 150,
    speedIncrement: 0.8,
    maxSpeedReduction: 100,
    obstacleSpawnRate: 20,
    maxObstacles: 15,
  },
} as const;

// Difficulty keys for iteration
export const DIFFICULTY_ORDER = ['EASY', 'NORMAL', 'HARD'] as const;

// Obstacle rendering
export const OBSTACLE_COLORS = {
  fill: '#1a2810', // Darker than darkest for distinction
  pattern: '#0f380f', // Hatched pattern color
} as const;

// Visual effect timing
export const EFFECTS = {
  obstacleSpawnFlashDuration: 150,
  scorePopupDuration: 800,
  dangerWarningDistance: 2, // Grid cells
} as const;
