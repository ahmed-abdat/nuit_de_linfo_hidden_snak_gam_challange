'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { DesktopOnly } from '@/components/DesktopOnly';
import { TAP_SCALE } from '@/constants';

// Lazy load heavy components
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });

export function CommunitySection() {
  return (
    <section id="a-propos" className="relative z-10 py-24 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/community/player-lifestyle.png"
          alt="Gaming lifestyle"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Communaute
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white">
              Plus qu&apos;une{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                Boutique
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              RetroCollect est une communauté de collectionneurs qui partagent
              la même passion pour la préservation de l&apos;histoire du jeu vidéo.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-8 mb-10">
            {[
              { value: '1.2K+', label: 'Collectionneurs' },
              { value: '4.9/5', label: 'Satisfaction' },
              { value: '50K+', label: 'Jeux Catalogues' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <DesktopOnly
            fallback={
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-4 rounded-full font-bold transition-colors shadow-lg shadow-cyan-500/20"
              >
                Rejoindre la Communaute
                <ArrowRight size={18} />
              </motion.button>
            }
          >
            <Magnet padding={80} magnetStrength={3}>
              <ClickSpark sparkColor="#06b6d4" sparkCount={12} sparkRadius={50} duration={500}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
                  whileTap={TAP_SCALE}
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-4 rounded-full font-bold transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Rejoindre la Communaute
                  <ArrowRight size={18} />
                </motion.button>
              </ClickSpark>
            </Magnet>
          </DesktopOnly>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;
