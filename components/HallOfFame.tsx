"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { weekConfig } from "@/config/week.config";

export function HallOfFame() {
  const past = weekConfig.pastWeeks;

  const carouselRef = useRef<HTMLDivElement>(null);

  const [selectedWeek, setSelectedWeek] = useState<
    (typeof past)[number] | null
  >(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const amount = carouselRef.current.clientWidth * 0.8;

    carouselRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#141414] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <p className="text-[#ffdd4a] text-xs font-bold uppercase tracking-widest mb-2">
            ✦ DEBATE CERRADO ✦
          </p>

          <h2 className="text-white text-2xl sm:text-3xl font-black leading-tight mb-3">
            Salón de la Fama
          </h2>

          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl">
            <strong className="text-white/80 font-semibold">
              Una semana alcanza para cerrar un debate de años.
            </strong>
            <br />
            Estos son los que ganaron y se quedaron con su lugar.
          </p>
        </div>

        {past.length === 0 ? (
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
          <div className="relative">
            {/* Flecha izquierda */}
            {past.length > 1 && (
              <button
                type="button"
                aria-label="Ver ediciones anteriores"
                onClick={() => scrollCarousel("left")}
                className="
                  absolute z-20
                  left-0 sm:-left-5
                  top-1/2 -translate-y-1/2
                  w-8 h-8 sm:w-10 sm:h-10
                  rounded-full
                  bg-[#77b6ea]
                  text-[#141414]
                  flex items-center justify-center
                  shadow-lg
                  hover:scale-105
                  transition-transform
                "
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
            )}

            {/* Carrusel */}
            <div
              ref={carouselRef}
              className="
                flex gap-4
                overflow-x-auto
                scroll-smooth
                snap-x snap-mandatory
                scrollbar-hide
                px-2 sm:px-4
                pb-2
              "
            >
              {past.map((week) => (
                <button
                  key={week.weekId}
                  type="button"
                  onClick={() => setSelectedWeek(week)}
                  className="
                    group
                    relative
                    flex-none
                    w-[85%]
                    sm:w-[calc((100%-32px)/3)]
                    aspect-video
                    overflow-hidden
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    hover:border-[#ffdd4a]/40
                    text-left
                    transition-all
                    snap-start
                    cursor-pointer
                  "
                >
                  <Image
                    src={week.resultImage}
                    alt={week.title}
                    fill
                    draggable={false}
                    className="
                      object-cover
                      object-center
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  <div
                    className="
                      absolute top-3 right-3
                      bg-black/50
                      backdrop-blur-sm
                      text-white/80
                      text-[10px]
                      px-2.5 py-1.5
                      rounded-full
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      pointer-events-none
                    "
                  >
                    Ver imagen ↗
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                    <p className="text-white font-bold text-sm leading-snug mb-2">
                      {week.title}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {week.winners.map((winner, i) => (
                        <span
                          key={i}
                          className="
                            bg-[#ffdd4a]
                            text-[#141414]
                            text-[10px]
                            font-bold
                            px-2 py-0.5
                            rounded-full
                          "
                        >
                          {winner}
                        </span>
                      ))}
                    </div>

                    <p className="text-white/40 text-[11px]">
                      {week.totalVotes.toLocaleString("es-AR")} votos
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Flecha derecha */}
            {past.length > 1 && (
              <button
                type="button"
                aria-label="Ver próximas ediciones"
                onClick={() => scrollCarousel("right")}
                className="
                  absolute z-20
                  right-0 sm:-right-5
                  top-1/2 -translate-y-1/2
                  w-8 h-8 sm:w-10 sm:h-10
                  rounded-full
                  bg-[#77b6ea]
                  text-[#141414]
                  flex items-center justify-center
                  shadow-lg
                  hover:scale-105
                  transition-transform
                "
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedWeek && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/90
            backdrop-blur-sm
            flex items-center justify-center
            p-4 sm:p-8
          "
          onClick={() => setSelectedWeek(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setSelectedWeek(null)}
            className="
              absolute top-4 right-4
              z-50
              w-10 h-10
              rounded-full
              bg-white/10
              hover:bg-white/20
              text-white
              flex items-center justify-center
            "
          >
            <X size={20} />
          </button>

          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedWeek.resultImage}
              alt={selectedWeek.title}
              width={1600}
              height={900}
              priority
              className="
                w-full
                max-h-[82vh]
                object-contain
                rounded-xl
              "
            />

            <div className="text-center mt-4">
              <p className="text-white font-bold">{selectedWeek.title}</p>

              <p className="text-white/40 text-xs mt-1">
                {selectedWeek.totalVotes.toLocaleString("es-AR")} votos
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
