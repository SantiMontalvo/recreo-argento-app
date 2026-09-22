"use client";

import Image from "next/image";
import { weekConfig } from "@/config/week.config";
import { DailyWinner } from "@/lib/types";
import { CountdownTimer } from "@/components/CountdownTimer";

type HeroProps = {
  winners: DailyWinner[];
};

export function Hero({ winners }: HeroProps) {
  const { hero } = weekConfig.ui;
  const { resultImage, challenge } = weekConfig;

  return (
    <section className="w-full">
      {/* Imagen resultado — landscape, responsive */}
      <div className="relative w-full h-56 sm:h-72 lg:h-[58vh] overflow-hidden bg-[#141414]">
        {resultImage ? (
          <>
            <Image
              src={resultImage}
              alt="Resultado de la semana"
              fill
              quality={100}
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            {/* Fade inferior hacia el color de la banda oscura */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8">
            <div className="flex items-end gap-2">
              <div className="w-10 h-14 rounded-xl bg-[#77b6ea]/60" />
              <div className="w-10 h-20 rounded-xl bg-[#f8f8f5]/10" />
              <div className="w-14 h-24 rounded-xl bg-[#ffdd4a]/90" />
              <div className="w-10 h-20 rounded-xl bg-[#f8f8f5]/10" />
              <div className="w-10 h-14 rounded-xl bg-[#77b6ea]/60" />
            </div>
            <p className="text-white/30 text-[11px] tracking-widest uppercase">
              la imagen se revela día a día
            </p>
          </div>
        )}

        {/* Tags de ganadores — encima del fade */}
        {winners.length > 0 && (
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5 z-10">
            {winners.map((w) => (
              <span
                key={w.day}
                className="bg-[#ffdd4a] text-[#141414] text-[11px] font-bold px-2.5 py-1 rounded-full"
              >
                {w.optionText}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info de la semana */}
      <div className="px-4 sm:px-6 lg:px-8 pt-5 pb-7 bg-[#141414]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#ffdd4a] text-[#141414] text-[11px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
              {hero.badge}
            </span>
            <span className="text-white/30 text-xs">{challenge.hashtag}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            {/* Título y subtítulo */}
            <div>
              <h1 className="text-white text-2xl sm:text-3xl font-bold leading-snug mb-2">
                {hero.title}
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                {hero.subtitle}
              </p>
            </div>

            {/* Countdown — mismo nivel visual */}
            <div className="lg:text-right lg:border-t-0 lg:pt-0 lg:border-l lg:border-l-white/10 lg:pl-8">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
