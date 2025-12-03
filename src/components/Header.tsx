'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#9bbc0f] to-[#306230] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GB</span>
          </div>
          <span className="font-bold text-xl">
            Retro<span className="text-[#306230]">Snake</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-[#306230] transition-colors">
            Features
          </Link>
          <Link href="#game" className="text-gray-600 dark:text-gray-300 hover:text-[#306230] transition-colors">
            Play Game
          </Link>
          <Link href="#about" className="text-gray-600 dark:text-gray-300 hover:text-[#306230] transition-colors">
            About
          </Link>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#306230] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0f380f] transition-colors"
        >
          Play Now
        </motion.button>
      </nav>
    </motion.header>
  );
}
