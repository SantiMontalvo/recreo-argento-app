import { weekConfig } from "@/config/week.config";

export function SiteFooter() {
  return (
    <footer className="bg-[#141414] border-t border-white/5 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1">
            <div className="w-2 h-4 rounded-sm bg-[#77b6ea]" />
            <div className="w-2 h-4 rounded-sm bg-[#ffdd4a]" />
            <div className="w-2 h-4 rounded-sm bg-white/20" />
          </div>
          <span className="text-white font-bold text-sm">
            Recreo<span className="text-[#ffdd4a]">Argento</span>
          </span>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-4">
          <a
            href={weekConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white text-xs font-medium transition-colors"
          >
            Instagram
          </a>
          <a
            href={weekConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white text-xs font-medium transition-colors"
          >
            X / Twitter
          </a>
          <a
            href={weekConfig.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white text-xs font-medium transition-colors"
          >
            TikTok
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/20 text-[11px]">{weekConfig.ui.footer.text}</p>
      </div>
    </footer>
  );
}
