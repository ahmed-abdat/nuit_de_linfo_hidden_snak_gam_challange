'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Direction } from './types';

/**
 * GameBoyControls - D-pad and action buttons for the GameBoy
 * Separated for better maintainability and reusability
 *
 * Uses onTouchEnd + onClick pattern to prevent double-execution on mobile
 */

interface DPadProps {
  onPress: (direction: Direction) => void;
  buttonPressed: string | null;
  disabled?: boolean;
}

interface ActionButtonsProps {
  onAPress: () => void;
  onBPress: () => void;
  buttonPressed: string | null;
  disabled?: boolean;
}

interface StartSelectProps {
  onStartPress: () => void;
  onSelectPress: () => void;
  buttonPressed: string | null;
  disabled?: boolean;
}

/**
 * D-Pad Component
 */
export function DPad({ onPress, buttonPressed, disabled = false }: DPadProps) {
  const lastPressTime = useRef<number>(0);

  const handlePress = useCallback((dir: Direction, e: React.TouchEvent | React.MouseEvent) => {
    if (disabled) return;

    // Debounce to prevent double-execution (touch + synthetic click)
    const now = Date.now();
    if (now - lastPressTime.current < 50) return;
    lastPressTime.current = now;

    // Prevent default to stop synthetic click on touch devices
    if ('touches' in e) {
      e.preventDefault();
    }

    onPress(dir);
  }, [disabled, onPress]);

  const buttonClasses = "bg-[#2c2c2c] hover:bg-[#3c3c3c] cursor-pointer touch-manipulation select-none";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="relative w-[90px] h-[90px] md:w-[95px] md:h-[95px]">
      {/* Up Button */}
      <motion.button
        onPointerDown={(e) => { e.preventDefault(); handlePress('UP', e); }}
        className={`absolute left-1/2 -translate-x-1/2 top-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-t-sm ${buttonClasses} ${disabledClasses}`}
        animate={{
          backgroundColor: buttonPressed === 'UP' ? '#1c1c1c' : '#2c2c2c',
          scale: buttonPressed === 'UP' ? 0.95 : 1,
        }}
        transition={{ duration: 0.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Up"
        disabled={disabled}
      />

      {/* Down Button */}
      <motion.button
        onPointerDown={(e) => { e.preventDefault(); handlePress('DOWN', e); }}
        className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-b-sm ${buttonClasses} ${disabledClasses}`}
        animate={{
          backgroundColor: buttonPressed === 'DOWN' ? '#1c1c1c' : '#2c2c2c',
          scale: buttonPressed === 'DOWN' ? 0.95 : 1,
        }}
        transition={{ duration: 0.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Down"
        disabled={disabled}
      />

      {/* Left Button */}
      <motion.button
        onPointerDown={(e) => { e.preventDefault(); handlePress('LEFT', e); }}
        className={`absolute top-1/2 -translate-y-1/2 left-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-l-sm ${buttonClasses} ${disabledClasses}`}
        animate={{
          backgroundColor: buttonPressed === 'LEFT' ? '#1c1c1c' : '#2c2c2c',
          scale: buttonPressed === 'LEFT' ? 0.95 : 1,
        }}
        transition={{ duration: 0.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Left"
        disabled={disabled}
      />

      {/* Right Button */}
      <motion.button
        onPointerDown={(e) => { e.preventDefault(); handlePress('RIGHT', e); }}
        className={`absolute top-1/2 -translate-y-1/2 right-0 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-r-sm ${buttonClasses} ${disabledClasses}`}
        animate={{
          backgroundColor: buttonPressed === 'RIGHT' ? '#1c1c1c' : '#2c2c2c',
          scale: buttonPressed === 'RIGHT' ? 0.95 : 1,
        }}
        transition={{ duration: 0.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Right"
        disabled={disabled}
      />

      {/* Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] md:w-[32px] md:h-[32px] bg-[#2c2c2c]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-[#1a1a1a] rounded-full pointer-events-none" />
    </div>
  );
}

/**
 * A/B Action Buttons Component
 */
export function ActionButtons({ onAPress, onBPress, buttonPressed, disabled = false }: ActionButtonsProps) {
  const lastPressTime = useRef<number>(0);

  const handlePress = useCallback((action: () => void, e: React.PointerEvent) => {
    if (disabled) return;

    const now = Date.now();
    if (now - lastPressTime.current < 50) return;
    lastPressTime.current = now;

    e.preventDefault();
    action();
  }, [disabled]);

  const buttonClasses = "bg-[#9c1b4d] rounded-full shadow-lg border-2 border-[#7a1540] hover:bg-[#ac2b5d] cursor-pointer touch-manipulation select-none";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="flex gap-4 -rotate-[25deg]">
      {/* B Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onPointerDown={(e) => handlePress(onBPress, e)}
          className={`w-[44px] h-[44px] md:w-[48px] md:h-[48px] ${buttonClasses} ${disabledClasses}`}
          animate={{
            scale: buttonPressed === 'B' ? 0.9 : 1,
            backgroundColor: buttonPressed === 'B' ? '#8c0b3d' : '#9c1b4d',
          }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="B Button"
          disabled={disabled}
        />
        <span className="text-[9px] text-[#4a4a4a] font-bold mt-1 select-none">B</span>
      </div>

      {/* A Button */}
      <div className="flex flex-col items-center -mt-5">
        <motion.button
          onPointerDown={(e) => handlePress(onAPress, e)}
          className={`w-[44px] h-[44px] md:w-[48px] md:h-[48px] ${buttonClasses} ${disabledClasses}`}
          animate={{
            scale: buttonPressed === 'A' ? 0.9 : 1,
            backgroundColor: buttonPressed === 'A' ? '#8c0b3d' : '#9c1b4d',
          }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="A Button"
          disabled={disabled}
        />
        <span className="text-[9px] text-[#4a4a4a] font-bold mt-1 select-none">A</span>
      </div>
    </div>
  );
}

/**
 * Start/Select Buttons Component
 */
export function StartSelectButtons({ onStartPress, onSelectPress, buttonPressed, disabled = false }: StartSelectProps) {
  const lastPressTime = useRef<number>(0);

  const handlePress = useCallback((action: () => void, e: React.PointerEvent) => {
    if (disabled) return;

    const now = Date.now();
    if (now - lastPressTime.current < 50) return;
    lastPressTime.current = now;

    e.preventDefault();
    action();
  }, [disabled]);

  const buttonClasses = "bg-[#6c6c6b] rounded-full shadow-inner -rotate-[25deg] hover:bg-[#7c7c7b] cursor-pointer touch-manipulation select-none";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="flex gap-8">
      {/* SELECT Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onPointerDown={(e) => handlePress(onSelectPress, e)}
          className={`w-[36px] h-[10px] ${buttonClasses} ${disabledClasses}`}
          animate={{
            scale: buttonPressed === 'SELECT' ? 0.9 : 1,
            backgroundColor: buttonPressed === 'SELECT' ? '#5c5c5b' : '#6c6c6b',
          }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Select"
          disabled={disabled}
        />
        <span className="text-[7px] text-[#4a4a4a] font-bold mt-2 select-none">SELECT</span>
      </div>

      {/* START Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onPointerDown={(e) => handlePress(onStartPress, e)}
          className={`w-[36px] h-[10px] ${buttonClasses} ${disabledClasses}`}
          animate={{
            scale: buttonPressed === 'START' ? 0.9 : 1,
            backgroundColor: buttonPressed === 'START' ? '#5c5c5b' : '#6c6c6b',
          }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Start"
          disabled={disabled}
        />
        <span className="text-[7px] text-[#4a4a4a] font-bold mt-2 select-none">START</span>
      </div>
    </div>
  );
}

/**
 * Speaker Grills Component
 */
export function SpeakerGrills() {
  return (
    <div className="flex flex-col gap-1.5 -rotate-[25deg]">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-1.5">
          {[...Array(i < 3 ? i + 1 : 6 - i)].map((_, j) => (
            <div key={j} className="w-[5px] h-[12px] bg-[#4a4a4a] rounded-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
