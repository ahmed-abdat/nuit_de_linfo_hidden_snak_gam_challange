'use client';

import { useIsMobile } from '@/hooks';
import { ReactNode } from 'react';

interface DesktopOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Wrapper component that only renders children on desktop devices.
 * On mobile, renders the fallback (defaults to null).
 *
 * Use this to disable heavy effects like Magnet, ClickSpark on mobile.
 */
export function DesktopOnly({ children, fallback = null }: DesktopOnlyProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default DesktopOnly;
