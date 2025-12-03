'use client';
import { motion } from 'framer-motion';
import { Gamepad2, Palette, Zap, Monitor, Music, Star } from 'lucide-react';

const features = [
  {
    icon: Gamepad2,
    title: 'Gameplay Authentique',
    description: 'Retrouvez les sensations exactes du Snake original avec des contrôles précis et une physique fidèle.',
  },
  {
    icon: Palette,
    title: 'Esthétique Rétro',
    description: 'La palette de couleurs verte emblématique du Game Boy pour une immersion totale dans l\'ère 8-bit.',
  },
  {
    icon: Zap,
    title: 'Performance Optimale',
    description: 'Rendu canvas optimisé pour une expérience fluide, même sur les appareils les plus modestes.',
  },
  {
    icon: Monitor,
    title: 'Responsive Design',
    description: 'Jouez sur n\'importe quel appareil - desktop, tablette ou mobile - avec une adaptation parfaite.',
  },
  {
    icon: Music,
    title: 'Easter Egg Caché',
    description: 'Un hommage au défi AUTOCUT de la Nuit de l\'Info - trouvez le secret caché dans la page !',
  },
  {
    icon: Star,
    title: 'Score & Highscore',
    description: 'Battez vos records et défiez vos amis avec un système de score intégré.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#306230] font-semibold text-sm uppercase tracking-wider">
            Fonctionnalités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
            Une Expérience Rétro
            <span className="text-[#306230]"> Moderne</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Nous avons recréé l&apos;expérience Game Boy avec les technologies web modernes,
            tout en préservant l&apos;essence du jeu original.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-[#9bbc0f] hover:shadow-xl hover:shadow-[#9bbc0f]/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#9bbc0f]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#9bbc0f] transition-colors duration-300">
                <feature.icon className="text-[#306230] group-hover:text-white transition-colors duration-300" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
