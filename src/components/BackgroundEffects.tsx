'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile, useReducedMotion, usePerformanceMonitor } from '@/hooks';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

// Lazy load heavy background components - DESKTOP ONLY
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
 * SVG-based grid pattern for mobile - pure SVG, zero JS animation loops
 * Much lighter than canvas-based RetroGrid
 */
function MobileBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0a] via-[#0d1d0d] to-[#0f1f0f]" />

      {/* Magic UI Grid Pattern - pure SVG, very lightweight */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          'absolute inset-0 h-full w-full',
          'fill-cyan-500/5 stroke-cyan-500/10',
          '[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]'
        )}
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}

/**
 * Background effects container with ADAPTIVE performance optimization
 *
 * Quality levels:
 * - DESKTOP HIGH: All effects (Dither + RetroGrid + Noise)
 * - DESKTOP MEDIUM: Dither + RetroGrid (no Noise)
 * - MOBILE: CSS-only grid pattern (zero canvas, zero CPU)
 * - LOW/LAGGING: Static gradient only
 *
 * Mobile uses pure CSS for maximum performance.
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

  // MOBILE: Use CSS-only background (no canvas animations)
  if (isMobile) {
    return <MobileBackground />;
  }

  // DESKTOP: Use full canvas effects
  const isHighQuality = qualityLevel === 'high';
  const retroGridFps = isHighQuality ? 30 : 20;
  const ditherPixelSize = isHighQuality ? 3 : 4;
  const ditherWaveSpeed = isHighQuality ? 0.03 : 0.02;

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

      {/* RetroGrid overlay */}
      {showRetroGrid && !isLagging && (
        <div className="fixed inset-0 z-0 opacity-50">
          <RetroGrid targetFps={retroGridFps} />
        </div>
      )}

      {/* CRT Noise overlay - only on high quality */}
      {showNoise && isHighQuality && !isLagging && (
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]">
          <Noise patternAlpha={8} patternRefreshInterval={5} />
        </div>
      )}
    </>
  );
});

export default BackgroundEffects;
