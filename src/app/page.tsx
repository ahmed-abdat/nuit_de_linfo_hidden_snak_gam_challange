'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  Gamepad2,
  Shield,
  Zap,
  Trophy,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { CoffreFortSection } from '@/components/sections/CoffreFortSection';
import { Header } from '@/components/Header';
import BlurText from '@/components/BlurText';
import CountUp from '@/components/CountUp';
import BackgroundEffects from '@/components/BackgroundEffects';
import { products, collections, galleryItems, reviews } from '@/data/products';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import Shuffle from '@/components/Shuffle';
import FooterSection from '@/components/FooterOne';
import {
  FADE_IN_UP,
  FADE_IN_UP_30,
  FADE_IN_UP_VISIBLE,
  FADE_IN_RIGHT,
  FADE_IN_RIGHT_VISIBLE,
  VIEWPORT_ONCE,
  PRODUCT_HOVER,
  BUTTON_HOVER_GLOW,
  BUTTON_HOVER_GLOW_STRONG,
  BUTTON_HOVER_GLOW_WHITE,
  TAP_SCALE,
  HOVER_SCALE,
  GALLERY_TRANSITION,
} from '@/constants';
import { useQualityLevel } from '@/hooks';

// Lazy load heavy components
const PixelCard = dynamic(() => import('@/components/PixelCard'), { ssr: false });
const Squares = dynamic(() => import('@/components/Squares'), { ssr: false });
const ClickSpark = dynamic(() => import('@/components/ClickSpark'), { ssr: false });
const Magnet = dynamic(() => import('@/components/Magnet'), { ssr: false });

// Lazy load CircularGallery - only on desktop
const CircularGallery = dynamic(
  () => import('@/components/CircularGallery2').then(mod => ({ default: mod.CircularGallery })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

export default function Home() {
  // Adaptive quality - automatically reduces effects when device lags
  const qualityLevel = useQualityLevel();
  const showSquares = qualityLevel === 'high';

  return (
    <main className="dark min-h-screen bg-background text-foreground overflow-hidden">
      {/* Optimized background effects - auto-disables heavy effects on mobile */}
      <BackgroundEffects />

      {/* Header */}
      <Header />

      {/* Hero Section - Gaming Focused */}
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

              {/* CTAs with Magnet + ClickSpark */}
              <motion.div
                initial={FADE_IN_UP}
                animate={FADE_IN_UP_VISIBLE}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
              >
                <Magnet padding={40} magnetStrength={2}>
                  <ClickSpark sparkColor="#06b6d4" sparkCount={10} sparkRadius={40} duration={400}>
                    <motion.a
                      href="#coffre-fort"
                      whileHover={BUTTON_HOVER_GLOW}
                      whileTap={TAP_SCALE}
                      className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors shadow-lg shadow-cyan-500/20"
                    >
                      <Gamepad2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                      Jouer Maintenant
                    </motion.a>
                  </ClickSpark>
                </Magnet>
                <Magnet padding={40} magnetStrength={2}>
                  <ClickSpark sparkColor="#94a3b8" sparkCount={8} sparkRadius={35} duration={400}>
                    <motion.button
                      whileHover={HOVER_SCALE}
                      whileTap={TAP_SCALE}
                      className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:text-white hover:border-cyan-500/50 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-colors"
                    >
                      Explorer
                      <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </motion.button>
                  </ClickSpark>
                </Magnet>
              </motion.div>

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
              className="hidden lg:block h-[500px] relative overflow-hidden"
            >
              {/* Glow effects - contained within bounds */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px]" />
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-cyan-400/15 rounded-full blur-[60px]" />
              </div>

              <CircularGallery
                items={galleryItems}
                bend={2}
                borderRadius={0.05}
                scrollSpeed={2}
              />
            </motion.div>
          </div>
        </div>

      </section>

      {/* Features Bento Grid */}
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

      {/* Featured Products Grid */}
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
              Des pièces authentiques, restaurées avec passion et garanties.
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
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
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
                       product.badge === 'limited' ? 'Édition Limitée' :
                       'Promo'}
                    </span>
                  )}
                  {product.stock === 'low_stock' && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white rounded-full text-[10px] font-bold animate-pulse">
                      Stock faible
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-cyan-400 uppercase tracking-wider mb-1 font-medium">
                    {product.category}
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
            <Magnet padding={80} magnetStrength={3}>
              <ClickSpark sparkColor="#06b6d4" sparkCount={12} sparkRadius={50} duration={450}>
                <motion.button
                  whileHover={BUTTON_HOVER_GLOW_STRONG}
                  whileTap={TAP_SCALE}
                  className="inline-flex items-center gap-2 border-2 border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-full font-bold hover:bg-cyan-500/10 transition-all"
                >
                  Voir Tous les Produits
                  <ArrowRight size={18} />
                </motion.button>
              </ClickSpark>
            </Magnet>
          </motion.div>
        </div>
      </section>

      {/* Interactive Console Section - Test Before Buying */}
      <CoffreFortSection variant="arcade" className="relative z-10" />

      {/* Collections Section */}
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
              Temoignages
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight">
              <Shuffle
                text="NOS GAMERS"
                className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent text-3xl md:text-5xl font-black"
                shuffleTimes={2}
                duration={0.35}
                stagger={0.03}
                colorFrom="#06b6d4"
                colorTo="#22d3ee"
                triggerOnHover={true}
              />
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <TestimonialSlider reviews={reviews} />
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
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

            <Magnet padding={80} magnetStrength={3}>
              <ClickSpark sparkColor="#06b6d4" sparkCount={12} sparkRadius={50} duration={500}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-7 py-4 rounded-full font-bold transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Rejoindre la Communaute
                  <ArrowRight size={18} />
                </motion.button>
              </ClickSpark>
            </Magnet>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
