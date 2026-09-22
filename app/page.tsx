import { Hero } from "@/components/Hero";
import { VotingSection } from "@/components/VotingSection";
import { WinnersList } from "@/components/WinnersList";
import { Navbar } from "@/components/Navbar";
import { LiveActivityFeed, LiveActivityPopup } from "@/components/LiveActivity";
import { HowItWorks } from "@/components/HowItWorks";
import { ComingSoon } from "@/components/ComingSoon";
import { HallOfFame } from "@/components/HallOfFame";
import { SiteFooter } from "@/components/SiteFooter";
import { weekConfig } from "@/config/week.config";
import { DailyWinner, VoteOption } from "@/lib/types";
import { isVotingOpen } from "@/lib/utils";
import { createServerClient } from "@/lib/supabase";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.length > 0 && !url.includes("placeholder");
}

async function getVotingData() {
  if (!isSupabaseConfigured()) {
    return {
      options: weekConfig.options.map((o) => ({
        id: o.id as string,
        text: o.text as string,
        description: o.description as string | undefined,
        voteCount: 0,
      })),
      winners: [] as DailyWinner[],
    };
  }

  try {
    const supabase = createServerClient();
    const weekId = weekConfig.weekId;
    const today = new Date();
    const start = new Date(weekConfig.startDate);
    const day = Math.max(
      0,
      Math.min(
        Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
        6
      )
    );

    const [{ data: winnerRows }, { data: voteRows }] = await Promise.all([
      supabase.from("daily_winners").select("*").eq("week_id", weekId).order("day", { ascending: true }),
      supabase.from("votes").select("option_id, option_text").eq("week_id", weekId).eq("day", day),
    ]);

    const counts: Record<string, { count: number; text?: string }> = {};
    for (const row of voteRows ?? []) {
      if (!counts[row.option_id]) counts[row.option_id] = { count: 0 };
      counts[row.option_id].count++;
      if (row.option_text) counts[row.option_id].text = row.option_text;
    }

    const wonOptionIds = new Set((winnerRows ?? []).map((w: { option_id: string }) => w.option_id));

    const options: VoteOption[] = weekConfig.options
      .filter((o) => !wonOptionIds.has(o.id))
      .map((o) => ({
        id: o.id as string,
        text: o.text as string,
        description: o.description as string | undefined,
        voteCount: counts[o.id]?.count ?? 0,
      }));

    for (const [id, { count, text }] of Object.entries(counts)) {
      if (!weekConfig.options.find((o) => o.id === id) && text) {
        options.push({ id, text, voteCount: count });
      }
    }
    options.sort((a, b) => b.voteCount - a.voteCount);

    const winners: DailyWinner[] = (winnerRows ?? []).map(
      (w: { day: number; date: string; option_text: string; vote_count: number }) => ({
        day: w.day, date: w.date, optionText: w.option_text, voteCount: w.vote_count,
      })
    );

    return { options, winners };
  } catch {
    return {
      options: weekConfig.options.map((o) => ({ id: o.id as string, text: o.text as string, voteCount: 0 })),
      winners: [] as DailyWinner[],
    };
  }
}

export default async function Home() {
  const { options, winners } = await getVotingData();
  const votingOpen = isVotingOpen();

  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      <Navbar />

      {/* Hero — ancho completo */}
      <Hero winners={winners} />

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Columna izquierda — votación */}
          <div className="lg:col-span-2 space-y-5">
            <VotingSection
              availableOptions={options}
              isClosed={!votingOpen}
              todayWinner={null}
            />
            <WinnersList winners={winners} />
            <HowItWorks />
          </div>

          {/* Columna derecha — sidebar */}
          <div className="space-y-5">
            <LiveActivityFeed />
            <ComingSoon />
          </div>
        </div>
      </div>

      {/* Salón de la fama — ancho completo */}
      <HallOfFame />

      <SiteFooter />

      {/* Popup flotante en mobile */}
      <LiveActivityPopup />
    </div>
  );
}
