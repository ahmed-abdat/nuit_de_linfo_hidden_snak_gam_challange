'use client';

import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'framer-motion';
import { useRef, useState, useSyncExternalStore } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartridgeProps {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  color: string;
  labelColor: string;
  isCompatible?: boolean;
  isInserted?: boolean;
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: (x: number, y: number) => void;
  onTap?: () => void;
  onInfoClick?: () => void;
}

// Check for mobile using useSyncExternalStore for hydration safety
const emptySubscribe = () => () => {};
const getIsMobileSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
const getServerSnapshot = () => false;

function useIsMobile() {
  return useSyncExternalStore(emptySubscribe, getIsMobileSnapshot, getServerSnapshot);
}

export function Cartridge({
  id,
  title,
  subtitle,
  price,
  description,
  color,
  labelColor,
  isCompatible = false,
  isInserted = false,
  onDragStart,
  onDrag,
  onDragEnd,
  onTap,
  onInfoClick,
}: CartridgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [-50, 50], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-50, 50], [-10, 10]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (onDrag) {
      onDrag(info.point.x, info.point.y);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    onDragEnd?.(info.point.x, info.point.y);
    document.body.style.cursor = 'default';
  };

  // Keep in DOM to prevent layout shift, but visually indicate insertion
  return (
    // Parent wrapper with perspective (not on draggable element to avoid transform conflicts)
    <div
      className="relative w-[120px] md:w-[140px] h-[140px] md:h-[160px]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        data-cartridge-id={id}
        drag={!isInserted}
        dragSnapToOrigin
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => {
          document.body.style.cursor = 'grabbing';
          setIsDragging(true);
          setIsHovering(false); // Hide tooltip during drag
          onDragStart?.();
        }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={() => {
          // Allow click on both mobile and desktop
          // On desktop, this provides a fallback if drag doesn't work
          onTap?.();
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovering(true)}
        whileHover={!isInserted ? { scale: 1.05, y: -8 } : undefined}
        whileDrag={!isInserted ? { scale: 1.1, zIndex: 100, rotate: 2 } : undefined}
        whileTap={!isInserted ? { scale: 0.95 } : undefined}
        animate={{
          opacity: isInserted ? 0.3 : 1,
          scale: isInserted ? 0.9 : 1,
          y: isInserted ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          rotateX,
          rotateY,
        }}
        className={cn(
          'relative w-full h-full cursor-grab active:cursor-grabbing select-none',
          'transform-gpu will-change-transform'
        )}
      >
      {/* Cartridge Body - No hints about which one works! The snake game is HIDDEN */}
      <div
        className="relative rounded-t-md rounded-b-lg shadow-xl overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {/* Top Grip Lines */}
        <div className="absolute top-1 left-0 right-0 flex justify-center gap-1">
          <div className="w-0.5 h-3 bg-black/20 rounded-full" />
          <div className="w-0.5 h-3 bg-black/20 rounded-full" />
          <div className="w-0.5 h-3 bg-black/20 rounded-full" />
        </div>

        {/* Label Area */}
        <div
          className="mx-2 mt-5 mb-3 p-2 rounded-sm relative overflow-hidden"
          style={{ backgroundColor: labelColor }}
        >
          {/* Info button */}
          {onInfoClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInfoClick();
              }}
              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors z-10"
              aria-label="Voir les details"
            >
              <Info size={10} className="text-white" />
            </button>
          )}
          {/* Game Title */}
          <div className="relative text-center">
            <div className="font-bold text-xs md:text-sm text-white drop-shadow-sm">
              {title}
            </div>
            <div className="text-[8px] md:text-[10px] text-white/80 mt-0.5">
              {subtitle}
            </div>
          </div>
        </div>

        {/* Bottom connector pins area */}
        <div className="h-4 bg-black/30 mx-1 mb-1 rounded-sm flex items-center justify-center gap-0.5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1 h-2 bg-yellow-600/60 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Price Tag */}
      <div className="mt-2 text-center">
        <div className="text-xs font-semibold text-gray-300">
          {price}
        </div>
      </div>

      </motion.div>

      {/* Simple hover tooltip - OUTSIDE motion.div to avoid 3D transform issues */}
      {isHovering && !isMobile && !isDragging && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs p-2 rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
        >
          <p className="font-medium">{description}</p>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
