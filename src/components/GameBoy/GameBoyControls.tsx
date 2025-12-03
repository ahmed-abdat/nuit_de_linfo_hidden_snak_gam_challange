'use client';

import { motion } from 'framer-motion';
import type { Direction } from './types';

/**
 * GameBoyControls - D-pad and action buttons for the GameBoy
 * Separated for better maintainability and reusability
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
  const handlePress = (dir: Direction) => {
    if (!disabled) {
      onPress(dir);
    }
  };

  const buttonClasses = "bg-[#2c2c2c] hover:bg-[#3c3c3c] cursor-pointer touch-manipulation";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="relative w-[90px] h-[90px] md:w-[95px] md:h-[95px]">
      {/* Up Button */}
      <motion.button
        onClick={() => handlePress('UP')}
        onTouchStart={(e) => { e.stopPropagation(); handlePress('UP'); }}
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
        onClick={() => handlePress('DOWN')}
        onTouchStart={(e) => { e.stopPropagation(); handlePress('DOWN'); }}
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
        onClick={() => handlePress('LEFT')}
        onTouchStart={(e) => { e.stopPropagation(); handlePress('LEFT'); }}
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
        onClick={() => handlePress('RIGHT')}
        onTouchStart={(e) => { e.stopPropagation(); handlePress('RIGHT'); }}
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
  const buttonClasses = "bg-[#9c1b4d] rounded-full shadow-lg border-2 border-[#7a1540] hover:bg-[#ac2b5d] cursor-pointer touch-manipulation";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="flex gap-4 -rotate-[25deg]">
      {/* B Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={onBPress}
          onTouchStart={(e) => { e.stopPropagation(); onBPress(); }}
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
        <span className="text-[9px] text-[#4a4a4a] font-bold mt-1">B</span>
      </div>

      {/* A Button */}
      <div className="flex flex-col items-center -mt-5">
        <motion.button
          onClick={onAPress}
          onTouchStart={(e) => { e.stopPropagation(); onAPress(); }}
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
        <span className="text-[9px] text-[#4a4a4a] font-bold mt-1">A</span>
      </div>
    </div>
  );
}

/**
 * Start/Select Buttons Component
 */
export function StartSelectButtons({ onStartPress, onSelectPress, buttonPressed, disabled = false }: StartSelectProps) {
  const buttonClasses = "bg-[#6c6c6b] rounded-full shadow-inner -rotate-[25deg] hover:bg-[#7c7c7b] cursor-pointer touch-manipulation";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div className="flex gap-8">
      {/* SELECT Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={onSelectPress}
          onTouchStart={(e) => { e.stopPropagation(); onSelectPress(); }}
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
        <span className="text-[7px] text-[#4a4a4a] font-bold mt-2">SELECT</span>
      </div>

      {/* START Button */}
      <div className="flex flex-col items-center">
        <motion.button
          onClick={onStartPress}
          onTouchStart={(e) => { e.stopPropagation(); onStartPress(); }}
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
        <span className="text-[7px] text-[#4a4a4a] font-bold mt-2">START</span>
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
