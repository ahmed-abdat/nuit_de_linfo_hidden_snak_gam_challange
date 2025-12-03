'use client';
import { motion } from 'framer-motion';
import { GameBoy } from './GameBoy';
import { ChevronDown, Gamepad2, Zap, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f9fa] via-[#e8f5e9] to-[#c8e6c9] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-[#9bbc0f]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#306230]/10 text-[#306230] px-4 py-2 rounded-full text-sm font-medium"
            >
              <Gamepad2 size={16} />
              Nuit de l&apos;Info 2025
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900 dark:text-white">Revivez la</span>
              <br />
              <span className="bg-gradient-to-r from-[#9bbc0f] via-[#306230] to-[#0f380f] bg-clip-text text-transparent">
                Nostalgie
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">du Gaming</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Plongez dans l&apos;univers rétro du Game Boy et jouez au classique Snake
              directement dans votre navigateur. Une expérience authentique,
              pixel par pixel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#game"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#306230] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0f380f] transition-colors shadow-lg shadow-[#306230]/30"
              >
                <Zap size={20} />
                Jouer Maintenant
              </motion.a>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 border-2 border-[#306230] text-[#306230] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#306230]/10 transition-colors"
              >
                En Savoir Plus
              </motion.a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[#306230]">1989</div>
                <div className="text-sm text-gray-500">Année de création</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#306230]">118M+</div>
                <div className="text-sm text-gray-500">Unités vendues</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#306230]">1000+</div>
                <div className="text-sm text-gray-500">Jeux disponibles</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Game Boy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
            id="game"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#9bbc0f]/30 blur-3xl rounded-full scale-75" />

              {/* Game Boy */}
              <GameBoy />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
              >
                <Trophy className="text-yellow-500" size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg"
              >
                <span className="text-2xl">🎮</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm">Scroll</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
