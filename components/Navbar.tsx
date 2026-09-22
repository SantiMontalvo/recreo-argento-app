"use client";

import { weekConfig } from "@/config/week.config";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#141414]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2.5 h-5 rounded-sm bg-[#77b6ea]" />
            <div className="w-2.5 h-5 rounded-sm bg-[#ffdd4a]" />
            <div className="w-2.5 h-5 rounded-sm bg-white/20" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            Recreo<span className="text-[#ffdd4a]">Argento</span>
          </span>
        </div>

        {/* Centro — semana actual */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="bg-[#ffdd4a] text-[#141414] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            {weekConfig.ui.hero.badge}
          </span>
          <span className="text-white/30 text-xs">
            {weekConfig.challenge.hashtag}
          </span>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-1">
          <a
            href={weekConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href={weekConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="X / Twitter"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </a>
          <a
            href={weekConfig.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="TikTok"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
            </svg>
          </a>
        </div>
        <div className="bg-[#77b6ea] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
          Tu opinión tambien juega
        </div>
      </div>
    </nav>
  );
}
