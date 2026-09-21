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
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PujaProblemSection } from "@/components/sections/puja-problem-section";
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

      {/* Navigation Header */}
      <Header
        onOpenQueue={() => setQueueModalOpen(true)}
        onOpenPartner={() => setPartnerModalOpen(true)}
      />

      {/* ─────────────────────────────────────────────────────
          MAIN LANDING SECTIONS
          HERO → STATS → RESTAURANT PROBLEM → RESTAURANT SOLUTION
          → ASSO IN 10 SECONDS → HOW ASSO WORKS
          → CONSUMER EXPERIENCE → FAQ → FINAL CTA
         ───────────────────────────────────────────────────── */}
      <main className="flex-1">

        {/* 1. HERO */}
        <HeroSection
          onOpenConnect={() => setPartnerModalOpen(true)}
          onOpenQueue={() => setQueueModalOpen(true)}
        />

        {/* 2. TRUST / STATS */}
        <FestiveStatsBanner />

        {/* 3. RESTAURANT PROBLEM */}
        <RestaurantChaosSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 4. RESTAURANT SOLUTION */}
        <ForRestaurantsSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 5. ASSO IN 10 SECONDS — interactive simulator */}
        <QueueSimulatorSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 6. HOW ASSO WORKS — step-by-step diner journey */}
        <HowItWorksSection
          onOpenQueue={() => setQueueModalOpen(true)}
        />

        {/* 7. CONSUMER EXPERIENCE — pandal hopping & pre-order */}
        <PujaProblemSection onOpenQueue={() => setQueueModalOpen(true)} />
        <BetterExperienceSection />
        <PandalsAndPreorderSection onOpenQueue={() => setQueueModalOpen(true)} />

        {/* 8. FAQ */}
        <FaqSection onOpenPartner={() => setPartnerModalOpen(true)} />

        {/* 9. FINAL CTA */}
        <FinalCtaSection
          onOpenQueue={() => setQueueModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
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
