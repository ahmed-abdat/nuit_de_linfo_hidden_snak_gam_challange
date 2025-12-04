"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

// GameBoy 4-color palette for LCD screen
// Light: #9bbc0f | Mid: #8bac0f | Dark: #306230 | Darkest: #0f380f

export function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 bg-slate-950">
      {/* Background gradient - matches main site */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(13, 0, 38, 1) 0%,
            rgba(26, 0, 51, 1) 30%,
            rgba(51, 0, 77, 1) 50%,
            rgba(89, 0, 102, 1) 70%,
            rgba(140, 0, 153, 1) 85%,
            rgba(178, 0, 191, 1) 100%
          )`,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* GameBoy LCD Screen */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--gameboy-green-light)] p-6 sm:p-8 mb-8 border-4 border-[var(--gameboy-green-darkest)] shadow-[inset_0_0_30px_var(--gameboy-green-mid),8px_8px_0_rgba(0,0,0,0.5)]"
          >
            {/* 404 Display */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-[var(--gameboy-green-darkest)] tracking-wider font-mono drop-shadow-[3px_3px_0_var(--gameboy-green-dark)]">
                404
              </h1>
            </motion.div>

            {/* Pixel art snake decoration */}
            <motion.div
              className="flex justify-center my-4 gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-hidden="true"
            >
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--gameboy-green-dark)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                />
              ))}
              <motion.div
                className="w-3 h-3 sm:w-4 sm:h-4 bg-[var(--gameboy-green-darkest)]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.85 }}
              />
            </motion.div>

            {/* Error messages in French */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--gameboy-green-darkest)] font-mono">
                PAGE INTROUVABLE
              </h2>
              <p className="text-sm sm:text-base text-[var(--gameboy-green-dark)] font-mono">
                Oups ! Cette page n&apos;existe pas.
              </p>
            </motion.div>
          </motion.div>

          {/* Action buttons - Site theme style */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => router.push("/")}
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-full transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              Retour à l&apos;accueil
            </button>
            <button
              onClick={() => router.back()}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm sm:text-base px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Page précédente
            </button>
          </motion.div>
        </div>
      </div>

      {/* Copyright footer */}
      <motion.footer
        className="absolute bottom-4 left-0 right-0 text-center px-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-white/60 text-xs font-medium">
          © {new Date().getFullYear()} RetroCollect - Tous droits réservés
        </p>
        <p className="text-white/40 text-[10px] mt-1">
          Nuit de l&apos;Info 2025
        </p>
      </motion.footer>
    </section>
  );
}
