/**
 * Type definitions for the GameBoy component
 */

// Position on the game grid
export interface Position {
  x: number;
  y: number;
}

// Snake movement direction
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Difficulty levels
export type Difficulty = 'EASY' | 'NORMAL' | 'HARD';

// Game screen states (for menu navigation)
export type GameScreen = 'title' | 'difficulty' | 'playing' | 'paused' | 'gameOver';

// Obstacle on the game grid (same structure as Position for consistency)
export type Obstacle = Position;

// Score popup effect
export interface ScorePopup {
  x: number;
  y: number;
  value: number;
  startTime: number;
}

// Difficulty configuration (matches DIFFICULTY_LEVELS structure)
export interface DifficultyConfig {
  id: Difficulty;
  name: string;
  description: string;
  initialSpeed: number;
  speedIncrement: number;
  maxSpeedReduction: number;
  obstacleSpawnRate: number;
  maxObstacles: number;
}

// Cartridge states for the GameBoy
export type CartridgeState = 'empty' | 'booting' | 'showcase' | 'ready';

// Color palette for showcase screens
export interface ShowcaseColors {
  bg: string;
  light: string;
  dark: string;
  darkest: string;
}

// GameBoy component props
export interface GameBoyProps {
  className?: string;
  asImage?: boolean; // When true, looks completely static like an image
  activeCartridge?: string | null; // Controls which cartridge is inserted
  onCartridgeEject?: () => void; // Callback when cartridge is ejected
  soundEnabled?: boolean; // Enable/disable sound effects
}

// Game state for the Snake game
export interface SnakeGameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  highScore: number;
  gameOver: boolean;
  isPaused: boolean;
  gameStarted: boolean;
  isActive: boolean;
  // New enhanced features
  difficulty: Difficulty;
  obstacles: Obstacle[];
  gameScreen: GameScreen;
  scorePopups: ScorePopup[];
  lastObstacleScore: number; // Track when last obstacle was spawned
}

// UI state for the GameBoy
export interface GameBoyUIState {
  discovered: boolean;
  cartridgeState: CartridgeState;
  bootPhase: number;
  screenShake: boolean;
  buttonPressed: string | null;
  screenFlash: boolean; // Flash effect when obstacle spawns
}

// Actions for the game reducer
export type GameAction =
  | { type: 'MOVE' }
  | { type: 'CHANGE_DIRECTION'; direction: Direction }
  | { type: 'EAT_FOOD'; newFood: Position }
  | { type: 'GAME_OVER' }
  | { type: 'RESET' }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'START_GAME' }
  | { type: 'SET_ACTIVE'; isActive: boolean }
  | { type: 'SET_FOOD'; food: Position };

// Combined state for useReducer
export interface GameReducerState extends SnakeGameState {
  directionQueue: Direction[];
}
