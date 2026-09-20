"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PujaProblemSection } from "@/components/sections/puja-problem-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BetterExperienceSection } from "@/components/sections/better-experience-section";
import { PandalsAndPreorderSection } from "@/components/sections/pandals-and-preorder-section";
import { RestaurantChaosSection } from "@/components/sections/restaurant-chaos-section";
import { ForRestaurantsSection } from "@/components/sections/for-restaurants-section";
import { HassleFreeSetupSection } from "@/components/sections/hasslefree-setup-section";
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
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <HeroSection onOpenConnect={() => setPartnerModalOpen(true)} />
        <PujaProblemSection onOpenQueue={() => setQueueModalOpen(true)} />
        <HowItWorksSection
          onOpenQueue={() => setQueueModalOpen(true)}
        />
        <BetterExperienceSection />
        <PandalsAndPreorderSection onOpenQueue={() => setQueueModalOpen(true)} />
        <RestaurantChaosSection />
        <ForRestaurantsSection onOpenPartner={() => setPartnerModalOpen(true)} />
        <HassleFreeSetupSection onOpenPartner={() => setPartnerModalOpen(true)} />
        <FaqSection />
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
