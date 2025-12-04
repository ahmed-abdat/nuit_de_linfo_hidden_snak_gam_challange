import { useSyncExternalStore, useCallback } from 'react';

/**
 * Hydration-safe media query hook using useSyncExternalStore
 * Prevents hydration mismatches between server and client
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener('change', callback);
      return () => matchMedia.removeEventListener('change', callback);
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Check if device is mobile (< 768px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Check if device is tablet or smaller (< 1024px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}

/**
 * Check if device is desktop (>= 1024px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * Check if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Check if device has touch capability
 */
export function useIsTouchDevice(): boolean {
  const subscribe = useCallback(() => {
    // Touch capability doesn't change, so no need for real subscription
    return () => {};
  }, []);

  const getSnapshot = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
