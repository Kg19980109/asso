"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Landmark,
  UtensilsCrossed,
  ArrowRight,
  Flame,
} from "lucide-react";

type Zone = "all" | "park-street" | "south" | "north" | "salt-lake";

interface RestaurantHub {
  name: string;
  zone: Zone;
  zoneLabel: string;
  cuisines: string;
  signatureDish: string;
  liveQueue: number;
  estWait: string;
  nearPandal: string;
  preorderAvailable: boolean;
  image: string;
}

const HUBS: RestaurantHub[] = [
  {
    name: "The Heritage Pavilion & Bistro",
    zone: "park-street",
    zoneLabel: "Park Street",
    cuisines: "Continental • Mughlai Heritage",
    signatureDish: "Famous Chelo Kebab & Devilled Crab",
    liveQueue: 18,
    estWait: "25 min",
    nearPandal: "3 min from Md. Ali Park",
    preorderAvailable: true,
    image: "/images/park-street.jpg",
  },
  {
    name: "Ballygunge Heritage Kitchen",
    zone: "south",
    zoneLabel: "Ballygunge, South",
    cuisines: "Authentic Bengali Fine Dine",
    signatureDish: "Daab Chingri & Ilish Bhapa",
    liveQueue: 27,
    estWait: "45 min",
    nearPandal: "2 min from Ekdalia Evergreen",
    preorderAvailable: true,
    image: "/images/bengali-food.jpg",
  },
  {
    name: "Awadh Darbar",
    zone: "south",
    zoneLabel: "Deshapriya Park",
    cuisines: "Period Dining • Awadhi Cuisine",
    signatureDish: "Galawati Kebab & Raan Biryani",
    liveQueue: 12,
    estWait: "18 min",
    nearPandal: "1 min from Deshapriya Park",
    preorderAvailable: true,
    image: "/images/park-street.jpg",
  },
  {
    name: "North Kolkata Heritage Cabin",
    zone: "north",
    zoneLabel: "Shyambazar, North",
    cuisines: "Colonial Bengali Street Heritage",
    signatureDish: "Mutton Kosha with Paratha & Fish Kabiraji",
    liveQueue: 31,
    estWait: "35 min",
    nearPandal: "4 min from Bagbazar Sarbojanin",
    preorderAvailable: false,
    image: "/images/bengali-food.jpg",
  },
  {
    name: "Royal Kolkata Biryani House",
    zone: "park-street",
    zoneLabel: "Park Circus",
    cuisines: "Kolkata Biryani Masters",
    signatureDish: "Special Mutton Biryani with Aloo & Egg",
    liveQueue: 22,
    estWait: "30 min",
    nearPandal: "Near Ballygunge Cultural",
    preorderAvailable: true,
    image: "/images/bengali-food.jpg",
  },
  {
    name: "Bhojon Bilash Dining",
    zone: "south",
    zoneLabel: "Hindustan Park",
    cuisines: "Traditional Homestyle Bengali",
    signatureDish: "Bhetki Paturi & Muri Ghonto",
    liveQueue: 14,
    estWait: "20 min",
    nearPandal: "2 min from Singhi Park",
    preorderAvailable: true,
    image: "/images/bengali-food.jpg",
  },
];

export function KolkataHubsSection() {
  const [activeZone, setActiveZone] = React.useState<Zone>("all");

  const filteredHubs =
    activeZone === "all"
      ? HUBS
      : HUBS.filter((h) => h.zone === activeZone);

  return (
    <section className="py-20 sm:py-28 bg-[#FFFDF7] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            Kolkata Food &amp; Pandal Guide
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            Explore Kolkata&apos;s <span className="text-[#2563EB]">Top Dining Hubs</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600">
            Check live queue lengths, pre-order signature dishes, and explore famous pandals right next door.
          </p>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: "all", label: "All Hubs" },
            { id: "park-street", label: "Park Street & Central" },
            { id: "south", label: "South Kolkata & Ballygunge" },
            { id: "north", label: "North Kolkata Heritage" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveZone(tab.id as Zone)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeZone === tab.id
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25 scale-105"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHubs.map((hub) => (
            <div
              key={hub.name}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Live Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <Image
                  src={hub.image}
                  alt={hub.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Live Queue Pill */}
                <div className="absolute top-3 right-3 bg-[#070D1E]/90 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono font-black text-white">
                    #{hub.liveQueue} in queue
                  </span>
                </div>

                {/* Bottom zone & cuisines on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {hub.zoneLabel}
                  </span>
                  <h3 className="text-lg font-black leading-tight text-white mt-0.5">
                    {hub.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  {/* Signature Dish */}
                  <div className="flex items-start gap-2 text-xs">
                    <UtensilsCrossed className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-stone-900">Must Try: </span>
                      <span className="text-stone-600 font-medium">{hub.signatureDish}</span>
                    </div>
                  </div>

                  {/* Near Pandal */}
                  <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 p-2.5 rounded-xl border border-purple-200 font-semibold">
                    <Landmark className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{hub.nearPandal}</span>
                  </div>
                </div>

                {/* Card Footer with Wait Time & CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-stone-500 font-medium">Wait: </span>
                    <strong className="text-stone-900 font-mono font-bold">{hub.estWait}</strong>
                  </div>

                  <Link
                    href="#download"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] group-hover:text-blue-700 transition-colors"
                  >
                    <span>Join Queue</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
