'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  ShoppingCart,
  Search,
  Star,
  Heart,
  Menu,
  X,
  Truck,
  Shield,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GameBoy } from '@/components/GameBoy';
import { Cartridge } from '@/components/Cartridge';
import { products, collections, reviews } from '@/data/products';
import { cartridges } from '@/data/cartridges';
import { TestimonialSlider } from '@/components/TestimonialSlider';

// Dynamic imports for components that use browser APIs
const CountUp = dynamic(() => import('@/components/CountUp'), { ssr: false });

export default function ModernPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [activeCartridge, setActiveCartridge] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isNearDropZone, setIsNearDropZone] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Handle cartridge insertion
  const handleCartridgeInsert = useCallback((cartridgeId: string) => {
    setActiveCartridge(cartridgeId);
    setIsDragging(false);
    setIsNearDropZone(false);
  }, []);

  // Handle cartridge eject
  const handleCartridgeEject = useCallback(() => {
    setActiveCartridge(null);
  }, []);

  // Check if point is near drop zone
  const checkNearDropZone = useCallback((x: number, y: number) => {
    if (!dropZoneRef.current) return false;
    const rect = dropZoneRef.current.getBoundingClientRect();
    const threshold = 100;
    return (
      x >= rect.left - threshold &&
      x <= rect.right + threshold &&
      y >= rect.top - threshold &&
      y <= rect.bottom + threshold
    );
  }, []);

  // Check if point is inside drop zone
  const checkInsideDropZone = useCallback((x: number, y: number) => {
    if (!dropZoneRef.current) return false;
    const rect = dropZoneRef.current.getBoundingClientRect();
    return (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    );
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 variant-modern">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/retro_logo.webp"
              alt="RetroCollect"
              width={220}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#products" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Produits
            </Link>
            <Link href="#gameboy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Game Boy
            </Link>
            <Link href="#categories" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Categories
            </Link>
            <Link href="#reviews" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Avis
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-2">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors p-2 relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Connexion
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <Link href="#products" className="text-gray-600 py-2">Produits</Link>
                <Link href="#gameboy" className="text-gray-600 py-2">Game Boy</Link>
                <Link href="#categories" className="text-gray-600 py-2">Categories</Link>
                <Link href="#reviews" className="text-gray-600 py-2">Avis</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section - Clean e-commerce style */}
      <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full" />
                Nouvelle Collection
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-gray-900">
                Votre Destination
                <span className="text-blue-600 block">Retro Gaming</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Decouvrez notre selection de jeux retro authentiques,
                consoles restaurees et accessoires vintage.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  Voir la Collection
                  <ArrowRight size={18} />
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Truck, text: 'Livraison Gratuite' },
                  { icon: Shield, text: 'Paiement Securise' },
                  { icon: RefreshCw, text: 'Retours 30 Jours' },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <badge.icon size={16} className="text-blue-600" />
                    <span className="text-sm">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                <Image
                  src="/images/collections/classic-cartridges.png"
                  alt="Retro Gaming Collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8"
                  priority
                />
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">
                  <CountUp to={500} duration={2} />+
                </div>
                <div className="text-sm text-gray-500">Produits</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-500">Note moyenne</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Produits Populaires
              </h2>
              <p className="text-gray-600">
                Nos articles les plus apprecies
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.badge === 'rare' ? 'bg-purple-100 text-purple-700' :
                      product.badge === 'bestseller' ? 'bg-green-100 text-green-700' :
                      product.badge === 'new' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {product.badge === 'rare' ? 'Rare' :
                       product.badge === 'bestseller' ? 'Best-seller' :
                       product.badge === 'new' ? 'Nouveau' : 'Limite'}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{product.price}€</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Ajouter
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Boy Interactive Section - Cartridges ABOVE GameBoy */}
      <section id="gameboy" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Testez Nos Jeux
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Glissez une cartouche vers la console pour la tester.
              Trouvez la bonne cartouche pour deverrouiller le jeu !
            </p>
          </motion.div>

          {/* Vertical Layout: Cartridges on TOP, GameBoy BELOW */}
          <div className="flex flex-col items-center gap-6">

            {/* Cartridge Row - ABOVE GameBoy */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              {/* Hint text */}
              <p className="text-center text-sm mb-4 font-medium text-blue-600/80">
                {activeCartridge
                  ? '↓ Cartouche inseree - Cliquez sur ejecter pour changer'
                  : '↓ Glissez une cartouche vers le bas ou cliquez dessus'}
              </p>

              {/* Cartridge Grid - Horizontal row */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {cartridges.map((cartridge, index) => (
                  <motion.div
                    key={cartridge.id}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Cartridge
                      {...cartridge}
                      isInserted={activeCartridge === cartridge.id}
                      onDragStart={() => setIsDragging(true)}
                      onDrag={(x, y) => {
                        setIsNearDropZone(checkNearDropZone(x, y));
                      }}
                      onDragEnd={(x, y) => {
                        if (checkInsideDropZone(x, y)) {
                          handleCartridgeInsert(cartridge.id);
                        }
                        setIsDragging(false);
                        setIsNearDropZone(false);
                      }}
                      onTap={() => {
                        if (activeCartridge === cartridge.id) {
                          handleCartridgeEject();
                        } else {
                          handleCartridgeInsert(cartridge.id);
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Arrow indicator when dragging */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    y: { repeat: Infinity, duration: 0.8 },
                    opacity: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center text-blue-500"
                >
                  <ChevronDown className="w-8 h-8" />
                  <span className="text-sm font-medium">Deposez ici</span>
                  <ChevronDown className="w-8 h-8 -mt-2" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* GameBoy with Drop Zone - BELOW cartridges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Large Drop Zone Indicator - on top of GameBoy */}
              <div
                ref={dropZoneRef}
                className={`absolute -top-8 left-1/2 -translate-x-1/2 w-[180px] h-[50px] rounded-xl border-3 border-dashed transition-all duration-300 z-10 flex items-center justify-center ${
                  isDragging
                    ? isNearDropZone
                      ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.6)] scale-110'
                      : 'border-gray-400 bg-gray-400/10 animate-pulse'
                    : 'border-transparent'
                }`}
              >
                {isDragging && isNearDropZone && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-bold text-blue-600"
                  >
                    LACHER ICI!
                  </motion.span>
                )}
              </div>

              <GameBoy
                activeCartridge={activeCartridge}
                onCartridgeEject={handleCartridgeEject}
              />

              {/* Eject hint - only shows for correct cartridge (since wrong ones auto-eject) */}
              <AnimatePresence>
                {activeCartridge && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-center text-gray-500 whitespace-nowrap"
                  >
                    Cliquez sur une autre cartouche pour changer
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Keyboard hint for desktop */}
            {activeCartridge && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs mt-4 text-gray-500"
              >
                Clavier: Fleches/WASD = Deplacer | P/Echap = Pause | R = Reset
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Parcourir par Categorie
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-white/70 text-sm mb-1">{collection.era}</span>
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {collection.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-white font-medium text-sm">
                    Explorer
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce Qu&apos;en Pensent Nos Clients
            </h2>
          </div>

          <TestimonialSlider
            reviews={reviews.map(review => ({
              ...review,
              thumbnailSrc: review.imageSrc
            }))}
            className="bg-white rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-4">
                <Image
                  src="/retro_logo.webp"
                  alt="RetroCollect"
                  width={200}
                  height={55}
                  className="h-14 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Votre destination pour le retro gaming authentique.
              </p>
            </div>

            {[
              { title: 'Boutique', links: ['Consoles', 'Cartouches', 'Accessoires'] },
              { title: 'Support', links: ['Livraison', 'Retours', 'FAQ'] },
              { title: 'Legal', links: ['Mentions Legales', 'Confidentialite', 'CGV'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RetroCollect. Tous droits reserves.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
