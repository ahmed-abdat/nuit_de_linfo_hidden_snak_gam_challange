'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import BackgroundEffects from '@/components/BackgroundEffects';
import FooterSection from '@/components/FooterOne';
import { MobileExperienceNotice } from '@/components/MobileExperienceNotice';

// Import section components
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CollectionsSection } from '@/components/sections/CollectionsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CommunitySection } from '@/components/sections/CommunitySection';

// Lazy load the interactive game section
const CoffreFortSection = dynamic(
  () => import('@/components/sections/CoffreFortSection').then(m => ({ default: m.CoffreFortSection })),
  {
    ssr: false,
    loading: () => (
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[600px] bg-slate-900/30 rounded-3xl animate-pulse flex items-center justify-center">
            <div className="text-slate-500">Chargement...</div>
          </div>
        </div>
      </section>
    ),
  }
);

/**
 * Landing Page - Refactored for Performance
 *
 * Optimizations applied:
 * 1. Section components extracted for better code splitting
 * 2. Suspense boundaries for progressive loading
 * 3. DesktopOnly wrapper disables Magnet/ClickSpark on mobile
 * 4. BackgroundEffects uses SVG on mobile (no canvas)
 * 5. CoffreFortSection lazy loaded (heaviest component)
 */
export default function Home() {
  return (
    <main className="dark min-h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile notice - suggests desktop for full experience */}
      <MobileExperienceNotice />

      {/* Optimized background effects - auto-disables heavy effects on mobile */}
      <BackgroundEffects />

      {/* Header */}
      <Header />

      {/* Hero Section - Critical, above fold */}
      <HeroSection />

      {/* Features Bento Grid */}
      <Suspense fallback={null}>
        <FeaturesSection />
      </Suspense>

      {/* Featured Products Grid */}
      <Suspense fallback={null}>
        <ProductsSection />
      </Suspense>

      {/* Interactive Console Section - Lazy loaded */}
      <Suspense
        fallback={
          <section className="relative z-10 py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="h-[600px] bg-slate-900/30 rounded-3xl animate-pulse" />
            </div>
          </section>
        }
      >
        <CoffreFortSection variant="arcade" className="relative z-10" />
      </Suspense>

      {/* Collections Section */}
      <Suspense fallback={null}>
        <CollectionsSection />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>

      {/* Community Section */}
      <Suspense fallback={null}>
        <CommunitySection />
      </Suspense>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
