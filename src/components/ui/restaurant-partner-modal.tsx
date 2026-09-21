"use client";

import * as React from "react";
import {
  X,
  Store,
  CheckCircle2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface RestaurantPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RestaurantPartnerModal({ isOpen, onClose }: RestaurantPartnerModalProps) {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [outlets, setOutlets] = React.useState("1");
  const [cityArea, setCityArea] = React.useState("");
  const [dailyWalkins, setDailyWalkins] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [touched, setTouched] = React.useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  // Close on Escape key and prevent background scroll
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation logic
  const isPhoneValid = phone.replace(/[^0-9]/g, "").length >= 10;
  const isRestaurantNameValid = restaurantName.trim().length >= 2;
  const isOwnerNameValid = ownerName.trim().length >= 2;
  const isCityAreaValid = cityArea.trim().length >= 2;
  const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    isPhoneValid && isRestaurantNameValid && isOwnerNameValid && isCityAreaValid && isEmailValid;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!isFormValid) {
      setTouched({
        restaurantName: true,
        ownerName: true,
        phone: true,
        cityArea: true,
        email: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/partner-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantName,
          ownerName,
          phone,
          email: email || undefined,
          cityArea,
          outlets,
          dailyWalkins: dailyWalkins || undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setSubmitted(true);
      } else {
        setServerError(
          data?.error || "We couldn't submit your request right now. Please try again."
        );
      }
    } catch {
      setServerError("Network error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setServerError(null);
    setRestaurantName("");
    setOwnerName("");
    setPhone("");
    setEmail("");
    setCityArea("");
    setNotes("");
    setTouched({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#090F22] border border-white/20 rounded-3xl p-5 sm:p-7 text-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Decorative atmospheric glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="overflow-y-auto pr-1 -mr-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase tracking-wider">
                <Store className="w-3 h-3 text-indigo-400" />
                Restaurant Onboarding
              </span>
            </div>

            <h3 id="partner-modal-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Get Started for <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">Your Restaurant</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              No hardware required. Zero POS integration needed. Set up your digital queue in minutes.
            </p>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              {/* Server-Side Error Alert */}
              {serverError && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Row 1: Restaurant Name & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="partner-restaurant-name" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Restaurant Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="partner-restaurant-name"
                    type="text"
                    required
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    onBlur={() => handleBlur("restaurantName")}
                    placeholder="e.g. Royal Biryani House / The Heritage Pavilion"
                    aria-invalid={touched.restaurantName && !isRestaurantNameValid}
                    aria-describedby={touched.restaurantName && !isRestaurantNameValid ? "restaurant-name-error" : undefined}
                    className={`w-full h-10 px-3.5 rounded-xl bg-white/10 border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                      touched.restaurantName && !isRestaurantNameValid
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-white/15 focus:border-indigo-400"
                    }`}
                  />
                  {touched.restaurantName && !isRestaurantNameValid && (
                    <p id="restaurant-name-error" role="alert" className="text-[10px] text-rose-400 mt-1">
                      Please enter your restaurant name.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="partner-city-area" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    City / Area <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="partner-city-area"
                    type="text"
                    required
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    onBlur={() => handleBlur("cityArea")}
                    placeholder="e.g. Park Street, Kolkata"
                    aria-invalid={touched.cityArea && !isCityAreaValid}
                    aria-describedby={touched.cityArea && !isCityAreaValid ? "city-area-error" : undefined}
                    className={`w-full h-10 px-3.5 rounded-xl bg-white/10 border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                      touched.cityArea && !isCityAreaValid
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-white/15 focus:border-indigo-400"
                    }`}
                  />
                  {touched.cityArea && !isCityAreaValid && (
                    <p id="city-area-error" role="alert" className="text-[10px] text-rose-400 mt-1">
                      Please specify your outlet location.
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Owner/Manager & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="partner-owner-name" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Owner / Manager Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="partner-owner-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    onBlur={() => handleBlur("ownerName")}
                    placeholder="Your name"
                    aria-invalid={touched.ownerName && !isOwnerNameValid}
                    aria-describedby={touched.ownerName && !isOwnerNameValid ? "owner-name-error" : undefined}
                    className={`w-full h-10 px-3.5 rounded-xl bg-white/10 border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                      touched.ownerName && !isOwnerNameValid
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-white/15 focus:border-indigo-400"
                    }`}
                  />
                  {touched.ownerName && !isOwnerNameValid && (
                    <p id="owner-name-error" role="alert" className="text-[10px] text-rose-400 mt-1">
                      Please enter a contact name.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="partner-phone" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="partner-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="+91 98765 43210"
                    aria-invalid={touched.phone && !isPhoneValid}
                    aria-describedby={touched.phone && !isPhoneValid ? "phone-error" : undefined}
                    className={`w-full h-10 px-3.5 rounded-xl bg-white/10 border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                      touched.phone && !isPhoneValid
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-white/15 focus:border-indigo-400"
                    }`}
                  />
                  {touched.phone && !isPhoneValid && (
                    <p id="phone-error" role="alert" className="text-[10px] text-rose-400 mt-1">
                      Please enter a valid 10-digit phone number.
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Email (optional) & Outlets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="partner-email" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <input
                    id="partner-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="manager@restaurant.com"
                    aria-invalid={touched.email && !isEmailValid}
                    className={`w-full h-10 px-3.5 rounded-xl bg-white/10 border text-xs text-white placeholder-slate-400 focus:outline-none transition-colors ${
                      touched.email && !isEmailValid
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-white/15 focus:border-indigo-400"
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="partner-outlets" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Number of Outlets
                  </label>
                  <select
                    id="partner-outlets"
                    value={outlets}
                    onChange={(e) => setOutlets(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="1" className="bg-[#090F22]">1 Outlet (Single location)</option>
                    <option value="2-5" className="bg-[#090F22]">2 – 5 Outlets</option>
                    <option value="6+" className="bg-[#090F22]">6+ Outlets (Chain)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Approximate Walk-ins (optional) */}
              <div>
                <label htmlFor="partner-walkins" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Approximate Daily Walk-in Groups <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <select
                  id="partner-walkins"
                  value={dailyWalkins}
                  onChange={(e) => setDailyWalkins(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                >
                  <option value="" className="bg-[#090F22]">Select estimated volume...</option>
                  <option value="under-50" className="bg-[#090F22]">Under 50 groups / day</option>
                  <option value="50-150" className="bg-[#090F22]">50 – 150 groups / day</option>
                  <option value="150-300" className="bg-[#090F22]">150 – 300 groups / day</option>
                  <option value="300+" className="bg-[#090F22]">300+ groups / day (High rush)</option>
                </select>
              </div>

              {/* Row 5: Notes / Requirements (optional) */}
              <div>
                <label htmlFor="partner-notes" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Message / Special Requirements <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <textarea
                  id="partner-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your rush hours, seating preferences, or launch timeline..."
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 resize-none"
                />
              </div>

              {/* Supporting microcopy */}
              <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                <span>Free pilot onboarding • No setup fee</span>
                <span>Works on any phone or laptop</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-black text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Details...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started for Your Restaurant</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS VIEW */
          <div className="text-center py-6 sm:py-8 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl sm:text-3xl font-black text-white">You&apos;re on the list.</h4>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
              Thanks for your interest in ASSO. We&apos;ll get in touch with you about getting your restaurant started.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-white/[0.06] border border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-400">Restaurant:</span>
                <span className="text-white font-bold">{restaurantName || "Registered Outlet"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-400">Contact:</span>
                <span className="text-white font-bold">{ownerName} ({phone})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-200">{cityArea || "Kolkata"}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Back to Website
              </button>

              <a
                href="#for-restaurants"
                onClick={handleResetAndClose}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-xs shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore Host Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
