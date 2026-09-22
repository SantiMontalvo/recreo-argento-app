import { weekConfig } from "@/config/week.config";
import { DailyWinner } from "@/lib/types";

type WinnersListProps = {
  winners: DailyWinner[];
};

const DAY_NAMES = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export function WinnersList({ winners }: WinnersListProps) {
  const { winners: texts } = weekConfig.ui;

  if (winners.length === 0) return null;

  return (
    <section className="px-5 pb-8">
      {/* Separador */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-[#141414]/8" />
        <span className="text-xs font-bold text-[#141414]/30 uppercase tracking-widest">
          {texts.sectionTitle}
        </span>
        <div className="flex-1 h-px bg-[#141414]/8" />
      </div>

      <div className="flex flex-col gap-2">
        {winners.map((winner, i) => (
          <div
            key={winner.day}
            className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3.5 border border-[#141414]/6"
          >
            {/* Número del día */}
            <div className="w-8 h-8 rounded-xl bg-[#77b6ea]/15 flex items-center justify-center flex-shrink-0">
              <span className="text-[#77b6ea] text-xs font-bold">{i + 1}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#141414] truncate">
                {winner.optionText}
              </p>
              <p className="text-xs text-[#141414]/40">{DAY_NAMES[winner.day]}</p>
            </div>

            {/* Badge amarillo con votos */}
            <span className="bg-[#ffdd4a] text-[#141414] text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0">
              {winner.voteCount} votos
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
