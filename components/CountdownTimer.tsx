"use client";

import { useEffect, useState } from "react";
import { getSecondsUntilClose } from "@/lib/utils";
import { weekConfig } from "@/config/week.config";

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

export function CountdownTimer() {
  const [seconds, setSeconds] = useState<number | null>(null);
  const closingHour = weekConfig.ui.voting.closingHour;

  useEffect(() => {
    setSeconds(getSecondsUntilClose());
    const interval = setInterval(
      () => setSeconds(getSecondsUntilClose()),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  if (seconds === null) return null;

  const { h, m, s } = formatTime(seconds);
  const urgent = seconds < 3600;
  const closed = seconds === 0;

  if (closed) {
    return (
      <div className="pt-5 border-t border-white/10 lg:border-t-0 lg:pt-0 text-center lg:text-left">
        <p className="text-white/40 text-sm">La votación de hoy cerró.</p>
        <p className="text-white/25 text-xs mt-0.5">
          El ganador se revela a las {closingHour}:00 hs.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-5 border-t border-white/10 lg:border-t-0 lg:pt-0">
      {/* Label */}
      <p className="text-white/40 text-[11px] uppercase tracking-widest mb-3 text-center lg:text-left">
        {urgent
          ? "⚡ Última hora para votar"
          : `Cierra hoy ${closingHour}:00 hs`}
      </p>

      {/* Dígitos grandes — centrados en mobile, izquierda en desktop */}
      <div className="flex items-end gap-1 justify-center lg:justify-start">
        <TimeBlock value={h} label="hs" urgent={urgent} />
        <Colon urgent={urgent} />
        <TimeBlock value={m} label="min" urgent={urgent} />
        <Colon urgent={urgent} />
        <TimeBlock value={s} label="seg" urgent={urgent} />
      </div>
    </div>
  );
}

function TimeBlock({
  value,
  label,
  urgent,
}: {
  value: string;
  label: string;
  urgent: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={`font-extrabold tabular-nums leading-none text-5xl sm:text-6xl tracking-tight ${
          urgent ? "text-[#ffdd4a]" : "text-white"
        }`}
      >
        {value}
      </span>
      <span className="text-white/30 text-[9px] uppercase tracking-widest mt-1.5">
        {label}
      </span>
    </div>
  );
}

function Colon({ urgent }: { urgent: boolean }) {
  return (
    <span
      className={`font-extrabold text-4xl sm:text-5xl leading-none mb-4 mx-1 ${
        urgent ? "text-[#ffdd4a]/60" : "text-white/20"
      }`}
    >
      :
    </span>
  );
}
