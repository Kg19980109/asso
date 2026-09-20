"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Landmark,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Flame,
} from "lucide-react";
import { PandalDetailModal, PandalItem } from "@/components/ui/pandal-detail-modal";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const PANDALS: PandalItem[] = [
  {
    name: "Santosh Mitra Square",
    distance: "0.3 km away",
    badge: "★ Popular",
    badgeColor: "bg-rose-100 text-rose-700 border-rose-300",
    image: "/images/pandal-friends.jpg",
    zone: "Bowbazar, Central",
    theme: "Laser Illumination & Sphere Art",
    bestTime: "7:00 PM - 9:30 PM",
    crowdLevel: "High (Fast Moving)",
  },
  {
    name: "College Square",
    distance: "0.6 km away",
    badge: "Illumination",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-300",
    image: "/images/hero-puja.jpg",
    zone: "College Street, North",
    theme: "Water Reflection & Heritage Palace",
    bestTime: "8:00 PM - 11:00 PM",
    crowdLevel: "Moderate",
  },
  {
    name: "Sreebhumi",
    distance: "1.2 km away",
    badge: "Grand Theme",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    image: "/images/pandal-friends.jpg",
    zone: "Lake Town, VIP Road",
    theme: "Royal Venetian Architecture",
    bestTime: "6:00 PM - 8:30 PM",
    crowdLevel: "Very High",
  },
  {
    name: "Bagbazar",
    distance: "2.1 km away",
    badge: "Traditional",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    image: "/images/hero-puja.jpg",
    zone: "Bagbazar, North",
    theme: "100+ Year Sabeki Traditional Ekchala",
    bestTime: "5:30 PM - 7:30 PM",
    crowdLevel: "Moderate (Spacious)",
  },
  {
    name: "Hatibagan",
    distance: "2.5 km away",
    badge: "Shopping & Food",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-300",
    image: "/images/pandal-friends.jpg",
    zone: "Hatibagan Market, North",
    theme: "Street Carnival & Folk Art",
    bestTime: "7:30 PM - 10:00 PM",
    crowdLevel: "High",
  },
];

interface PandalsAndPreorderSectionProps {
  onOpenQueue?: () => void;
}

