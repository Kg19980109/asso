"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FestiveStatsBanner } from "@/components/sections/festive-stats-banner";
import { RestaurantChaosSection } from "@/components/sections/restaurant-chaos-section";
import { ForRestaurantsSection } from "@/components/sections/for-restaurants-section";
import { QueueSimulatorSection } from "@/components/sections/queue-simulator-section";
import { HassleFreeSetupSection } from "@/components/sections/hasslefree-setup-section";
import { ComparisonMatrixSection } from "@/components/sections/comparison-matrix-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PujaProblemSection } from "@/components/sections/puja-problem-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BetterExperienceSection } from "@/components/sections/better-experience-section";
import { PandalsAndPreorderSection } from "@/components/sections/pandals-and-preorder-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";

// Modals load on demand so they don't weigh down the initial bundle.
const LiveQueueModal = dynamic(
  () => import("@/components/ui/live-queue-modal").then((m) => m.LiveQueueModal),
  { ssr: false }
);
const RestaurantPartnerModal = dynamic(
  () => import("@/components/ui/restaurant-partner-modal").then((m) => m.RestaurantPartnerModal),
  { ssr: false }
);

export default function HomePage() {
  const [queueModalOpen, setQueueModalOpen] = React.useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#060B18] selection:bg-purple-500 selection:text-white">
      {/* 60fps Glowing Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Header — now includes "For Restaurants" CTA */}
      <Header
        onOpenQueue={() => setQueueModalOpen(true)}
        onOpenPartner={() => setPartnerModalOpen(true)}
      />

      {/* ─────────────────────────────────────────────────────────────────────
          MAIN LANDING SECTIONS
          Conversion journey:
            HERO → TRUST/STATS → RESTAURANT PROBLEM → RESTAURANT SOLUTION →
            INTERACTIVE DEMO → SETUP → COMPARISON → TESTIMONIALS →
            CONSUMER EXPERIENCE → FAQ → FINAL CTA
         ───────────────────────────────────────────────────────────────────── */}
      <main className="flex-1">

        {/* 1. HERO — dual persona (Diner / Restaurant toggle) */}
        <HeroSection
          onOpenConnect={() => setPartnerModalOpen(true)}
          onOpenQueue={() => setQueueModalOpen(true)}
        />

        {/* 2. TRUST / STATS — illustrative pilot targets */}
        <FestiveStatsBanner />

        {/* 3. RESTAURANT PROBLEM — pain framing for restaurant owners */}
        <RestaurantChaosSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 4. RESTAURANT SOLUTION — The ASSO Way + live dashboard mockup */}
        <ForRestaurantsSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 5. INTERACTIVE DEMO — queue simulator for restaurant owners to experience the product */}
        <QueueSimulatorSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 6. SETUP — how easy onboarding is (4 steps, no hardware) */}
        <HassleFreeSetupSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 7. COMPARISON — Old way vs. ASSO way */}
        <ComparisonMatrixSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 8. SOCIAL PROOF — pilot diner testimonials */}
        <TestimonialsSection />

        {/* 9. CONSUMER EXPERIENCE — diner journey (pandal hopping, pre-order) */}
        <PujaProblemSection onOpenQueue={() => setQueueModalOpen(true)} />
        <HowItWorksSection
          onOpenQueue={() => setQueueModalOpen(true)}
        />
        <BetterExperienceSection />
        <PandalsAndPreorderSection onOpenQueue={() => setQueueModalOpen(true)} />

        {/* 10. FAQ — tabbed (Diners / Restaurants) */}
        <FaqSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 11. FINAL CTA — unified restaurant message */}
        <FinalCtaSection
          onOpenQueue={() => setQueueModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <LiveQueueModal
        isOpen={queueModalOpen}
        onClose={() => setQueueModalOpen(false)}
      />
      <RestaurantPartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />
    </div>
  );
}
