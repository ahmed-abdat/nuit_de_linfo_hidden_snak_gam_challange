'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface SnakeGameProps {
  width: number;
  height: number;
  isActive: boolean;
  onScoreChange?: (score: number) => void;
}

export function SnakeGame({ width, height, isActive, onScoreChange }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const directionRef = useRef<Direction>('RIGHT');

  const cellWidth = width / GRID_SIZE;
  const cellHeight = height / GRID_SIZE;

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
  }, []);

  // Handle keyboard input
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
        return;
      }

      if (gameOver) {
        if (e.key === ' ' || e.key === 'Enter') {
          resetGame();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current !== 'DOWN') {
            setDirection('UP');
            directionRef.current = 'UP';
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current !== 'UP') {
            setDirection('DOWN');
            directionRef.current = 'DOWN';
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current !== 'RIGHT') {
            setDirection('LEFT');
            directionRef.current = 'LEFT';
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current !== 'LEFT') {
            setDirection('RIGHT');
            directionRef.current = 'RIGHT';
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, gameStarted, gameOver, resetGame]);

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

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (currentSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        const newSnake = [head, ...currentSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => {
            const newScore = s + 10;
            onScoreChange?.(newScore);
            return newScore;
          });
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED - Math.min(score, 100));

    return () => clearInterval(gameLoop);
  }, [isActive, gameStarted, gameOver, food, generateFood, score, onScoreChange]);

  // Render game
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

    // Clear canvas with Game Boy green
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern (subtle)
    ctx.strokeStyle = lightGreen;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(width, i * cellHeight);
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

    // Draw start screen
    if (!gameStarted && !gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.8)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = bgColor;
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SNAKE', width / 2, height / 2 - 20);
      ctx.font = '10px monospace';
      ctx.fillText('Click to Play', width / 2, height / 2 + 10);
      ctx.fillText('Use Arrow Keys', width / 2, height / 2 + 25);
    }

    // Draw game over screen
    if (gameOver) {
      ctx.fillStyle = 'rgba(15, 56, 15, 0.9)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = bgColor;
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', width / 2, height / 2 - 20);
      ctx.font = '12px monospace';
      ctx.fillText(`Score: ${score}`, width / 2, height / 2 + 5);
      ctx.font = '10px monospace';
      ctx.fillText('Press SPACE', width / 2, height / 2 + 25);
    }

  }, [snake, food, width, height, cellWidth, cellHeight, gameStarted, gameOver, score]);

  const handleClick = () => {
    if (!gameStarted) {
      setGameStarted(true);
    } else if (gameOver) {
      resetGame();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      className="cursor-pointer"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
