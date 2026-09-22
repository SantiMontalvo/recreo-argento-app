import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { weekConfig } from "@/config/week.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDay(): number {
  const start = new Date(weekConfig.startDate);
  const today = new Date();
  const diff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, Math.min(diff, 6));
}

export function isVotingOpen(): boolean {
  const now = new Date();
  const closingHour = weekConfig.ui.voting.closingHour;
  const start = new Date(weekConfig.startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(weekConfig.endDate);
  end.setHours(closingHour, 0, 0, 0);

  if (now < start || now >= end) return false;

  // Dentro del rango de la semana: verificar hora de cierre diario
  return now.getHours() < closingHour;
}

export function getSecondsUntilClose(): number {
  const now = new Date();
  const closingHour = weekConfig.ui.voting.closingHour;
  const close = new Date();
  close.setHours(closingHour, 0, 0, 0);
  const diff = close.getTime() - now.getTime();
  return diff > 0 ? Math.floor(diff / 1000) : 0;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
