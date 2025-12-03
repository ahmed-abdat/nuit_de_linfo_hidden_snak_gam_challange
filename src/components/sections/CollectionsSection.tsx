'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Shuffle from '@/components/Shuffle';
import { DesktopOnly } from '@/components/DesktopOnly';
import { collections } from '@/data/products';
import {
  BUTTON_HOVER_GLOW_WHITE,
  TAP_SCALE,
} from '@/constants';

// Lazy load heavy components
const PixelCard = dynamic(() => import('@/components/PixelCard'), { ssr: false });
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });

export function CollectionsSection() {
  return (
    <section id="collections" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
            Nos Collections
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight">
            <Shuffle
              text="CHOISISSEZ VOTRE ERE"
              className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-5xl font-black"
              shuffleTimes={2}
              duration={0.35}
              stagger={0.02}
              colorFrom="#06b6d4"
              colorTo="#22d3ee"
              triggerOnHover={true}
            />
          </h2>
          <p className="text-slate-400">
            Plongez dans l&apos;histoire du jeu vidéo, organisée par ère.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PixelCard
                variant="blue"
                className="!w-full !h-[420px] !rounded-3xl cursor-pointer group"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-60 rounded-3xl`} />

                {/* Collection image */}
                {collection.image && (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      width={200}
                      height={200}
                      className="object-contain opacity-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                )}

                {/* Pixel corners */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-3xl">
                  <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{collection.era}</span>
                  <h3 className="text-white font-black text-2xl mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <button className="text-cyan-400 font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explorer
                    <ArrowRight size={16} />
                  </button>
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-500">
            <Image
              src="/images/collections/classic-cartridges.png"
              alt="Collection de cartouches iconiques"
              width={1200}
              height={300}
              className="w-full h-64 object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-12">
              <div>
                <p className="text-white/80 text-sm font-bold uppercase tracking-wider">Collection Complete</p>
                <p className="text-white font-black text-2xl md:text-4xl">+500 Jeux Disponibles</p>
              </div>
              <DesktopOnly
                fallback={
                  <motion.button
                    whileTap={TAP_SCALE}
                    className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl"
                  >
                    Voir Tout
                  </motion.button>
                }
              >
                <Magnet padding={60} magnetStrength={3}>
                  <ClickSpark sparkColor="#ffffff" sparkCount={10} sparkRadius={40} duration={400}>
                    <motion.button
                      whileHover={BUTTON_HOVER_GLOW_WHITE}
                      whileTap={TAP_SCALE}
                      className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl"
                    >
                      Voir Tout
                    </motion.button>
                  </ClickSpark>
                </Magnet>
              </DesktopOnly>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CollectionsSection;
