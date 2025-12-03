'use client';

import { useReducer, useCallback, useRef } from 'react';
import type { Position, Direction, GameAction, GameReducerState } from './types';
import { GRID_SIZE, INITIAL_SNAKE_POSITION, INITIAL_FOOD_POSITION, INITIAL_DIRECTION } from '@/constants/game';

/**
 * useGameReducer - Manages Snake game state with useReducer
 * Better for complex state transitions that happen in the game loop
 */

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

// Initial state
const initialState: GameReducerState = {
  snake: [INITIAL_SNAKE_POSITION],
  food: INITIAL_FOOD_POSITION,
  direction: INITIAL_DIRECTION,
  score: 0,
  highScore: 0,
  gameOver: false,
  isPaused: false,
  gameStarted: false,
  isActive: false,
  directionQueue: [],
};

// Reducer function
function gameReducer(state: GameReducerState, action: GameAction): GameReducerState {
  switch (action.type) {
    case 'MOVE': {
      if (!state.isActive || !state.gameStarted || state.gameOver || state.isPaused) {
        return state;
      }

      const head = { ...state.snake[0] };

      // Move head based on direction
      switch (state.direction) {
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

      // Wrap around walls (no wall death)
      if (head.x < 0) head.x = GRID_SIZE - 1;
      if (head.x >= GRID_SIZE) head.x = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
      if (head.y >= GRID_SIZE) head.y = 0;

      // Self collision (only way to die)
      if (state.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return {
          ...state,
          gameOver: true,
          highScore: Math.max(state.highScore, state.score),
        };
      }

      const newSnake = [head, ...state.snake];

      // Food collision
      if (head.x === state.food.x && head.y === state.food.y) {
        const newFood = generateFood(newSnake);
        const newScore = state.score + 10;
        return {
          ...state,
          snake: newSnake,
          food: newFood,
          score: newScore,
          highScore: Math.max(state.highScore, newScore),
        };
      }

      // Remove tail if didn't eat
      newSnake.pop();
      return {
        ...state,
        snake: newSnake,
      };
    }

    case 'CHANGE_DIRECTION': {
      const opposites: Record<Direction, Direction> = {
        'UP': 'DOWN',
        'DOWN': 'UP',
        'LEFT': 'RIGHT',
        'RIGHT': 'LEFT',
      };

      // Prevent 180-degree turns
      if (action.direction === opposites[state.direction]) {
        return state;
      }

      return {
        ...state,
        direction: action.direction,
      };
    }

    case 'EAT_FOOD': {
      return {
        ...state,
        food: action.newFood,
        score: state.score + 10,
      };
    }

    case 'GAME_OVER': {
      return {
        ...state,
        gameOver: true,
        highScore: Math.max(state.highScore, state.score),
      };
    }

    case 'RESET': {
      const newFood = generateFood([INITIAL_SNAKE_POSITION]);
      return {
        ...state,
        snake: [INITIAL_SNAKE_POSITION],
        food: newFood,
        direction: INITIAL_DIRECTION,
        score: 0,
        gameOver: false,
        isPaused: false,
        gameStarted: true,
        isActive: true,
        directionQueue: [],
      };
    }

    case 'TOGGLE_PAUSE': {
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    }

    case 'START_GAME': {
      return {
        ...state,
        gameStarted: true,
        isActive: true,
        isPaused: false,
      };
    }

    case 'SET_ACTIVE': {
      return {
        ...state,
        isActive: action.isActive,
      };
    }

    case 'SET_FOOD': {
      return {
        ...state,
        food: action.food,
      };
    }

    default:
      return state;
  }
}

/**
 * Custom hook for managing game state with useReducer
 */
export function useGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  // Action creators wrapped in useCallback for stability
  const move = useCallback(() => {
    dispatch({ type: 'MOVE' });
  }, []);

  const changeDirection = useCallback((direction: Direction) => {
    // Also update the ref for immediate access in game loop
    const opposites: Record<Direction, Direction> = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT',
    };

    if (direction !== opposites[directionRef.current]) {
      directionRef.current = direction;
      dispatch({ type: 'CHANGE_DIRECTION', direction });
    }
  }, []);

  const reset = useCallback(() => {
    directionRef.current = INITIAL_DIRECTION;
    dispatch({ type: 'RESET' });
  }, []);

  const togglePause = useCallback(() => {
    dispatch({ type: 'TOGGLE_PAUSE' });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const setActive = useCallback((isActive: boolean) => {
    dispatch({ type: 'SET_ACTIVE', isActive });
  }, []);

  const gameOver = useCallback(() => {
    dispatch({ type: 'GAME_OVER' });
  }, []);

  return {
    state,
    directionRef,
    actions: {
      move,
      changeDirection,
      reset,
      togglePause,
      startGame,
      setActive,
      gameOver,
    },
  };
}
