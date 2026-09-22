import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { weekConfig } from "@/config/week.config";
import { getCurrentDay } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const supabase = createServerClient();
  const weekId = weekConfig.weekId;
  const today = getCurrentDay();

  // Ganadores de días anteriores
  const { data: winnerRows } = await supabase
    .from("daily_winners")
    .select("*")
    .eq("week_id", weekId)
    .order("day", { ascending: true });

  // Conteos de votos del día actual (incluye vote_count para packs)
  const { data: voteRows } = await supabase
    .from("votes")
    .select("option_id, option_text, vote_count")
    .eq("week_id", weekId)
    .eq("day", today);

  // Sumar votos por opción (respetando vote_count del pack)
  const counts: Record<string, { count: number; text?: string }> = {};
  for (const row of voteRows ?? []) {
    if (!counts[row.option_id]) counts[row.option_id] = { count: 0 };
    counts[row.option_id].count += row.vote_count ?? 1;
    if (row.option_text) counts[row.option_id].text = row.option_text;
  }

  // IDs de opciones ganadoras (ya no disponibles)
  const wonOptionIds = new Set((winnerRows ?? []).map((w) => w.option_id));

  // Armar lista de opciones disponibles
  const options: { id: string; text: string; voteCount: number }[] =
    weekConfig.options
      .filter((o) => !wonOptionIds.has(o.id))
      .map((o) => ({
        id: o.id as string,
        text: o.text as string,
        voteCount: counts[o.id]?.count ?? 0,
      }));

  // Sumar opciones personalizadas del día
  for (const [id, { count, text }] of Object.entries(counts)) {
    if (!weekConfig.options.find((o) => o.id === id) && text) {
      options.push({ id, text, voteCount: count });
    }
  }

  options.sort((a, b) => b.voteCount - a.voteCount);

  return NextResponse.json({
    options,
    winners: winnerRows ?? [],
    today,
  });
}