export function PandalsAndPreorderSection({ onOpenQueue }: PandalsAndPreorderSectionProps) {
  const [selectedPandal, setSelectedPandal] = React.useState<PandalItem | null>(null);
  const [zoneFilter, setZoneFilter] = React.useState<"all" | "North" | "Central" | "Lake Town">("all");
  const [startIndex, setStartIndex] = React.useState(0);
  const [quantities, setQuantities] = React.useState<{ [key: string]: number }>({
    "Chicken Biryani": 1,
    "Fish Fry": 1,
    "Mutton Kosha": 0,
  });
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);

  const menuItems = [
    { name: "Chicken Biryani", price: 320, image: "/images/biryani-plate.jpg" },
    { name: "Fish Fry", price: 180, image: "/images/bengali-food.jpg" },
    { name: "Mutton Kosha", price: 520, image: "/images/bengali-food.jpg" },
  ];

  const totalAmount = menuItems.reduce(
    (sum, item) => sum + (quantities[item.name] || 0) * item.price,
    0
  );

  const filteredPandals = zoneFilter === "all"
    ? PANDALS
    : PANDALS.filter((p) => p.zone?.includes(zoneFilter));

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % PANDALS.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + PANDALS.length) % PANDALS.length);
  };

  const handlePreOrder = () => {
    if (totalAmount > 0) {
      setOrderConfirmed(true);
      setTimeout(() => setOrderConfirmed(false), 5000);
    }
  };

  return (
    <section id="pandals" className="py-20 sm:py-24 bg-white text-stone-900 border-b border-stone-200 relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT CARD: Explore Nearby Pandals */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={100} className="h-full">
              <div className="bg-[#FAFAFA] rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-purple-300 transition-all h-full">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-stone-900">Explore Nearby Pandals</h3>
                        <p className="text-xs text-stone-500">While you wait, make the most of your time.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPandal(PANDALS[0])}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200 cursor-pointer transition-colors shadow-xs"
                    >
                      <span>View Map</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Zone quick filters */}
                  <div className="flex items-center gap-1.5 pt-4 pb-2 text-[10px] font-bold overflow-x-auto">
                    <button
                      onClick={() => setZoneFilter("all")}
                      className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                        zoneFilter === "all" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      All Kolkata
                    </button>
                    <button
                      onClick={() => setZoneFilter("North")}
                      className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                        zoneFilter === "North" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      North Kolkata
                    </button>
                    <button
                      onClick={() => setZoneFilter("Central")}
                      className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                        zoneFilter === "Central" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      Central
                    </button>
                    <button
                      onClick={() => setZoneFilter("Lake Town")}
                      className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                        zoneFilter === "Lake Town" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      Lake Town / VIP
                    </button>
                  </div>

                  {/* Pandals Carousel Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-3">
                    {filteredPandals.map((p) => (
                      <div
                        key={p.name}
                        onClick={() => setSelectedPandal(p)}
                        className="flex flex-col text-center group cursor-pointer"
                      >
                        <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-stone-200 shadow-xs mb-2">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 200px"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                        </div>
                        <p className="text-[11px] font-bold text-stone-900 leading-tight truncate group-hover:text-purple-700">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-stone-500 font-medium">
                          {p.distance}
                        </p>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border mt-1 truncate ${p.badgeColor}`}>
                          {p.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-200">
                  <span className="text-xs text-stone-500 font-medium">Click any pandal to view darshan tips</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous"
                      className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 shadow-xs cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next"
                      className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 shadow-xs cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT CARD: Why Wait for Food Too? */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={150} className="h-full">
              <div className="bg-[#0B1428] rounded-3xl p-6 sm:p-7 border border-white/15 text-white shadow-xl flex flex-col justify-between gold-border-glow relative overflow-hidden h-full">
                {/* Glow backdrop */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-white">Why Wait for Food Too?</h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm">
                      Order while you explore. Your food will be prepared and ready when you arrive.
                    </p>
                  </div>
                  <span className="font-script text-xl font-bold text-amber-200 leading-tight text-right animate-float-slow">
                    Come back.<br />Sit down. Eat. ♡
                  </span>
                </div>

                {/* Pre-order interactive box & Biryani image side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Menu items list */}
                  <div className="sm:col-span-6 space-y-2">
                    {menuItems.map((item) => {
                      const qty = quantities[item.name] || 0;
                      return (
                        <div
                          key={item.name}
                          className="p-2 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between transition-colors hover:bg-white/15"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden relative bg-white/20 flex-shrink-0">
                              <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white leading-none">{item.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">₹{item.price}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {qty > 0 && (
                              <>
                                <button
                                  onClick={() => setQuantities((q) => ({ ...q, [item.name]: Math.max(0, qty - 1) }))}
                                  className="w-5 h-5 rounded bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-xs cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="text-xs font-mono font-bold text-amber-300 w-3 text-center">
                                  {qty}
                                </span>
                              </>
                            )}
                            <button
                              onClick={() => setQuantities((q) => ({ ...q, [item.name]: qty + 1 }))}
                              className="w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={handlePreOrder}
                      className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <span>Place Pre-Order (₹{totalAmount})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {orderConfirmed && (
                      <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold text-center flex items-center justify-center gap-1 animate-in fade-in">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Pre-order sent! Chef is preparing your feast.</span>
                      </div>
                    )}
                  </div>

                  {/* Steaming Biryani Plate Image */}
                  <div className="sm:col-span-6 relative h-48 rounded-2xl overflow-hidden border border-white/20 shadow-md group">
                    <Image
                      src="/images/biryani-plate.jpg"
                      alt="Kolkata Biryani Plate"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
                        Kolkata Biryani
                      </span>
                      <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                        Freshly Prepared 🍲
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Pandal Detail Modal */}
      <PandalDetailModal
        pandal={selectedPandal}
        onClose={() => setSelectedPandal(null)}
        onJoinQueue={() => {
          setSelectedPandal(null);
          onOpenQueue?.();
        }}
      />
    </section>
  );
}
