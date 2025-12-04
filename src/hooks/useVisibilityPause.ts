'use client';

import { useEffect, useCallback } from 'react';

/**
 * Hook to pause/resume based on page visibility.
 * Saves battery by pausing animations when tab is hidden.
 *
 * @param onHide - Called when page becomes hidden
 * @param onShow - Called when page becomes visible
 */
export function useVisibilityPause(
  onHide: () => void,
  onShow: () => void
) {
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      onHide();
    } else {
      onShow();
    }
  }, [onHide, onShow]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
}

export default useVisibilityPause;
