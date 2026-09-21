"use client";

import * as React from "react";
import {
  X,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactUsModal({ isOpen, onClose }: ContactUsModalProps) {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [category, setCategory] = React.useState<"restaurant" | "diner" | "other">("restaurant");
  const [message, setMessage] = React.useState("");

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

  const isPhoneValid = phone.replace(/[^0-9]/g, "").length >= 10;
  const isNameValid = fullName.trim().length >= 2;
  const isFormValid = isPhoneValid && isNameValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/partner-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantName: category === "restaurant" ? "Restaurant Inquiry" : "General / Diner Inquiry",
          ownerName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          cityArea: "Kolkata",
          notes: `[Contact Form] Category: ${category} | Message: ${message.trim() || "No extra note"}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message. Please try again or WhatsApp us directly.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please call or WhatsApp us.";
      setServerError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setServerError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-[#0B1124] border border-white/15 shadow-2xl shadow-black/90 overflow-hidden relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/50 via-[#101736] to-cyan-900/40 p-5 sm:p-6 border-b border-white/10 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 id="contact-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Contact ASSO
                </h3>
                <p className="text-[11px] text-stone-300">
                  Quick response guaranteed &lt; 15 mins
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-stone-200 text-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce-short">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Thank You for Reaching Out!</h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto leading-relaxed">
                We have received your message. Our Kolkata team will connect with you via call or WhatsApp shortly.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs hover:brightness-110 transition-all"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {serverError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Category Pills */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  I am reaching out as:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "restaurant", label: "Restaurant Owner" },
                    { id: "diner", label: "Diner / Guest" },
                    { id: "other", label: "General Inquiry" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as "restaurant" | "diner" | "other")}
                      className={`py-2 px-2 text-xs rounded-xl border text-center transition-all ${
                        category === cat.id
                          ? "bg-purple-600/30 border-purple-400 text-white font-semibold"
                          : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sourav Mukherjee"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Mobile / WhatsApp Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Email Address <span className="text-stone-500 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  How can we help you?
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're looking for..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-500 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Contact Footer Bar */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              <span>Call: <a href="tel:+917003383676" className="text-white hover:underline">+91 70033 83676</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span><a href="mailto:asso.helpdesk@gmail.com" className="text-white hover:underline">asso.helpdesk@gmail.com</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
