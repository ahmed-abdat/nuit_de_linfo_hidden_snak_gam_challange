'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Clock,
  Wrench,
  Menu,
  X,
  Search,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { CoffreFortSection } from '@/components/sections/CoffreFortSection';
import { CircularGallery } from '@/components/CircularGallery2';
import { products, galleryItems, reviews, collections } from '@/data/products';

export default function PremiumPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] variant-premium">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
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
            <Link href="#coffre-fort" className="text-gray-600 hover:text-[#1a1a1a] transition-colors text-sm font-medium">
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
                <Link href="#coffre-fort" className="text-gray-600 py-2">Boutique</Link>
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

      {/* Hero Section - First impression */}
      <section className="pt-24 py-16 bg-gradient-to-b from-white to-[#f5f4f0] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-100"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Collection Premium Curée
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
              >
                Revivez
                <span className="block text-gradient-premium">l&apos;Ère Rétro</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                Jeux vintage premium, authentifiés et restaurés avec soin.
                Chaque cartouche raconte une histoire - nous nous assurons
                qu&apos;elle fonctionne parfaitement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-8"
              >
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">500+</div>
                  <div className="text-sm text-gray-500">Jeux Restaurés</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">100%</div>
                  <div className="text-sm text-gray-500">Authenticité</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">90j</div>
                  <div className="text-sm text-gray-500">Garantie</div>
                </div>
              </motion.div>
            </div>

            {/* Right - Circular Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-[500px] relative"
            >
              <CircularGallery
                items={galleryItems}
                bend={3}
                borderRadius={0.05}
                scrollSpeed={2}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Le Coffre-Fort - Interactive GameBoy Section */}
      <CoffreFortSection variant="premium" />

      {/* Featured Products Grid */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Nos Produits Premium
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight">
              Selections du Moment
            </h2>
            <p className="text-gray-600">
              Des pièces authentiques, restaurées avec passion et garanties.
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
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
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
                      product.badge === 'bestseller' ? 'bg-emerald-100 text-emerald-700' :
                      product.badge === 'new' ? 'bg-blue-100 text-blue-700' :
                      product.badge === 'limited' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.badge === 'rare' ? 'Rare' :
                       product.badge === 'bestseller' ? 'Best-seller' :
                       product.badge === 'new' ? 'Nouveau' :
                       product.badge === 'limited' ? 'Edition Limitee' :
                       'Promo'}
                    </span>
                  )}
                  {product.stock === 'low_stock' && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white rounded-full text-[10px] font-semibold">
                      Stock faible
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-[#1a1a1a] mb-1">{product.name}</h3>
                  {product.subtitle && (
                    <p className="text-sm text-gray-500 mb-2">{product.subtitle}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#1a1a1a]">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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
                src="/images/trust/cleaning-cartridge.png"
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
                  des jeux — nous leur redonnons vie.
                </p>
              </motion.div>

              <div className="grid gap-6">
                {[
                  {
                    icon: Shield,
                    title: 'Authenticité Vérifiée',
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
                    description: 'Réparation, remplacement ou remboursement intégral.',
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
              Collections Curées
            </h2>
            <p className="text-gray-600">
              Plongez dans l&apos;histoire du jeu vidéo, organisée pour le collectionneur exigeant.
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
                src="/images/collections/classic-cartridges.png"
                alt="Collection de cartouches iconiques"
                width={1200}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-white/80 text-sm">Titres Iconiques</p>
                  <p className="text-white font-bold text-xl">Authenticité Vérifiée</p>
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
            src="/images/community/player-lifestyle.png"
            alt="Gaming lifestyle"
            fill
            sizes="100vw"
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
              <div className="mb-4">
                <Image
                  src="/retro_logo.webp"
                  alt="RetroCollect"
                  width={200}
                  height={55}
                  className="h-14 w-auto"
                />
              </div>
              <p className="text-gray-500 text-sm">
                Nostalgie Curée. État Mint.
              </p>
            </div>

            {[
              { title: 'Boutique', links: ['Tous les Jeux', 'Consoles', 'Accessoires', 'Nouveautés'] },
              { title: 'Support', links: ['Livraison', 'Retours', 'FAQ', 'Contact'] },
              { title: 'Légal', links: ['Mentions Légales', 'Confidentialité', 'CGV', 'Cookies'] },
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
              RetroCollect est un revendeur indépendant. Non affilié à Nintendo Co., Ltd.,
              Sega Sammy Holdings, ou Sony Interactive Entertainment. Toutes les marques
              appartiennent à leurs propriétaires respectifs.
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} RetroCollect. Tous droits réservés.
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
