'use client';

import Image from 'next/image';
import { Star, Calendar, Package, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Product } from '@/types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const conditionLabels = {
  mint: 'Neuf',
  excellent: 'Excellent',
  good: 'Bon',
};

const conditionColors = {
  mint: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  excellent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  good: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
};

const stockLabels = {
  in_stock: 'En stock',
  low_stock: 'Stock faible',
  out_of_stock: 'Rupture',
};

const stockColors = {
  in_stock: 'text-emerald-400',
  low_stock: 'text-amber-400',
  out_of_stock: 'text-red-400',
};

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-slate-700/50 bg-slate-900/95 backdrop-blur-xl">
        {/* Compact header with small image */}
        <div className="flex gap-4 p-4 pb-0">
          {/* Small product image */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="96px"
              className="object-cover"
            />
            {product.badge && (
              <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                product.badge === 'rare' ? 'bg-amber-500 text-white' :
                product.badge === 'bestseller' ? 'bg-emerald-500 text-white' :
                product.badge === 'new' ? 'bg-cyan-500 text-white' :
                product.badge === 'limited' ? 'bg-orange-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {product.badge === 'rare' ? 'Rare' :
                 product.badge === 'bestseller' ? 'Best' :
                 product.badge === 'new' ? 'New' :
                 product.badge === 'limited' ? 'Ltd' :
                 'Sale'}
              </span>
            )}
          </div>

          {/* Title and basic info */}
          <DialogHeader className="text-left flex-1 space-y-1">
            <p className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
              {product.category === 'console' ? 'Console' :
               product.category === 'cartridge' ? 'Cartouche' :
               product.category === 'accessory' ? 'Accessoire' :
               'Collection'}
            </p>
            <DialogTitle className="text-lg font-black text-white leading-tight">
              {product.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Details du produit {product.name}
            </DialogDescription>
            {product.subtitle && (
              <p className="text-slate-400 text-sm">{product.subtitle}</p>
            )}
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-amber-400 font-medium">{product.rating}</span>
                {product.reviewCount && (
                  <span className="text-slate-500">({product.reviewCount} avis)</span>
                )}
              </div>
            )}
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          {/* Meta badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${conditionColors[product.condition]}`}>
              <Check size={10} />
              {conditionLabels[product.condition]}
            </span>
            {product.year && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-slate-400 bg-slate-800 border border-slate-700">
                <Calendar size={10} />
                {product.year}
              </span>
            )}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 border border-slate-700 ${stockColors[product.stock]}`}>
              <Package size={10} />
              {stockLabels[product.stock]}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-xs mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{product.price}€</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">{product.originalPrice}€</span>
                )}
              </div>
              {product.originalPrice && (
                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailModal;
