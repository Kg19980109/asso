"use client";

import * as React from "react";
import { MessageCircle, X, Send, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";

interface WhatsAppContact {
  id: string;
  name: string;
  role: string;
  number: string;
  displayNumber: string;
  status: string;
  defaultMessage: string;
}

const CONTACTS: WhatsAppContact[] = [
  {
    id: "partner-sales",
    name: "Restaurant Onboarding",
    role: "Partnership & Free Pilot Desk",
    number: "917003383676",
    displayNumber: "+91 70033 83676",
    status: "Online • Quick reply",
    defaultMessage: "Hi ASSO team, I want to onboard my restaurant / learn more about the free pilot.",
  },
  {
    id: "support-ops",
    name: "General & Operations",
    role: "Diner Support & Inquiries",
    number: "918017683428",
    displayNumber: "+91 80176 83428",
    status: "Online • Ready to help",
    defaultMessage: "Hi ASSO team, I have a query regarding queue management and ASSO features.",
  },
];

const PRESET_TOPICS = [
  "Restaurant Pilot Enquiry",
  "How Queues Work",
  "Request a 1-on-1 Demo",
  "General Query",
];

export function WhatsAppFloatingToggle() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedTopic, setSelectedTopic] = React.useState<string>("");
  const [customMsg, setCustomMsg] = React.useState("");

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpenChat = (contact: WhatsAppContact) => {
    let text = customMsg.trim();
    if (!text) {
      text = selectedTopic
        ? `Hi ASSO team, I'm reaching out about: ${selectedTopic}.`
        : contact.defaultMessage;
    }

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${contact.number}?text=${encodedText}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
      {/* Expanded Chat Widget */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Chat Support"
          className="mb-3 w-[calc(100vw-2.5rem)] max-w-[360px] sm:max-w-[380px] rounded-2xl bg-[#0C1226]/95 border border-emerald-500/30 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#128C7E] via-[#075E54] to-[#0d4a43] p-4 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white">
                    <MessageCircle className="w-6 h-6 fill-current text-emerald-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold tracking-wide">ASSO WhatsApp Desk</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <p className="text-[11px] text-emerald-100/85 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Replies in &lt; 5 mins
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-white/90 mt-2.5 leading-relaxed bg-black/15 p-2 rounded-lg border border-white/10">
              Need instant answers or want to try ASSO for your restaurant? Chat directly with our team!
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="p-3 border-b border-stone-800 bg-[#080D1D]/70">
            <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-2">
              Select a quick topic:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    if (selectedTopic === topic) {
                      setSelectedTopic("");
                      setCustomMsg("");
                    } else {
                      setSelectedTopic(topic);
                      setCustomMsg(`Hi ASSO team, I am interested in: ${topic}`);
                    }
                  }}
                  className={`text-xs px-2.5 py-1 rounded-full transition-all border ${
                    selectedTopic === topic
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-medium"
                      : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Custom message input */}
          <div className="px-3 pt-2.5">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Type your message (optional)..."
              className="w-full text-xs px-3 py-2 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Contact Numbers List */}
          <div className="p-3 space-y-2.5">
            <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
              Choose who to message:
            </div>
            {CONTACTS.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => handleOpenChat(contact)}
                className="w-full text-left group p-3 rounded-xl bg-gradient-to-r from-stone-900/90 to-[#0F172E] hover:from-[#112423] hover:to-[#0A2E26] border border-stone-800 hover:border-emerald-500/50 transition-all duration-200 shadow-md hover:shadow-emerald-950/30 flex items-center justify-between"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-100 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                      {contact.name}
                    </div>
                    <div className="text-[11px] text-stone-400 leading-tight mt-0.5">
                      {contact.role}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400/90 mt-1 font-medium">
                      {contact.displayNumber}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-emerald-400 group-hover:text-emerald-300 text-xs font-medium pl-2">
                  <span className="hidden xs:inline text-[11px]">Chat</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Security Note */}
          <div className="px-3 pb-3 pt-1 text-center">
            <span className="text-[10px] text-stone-400">
              Direct connection via official WhatsApp. No spam guaranteed.
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp Chat" : "Chat on WhatsApp with ASSO"}
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#22bf5b] active:scale-95 text-white p-3.5 sm:px-4 sm:py-3 shadow-lg shadow-emerald-900/40 hover:shadow-xl hover:shadow-emerald-900/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#070D1E]"
      >
        {/* Subtle ping pulse when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#070D1E]" />
          </span>
        )}

        <div className="relative">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 rotate-90 group-hover:rotate-180" />
          ) : (
            <MessageCircle className="w-6 h-6 fill-current" />
          )}
        </div>

        <span className="hidden sm:inline font-semibold text-sm tracking-wide text-white">
          {isOpen ? "Close Chat" : "Chat with Us"}
        </span>
      </button>
    </div>
  );
}
