"use client";

import { useEffect, useState } from "react";
import { weekConfig } from "@/config/week.config";
import { cn } from "@/lib/utils";

const NOMBRES = [
  "Martín", "Lucía", "Federico", "Valentina", "Gonzalo",
  "Camila", "Sebastián", "Florencia", "Matías", "Agustina",
  "Nicolás", "Romina", "Leandro", "Micaela", "Hernán",
  "Natalia", "Rodrigo", "Sofía", "Gustavo", "Paula",
  "Diego", "Lorena", "Pablo", "Gabriela", "Tomás",
];

const CIUDADES = [
  "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata",
  "Mar del Plata", "Tucumán", "Salta", "Santa Fe", "Neuquén",
];

type Activity = {
  id: number;
  name: string;
  city: string;
  option: string;
  visible: boolean;
};

let counter = 0;

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDelay(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}

// Versión inline (sidebar desktop)
export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    function addActivity() {
      const newItem: Activity = {
        id: counter++,
        name: randomFrom(NOMBRES),
        city: randomFrom(CIUDADES),
        option: randomFrom(weekConfig.options).text as string,
        visible: true,
      };
      setActivities((prev) => [newItem, ...prev].slice(0, 6));
    }

    addActivity();
    const interval = setInterval(addActivity, randomDelay(4000, 9000));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#141414]/6 overflow-hidden">
      <div className="px-4 py-3 border-b border-[#141414]/6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs font-bold text-[#141414] uppercase tracking-wider">En vivo</span>
      </div>
      <div className="divide-y divide-[#141414]/4">
        {activities.length === 0 && (
          <div className="px-4 py-4 text-xs text-[#141414]/30 text-center">
            Cargando actividad...
          </div>
        )}
        {activities.map((a, i) => (
          <div
            key={a.id}
            className={cn(
              "px-4 py-3 flex items-start gap-3 transition-all duration-500",
              i === 0 ? "bg-[#ffdd4a]/10" : "bg-white"
            )}
          >
            {/* Avatar inicial */}
            <div className="w-7 h-7 rounded-full bg-[#77b6ea]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-[#77b6ea]">
                {a.name[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#141414] leading-snug">
                <span className="font-semibold">{a.name}</span>
                {" votó por "}
                <span className="font-semibold text-[#141414]">"{a.option}"</span>
              </p>
              <p className="text-[10px] text-[#141414]/35 mt-0.5">{a.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Versión popup flotante (mobile)
export function LiveActivityPopup() {
  const [popup, setPopup] = useState<Activity | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function showPopup() {
      const item: Activity = {
        id: counter++,
        name: randomFrom(NOMBRES),
        city: randomFrom(CIUDADES),
        option: randomFrom(weekConfig.options).text as string,
        visible: true,
      };
      setPopup(item);
      setVisible(true);
      setTimeout(() => setVisible(false), 3500);
    }

    const timeout = setTimeout(showPopup, 2000);
    const interval = setInterval(showPopup, randomDelay(8000, 15000));
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!popup) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-4 z-40 transition-all duration-500 lg:hidden",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="bg-[#141414] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl max-w-[280px]">
        <div className="w-8 h-8 rounded-full bg-[#77b6ea]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-bold text-[#77b6ea]">{popup.name[0]}</span>
        </div>
        <div>
          <p className="text-white text-xs leading-snug">
            <span className="font-semibold">{popup.name}</span> votó por{" "}
            <span className="text-[#ffdd4a] font-semibold">"{popup.option}"</span>
          </p>
          <p className="text-white/30 text-[10px]">{popup.city}</p>
        </div>
      </div>
    </div>
  );
}
