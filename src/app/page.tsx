"use client";

import * as React from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PujaProblemSection } from "@/components/sections/puja-problem-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BetterExperienceSection } from "@/components/sections/better-experience-section";
import { PandalsAndPreorderSection } from "@/components/sections/pandals-and-preorder-section";
import { ForRestaurantsSection } from "@/components/sections/for-restaurants-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { LiveQueueModal } from "@/components/ui/live-queue-modal";
import { DownloadModal } from "@/components/ui/download-modal";
import { RestaurantPartnerModal } from "@/components/ui/restaurant-partner-modal";
import { LiveActivityTicker } from "@/components/ui/live-activity-ticker";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";

export default function HomePage() {
  const [queueModalOpen, setQueueModalOpen] = React.useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = React.useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#060B18] selection:bg-purple-500 selection:text-white">
      {/* 60fps Glowing Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Header */}
      <Header
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenQueue={() => setQueueModalOpen(true)}
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenQueue={() => setQueueModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
        />
        <PujaProblemSection onOpenQueue={() => setQueueModalOpen(true)} />
        <HowItWorksSection
          onOpenQueue={() => setQueueModalOpen(true)}
          onOpenDownload={() => setDownloadModalOpen(true)}
        />
        <BetterExperienceSection />
        <PandalsAndPreorderSection onOpenQueue={() => setQueueModalOpen(true)} />
        <ForRestaurantsSection onOpenPartner={() => setPartnerModalOpen(true)} />
        <TestimonialsSection />
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
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
      <RestaurantPartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      {/* Live Activity Pop-up Ticker */}
      <LiveActivityTicker onOpenQueue={() => setQueueModalOpen(true)} />
    </div>
  );
}
