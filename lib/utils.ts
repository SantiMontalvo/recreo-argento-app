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

function getArgentinaTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
}

export function isVotingOpen(): boolean {
  const now = getArgentinaTime();
  const closingHour = weekConfig.ui.voting.closingHour;

  const start = new Date(new Date(weekConfig.startDate + "T00:00:00-03:00").toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  const end = new Date(new Date(weekConfig.endDate + "T00:00:00-03:00").toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
  end.setHours(closingHour, 0, 0, 0);

  if (now < start || now >= end) return false;

  return now.getHours() < closingHour;
}

export function getSecondsUntilClose(): number {
  const now = getArgentinaTime();
  const closingHour = weekConfig.ui.voting.closingHour;
  const close = getArgentinaTime();
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
