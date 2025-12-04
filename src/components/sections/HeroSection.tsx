'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, Gamepad2, Shield, Star } from 'lucide-react';
import BlurText from '@/components/BlurText';
import CountUp from '@/components/CountUp';
import { DesktopOnly } from '@/components/DesktopOnly';
import { galleryItems } from '@/data/products';
import {
  FADE_IN_UP,
  FADE_IN_UP_VISIBLE,
  FADE_IN_RIGHT,
  FADE_IN_RIGHT_VISIBLE,
  BUTTON_HOVER_GLOW,
  TAP_SCALE,
  HOVER_SCALE,
  GALLERY_TRANSITION,
} from '@/constants';

// Lazy load heavy components
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });

// Lazy load CircularGallery - only on desktop
const CircularGallery = dynamic(
  () => import('@/components/CircularGallery2').then(mod => ({ default: mod.CircularGallery })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-20 flex items-center overflow-x-clip">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Animated Text */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={FADE_IN_UP}
              animate={FADE_IN_UP_VISIBLE}
              className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 md:mb-8"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
              />
              INSEREZ UNE PIECE
            </motion.div>

            {/* Animated Title with BlurText */}
            <div className="mb-4 sm:mb-6">
              <BlurText
                text="ELEVEZ"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent"
                delay={40}
                animateBy="letters"
                direction="bottom"
                threshold={0.01}
              />
              <BlurText
                text="VOTRE COLLECTION"
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mt-1 sm:mt-2"
                delay={60}
                animateBy="words"
                direction="bottom"
                threshold={0.01}
              />
            </div>

            <motion.p
              initial={FADE_IN_UP}
              animate={FADE_IN_UP_VISIBLE}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-slate-400 mb-6 sm:mb-8 leading-relaxed"
            >
              Jeux vintage premium, authentifiés et restaurés avec passion.
              Découvrez le <span className="text-cyan-400 font-semibold">secret caché</span> dans notre console interactive.
            </motion.p>

            {/* CTAs with Magnet - Desktop only for effects */}
            <ClickSpark sparkColor="#22d3ee" sparkCount={8} sparkRadius={40} duration={400}>
              <motion.div
                initial={FADE_IN_UP}
                animate={FADE_IN_UP_VISIBLE}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
              >
                <DesktopOnly
                fallback={
                  <motion.a
                    href="#coffre-fort"
                    whileTap={TAP_SCALE}
                    className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    <Gamepad2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Jouer Maintenant
                  </motion.a>
                }
              >
                <Magnet padding={40} magnetStrength={2}>
                  <motion.a
                    href="#coffre-fort"
                    whileHover={BUTTON_HOVER_GLOW}
                    whileTap={TAP_SCALE}
                    className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    <Gamepad2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Jouer Maintenant
                  </motion.a>
                </Magnet>
              </DesktopOnly>

              <DesktopOnly
                fallback={
                  <motion.a
                    href="#products"
                    whileTap={TAP_SCALE}
                    className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:text-white hover:border-cyan-500/50 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
                  >
                    Explorer
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </motion.a>
                }
              >
                <Magnet padding={40} magnetStrength={2}>
                  <motion.a
                    href="#products"
                    whileHover={HOVER_SCALE}
                    whileTap={TAP_SCALE}
                    className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:text-white hover:border-cyan-500/50 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
                  >
                    Explorer
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </motion.a>
                </Magnet>
              </DesktopOnly>
              </motion.div>
            </ClickSpark>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between sm:justify-start gap-6 sm:gap-8 md:gap-12"
            >
              {[
                { value: 500, suffix: '+', label: 'Jeux', icon: Gamepad2 },
                { value: 100, suffix: '%', label: 'Authentiques', icon: Shield },
                { value: 4.9, label: 'Avis', icon: Star, decimals: 1 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center flex-1 sm:flex-none"
                >
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-xl sm:text-2xl md:text-3xl font-black text-white">
                    <CountUp
                      to={stat.value}
                      duration={2}
                    />
                    {stat.suffix && <span className="text-cyan-400">{stat.suffix}</span>}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5 sm:mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Animated 3D Gallery */}
          <motion.div
            initial={FADE_IN_RIGHT}
            animate={FADE_IN_RIGHT_VISIBLE}
            transition={GALLERY_TRANSITION}
            className="hidden lg:block h-[550px] relative overflow-visible"
          >
            {/* Glow effects - contained within bounds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px]" />
              <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-cyan-400/15 rounded-full blur-[60px]" />
            </div>

            <CircularGallery
              items={galleryItems}
              bend={1.5}
              borderRadius={0.05}
              scrollSpeed={2}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
