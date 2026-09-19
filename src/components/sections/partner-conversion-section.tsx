"use client";

import * as React from "react";
import Link from "next/link";
import {
  Store,
  QrCode,
  Layers,
  ArrowRight,
  CheckCircle2,
  Phone,
  Send,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger } from "@/components/animations/fade-in";

const ONBOARDING_STEPS = [
  {
    num: "01",
    title: "Share your details",
    desc: "Fill in a quick form with your restaurant name and contact number.",
    icon: Building2,
  },
  {
    num: "02",
    title: "We configure your queue",
    desc: "Our Kolkata team sets up your digital queue and host dashboard.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Display your QR standee",
    desc: "Place the customized ASSO standee at your entrance.",
    icon: QrCode,
  },
  {
    num: "04",
    title: "Go live instantly",
    desc: "Manage peak-hour queues with ease and give guests total freedom.",
    icon: Store,
  },
];

export function PartnerConversionSection() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    restaurantName: "",
    managerName: "",
    phone: "",
    city: "Kolkata",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.restaurantName && formData.phone) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="partner"
      className="relative overflow-hidden bg-[#FFF9ED] py-24 sm:py-36 border-b border-amber-200/80"
    >
      {/* Warm amber blobs */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-orange-200/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
      />

      <Container size="wide" className="relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              Partner with ASSO
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <h2
              className="font-black text-stone-900 tracking-tighter leading-[0.92] mb-5"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              <span className="block">Ready to make</span>
              <span className="block gradient-text-saffron">busy hours easier?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-xl text-stone-600 leading-relaxed max-w-xl mx-auto">
              Join ASSO today and upgrade your restaurant queue to a seamless digital experience.
            </p>
          </FadeIn>
        </div>

        {/* 2-col: onboarding steps + form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">

          {/* LEFT: Onboarding steps */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.1}>
              <p className="text-xs font-black uppercase tracking-widest text-orange-600 mb-6">
                Get started in 4 simple steps
              </p>
            </FadeIn>

            <FadeInStagger className="space-y-4">
              {ONBOARDING_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex items-start gap-4">
                    {/* Number + line */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-black text-sm flex-shrink-0 shadow-xs">
                        {step.num}
                      </div>
                      {i < ONBOARDING_STEPS.length - 1 && (
                        <div className="w-0.5 h-7 bg-amber-200" />
                      )}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-orange-600" />
                        <h3 className="text-base font-bold text-stone-900">{step.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </FadeInStagger>

            {/* Trust highlights */}
            <FadeIn delay={0.3} className="mt-8 pt-6 border-t border-amber-200/80">
              <div className="space-y-3">
                {[
                  "No complicated software installations",
                  "Ready in under 24 hours",
                  "Built specifically for Kolkata restaurants",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-stone-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: Lead form in clean light theme */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.18}>
              <div className="rounded-3xl bg-white border border-amber-200 shadow-2xl shadow-orange-900/10 overflow-hidden">
                {/* Form header */}
                <div className="px-7 sm:px-8 py-5 border-b border-amber-100 flex items-center gap-3 bg-amber-50/80">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-stone-900">Restaurant Partner Enquiry</p>
                    <p className="text-xs text-stone-500">Get your custom QR standee and live console</p>
                  </div>
                </div>

                <div className="p-7 sm:p-8">
                  {isSubmitted ? (
                    <div className="py-10 text-center space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto shadow-sm">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black text-stone-900">Enquiry Received!</h3>
                      <p className="text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                        Our team will contact you within a few hours to set up your restaurant.
                      </p>
                      <p className="font-bengali font-bold text-orange-600 text-lg">
                        ধন্যবাদ! শীঘ্রই যোগাযোগ করব।
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Restaurant name */}
                        <div className="sm:col-span-2 space-y-1.5">
                          <label
                            htmlFor="restaurantName"
                            className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <Building2 className="w-3.5 h-3.5 text-orange-600" />
                            Restaurant Name *
                          </label>
                          <input
                            id="restaurantName"
                            name="restaurantName"
                            type="text"
                            required
                            placeholder="e.g. 6 Ballygunge Place / Peter Cat"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                          />
                        </div>

                        {/* Manager */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="managerName"
                            className="text-xs font-bold text-stone-700 uppercase tracking-wider"
                          >
                            Contact Name
                          </label>
                          <input
                            id="managerName"
                            name="managerName"
                            type="text"
                            placeholder="Manager / Owner Name"
                            value={formData.managerName}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="phone"
                            className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-orange-600" />
                            WhatsApp / Phone *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+91 98300 xxxxx"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                          />
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="city"
                            className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <MapPin className="w-3.5 h-3.5 text-orange-600" />
                            City
                          </label>
                          <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 transition-all font-medium cursor-pointer"
                          >
                            <option value="Kolkata">Kolkata</option>
                            <option value="Howrah">Howrah</option>
                            <option value="Other">Other West Bengal</option>
                          </select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="saffron"
                        size="lg"
                        className="w-full justify-center rounded-2xl font-black text-base mt-3 shadow-lg shadow-orange-500/20"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Partner Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>

                      <p className="text-xs text-center text-stone-500">
                        We respond within 2-4 hours throughout the festive season.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
