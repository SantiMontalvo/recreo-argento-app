import { weekConfig } from "@/config/week.config";

const BLUR_LEVELS = ["blur-none", "blur-[3px]", "blur-[5px]", "blur-[7px]"];
const OPACITY_LEVELS = ["opacity-100", "opacity-60", "opacity-40", "opacity-30"];

export function ComingSoon() {
  const items = weekConfig.comingSoon;

  return (
    <section className="bg-[#141414] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
        <span className="text-[#ffdd4a] text-sm">✦</span>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Próximamente
        </h3>
      </div>
      <div className="divide-y divide-white/5">
        {items.map((item, i) => {
          const blur = BLUR_LEVELS[Math.min(i, BLUR_LEVELS.length - 1)];
          const opacity = OPACITY_LEVELS[Math.min(i, OPACITY_LEVELS.length - 1)];
          const isBlurred = i > 0;

          return (
            <div
              key={i}
              className={`px-5 py-4 relative select-none ${opacity}`}
            >
              <div className={blur}>
                <p className="text-sm font-semibold text-white leading-snug">
                  {item.title}
                </p>
                <p className="text-xs text-white/35 mt-1 leading-relaxed">
                  {item.hint}
                </p>
              </div>
              {isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    Misterio
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="px-5 py-4">
        <button className="w-full text-center text-xs font-semibold text-[#141414] bg-[#ffdd4a] rounded-xl py-2.5 hover:bg-[#ffdd4a]/90 transition-colors">
          Avisame cuando esté
        </button>
      </div>
    </section>
  );
}
