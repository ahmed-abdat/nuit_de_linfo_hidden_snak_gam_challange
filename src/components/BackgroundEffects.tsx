'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile, useReducedMotion, usePerformanceMonitor } from '@/hooks';

// Lazy load heavy background components
const Dither = dynamic(() => import('@/components/Dither'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0a1a0a]" />,
});

const RetroGrid = dynamic(() => import('@/components/RetroGrid'), {
  ssr: false,
});

const Noise = dynamic(() => import('@/components/Noise'), {
  ssr: false,
});

interface BackgroundEffectsProps {
  /** Show RetroGrid overlay */
  showRetroGrid?: boolean;
  /** Show CRT noise overlay */
  showNoise?: boolean;
  /** Show Dither WebGL background */
  showDither?: boolean;
}

/**
 * Background effects container with ADAPTIVE performance optimization
 *
 * Quality levels:
 * - HIGH: All effects enabled (Dither + RetroGrid + Noise)
 * - MEDIUM: Dither + RetroGrid (no Noise, reduced FPS)
 * - LOW: Static gradient only (no animations)
 *
 * Automatically detects device lag and adjusts quality in real-time.
 */
const BackgroundEffects = memo(function BackgroundEffects({
  showRetroGrid = true,
  showNoise = true,
  showDither = true,
}: BackgroundEffectsProps) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { qualityLevel, isLagging } = usePerformanceMonitor();

  // Skip all effects if user prefers reduced motion OR quality is low
  if (prefersReducedMotion || qualityLevel === 'low') {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a1a0a] via-[#0d1d0d] to-[#0f1f0f]" />
    );
  }

  // Determine settings based on quality level and device
  const isHighQuality = qualityLevel === 'high' && !isMobile;
  const isMediumQuality = qualityLevel === 'medium' || isMobile;

  // FPS settings based on quality
  const retroGridFps = isHighQuality ? 30 : isMediumQuality ? 15 : 10;
  const ditherPixelSize = isHighQuality ? 3 : 4;
  const ditherWaveSpeed = isHighQuality ? 0.03 : 0.015;

  return (
    <>
      {/* Dither Background - GameBoy Green aesthetic */}
      {showDither && (
        <div className="fixed inset-0 z-0 opacity-30">
          <Dither
            waveColor={[0.06, 0.78, 0.64]}
            waveSpeed={ditherWaveSpeed}
            waveFrequency={2}
            waveAmplitude={0.4}
            colorNum={4}
            pixelSize={ditherPixelSize}
            enableMouseInteraction={isHighQuality && !isLagging}
            mouseRadius={0.8}
          />
        </div>
      )}

      {/* RetroGrid overlay - disabled on low quality or when lagging */}
      {showRetroGrid && !isLagging && (
        <div className="fixed inset-0 z-0 opacity-50">
          <RetroGrid targetFps={retroGridFps} />
        </div>
      )}

      {/* CRT Noise overlay - only on high quality desktop */}
      {showNoise && isHighQuality && !isLagging && (
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]">
          <Noise patternAlpha={8} patternRefreshInterval={5} />
        </div>
      )}
    </>
  );
});

export default BackgroundEffects;
