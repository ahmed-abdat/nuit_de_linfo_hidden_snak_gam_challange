/**
 * Showcase screen drawing functions
 * These render frozen "demo" screens for non-snake cartridges
 * to make the GameBoy look like a product display
 *
 * All coordinates are scaled by SCALE_FACTOR for high-DPI rendering
 */

import type { ShowcaseColors } from './types';
import { SHOWCASE } from '@/constants/game';

/**
 * Draw Zelda dungeon showcase screen
 */
export function drawZeldaShowcase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: ShowcaseColors,
  s: number = 1
): void {
  const { bg, light, dark, darkest } = colors;
  // Scale all base coordinates
  const tileSize = SHOWCASE.zelda.tileSize * s;
  const linkX = SHOWCASE.zelda.linkX * s;
  const linkY = SHOWCASE.zelda.linkY * s;
  const enemyX = SHOWCASE.zelda.enemyX * s;
  const enemyY = SHOWCASE.zelda.enemyY * s;
  const chestX = SHOWCASE.zelda.chestX * s;
  const chestY = SHOWCASE.zelda.chestY * s;

  // Background - dungeon floor
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Draw dungeon tile grid (scaled)
  const wallHeight = 16 * s;
  for (let y = wallHeight; y < h - wallHeight; y += tileSize) {
    for (let x = 0; x < w; x += tileSize) {
      ctx.fillStyle = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0 ? light : bg;
      ctx.fillRect(x, y, tileSize - s, tileSize - s);
    }
  }

  // Dungeon walls (top and bottom borders, scaled)
  ctx.fillStyle = darkest;
  ctx.fillRect(0, 0, w, wallHeight);
  ctx.fillRect(0, h - wallHeight, w, wallHeight);
  ctx.fillStyle = dark;
  ctx.fillRect(0, 12 * s, w, 4 * s);
  ctx.fillRect(0, h - wallHeight, w, 4 * s);

  // HUD - Hearts at top (scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${10 * s}px monospace`;
  for (let i = 0; i < 3; i++) {
    ctx.fillText('♥', (8 + i * 14) * s, 11 * s);
  }
  // Rupee count
  ctx.font = `${8 * s}px monospace`;
  ctx.fillStyle = dark;
  ctx.fillText('♦', 100 * s, 11 * s);
  ctx.fillStyle = darkest;
  ctx.fillText('056', 112 * s, 11 * s);
  // Key
  ctx.fillText('⚷', 140 * s, 11 * s);
  ctx.fillText('2', 152 * s, 11 * s);

  // Link sprite (top-down view, facing right, scaled)
  ctx.fillStyle = darkest;
  // Body
  ctx.fillRect(linkX, linkY, 14 * s, 16 * s);
  // Head
  ctx.fillRect(linkX + 2 * s, linkY - 6 * s, 10 * s, 8 * s);
  // Hat point
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.moveTo(linkX + 12 * s, linkY - 6 * s);
  ctx.lineTo(linkX + 18 * s, linkY - 2 * s);
  ctx.lineTo(linkX + 12 * s, linkY + 2 * s);
  ctx.closePath();
  ctx.fill();
  // Shield (left)
  ctx.fillStyle = light;
  ctx.fillRect(linkX - 4 * s, linkY + 2 * s, 4 * s, 10 * s);
  // Sword (right, extended)
  ctx.fillStyle = darkest;
  ctx.fillRect(linkX + 14 * s, linkY + 4 * s, 20 * s, 3 * s);
  ctx.fillRect(linkX + 14 * s, linkY + 2 * s, 4 * s, 7 * s);

  // Enemy - Octorok (octopus enemy, scaled)
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.arc(enemyX, enemyY, 8 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = darkest;
  ctx.fillRect(enemyX - 6 * s, enemyY + 6 * s, 4 * s, 6 * s);
  ctx.fillRect(enemyX + 2 * s, enemyY + 6 * s, 4 * s, 6 * s);
  // Eyes
  ctx.fillStyle = darkest;
  ctx.fillRect(enemyX - 4 * s, enemyY - 3 * s, 3 * s, 3 * s);
  ctx.fillRect(enemyX + 1 * s, enemyY - 3 * s, 3 * s, 3 * s);

  // Treasure chest (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(chestX, chestY, 20 * s, 14 * s);
  ctx.fillStyle = darkest;
  ctx.fillRect(chestX, chestY, 20 * s, 4 * s);
  ctx.fillStyle = light;
  ctx.fillRect(chestX + 8 * s, chestY + 4 * s, 4 * s, 8 * s);

  // Pot/vase (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(130 * s, 40 * s, 12 * s, 14 * s);
  ctx.fillStyle = darkest;
  ctx.fillRect(128 * s, 40 * s, 16 * s, 4 * s);

  // Rupee on ground (scaled)
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.moveTo(50 * s, 55 * s);
  ctx.lineTo(54 * s, 50 * s);
  ctx.lineTo(58 * s, 55 * s);
  ctx.lineTo(54 * s, 65 * s);
  ctx.closePath();
  ctx.fill();

  // Door at bottom (scaled)
  ctx.fillStyle = darkest;
  ctx.fillRect(70 * s, h - wallHeight, 20 * s, wallHeight);
  ctx.fillStyle = bg;
  ctx.fillRect(74 * s, h - 12 * s, 12 * s, 12 * s);
}

/**
 * Draw Mario platformer showcase screen
 */
export function drawMarioShowcase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: ShowcaseColors,
  s: number = 1
): void {
  const { bg, light, dark, darkest } = colors;
  // Scale all base coordinates
  const marioX = SHOWCASE.mario.marioX * s;
  const marioY = SHOWCASE.mario.marioY * s;
  const goombaX = SHOWCASE.mario.goombaX * s;
  const goombaY = SHOWCASE.mario.goombaY * s;
  const groundY = SHOWCASE.mario.groundY * s;
  const pipeX = SHOWCASE.mario.pipeX * s;
  const pipeY = SHOWCASE.mario.pipeY * s;

  // Sky background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // HUD at top (scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${7 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('MARIO', 5 * s, 10 * s);
  ctx.fillText('025300', 5 * s, 20 * s);
  ctx.textAlign = 'center';
  ctx.fillText('x03', 80 * s, 10 * s);
  ctx.fillText('WORLD', 80 * s, 20 * s);
  ctx.fillText('1-2', 80 * s, 28 * s);
  ctx.textAlign = 'right';
  ctx.fillText('TIME', w - 5 * s, 10 * s);
  ctx.fillText('284', w - 5 * s, 20 * s);

  // Clouds (scaled)
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(25 * s, 40 * s, 8 * s, 0, Math.PI * 2);
  ctx.arc(35 * s, 38 * s, 10 * s, 0, Math.PI * 2);
  ctx.arc(45 * s, 42 * s, 7 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(130 * s, 45 * s, 8 * s, 0, Math.PI * 2);
  ctx.arc(142 * s, 42 * s, 10 * s, 0, Math.PI * 2);
  ctx.fill();

  // Brick blocks row (scaled)
  const blockSize = 16 * s;
  for (let x = 20 * s; x < 70 * s; x += blockSize) {
    ctx.fillStyle = dark;
    ctx.fillRect(x, 70 * s, 14 * s, 14 * s);
    ctx.strokeStyle = darkest;
    ctx.lineWidth = s;
    ctx.strokeRect(x, 70 * s, 14 * s, 14 * s);
    ctx.beginPath();
    ctx.moveTo(x + 7 * s, 70 * s);
    ctx.lineTo(x + 7 * s, 84 * s);
    ctx.moveTo(x, 77 * s);
    ctx.lineTo(x + 14 * s, 77 * s);
    ctx.stroke();
  }

  // Question block (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(70 * s, 70 * s, 14 * s, 14 * s);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(70 * s, 70 * s, 14 * s, 14 * s);
  ctx.fillStyle = darkest;
  ctx.font = `bold ${10 * s}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('?', 77 * s, 81 * s);

  // Green pipe (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(pipeX, pipeY, 28 * s, 30 * s);
  ctx.fillRect(pipeX - 4 * s, pipeY, 36 * s, 12 * s);
  ctx.fillStyle = light;
  ctx.fillRect(pipeX + 4 * s, pipeY + 12 * s, 6 * s, 18 * s);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = s;
  ctx.strokeRect(pipeX - 4 * s, pipeY, 36 * s, 12 * s);
  ctx.strokeRect(pipeX, pipeY + 12 * s, 28 * s, 18 * s);

  // Mario sprite (jumping, scaled)
  ctx.fillStyle = darkest;
  // Cap
  ctx.fillRect(marioX + 2 * s, marioY, 10 * s, 4 * s);
  // Face
  ctx.fillStyle = light;
  ctx.fillRect(marioX + 2 * s, marioY + 4 * s, 10 * s, 7 * s);
  // Eyes
  ctx.fillStyle = darkest;
  ctx.fillRect(marioX + 4 * s, marioY + 5 * s, 2 * s, 2 * s);
  ctx.fillRect(marioX + 8 * s, marioY + 5 * s, 2 * s, 2 * s);
  // Mustache
  ctx.fillRect(marioX + 3 * s, marioY + 8 * s, 8 * s, 2 * s);
  // Body (overalls)
  ctx.fillStyle = dark;
  ctx.fillRect(marioX + 1 * s, marioY + 11 * s, 12 * s, 10 * s);
  // Arms out
  ctx.fillRect(marioX - 3 * s, marioY + 12 * s, 5 * s, 4 * s);
  ctx.fillRect(marioX + 12 * s, marioY + 12 * s, 5 * s, 4 * s);
  // Legs
  ctx.fillStyle = darkest;
  ctx.fillRect(marioX + 2 * s, marioY + 21 * s, 4 * s, 6 * s);
  ctx.fillRect(marioX + 8 * s, marioY + 21 * s, 4 * s, 6 * s);

  // Goomba enemy (scaled)
  ctx.fillStyle = dark;
  // Head (mushroom shape)
  ctx.beginPath();
  ctx.arc(goombaX, goombaY - 4 * s, 8 * s, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(goombaX - 8 * s, goombaY - 4 * s, 16 * s, 6 * s);
  // Feet
  ctx.fillStyle = darkest;
  ctx.fillRect(goombaX - 6 * s, goombaY + 2 * s, 5 * s, 4 * s);
  ctx.fillRect(goombaX + 1 * s, goombaY + 2 * s, 5 * s, 4 * s);
  // Eyes (angry)
  ctx.fillStyle = darkest;
  ctx.fillRect(goombaX - 5 * s, goombaY - 6 * s, 3 * s, 3 * s);
  ctx.fillRect(goombaX + 2 * s, goombaY - 6 * s, 3 * s, 3 * s);

  // Coin floating (scaled)
  ctx.fillStyle = darkest;
  ctx.beginPath();
  ctx.ellipse(77 * s, 58 * s, 4 * s, 6 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = light;
  ctx.fillRect(76 * s, 54 * s, 2 * s, 8 * s);

  // Ground blocks (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(0, groundY, w, 24 * s);
  ctx.strokeStyle = darkest;
  for (let x = 0; x < w; x += blockSize) {
    ctx.strokeRect(x, groundY, blockSize, 12 * s);
    ctx.strokeRect(x, groundY + 12 * s, blockSize, 12 * s);
  }
}

/**
 * Draw Tetris puzzle showcase screen
 */
export function drawTetrisShowcase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: ShowcaseColors,
  s: number = 1
): void {
  const { bg, light, dark, darkest } = colors;
  // Scale all base coordinates
  const wellX = SHOWCASE.tetris.wellX * s;
  const wellY = SHOWCASE.tetris.wellY * s;
  const wellWidth = SHOWCASE.tetris.wellWidth * s;
  const wellHeight = SHOWCASE.tetris.wellHeight * s;
  const blockSize = SHOWCASE.tetris.blockSize * s;
  const panelX = SHOWCASE.tetris.panelX * s;

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Well border (scaled)
  ctx.strokeStyle = darkest;
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(wellX - 2 * s, wellY - 2 * s, wellWidth + 4 * s, wellHeight + 4 * s);

  // Well background (lighter)
  ctx.fillStyle = light;
  ctx.fillRect(wellX, wellY, wellWidth, wellHeight);

  // Stacked blocks at bottom (scaled)
  const stack = [
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ];

  stack.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === 1) {
        const bx = wellX + ci * blockSize;
        const by = wellY + wellHeight - (stack.length - ri) * blockSize;
        ctx.fillStyle = (ri + ci) % 2 === 0 ? dark : darkest;
        ctx.fillRect(bx, by, blockSize - s, blockSize - s);
        ctx.fillStyle = light;
        ctx.fillRect(bx, by, blockSize - s, s);
        ctx.fillRect(bx, by, s, blockSize - s);
      }
    });
  });

  // Falling T-piece (scaled)
  const pieceX = wellX + 3 * blockSize;
  const pieceY = wellY + 4 * blockSize;
  ctx.fillStyle = darkest;
  ctx.fillRect(pieceX, pieceY, blockSize - s, blockSize - s);
  ctx.fillRect(pieceX + blockSize, pieceY, blockSize - s, blockSize - s);
  ctx.fillRect(pieceX + 2 * blockSize, pieceY, blockSize - s, blockSize - s);
  ctx.fillRect(pieceX + blockSize, pieceY + blockSize, blockSize - s, blockSize - s);
  ctx.fillStyle = light;
  ctx.fillRect(pieceX, pieceY, blockSize - s, s);
  ctx.fillRect(pieceX + blockSize, pieceY, blockSize - s, s);
  ctx.fillRect(pieceX + 2 * blockSize, pieceY, blockSize - s, s);

  // Right panel - Stats (scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${6 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('SCORE', panelX, 16 * s);
  ctx.font = `${7 * s}px monospace`;
  ctx.fillText('024680', panelX, 26 * s);
  ctx.font = `${6 * s}px monospace`;
  ctx.fillText('LEVEL', panelX, 42 * s);
  ctx.font = `${8 * s}px monospace`;
  ctx.fillText('09', panelX, 52 * s);
  ctx.font = `${6 * s}px monospace`;
  ctx.fillText('LINES', panelX, 68 * s);
  ctx.font = `${7 * s}px monospace`;
  ctx.fillText('076', panelX, 78 * s);

  // Next piece box (scaled)
  ctx.font = `${6 * s}px monospace`;
  ctx.fillText('NEXT', panelX, 94 * s);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = s;
  ctx.strokeRect(panelX, 98 * s, 32 * s, 26 * s);
  ctx.fillStyle = light;
  ctx.fillRect(panelX + s, 99 * s, 30 * s, 24 * s);

  // Next piece: S-piece (scaled)
  ctx.fillStyle = dark;
  const nx = panelX + 8 * s;
  const ny = 106 * s;
  const miniPiece = 6 * s;
  ctx.fillRect(nx + miniPiece, ny, miniPiece, miniPiece);
  ctx.fillRect(nx + 2 * miniPiece, ny, miniPiece, miniPiece);
  ctx.fillRect(nx, ny + miniPiece, miniPiece, miniPiece);
  ctx.fillRect(nx + miniPiece, ny + miniPiece, miniPiece, miniPiece);

  // Statistics section (left side, scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${5 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('STATS', 4 * s, 14 * s);

  const statsY = 22 * s;
  const miniBlock = 4 * s;

  // T-piece count (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(4 * s, statsY, miniBlock, miniBlock);
  ctx.fillRect(4 * s + miniBlock, statsY, miniBlock, miniBlock);
  ctx.fillRect(4 * s + miniBlock * 2, statsY, miniBlock, miniBlock);
  ctx.fillRect(4 * s + miniBlock, statsY + miniBlock, miniBlock, miniBlock);
  ctx.fillStyle = darkest;
  ctx.font = `${5 * s}px monospace`;
  ctx.fillText('12', 18 * s, statsY + 6 * s);

  // L-piece count (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(4 * s, statsY + 14 * s, miniBlock, miniBlock);
  ctx.fillRect(4 * s, statsY + 14 * s + miniBlock, miniBlock, miniBlock);
  ctx.fillRect(4 * s, statsY + 14 * s + miniBlock * 2, miniBlock, miniBlock);
  ctx.fillRect(4 * s + miniBlock, statsY + 14 * s + miniBlock * 2, miniBlock, miniBlock);
  ctx.fillStyle = darkest;
  ctx.fillText('08', 18 * s, statsY + 20 * s);

  // I-piece count (scaled)
  ctx.fillStyle = dark;
  ctx.fillRect(4 * s, statsY + 32 * s, miniBlock, miniBlock);
  ctx.fillRect(4 * s, statsY + 32 * s + miniBlock, miniBlock, miniBlock);
  ctx.fillRect(4 * s, statsY + 32 * s + miniBlock * 2, miniBlock, miniBlock);
  ctx.fillRect(4 * s, statsY + 32 * s + miniBlock * 3, miniBlock, miniBlock);
  ctx.fillStyle = darkest;
  ctx.fillText('11', 18 * s, statsY + 42 * s);
}

/**
 * Draw Pokemon battle showcase screen
 */
export function drawPokemonShowcase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: ShowcaseColors,
  s: number = 1
): void {
  const { bg, light, dark, darkest } = colors;
  // Scale all base coordinates
  const pikaX = SHOWCASE.pokemon.pikaX * s;
  const pikaY = SHOWCASE.pokemon.pikaY * s;
  const charX = SHOWCASE.pokemon.charX * s;
  const charY = SHOWCASE.pokemon.charY * s;
  const menuY = SHOWCASE.pokemon.menuY * s;

  // Battle background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Enemy Pokemon info box (top-left, scaled)
  ctx.fillStyle = light;
  ctx.fillRect(2 * s, 4 * s, 75 * s, 28 * s);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(2 * s, 4 * s, 75 * s, 28 * s);

  ctx.fillStyle = darkest;
  ctx.font = `${7 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('PIKACHU', 6 * s, 14 * s);
  ctx.font = `${6 * s}px monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('Lv25', 72 * s, 14 * s);

  // Enemy HP bar (scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${5 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('HP:', 6 * s, 24 * s);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = s;
  ctx.strokeRect(20 * s, 19 * s, 52 * s, 6 * s);
  ctx.fillStyle = dark;
  ctx.fillRect(21 * s, 20 * s, 40 * s, 4 * s);

  // Enemy Pokemon sprite (Pikachu, scaled)
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.ellipse(pikaX, pikaY, 16 * s, 14 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // Ears
  ctx.beginPath();
  ctx.moveTo(pikaX - 12 * s, pikaY - 8 * s);
  ctx.lineTo(pikaX - 6 * s, pikaY - 22 * s);
  ctx.lineTo(pikaX - 2 * s, pikaY - 10 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pikaX + 2 * s, pikaY - 10 * s);
  ctx.lineTo(pikaX + 6 * s, pikaY - 22 * s);
  ctx.lineTo(pikaX + 12 * s, pikaY - 8 * s);
  ctx.closePath();
  ctx.fill();
  // Ear tips
  ctx.fillStyle = darkest;
  ctx.beginPath();
  ctx.moveTo(pikaX - 6 * s, pikaY - 22 * s);
  ctx.lineTo(pikaX - 8 * s, pikaY - 16 * s);
  ctx.lineTo(pikaX - 4 * s, pikaY - 16 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pikaX + 6 * s, pikaY - 22 * s);
  ctx.lineTo(pikaX + 4 * s, pikaY - 16 * s);
  ctx.lineTo(pikaX + 8 * s, pikaY - 16 * s);
  ctx.closePath();
  ctx.fill();
  // Face
  ctx.fillStyle = darkest;
  ctx.fillRect(pikaX - 8 * s, pikaY - 4 * s, 4 * s, 4 * s);
  ctx.fillRect(pikaX + 4 * s, pikaY - 4 * s, 4 * s, 4 * s);
  // Cheeks
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.arc(pikaX - 12 * s, pikaY + 2 * s, 4 * s, 0, Math.PI * 2);
  ctx.arc(pikaX + 12 * s, pikaY + 2 * s, 4 * s, 0, Math.PI * 2);
  ctx.fill();
  // Tail
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.moveTo(pikaX + 14 * s, pikaY);
  ctx.lineTo(pikaX + 28 * s, pikaY - 10 * s);
  ctx.lineTo(pikaX + 24 * s, pikaY);
  ctx.lineTo(pikaX + 32 * s, pikaY - 5 * s);
  ctx.lineTo(pikaX + 20 * s, pikaY + 8 * s);
  ctx.lineTo(pikaX + 22 * s, pikaY + 2 * s);
  ctx.closePath();
  ctx.fill();

  // Player Pokemon sprite (Charmander back, scaled)
  ctx.fillStyle = dark;
  ctx.beginPath();
  ctx.ellipse(charX, charY, 22 * s, 20 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(charX, charY - 20 * s, 14 * s, 12 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  // Tail
  ctx.beginPath();
  ctx.moveTo(charX + 18 * s, charY + 5 * s);
  ctx.quadraticCurveTo(charX + 40 * s, charY, charX + 38 * s, charY - 15 * s);
  ctx.quadraticCurveTo(charX + 35 * s, charY - 5 * s, charX + 22 * s, charY);
  ctx.closePath();
  ctx.fill();
  // Flame
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.moveTo(charX + 38 * s, charY - 15 * s);
  ctx.lineTo(charX + 35 * s, charY - 28 * s);
  ctx.lineTo(charX + 42 * s, charY - 20 * s);
  ctx.lineTo(charX + 48 * s, charY - 30 * s);
  ctx.lineTo(charX + 45 * s, charY - 18 * s);
  ctx.closePath();
  ctx.fill();

  // Player Pokemon info box (scaled)
  ctx.fillStyle = light;
  ctx.fillRect(80 * s, 62 * s, 78 * s, 36 * s);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(80 * s, 62 * s, 78 * s, 36 * s);

  ctx.fillStyle = darkest;
  ctx.font = `${6 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('CHARMANDER', 84 * s, 72 * s);
  ctx.font = `${6 * s}px monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('Lv18', 154 * s, 72 * s);

  // Player HP bar (scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${5 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('HP:', 84 * s, 82 * s);
  ctx.strokeStyle = darkest;
  ctx.strokeRect(98 * s, 77 * s, 52 * s, 6 * s);
  ctx.fillStyle = dark;
  ctx.fillRect(99 * s, 78 * s, 45 * s, 4 * s);
  ctx.fillStyle = darkest;
  ctx.font = `${6 * s}px monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('52/65', 154 * s, 94 * s);

  // Battle menu box (scaled)
  const menuHeight = 44 * s;
  ctx.fillStyle = light;
  ctx.fillRect(0, menuY, w, menuHeight);
  ctx.strokeStyle = darkest;
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(0, menuY, w, menuHeight);

  // Divider
  ctx.beginPath();
  ctx.moveTo(80 * s, menuY);
  ctx.lineTo(80 * s, menuY + menuHeight);
  ctx.stroke();

  // Text (scaled)
  ctx.fillStyle = darkest;
  ctx.font = `${7 * s}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('What will', 6 * s, menuY + 15 * s);
  ctx.fillText('CHARMANDER do?', 6 * s, menuY + 28 * s);

  // Menu options (scaled)
  ctx.fillText('FIGHT', 88 * s, menuY + 15 * s);
  ctx.fillText('BAG', 130 * s, menuY + 15 * s);
  ctx.fillText('PKMN', 88 * s, menuY + 32 * s);
  ctx.fillText('RUN', 130 * s, menuY + 32 * s);

  // Selection cursor
  ctx.fillText('>', 82 * s, menuY + 15 * s);
}

/**
 * Draw showcase screen based on cartridge ID
 * @param ctx - Canvas 2D rendering context
 * @param cartridgeId - ID of the cartridge to draw
 * @param width - Canvas width (already scaled)
 * @param height - Canvas height (already scaled)
 * @param colors - Color palette
 * @param scale - Scale factor for high-DPI rendering (default: 1)
 */
export function drawShowcaseScreen(
  ctx: CanvasRenderingContext2D,
  cartridgeId: string,
  width: number,
  height: number,
  colors: ShowcaseColors,
  scale: number = 1
): void {
  switch (cartridgeId) {
    case 'zelda':
      drawZeldaShowcase(ctx, width, height, colors, scale);
      break;
    case 'mario':
      drawMarioShowcase(ctx, width, height, colors, scale);
      break;
    case 'tetris':
      drawTetrisShowcase(ctx, width, height, colors, scale);
      break;
    case 'pokemon':
      drawPokemonShowcase(ctx, width, height, colors, scale);
      break;
    default:
      // Fallback for unknown cartridges (scaled)
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = colors.darkest;
      ctx.font = `bold ${10 * scale}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('DEMO MODE', width / 2, height / 2);
  }
}
