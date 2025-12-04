"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

// GameBoy 4-color palette for consistency
// Light: #9bbc0f | Mid: #8bac0f | Dark: #306230 | Darkest: #0f380f

export function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[var(--gameboy-green-darkest)] relative overflow-hidden pt-20">
      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 scanline-overlay"
        aria-hidden="true"
      />

      {/* Grid pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] grid-pattern-overlay"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* GameBoy LCD Screen */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--gameboy-green-light)] p-6 sm:p-8 mb-8 border-4 border-[var(--gameboy-green-darkest)] shadow-[inset_0_0_30px_var(--gameboy-green-mid),8px_8px_0_var(--gameboy-green-darkest)]"
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

          {/* Action buttons - LCD style (inside screen look) */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => router.push("/")}
              className="bg-[var(--gameboy-green-light)] text-[var(--gameboy-green-darkest)] font-mono text-sm sm:text-base px-6 py-3 font-bold transition-all border-4 border-[var(--gameboy-green-darkest)] shadow-[4px_4px_0_var(--gameboy-green-darkest)] hover:shadow-[2px_2px_0_var(--gameboy-green-darkest)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              RETOUR À L&apos;ACCUEIL
            </button>
            <button
              onClick={() => router.back()}
              className="bg-[var(--gameboy-green-mid)] text-[var(--gameboy-green-darkest)] font-mono text-sm sm:text-base px-6 py-3 font-bold transition-all border-4 border-[var(--gameboy-green-darkest)] shadow-[4px_4px_0_var(--gameboy-green-darkest)] hover:shadow-[2px_2px_0_var(--gameboy-green-darkest)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              PAGE PRÉCÉDENTE
            </button>
          </motion.div>
        </div>
      </div>

      {/* Copyright footer */}
      <motion.footer
        className="absolute bottom-4 left-0 right-0 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-[var(--gameboy-green-mid)] text-xs font-mono">
          © {new Date().getFullYear()} RetroCollect - Tous droits réservés
        </p>
        <p className="text-[var(--gameboy-green-dark)] text-[10px] font-mono mt-1">
          Nuit de l&apos;Info 2025
        </p>
      </motion.footer>
    </section>
  );
}
