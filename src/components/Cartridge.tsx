'use client';

import { motion, useMotionValue, useSpring, useTransform, PanInfo } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CartridgeProps {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  color: string;
  labelColor: string;
  isSecret?: boolean;
  isInserted?: boolean;
  onDragStart?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: (x: number, y: number) => void;
  onTap?: () => void;
}

export function Cartridge({
  id,
  title,
  subtitle,
  price,
  description,
  color,
  labelColor,
  isSecret = false,
  isInserted = false,
  onDragStart,
  onDrag,
  onDragEnd,
  onTap,
}: CartridgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Detect mobile
  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

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
    if (onDragEnd) {
      onDragEnd(info.point.x, info.point.y);
    }
    document.body.style.cursor = 'default';
  };

  // Don't render if inserted
  if (isInserted) {
    return null;
  }

  return (
    <motion.div
      ref={cardRef}
      drag={!isMobile}
      dragSnapToOrigin
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        document.body.style.cursor = 'grabbing';
        onDragStart?.();
      }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (isMobile) {
          onTap?.();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      whileHover={!isMobile ? { scale: 1.05, y: -8 } : undefined}
      whileDrag={{ scale: 1.1, zIndex: 100, rotate: 2 }}
      whileTap={isMobile ? { scale: 0.95 } : undefined}
      style={{
        rotateX: !isMobile ? rotateX : 0,
        rotateY: !isMobile ? rotateY : 0,
      }}
      className={cn(
        'relative w-[120px] md:w-[140px] cursor-grab active:cursor-grabbing select-none',
        '[perspective:1000px] transform-gpu',
        isSecret && 'animate-pulse-subtle'
      )}
    >
      {/* Cartridge Body */}
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
          {/* Secret cartridge glitch effect */}
          {isSecret && (
            <>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
              <motion.div
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  x: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </>
          )}

          {/* Game Title */}
          <div className="relative text-center">
            <div
              className={cn(
                'font-bold text-xs md:text-sm text-white drop-shadow-sm',
                isSecret && 'font-mono animate-glitch'
              )}
            >
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
        <div
          className={cn(
            'text-xs font-semibold',
            isSecret ? 'text-amber-400' : 'text-gray-300'
          )}
        >
          {price}
        </div>
      </div>

      {/* Hover tooltip */}
      {isHovering && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs p-2 rounded-lg shadow-lg whitespace-nowrap z-50"
        >
          <p className="font-medium">{isSecret ? 'Inserez a vos risques...' : description}</p>
          {!isSecret && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
