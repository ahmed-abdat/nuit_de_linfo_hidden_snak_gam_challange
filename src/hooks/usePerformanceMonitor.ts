'use client';

import { useSyncExternalStore } from 'react';

export type QualityLevel = 'high' | 'medium' | 'low';

interface PerformanceState {
  fps: number;
  qualityLevel: QualityLevel;
  isLagging: boolean;
}

// Thresholds for quality levels
const FPS_HIGH_THRESHOLD = 45; // Above this = high quality
const FPS_MEDIUM_THRESHOLD = 25; // Above this = medium quality
// Below 25 = low quality

// How many consecutive low FPS readings before downgrading
const DOWNGRADE_THRESHOLD = 5;
// How many consecutive good FPS readings before upgrading
const UPGRADE_THRESHOLD = 30;

// Global state for performance monitoring
let performanceState: PerformanceState = {
  fps: 60,
  qualityLevel: 'high',
  isLagging: false,
};

// Cached server snapshot (must be stable reference to avoid infinite loops)
const SERVER_SNAPSHOT: PerformanceState = {
  fps: 60,
  qualityLevel: 'high',
  isLagging: false,
};

const listeners: Set<() => void> = new Set();
let monitoringActive = false;
let frameCount = 0;
let lastTime = performance.now();
let lowFpsCount = 0;
let highFpsCount = 0;
let animationId: number | null = null;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function calculateQualityLevel(fps: number): QualityLevel {
  if (fps >= FPS_HIGH_THRESHOLD) return 'high';
  if (fps >= FPS_MEDIUM_THRESHOLD) return 'medium';
  return 'low';
}

function updatePerformance() {
  frameCount++;
  const now = performance.now();
  const elapsed = now - lastTime;

  // Update FPS every 500ms
  if (elapsed >= 500) {
    const fps = Math.round((frameCount * 1000) / elapsed);
    frameCount = 0;
    lastTime = now;

    const targetQuality = calculateQualityLevel(fps);
    const currentQuality = performanceState.qualityLevel;
    const isLagging = fps < FPS_MEDIUM_THRESHOLD;

    // Downgrade quickly if lagging
    if (targetQuality < currentQuality) {
      lowFpsCount++;
      highFpsCount = 0;

      if (lowFpsCount >= DOWNGRADE_THRESHOLD) {
        performanceState = {
          fps,
          qualityLevel: targetQuality,
          isLagging,
        };
        lowFpsCount = 0;
        notifyListeners();
      }
    }
    // Upgrade slowly when stable
    else if (targetQuality > currentQuality) {
      highFpsCount++;
      lowFpsCount = 0;

      if (highFpsCount >= UPGRADE_THRESHOLD) {
        // Only upgrade one level at a time
        const nextQuality: QualityLevel =
          currentQuality === 'low' ? 'medium' : 'high';
        performanceState = {
          fps,
          qualityLevel: nextQuality,
          isLagging: false,
        };
        highFpsCount = 0;
        notifyListeners();
      }
    }
    // Same quality level - just update FPS
    else if (fps !== performanceState.fps || isLagging !== performanceState.isLagging) {
      lowFpsCount = 0;
      highFpsCount = 0;
      performanceState = {
        ...performanceState,
        fps,
        isLagging,
      };
      notifyListeners();
    }
  }

  if (monitoringActive) {
    animationId = requestAnimationFrame(updatePerformance);
  }
}

function startMonitoring() {
  if (monitoringActive) return;
  monitoringActive = true;
  lastTime = performance.now();
  frameCount = 0;
  animationId = requestAnimationFrame(updatePerformance);
}

function stopMonitoring() {
  monitoringActive = false;
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Start monitoring when first listener subscribes
  if (listeners.size === 1) {
    startMonitoring();
  }

  return () => {
    listeners.delete(listener);

    // Stop monitoring when last listener unsubscribes
    if (listeners.size === 0) {
      stopMonitoring();
    }
  };
}

function getSnapshot(): PerformanceState {
  return performanceState;
}

function getServerSnapshot(): PerformanceState {
  return SERVER_SNAPSHOT;
}

/**
 * Hook to monitor performance and get adaptive quality level
 * Automatically adjusts quality based on device FPS
 */
export function usePerformanceMonitor() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return state;
}

/**
 * Hook to get just the quality level (for simpler usage)
 */
export function useQualityLevel(): QualityLevel {
  const { qualityLevel } = usePerformanceMonitor();
  return qualityLevel;
}

/**
 * Hook to check if currently lagging
 */
export function useIsLagging(): boolean {
  const { isLagging } = usePerformanceMonitor();
  return isLagging;
}

/**
 * Force a specific quality level (useful for user preferences)
 */
export function setQualityLevel(level: QualityLevel) {
  performanceState = {
    ...performanceState,
    qualityLevel: level,
  };
  notifyListeners();
}

/**
 * Reset to auto-detection mode
 */
export function resetQualityLevel() {
  lowFpsCount = 0;
  highFpsCount = 0;
  // Quality will auto-adjust on next FPS check
}
