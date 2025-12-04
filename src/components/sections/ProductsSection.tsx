'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { toast } from 'sonner';
import Shuffle from '@/components/Shuffle';
import { DesktopOnly } from '@/components/DesktopOnly';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { products } from '@/data/products';
import type { Product } from '@/types';
import {
  FADE_IN_UP,
  FADE_IN_UP_30,
  FADE_IN_UP_VISIBLE,
  VIEWPORT_ONCE,
  PRODUCT_HOVER,
  BUTTON_HOVER_GLOW_STRONG,
  TAP_SCALE,
} from '@/constants';

const handleViewAllProducts = () => {
  toast('Bientot disponible !', {
    description: 'Notre catalogue complet arrive tres prochainement.',
    duration: 3000,
  });
};

// Lazy load heavy components
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
            Nos Produits
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight">
            <Shuffle
              text="BEST SELLERS"
              className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-5xl font-black"
              shuffleTimes={2}
              duration={0.35}
              stagger={0.025}
              colorFrom="#06b6d4"
              colorTo="#22d3ee"
              triggerOnHover={true}
            />
          </h2>
          <p className="text-slate-400">
            Des pieces authentiques, restaurees avec passion et garanties.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={FADE_IN_UP_30}
              whileInView={FADE_IN_UP_VISIBLE}
              viewport={VIEWPORT_ONCE}
              transition={{ delay: index * 0.05 }}
              whileHover={PRODUCT_HOVER}
              onClick={() => handleProductClick(product)}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-900/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                    product.badge === 'rare' ? 'bg-amber-500 text-white' :
                    product.badge === 'bestseller' ? 'bg-emerald-500 text-white' :
                    product.badge === 'new' ? 'bg-cyan-500 text-white' :
                    product.badge === 'limited' ? 'bg-orange-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {product.badge === 'rare' ? 'Rare' :
                     product.badge === 'bestseller' ? 'Best-seller' :
                     product.badge === 'new' ? 'Nouveau' :
                     product.badge === 'limited' ? 'Edition Limitee' :
                     'Promo'}
                  </span>
                )}
                {product.stock === 'low_stock' && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white rounded-full text-[10px] font-bold animate-pulse">
                    Stock faible
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-bold">
                    Voir details
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1 font-medium">
                  {product.category === 'console' ? 'Console' :
                   product.category === 'cartridge' ? 'Cartouche' :
                   product.category === 'accessory' ? 'Accessoire' :
                   'Collection'}
                </p>
                <h3 className="font-bold text-white mb-1">{product.name}</h3>
                {product.subtitle && (
                  <p className="text-sm text-slate-400 mb-3">{product.subtitle}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white">{product.price}€</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">{product.originalPrice}€</span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm text-slate-400">{product.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={FADE_IN_UP}
          whileInView={FADE_IN_UP_VISIBLE}
          viewport={VIEWPORT_ONCE}
          className="text-center mt-12"
        >
          <DesktopOnly
            fallback={
              <motion.button
                onClick={handleViewAllProducts}
                whileTap={TAP_SCALE}
                className="inline-flex items-center gap-2 border-2 border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-full font-bold hover:bg-cyan-500/10 transition-all"
              >
                Voir Tous les Produits
                <ArrowRight size={18} />
              </motion.button>
            }
          >
            <ClickSpark sparkColor="#22d3ee" sparkCount={10} sparkRadius={50} duration={500}>
              <Magnet padding={30} magnetStrength={1.5}>
                <motion.button
                  onClick={handleViewAllProducts}
                  whileHover={BUTTON_HOVER_GLOW_STRONG}
                  whileTap={TAP_SCALE}
                  className="inline-flex items-center gap-2 border-2 border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-full font-bold hover:bg-cyan-500/10 transition-all"
                >
                  Voir Tous les Produits
                  <ArrowRight size={18} />
                </motion.button>
              </Magnet>
            </ClickSpark>
          </DesktopOnly>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default ProductsSection;
