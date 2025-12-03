'use client';
import { motion } from 'framer-motion';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9bbc0f] to-[#306230] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GB</span>
              </div>
              <span className="font-bold text-xl text-white">
                Retro<span className="text-[#9bbc0f]">Snake</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Un hommage au Game Boy et au jeu Snake classique,
              créé pour la Nuit de l&apos;Info 2025.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#game" className="hover:text-[#9bbc0f] transition-colors">
                  Jouer
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#9bbc0f] transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#9bbc0f] transition-colors">
                  À Propos
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9bbc0f] transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#9bbc0f] transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2025 RetroSnake. Créé pour la Nuit de l&apos;Info.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Fait avec <Heart size={14} className="text-red-500" /> par l&apos;équipe Mauritanie
          </p>
        </div>
      </div>
    </footer>
  );
}
