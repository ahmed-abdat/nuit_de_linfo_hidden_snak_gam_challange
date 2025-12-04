'use client';

import { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks';

/**
 * Mobile Experience Notice
 * Shows a friendly notification on mobile devices suggesting
 * to visit on desktop for the full animated experience.
 *
 * Only shows once per session (uses sessionStorage).
 */
export function MobileExperienceNotice() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show on mobile and if not already dismissed this session
    if (isMobile && !sessionStorage.getItem('mobile-notice-dismissed')) {
      // Small delay to not interrupt initial page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('mobile-notice-dismissed', 'true');
  };

  // Don't render anything on desktop
  if (!isMobile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleDismiss}>
      <DialogContent className="max-w-[340px] rounded-2xl border-cyan-500/30 bg-slate-900/95 backdrop-blur-xl">
        <DialogHeader className="text-center space-y-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
            className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
          >
            <Monitor className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <DialogTitle className="text-xl font-bold text-white">
            Experience Complete
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-slate-400 text-sm leading-relaxed">
            Pour profiter de toutes les animations et effets visuels,
            visitez notre site sur <span className="text-cyan-400 font-medium">ordinateur</span>.
          </DialogDescription>

          {/* Subtext */}
          <p className="text-xs text-slate-500">
            Le site reste entierement fonctionnel sur mobile.
          </p>
        </DialogHeader>

        {/* Dismiss button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleDismiss}
          className="w-full mt-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-medium transition-colors"
        >
          Continuer sur mobile
        </motion.button>
      </DialogContent>
    </Dialog>
  );
}

export default MobileExperienceNotice;
