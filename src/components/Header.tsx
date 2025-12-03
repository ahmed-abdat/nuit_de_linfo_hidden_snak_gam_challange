'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Magnet from '@/components/Magnet';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50">
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
          <Link href="#coffre-fort" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Boutique
          </Link>
          <Link href="#collections" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Collections
          </Link>
          <Link href="#restauration" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            Restauration
          </Link>
          <Link href="#a-propos" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
            À Propos
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Magnet padding={40} magnetStrength={4}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-md shadow-cyan-500/20"
            >
              Connexion
            </motion.button>
          </Magnet>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white"
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
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link href="#coffre-fort" className="text-slate-300 py-2 hover:text-white transition-colors">Boutique</Link>
              <Link href="#collections" className="text-slate-300 py-2 hover:text-white transition-colors">Collections</Link>
              <Link href="#restauration" className="text-slate-300 py-2 hover:text-white transition-colors">Restauration</Link>
              <Link href="#a-propos" className="text-slate-300 py-2 hover:text-white transition-colors">À Propos</Link>
              <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 rounded-full text-sm font-medium mt-2 transition-colors">
                Connexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
