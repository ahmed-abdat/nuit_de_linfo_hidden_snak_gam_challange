'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  Clock,
  Award,
  BookOpen,
  Menu,
  X,
  Archive,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CoffreFortSection } from '@/components/sections/CoffreFortSection';
import { products, collections, reviews } from '@/data/products';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { BentoGridShowcase } from '@/components/BentoGrid';

// Dynamic import for components that use browser APIs
const CountUp = dynamic(() => import('@/components/CountUp'), { ssr: false });

// Timeline eras for museum
const timelineEras = [
  { year: '1972', name: 'Ere Arcade', description: 'Pong et les premieres bornes', image: '/images/products/pacman-cartridge.png' },
  { year: '1983', name: 'Renaissance', description: 'La NES sauve l\'industrie', image: '/images/consoles/snes-console.png' },
  { year: '1989', name: 'Portable', description: 'Game Boy revolutionne', image: '/images/consoles/gameboy-color.png' },
  { year: '1996', name: 'Ere 3D', description: 'Nintendo 64 et PlayStation', image: '/images/consoles/playstation-1.png' },
  { year: '2025', name: 'Revival', description: 'Le retro est immortel', image: '/images/consoles/gameboy-advance.png' },
];

export default function MuseumPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeEra, setActiveEra] = useState(2);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-stone-900 variant-museum">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200">
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
            <Link href="#coffre-fort" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium museum-label">
              Exposition
            </Link>
            <Link href="#timeline" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium museum-label">
              Chronologie
            </Link>
            <Link href="#exhibits" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium museum-label">
              Exhibits
            </Link>
            <Link href="#about" className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium museum-label">
              A Propos
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-stone-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              Visiter
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
              className="md:hidden bg-[#faf9f6] border-b border-stone-200"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <Link href="#coffre-fort" className="text-stone-600 py-2">Exposition</Link>
                <Link href="#timeline" className="text-stone-600 py-2">Chronologie</Link>
                <Link href="#exhibits" className="text-stone-600 py-2">Exhibits</Link>
                <Link href="#about" className="text-stone-600 py-2">A Propos</Link>
                <button className="bg-stone-900 text-white px-5 py-3 text-sm font-medium">
                  Visiter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Museum Hero - FIRST */}
      <section className="pt-24 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 border border-stone-300 text-stone-600 px-4 py-2 text-sm font-medium mb-8"
            >
              <Clock size={14} />
              <span className="museum-label">Exposition Permanente</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="museum-title text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 text-stone-900"
            >
              L&apos;Histoire du
              <span className="block text-amber-700">Jeu Video</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-stone-600 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Une collection curee de pieces authentiques, preservees et documentees
              pour les generations futures. Chaque objet est un temoin de notre histoire culturelle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 font-medium"
              >
                Explorer la Collection
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-900 px-8 py-4 font-medium hover:bg-stone-50 transition-colors"
              >
                Catalogue PDF
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Le Coffre-Fort - Interactive GameBoy Section */}
      <CoffreFortSection variant="museum" />

      {/* Timeline Section */}
      <section id="timeline" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="museum-label text-amber-700">Chronologie</span>
            <h2 className="museum-title text-4xl md:text-5xl mt-4 text-stone-900">
              50 Ans d&apos;Evolution
            </h2>
          </motion.div>

          {/* Timeline Navigation */}
          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4 hide-scrollbar">
            {timelineEras.map((era, index) => (
              <motion.button
                key={era.year}
                onClick={() => setActiveEra(index)}
                whileHover={{ y: -2 }}
                className={`flex flex-col items-center min-w-[100px] px-4 py-3 border transition-all ${
                  activeEra === index
                    ? 'border-amber-600 bg-white shadow-lg'
                    : 'border-stone-300 bg-stone-50 hover:bg-white'
                }`}
              >
                <span className={`text-2xl font-bold ${
                  activeEra === index ? 'text-amber-700' : 'text-stone-400'
                }`}>
                  {era.year}
                </span>
                <span className="text-xs text-stone-500 mt-1">{era.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Era Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEra}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative aspect-square bg-white p-8 shadow-xl">
                <Image
                  src={timelineEras[activeEra].image}
                  alt={timelineEras[activeEra].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8"
                />
                {/* Museum placard */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-stone-200">
                  <p className="museum-label text-amber-700 text-xs">{timelineEras[activeEra].year}</p>
                  <p className="font-semibold text-stone-900">{timelineEras[activeEra].name}</p>
                </div>
              </div>

              <div>
                <span className="museum-label text-amber-700">Periode {timelineEras[activeEra].year}</span>
                <h3 className="museum-title text-4xl mt-2 mb-6 text-stone-900">
                  {timelineEras[activeEra].name}
                </h3>
                <p className="text-stone-600 text-lg leading-relaxed mb-6">
                  {timelineEras[activeEra].description}. Cette periode marque un tournant
                  majeur dans l&apos;histoire du jeu video, avec des innovations qui
                  continuent d&apos;influencer l&apos;industrie aujourd&apos;hui.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-stone-200 p-4">
                    <p className="text-3xl font-bold text-amber-700">
                      <CountUp to={50} duration={1.5} />+
                    </p>
                    <p className="text-sm text-stone-500">Pieces de cette ere</p>
                  </div>
                  <div className="border border-stone-200 p-4">
                    <p className="text-3xl font-bold text-amber-700">A+</p>
                    <p className="text-sm text-stone-500">Condition moyenne</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Exhibits Grid */}
      <section id="exhibits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <span className="museum-label text-amber-700">Collection</span>
              <h2 className="museum-title text-4xl md:text-5xl mt-2 text-stone-900">
                Pieces en Exposition
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
              Voir tout
              <ArrowRight size={16} />
            </button>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/5] bg-stone-100 mb-4 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Museum exhibit frame */}
                  <div className="absolute inset-4 border border-stone-300/50 pointer-events-none" />
                </div>

                {/* Museum placard */}
                <div className="border border-stone-200 bg-white p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="museum-label text-amber-700 text-xs">
                      {product.category.toUpperCase()}
                    </span>
                    {product.year && (
                      <span className="text-xs text-stone-400">{product.year}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1">{product.name}</h3>
                  {product.subtitle && (
                    <p className="text-sm text-stone-500 mb-3">{product.subtitle}</p>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-stone-100">
                    <div>
                      <p className="text-xs text-stone-400">Prix</p>
                      <p className="text-lg font-semibold text-stone-900">{product.price}€</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-stone-400">Condition</p>
                      <p className="text-sm font-medium text-amber-700">{product.condition}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="museum-label text-amber-700">En Vedette</span>
            <h2 className="museum-title text-4xl md:text-5xl mt-4 text-stone-900">
              Chiffres Cles
            </h2>
          </motion.div>

          <BentoGridShowcase
            integrations={
              <div className="h-full bg-white border border-stone-200 p-6 flex flex-col justify-between">
                <Archive className="w-8 h-8 text-amber-700" />
                <div>
                  <p className="text-4xl font-bold text-stone-900">
                    <CountUp to={500} duration={2} />+
                  </p>
                  <p className="text-stone-500 text-sm mt-1">Pieces en Collection</p>
                </div>
              </div>
            }
            featureTags={
              <div className="h-full bg-white border border-stone-200 p-6 flex flex-col justify-between">
                <Award className="w-8 h-8 text-amber-700" />
                <div>
                  <p className="text-4xl font-bold text-stone-900">100%</p>
                  <p className="text-stone-500 text-sm mt-1">Authentifie</p>
                </div>
              </div>
            }
            mainFeature={
              <div className="h-full bg-amber-700 p-6 flex flex-col justify-between relative overflow-hidden">
                <Image
                  src="/images/hero/gameboy-pastel.png"
                  alt="Game Boy"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-contain opacity-20"
                />
                <div className="relative z-10">
                  <Star className="w-8 h-8 text-amber-200" />
                </div>
                <div className="relative z-10">
                  <p className="text-amber-100 text-sm">Piece Phare</p>
                  <p className="text-2xl font-bold text-white mt-2">Game Boy Original</p>
                  <p className="text-amber-200 text-sm mt-2">1989 - Condition Mint</p>
                </div>
              </div>
            }
            secondaryFeature={
              <div className="h-full bg-white border border-stone-200 p-6 flex flex-col justify-between">
                <Clock className="w-8 h-8 text-amber-700" />
                <div>
                  <p className="text-4xl font-bold text-stone-900">
                    <CountUp to={50} duration={1.5} />
                  </p>
                  <p className="text-stone-500 text-sm mt-1">Ans d&apos;Histoire</p>
                </div>
              </div>
            }
            statistic={
              <div className="h-full bg-stone-900 p-6 flex flex-col justify-between">
                <p className="text-amber-400 text-sm museum-label">Satisfaction</p>
                <div>
                  <p className="text-5xl font-bold text-white">4.9</p>
                  <p className="text-stone-400 text-sm mt-1">Note moyenne</p>
                </div>
              </div>
            }
            journey={
              <div className="h-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 p-6 flex flex-col justify-between">
                <BookOpen className="w-8 h-8 text-amber-700" />
                <div>
                  <p className="text-4xl font-bold text-stone-900">
                    <CountUp to={1200} duration={2} separator="," />+
                  </p>
                  <p className="text-stone-600 text-sm mt-1">Collectionneurs</p>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="museum-label text-amber-700">Temoignages</span>
            <h2 className="museum-title text-4xl md:text-5xl mt-4 text-stone-900">
              Ce Qu&apos;en Disent les Collectionneurs
            </h2>
          </motion.div>

          <TestimonialSlider
            reviews={reviews.map(review => ({
              ...review,
              thumbnailSrc: review.imageSrc
            }))}
            className="bg-stone-50"
          />
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="museum-label text-amber-700">Galeries</span>
            <h2 className="museum-title text-4xl md:text-5xl mt-4 text-stone-900">
              Collections Thematiques
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
                whileHover={{ y: -5 }}
                className="group bg-white shadow-lg overflow-hidden"
              >
                <div className={`h-48 bg-gradient-to-br ${collection.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/60 text-sm">{collection.era}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4">
                    {collection.description}
                  </p>
                  <button className="flex items-center gap-2 text-amber-700 font-medium text-sm group-hover:gap-3 transition-all">
                    Visiter la Galerie
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA Section */}
      <section id="about" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="museum-label text-amber-400">Notre Mission</span>
                <h2 className="museum-title text-4xl md:text-5xl mt-4 mb-6 text-white">
                  Preserver l&apos;Histoire
                </h2>
                <p className="text-stone-400 text-lg leading-relaxed mb-8">
                  RetroCollect est dedie a la preservation et a la celebration
                  de l&apos;heritage videoludique. Chaque piece de notre collection
                  est soigneusement authentifiee, restauree et documentee.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Award, label: 'Certifie', desc: 'Authenticite garantie' },
                  { icon: Clock, label: 'Restaure', desc: 'Par des experts' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-amber-700 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="text-sm text-stone-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 font-medium hover:bg-amber-700 transition-colors"
              >
                Devenir Membre
                <ArrowRight size={18} />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <Image
                src="/images/community/player-lifestyle.png"
                alt="Gaming Culture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Image
                src="/retro_logo.webp"
                alt="RetroCollect"
                width={200}
                height={55}
                className="h-14 w-auto"
              />
            </div>
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} RetroCollect. Preservation du patrimoine videoludique.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-stone-500 hover:text-amber-400 transition-colors text-sm">Contact</a>
              <a href="#" className="text-stone-500 hover:text-amber-400 transition-colors text-sm">Presse</a>
              <a href="#" className="text-stone-500 hover:text-amber-400 transition-colors text-sm">Partenaires</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
