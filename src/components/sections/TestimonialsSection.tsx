'use client';

import { motion } from 'framer-motion';
import Shuffle from '@/components/Shuffle';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { reviews } from '@/data/products';

export function TestimonialsSection() {
  return (
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
  );
}

export default TestimonialsSection;
