'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  Gamepad2,
  Trophy,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CoffreFortSection } from '@/components/sections/CoffreFortSection';
import { products, collections } from '@/data/products';

// Dynamic imports for components that use window/browser APIs
const RetroGrid = dynamic(() => import('@/components/RetroGrid'), { ssr: false });
const PixelCard = dynamic(() => import('@/components/PixelCard'), { ssr: false });
const CountUp = dynamic(() => import('@/components/CountUp'), { ssr: false });
const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false });
const Noise = dynamic(() => import('@/components/Noise'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });

export default function ArcadePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-900 text-white variant-arcade overflow-hidden">
      {/* Animated RetroGrid Background */}
      <div className="fixed inset-0 z-0">
        <RetroGrid gridColor="#00d4ff" showScanlines={true} glowEffect={true} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
      </div>

      {/* CRT Noise overlay - Arcade aesthetic */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04]">
        <Noise patternAlpha={10} patternRefreshInterval={4} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20">
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
            <Link href="#coffre-fort" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Arcade
            </Link>
            <Link href="#products" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Jeux
            </Link>
            <Link href="#collections" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Collections
            </Link>
            <Link href="#community" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Communaute
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow"
            >
              <span className="flex items-center gap-2">
                <Gamepad2 size={16} />
                Jouer
              </span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-cyan-400"
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
              className="md:hidden bg-slate-900/95 border-b border-cyan-500/20"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <Link href="#coffre-fort" className="text-gray-300 py-2">Arcade</Link>
                <Link href="#products" className="text-gray-300 py-2">Jeux</Link>
                <Link href="#collections" className="text-gray-300 py-2">Collections</Link>
                <Link href="#community" className="text-gray-300 py-2">Communaute</Link>
                <button className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-5 py-3 rounded-full text-sm font-medium">
                  Jouer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with Neon Effects - FIRST */}
      <section className="relative z-10 pt-24 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-cyan-500/30"
            >
              INSERT COIN TO PLAY
            </motion.div>

            <div className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
              <BlurText
                text="LEVEL UP"
                className="text-gradient-arcade"
                delay={50}
                animateBy="letters"
              />
              <BlurText
                text="YOUR COLLECTION"
                className="text-white"
                delay={80}
                animateBy="words"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              Des jeux retro authentiques pour les vrais gamers.
              Chaque cartouche est une nouvelle aventure!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Magnet padding={60} magnetStrength={3}>
                <ClickSpark sparkColor="#00d4ff" sparkCount={10} sparkRadius={45} duration={400}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30"
                  >
                    START GAME
                    <ArrowRight size={20} />
                  </motion.button>
                </ClickSpark>
              </Magnet>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-400/10 transition-colors"
              >
                HIGH SCORES
                <Trophy size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Le Coffre-Fort - Interactive GameBoy Section */}
      <section className="relative z-10">
        <CoffreFortSection variant="arcade" />
      </section>

      {/* Products Grid with Arcade Style */}
      <section id="products" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider animate-neon-pulse">
              SELECT YOUR GAME
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4 text-white">
              JEUX DISPONIBLES
            </h2>
            <p className="text-gray-400">
              Choisis ton aventure parmi notre selection de legendes!
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
                }}
                className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                      product.badge === 'rare' ? 'bg-emerald-500 text-white' :
                      product.badge === 'bestseller' ? 'bg-yellow-500 text-black' :
                      product.badge === 'new' ? 'bg-cyan-500 text-white' :
                      product.badge === 'limited' ? 'bg-cyan-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {product.badge === 'rare' ? '★ RARE' :
                       product.badge === 'bestseller' ? '🔥 HOT' :
                       product.badge === 'new' ? '✨ NEW' :
                       product.badge === 'limited' ? '💎 LIMITED' :
                       '% SALE'}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1 font-bold">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-white text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-black text-cyan-400">{product.price}€</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-cyan-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
                    >
                      ADD
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games with PixelCard */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              TOP PICKS
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4 text-white">
              LEGENDES RETRO
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {products.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <PixelCard variant="blue" className="!w-[280px] !h-[350px]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                    <div className="w-24 h-24 relative mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <h3 className="text-white font-bold text-lg text-center mb-2">{product.name}</h3>
                    <p className="text-cyan-400 text-sm mb-3">{product.category}</p>
                    <span className="text-2xl font-black text-cyan-400">{product.price}€</span>
                  </div>
                </PixelCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections with Arcade Cards */}
      <section id="collections" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
              CHOOSE YOUR PATH
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4 text-white">
              COLLECTIONS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)'
                }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer border-2 border-transparent hover:border-cyan-400 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Pixel corner decoration */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400/50" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400/50" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400/50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400/50" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white/60 text-sm font-bold uppercase tracking-wider">{collection.era}</span>
                  <h3 className="text-white font-black text-3xl mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {collection.description}
                  </p>
                  <button className="text-cyan-400 font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    ENTER →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl p-12 border border-cyan-500/30">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-black text-white mb-6"
                >
                  JOIN THE
                  <span className="text-gradient-arcade block">PLAYER&apos;S CLUB</span>
                </motion.h2>
                <p className="text-gray-400 text-lg mb-8">
                  Rejoins des milliers de joueurs passionnes. Partage tes scores,
                  decouvre des perles rares, et vis la nostalgie ensemble!
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-black text-cyan-400">
                      <CountUp to={10000} duration={2} separator="," />+
                    </div>
                    <div className="text-gray-500 text-sm font-bold">PLAYERS</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-black text-cyan-400">
                      <CountUp to={50000} duration={2.5} separator="," />+
                    </div>
                    <div className="text-gray-500 text-sm font-bold">GAMES</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-black text-cyan-400">∞</div>
                    <div className="text-gray-500 text-sm font-bold">FUN</div>
                  </motion.div>
                </div>

                <Magnet padding={80} magnetStrength={3}>
                  <ClickSpark sparkColor="#00d4ff" sparkCount={12} sparkRadius={50} duration={500}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30"
                    >
                      JOIN NOW
                      <Gamepad2 size={20} />
                    </motion.button>
                  </ClickSpark>
                </Magnet>
              </div>

              <div className="relative h-[400px]">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/hero/gameboy-pastel.png"
                    alt="Game Boy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 py-16 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Retro<span className="text-cyan-400">Collect</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} RetroCollect. GAME OVER? NEVER!
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Discord</a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Twitch</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
