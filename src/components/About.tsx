'use client';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-[#0f380f] to-[#306230] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#9bbc0f] font-semibold text-sm uppercase tracking-wider">
              À Propos du Projet
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Nuit de l&apos;Info
              <span className="text-[#9bbc0f]"> 2025</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Ce projet a été créé dans le cadre du <strong className="text-white">Défi #483 - AUTOCUT</strong> de
                la Nuit de l&apos;Info 2025, qui demandait de cacher un jeu de Snake
                au sein d&apos;un site web.
              </p>
              <p>
                Nous avons décidé de transformer ce défi en une expérience immersive
                en créant une landing page dédiée au Game Boy, où le Snake est
                directement jouable dans l&apos;écran de la console.
              </p>
              <p>
                Le projet utilise <strong className="text-white">Next.js 15</strong>, <strong className="text-white">React 19</strong>,
                <strong className="text-white"> TailwindCSS</strong> et <strong className="text-white">Framer Motion</strong> pour
                offrir une expérience moderne tout en respectant l&apos;esthétique rétro.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS', 'Framer Motion'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Game Boy History Timeline */}
            <div className="space-y-8">
              {[
                { year: '1989', title: 'Game Boy Original', desc: 'Lancement au Japon par Nintendo' },
                { year: '1996', title: 'Game Boy Pocket', desc: 'Version plus fine et légère' },
                { year: '1998', title: 'Game Boy Color', desc: 'Premier écran couleur' },
                { year: '2001', title: 'Game Boy Advance', desc: 'Nouvelle génération 32-bit' },
                { year: '2025', title: 'Notre Hommage', desc: 'Nuit de l\'Info - Défi Snake' },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#9bbc0f] rounded-full flex items-center justify-center font-bold text-[#0f380f] text-sm">
                      {item.year}
                    </div>
                    {index < 4 && <div className="w-0.5 h-full bg-[#9bbc0f]/30 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
