"use client";

import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#050A18] text-white py-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-white/10">

          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="inline-flex flex-col group">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  ASSO
                </span>
                <svg
                  className="w-4 h-2.5 text-[#38BDF8]"
                  viewBox="0 0 24 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M2 2C8 9 16 9 22 2" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-300 font-medium tracking-tight -mt-1">
                Skip the queue. Enjoy more.
              </span>
            </Link>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
              Product
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#for-diners" className="hover:text-white transition-colors">For Diners</Link></li>
              <li><Link href="#for-restaurants" className="hover:text-white transition-colors">For Restaurants</Link></li>
              <li><Link href="#download" className="hover:text-white transition-colors">Download App</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
              Company
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link href="#our-story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
              Support
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link href="#help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 5: Follow Us & Handwritten script */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
              Follow Us
            </h4>
            <div className="flex items-center gap-2 text-slate-400">
              {/* Instagram */}
              <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-white transition-colors p-1.5 rounded-lg bg-white/5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </Link>
              {/* Facebook */}
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-white transition-colors p-1.5 rounded-lg bg-white/5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </Link>
              {/* X / Twitter */}
              <Link href="https://x.com" aria-label="X (Twitter)" className="hover:text-white transition-colors p-1.5 rounded-lg bg-white/5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="https://youtube.com" aria-label="YouTube" className="hover:text-white transition-colors p-1.5 rounded-lg bg-white/5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white transition-colors p-1.5 rounded-lg bg-white/5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>

            <div className="pt-1">
              <p className="font-script text-xl font-bold text-amber-200 leading-tight">
                Good Food<br />
                Brings People Together ♡
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2025 ASSO. All rights reserved.</p>
          <p>Made with ❤️ in Kolkata</p>
        </div>
      </div>
    </footer>
  );
}
