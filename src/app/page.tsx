'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GameBoy } from '@/components/GameBoy';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Clock,
  Wrench,
  Menu,
  X,
  Search
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Cartridge } from '@/components/Cartridge';

// Cartridge data
const cartridges = [
  {
    id: 'zelda',
    title: 'ZELDA',
    subtitle: 'Gold Edition',
    price: '189€',
    description: 'Cartouche doree originale de 1987',
    color: '#d4a574',
    labelColor: '#8b6914',
  },
  {
    id: 'mario',
    title: 'MARIO',
    subtitle: 'Bros. 3',
    price: '74€',
    description: 'Le jeu de plateforme NES definitif',
    color: '#4a4a4a',
    labelColor: '#e53935',
  },
  {
    id: 'metroid',
    title: 'METROID',
    subtitle: '1st Print',
    price: '156€',
    description: 'Premier tirage de 1986',
    color: '#4a4a4a',
    labelColor: '#7b1fa2',
  },
  {
    id: 'prototype-483',
    title: '???',
    subtitle: '#483',
    price: 'NON DISPONIBLE',
    description: 'Origine: Inconnue. Contenu: Non verifie.',
    color: '#1e293b',
    labelColor: '#0f172a',
    isSecret: true,
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <main className="min-h-screen bg-[#faf9f6] text-[#1a1a1a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm border border-emerald-500/50">
              <span className="font-mono font-extrabold text-white tracking-tighter text-lg">
                R<span className="text-emerald-200">C</span>
              </span>
            </div>
            <span className="font-bold text-xl text-neutral-900 tracking-tight">
              RetroCollect
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#collection" className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-sm font-medium">
              Boutique
            </Link>
            <Link href="#collections" className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-sm font-medium">
              Collections
            </Link>
            <Link href="#restauration" className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-sm font-medium">
              Restauration
            </Link>
            <Link href="#apropos" className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-sm font-medium">
              A Propos
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-[#1a1a1a] transition-colors p-2">
              <Search size={20} />
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
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
                <Link href="#collection" className="text-gray-600 py-2">Boutique</Link>
                <Link href="#collections" className="text-gray-600 py-2">Collections</Link>
                <Link href="#restauration" className="text-gray-600 py-2">Restauration</Link>
                <Link href="#apropos" className="text-gray-600 py-2">A Propos</Link>
                <button className="bg-[#1a1a1a] text-white px-5 py-3 rounded-full text-sm font-medium">
                  Connexion
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-white to-[#f5f4f0]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-100"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Depuis 2024 - Collection Retro Curee
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
              >
                Revivez
                <span className="block text-emerald-600">l&apos;Ere Retro</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                Jeux vintage premium, authentifies et restaures avec soin.
                Chaque cartouche raconte une histoire - nous nous assurons
                qu&apos;elle fonctionne parfaitement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-7 py-4 rounded-full font-medium hover:bg-[#333] transition-colors"
                >
                  Parcourir la Collection
                  <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 border-2 border-gray-200 text-[#1a1a1a] px-7 py-4 rounded-full font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Notre Processus
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-8"
              >
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">500+</div>
                  <div className="text-sm text-gray-500">Jeux Restaures</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">100%</div>
                  <div className="text-sm text-gray-500">Authenticite</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">90j</div>
                  <div className="text-sm text-gray-500">Garantie</div>
                </div>
              </motion.div>
            </div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cyan-200 rounded-full blur-3xl opacity-60" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <Image
                    src="/assets/1.PNG"
                    alt="Game Boy Retro"
                    width={400}
                    height={500}
                    className="drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Shelf Section - THE CHALLENGE */}
      <section id="collection" className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Testez Avant d&apos;Acheter
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight text-white">
              Le Coffre-Fort
            </h2>
            <p className="text-gray-400">
              Raretes selectionnees de notre inventaire.
              Glissez une cartouche vers la console pour la tester.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* GameBoy Drop Zone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Drop Zone Indicator */}
              <div
                ref={dropZoneRef}
                className={`absolute -top-6 left-1/2 -translate-x-1/2 w-[120px] h-[30px] rounded-t-lg border-2 border-dashed transition-all duration-300 z-10 ${
                  isDragging
                    ? isNearDropZone
                      ? 'border-emerald-400 bg-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                      : 'border-gray-500 bg-gray-500/10 animate-pulse'
                    : 'border-transparent'
                }`}
              />

              <GameBoy
                activeCartridge={activeCartridge}
                onCartridgeEject={handleCartridgeEject}
              />

              {/* Eject button hint */}
              {activeCartridge && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleCartridgeEject}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cliquez pour ejecter
                </motion.button>
              )}
            </motion.div>

            {/* Cartridge Gallery */}
            <div className="flex flex-col gap-6">
              <p className="text-center text-gray-500 text-sm lg:hidden">
                Appuyez sur une cartouche pour l&apos;inserer
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {cartridges.map((cartridge) => (
                  <Cartridge
                    key={cartridge.id}
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
                      // Mobile: tap to insert
                      if (activeCartridge === cartridge.id) {
                        handleCartridgeEject();
                      } else {
                        handleCartridgeInsert(cartridge.id);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section id="restauration" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-full h-full bg-emerald-100 rounded-2xl" />
              <Image
                src="/assets/retro_4.png"
                alt="Restauration de cartouche"
                width={600}
                height={400}
                className="relative rounded-2xl shadow-xl"
              />
            </motion.div>

            {/* Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                  Notre Engagement
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 tracking-tight">
                  Restauration de Confiance
                </h2>
                <p className="text-gray-600 mb-8">
                  Chaque jeu passe par notre atelier. Nous ne vendons pas simplement
                  des jeux - nous leur redonnons vie.
                </p>
              </motion.div>

              <div className="grid gap-6">
                {[
                  {
                    icon: Shield,
                    title: 'Authenticite Verifiee',
                    description: 'Processus d\'authentification en 12 points. Aucune reproduction.',
                    color: 'bg-blue-50 text-blue-600'
                  },
                  {
                    icon: Wrench,
                    title: 'Restauration Experte',
                    description: 'Nettoyage des contacts, remplacement batterie, restauration coque.',
                    color: 'bg-amber-50 text-amber-600'
                  },
                  {
                    icon: Clock,
                    title: 'Garantie 90 Jours',
                    description: 'Reparation, remplacement ou remboursement integral.',
                    color: 'bg-emerald-50 text-emerald-600'
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section id="collections" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Nos Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight">
              Collections Curees
            </h2>
            <p className="text-gray-600">
              Plongez dans l&apos;histoire du jeu video, organisee pour le collectionneur exigeant.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "L'Age d'Or",
                era: '1985-1995',
                description: 'Classiques NES, SNES, Genesis. Les titres qui ont defini une generation.',
                gradient: 'from-amber-600 to-orange-700',
              },
              {
                title: 'Legendes Portables',
                era: 'Game Boy & Beyond',
                description: 'Du DMG original au GBA SP. Aventures de poche qui ont voyage partout.',
                gradient: 'from-emerald-600 to-teal-700',
              },
              {
                title: 'Pieces de Collection',
                era: 'Ultra Rare',
                description: 'Editions limitees, exemplaires scelles. Qualite investissement.',
                gradient: 'from-violet-600 to-purple-700',
              },
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* Decorative cartridge pattern */}
                <div className="absolute top-4 right-4 w-16 h-20 bg-white/10 rounded-t-sm rounded-b-lg" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white/60 text-sm font-medium">{collection.era}</span>
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {collection.description}
                  </p>
                  <button className="text-white font-medium text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explorer
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/retro_gam_3.png"
                alt="Collection de cartouches iconiques"
                width={1200}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-white/80 text-sm">Titres Iconiques</p>
                  <p className="text-white font-bold text-xl">Authenticite Verifiee</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-medium text-sm"
                >
                  Voir Tout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section id="apropos" className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/retro_game_2.png"
            alt="Gaming lifestyle"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                Communaute
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight text-white">
                Plus qu&apos;une Boutique
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                RetroCollect est une communaute de collectionneurs qui partagent
                la meme passion pour la preservation de l&apos;histoire du jeu video.
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
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-7 py-4 rounded-full font-medium"
            >
              Rejoindre la Communaute
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="font-mono font-extrabold text-white tracking-tighter text-lg">RC</span>
                </div>
                <span className="font-bold text-lg text-white">RetroCollect</span>
              </div>
              <p className="text-gray-500 text-sm">
                Nostalgie Curee. Etat Mint.
              </p>
            </div>

            {[
              { title: 'Boutique', links: ['Tous les Jeux', 'Consoles', 'Accessoires', 'Nouveautes'] },
              { title: 'Support', links: ['Livraison', 'Retours', 'FAQ', 'Contact'] },
              { title: 'Legal', links: ['Mentions Legales', 'Confidentialite', 'CGV', 'Cookies'] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-600 text-xs mb-4">
              RetroCollect est un revendeur independant. Non affilie a Nintendo Co., Ltd.,
              Sega Sammy Holdings, ou Sony Interactive Entertainment. Toutes les marques
              appartiennent a leurs proprietaires respectifs.
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 RetroCollect. Tous droits reserves.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Discord
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Instagram
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
