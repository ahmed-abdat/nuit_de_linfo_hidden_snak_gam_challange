'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Shield, Zap, Trophy } from 'lucide-react';
import CountUp from '@/components/CountUp';
import Shuffle from '@/components/Shuffle';
import { useQualityLevel } from '@/hooks';
import {
  FADE_IN_UP,
  FADE_IN_UP_VISIBLE,
  VIEWPORT_ONCE,
} from '@/constants';

// Lazy load Squares - only on high quality
const Squares = dynamic(() => import('@/components/Squares'), { ssr: false });

export function FeaturesSection() {
  const qualityLevel = useQualityLevel();
  const showSquares = qualityLevel === 'high';

  return (
    <section id="restauration" className="relative z-10 py-24 overflow-hidden">
      {/* Animated Squares Background - only on high quality */}
      {showSquares && (
        <div className="absolute inset-0 opacity-30">
          <Squares
            direction="diagonal"
            speed={0.3}
            borderColor="rgba(6, 182, 212, 0.3)"
            squareSize={50}
            hoverFillColor="rgba(6, 182, 212, 0.1)"
            targetFps={20}
          />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={FADE_IN_UP}
          whileInView={FADE_IN_UP_VISIBLE}
          viewport={VIEWPORT_ONCE}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
            Pourquoi Nous Choisir
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight">
            <Shuffle
              text="GAMING PREMIUM"
              className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-5xl font-black"
              shuffleTimes={2}
              duration={0.4}
              stagger={0.02}
              colorFrom="#06b6d4"
              colorTo="#22d3ee"
              triggerOnHover={true}
            />
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Authenticité Garantie</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Chaque jeu passe notre processus d&apos;authentification en 12 points.
                Aucune reproduction, uniquement des originaux vérifiés.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">
                    <CountUp to={12} duration={2} />
                  </div>
                  <div className="text-xs text-slate-400 uppercase">Points</div>
                </div>
                <div className="w-px h-12 bg-slate-700" />
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-400">0%</div>
                  <div className="text-xs text-slate-400 uppercase">Faux</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-500/10 to-cyan-400/10 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-6 flex flex-col justify-between"
          >
            <Zap className="w-10 h-10 text-cyan-400 mb-4" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Restauration Pro</h3>
              <p className="text-slate-400 text-sm">Nettoyage contacts, batterie neuve, test complet.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between"
          >
            <Trophy className="w-10 h-10 text-amber-400 mb-4" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Raretés</h3>
              <p className="text-slate-400 text-sm">Éditions limitées et pièces de collection.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 flex items-center justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Garantie 90 Jours</h3>
              <p className="text-slate-400">Satisfait ou remboursé, sans questions.</p>
            </div>
            <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              90j
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
