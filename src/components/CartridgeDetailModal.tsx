'use client';

import { motion } from 'framer-motion';
import { Calendar, User, History, Lightbulb, TrendingUp, Gamepad2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { ExtendedCartridgeData } from '@/data/cartridges';

interface CartridgeDetailModalProps {
  cartridge: ExtendedCartridgeData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CartridgeDetailModal({ cartridge, isOpen, onClose }: CartridgeDetailModalProps) {
  if (!cartridge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        {/* Header with cartridge color */}
        <div
          className="p-4 pb-3"
          style={{
            background: `linear-gradient(135deg, ${cartridge.color}20, ${cartridge.labelColor}10)`,
            borderBottom: `2px solid ${cartridge.labelColor}40`
          }}
        >
          <DialogHeader className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: cartridge.labelColor }}
              >
                <Gamepad2 size={16} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-black text-white">
                  {cartridge.title}
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-sm">
                  {cartridge.subtitle}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Meta info row */}
          <div className="flex flex-wrap gap-2 mt-3">
            {cartridge.year && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700">
                <Calendar size={10} />
                {cartridge.year}
              </span>
            )}
            {cartridge.developer && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700">
                <User size={10} />
                {cartridge.developer}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* History */}
          {cartridge.history && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                <History size={12} />
                Histoire
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {cartridge.history}
              </p>
            </motion.div>
          )}

          {/* Fun Fact */}
          {cartridge.funFact && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                <Lightbulb size={12} />
                Le saviez-vous ?
              </div>
              <p className="text-amber-200/90 text-xs leading-relaxed">
                {cartridge.funFact}
              </p>
            </motion.div>
          )}

          {/* Sales Info */}
          {cartridge.salesInfo && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-emerald-400 text-xs"
            >
              <TrendingUp size={14} />
              <span className="font-medium">{cartridge.salesInfo}</span>
            </motion.div>
          )}

          {/* Price and hint */}
          <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
            <span className="text-xl font-black text-white">{cartridge.price}</span>
            <span className="text-[10px] text-slate-500 italic">
              Glissez vers la console pour jouer
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CartridgeDetailModal;
