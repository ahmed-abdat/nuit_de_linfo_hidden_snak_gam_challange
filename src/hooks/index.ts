/**
 * Hooks barrel exports
 * Re-exports all custom hooks for cleaner imports
 */

export { useRetroSounds } from './useRetroSounds';
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useReducedMotion,
  useIsTouchDevice,
} from './useMediaQuery';
export {
  usePerformanceMonitor,
  useQualityLevel,
  useIsLagging,
  setQualityLevel,
  resetQualityLevel,
  type QualityLevel,
} from './usePerformanceMonitor';
