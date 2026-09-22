import { weekConfig } from "@/config/week.config";
import Image from "next/image";

export function HallOfFame() {
  const past = weekConfig.pastWeeks;

  return (
    <section className="bg-[#141414] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#ffdd4a] text-xs font-bold uppercase tracking-widest mb-1">
              ✦ Archivo
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-black leading-tight">
              Salón de la Fama
            </h2>
          </div>
          <p className="text-white/20 text-xs hidden sm:block">
            Resultados anteriores
          </p>
        </div>

        {past.length === 0 ? (
          /* Estado vacío */
          <div className="border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
            <div className="flex justify-center gap-2 mb-4">
              {[40, 56, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-10 rounded-xl bg-white/5"
                  style={{ height: h }}
                />
              ))}
            </div>
            <p className="text-white/30 text-sm">
              Los resultados de cada semana aparecerán acá
            </p>
            <p className="text-white/15 text-xs mt-1">
              Primera edición en curso
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {past.map((week) => (
              <div
                key={week.weekId}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#ffdd4a]/40 transition-all cursor-pointer"
              >
                {/* Imagen */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={week.resultImage}
                    alt={week.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm leading-snug mb-2">
                    {week.title}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {week.winners.map((w, i) => (
                      <span
                        key={i}
                        className="bg-[#ffdd4a] text-[#141414] text-[10px] font-bold px-2 py-0.5 rounded-full"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/40 text-[11px]">
                    {week.totalVotes.toLocaleString("es-AR")} votos
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
