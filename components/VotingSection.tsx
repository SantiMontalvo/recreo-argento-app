"use client";

import { useState } from "react";
import { weekConfig } from "@/config/week.config";
import { VoteOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { VoteModal } from "@/components/VoteModal";

type VotingSectionProps = {
  availableOptions: VoteOption[];
  isClosed: boolean;
  todayWinner: VoteOption | null;
};

export function VotingSection({ availableOptions, isClosed }: VotingSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { voting } = weekConfig.ui;

  const totalVotes = availableOptions.reduce((s, o) => s + o.voteCount, 0);

  const selectedOption: VoteOption | null = selected === "custom" && customText.trim()
    ? { id: "custom", text: customText.trim(), voteCount: 0, isCustom: true }
    : availableOptions.find((o) => o.id === selected) ?? null;

  const canVote = !!selectedOption;

  if (isClosed) {
    return (
      <section className="bg-white rounded-2xl border border-[#141414]/6 px-5 py-8">
        <p className="text-center text-[#141414]/40 text-sm">{voting.closedMessage}</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white rounded-2xl border border-[#141414]/6 px-5 py-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#141414]">{voting.sectionTitle}</h2>
          <p className="text-sm text-[#141414]/50 mt-0.5 leading-snug">
            {weekConfig.challenge.title}
          </p>
        </div>

        {/* Opciones */}
        <div className="flex flex-col gap-2 mb-5">
          {availableOptions.map((option) => {
            const pct = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
            const isSelected = selected === option.id;

            return (
              <button
                key={option.id}
                onClick={() => { setSelected(option.id); setShowCustom(false); }}
                className={cn(
                  "relative w-full text-left rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.98]",
                  isSelected ? "bg-[#141414] shadow-md" : "bg-[#f8f8f5] border border-[#141414]/6"
                )}
              >
                {!isSelected && totalVotes > 0 && pct > 0 && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#77b6ea]/25 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className={cn("text-sm font-semibold leading-snug", isSelected ? "text-white" : "text-[#141414]")}>
                      {option.text}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {totalVotes > 0 && (
                        <span className={cn("text-xs font-medium", isSelected ? "text-white/50" : "text-[#77b6ea]")}>
                          {Math.round(pct)}%
                        </span>
                      )}
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        isSelected ? "bg-[#ffdd4a] border-[#ffdd4a]" : "border-[#141414]/20"
                      )}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#141414]" />}
                      </div>
                    </div>
                  </div>
                  {isSelected && option.description && (
                    <p className="text-white/55 text-xs leading-relaxed mt-2 italic">
                      {option.description}
                    </p>
                  )}
                </div>
              </button>
            );
          })}

          {/* Opción personalizada */}
          {!showCustom ? (
            <button
              onClick={() => { setShowCustom(true); setSelected("custom"); }}
              className="w-full text-left rounded-2xl border-2 border-dashed border-[#141414]/15 px-4 py-3 text-sm text-[#141414]/40 flex items-center gap-2 active:scale-[0.98] transition-all"
            >
              <Plus size={15} strokeWidth={2.5} />
              {voting.customOptionPlaceholder}
            </button>
          ) : (
            <div
              onClick={() => setSelected("custom")}
              className={cn(
                "rounded-2xl overflow-hidden cursor-text transition-all",
                selected === "custom" ? "bg-[#141414] shadow-md" : "bg-[#f8f8f5] border border-[#141414]/6"
              )}
            >
              <div className="px-4 py-3">
                <input
                  autoFocus
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Escribí tu opción..."
                  maxLength={60}
                  className={cn(
                    "w-full bg-transparent text-sm font-semibold outline-none",
                    selected === "custom"
                      ? "text-white placeholder:text-white/30"
                      : "text-[#141414] placeholder:text-[#141414]/30"
                  )}
                />
              </div>
            </div>
          )}
        </div>

        {/* Botón */}
        <button
          onClick={() => canVote && setShowModal(true)}
          disabled={!canVote}
          className={cn(
            "w-full rounded-2xl py-4 text-sm font-bold tracking-wide transition-all duration-150",
            canVote
              ? "bg-[#ffdd4a] text-[#141414] active:scale-[0.98] shadow-sm"
              : "bg-[#141414]/8 text-[#141414]/30 cursor-not-allowed"
          )}
        >
          {voting.voteButton}
        </button>
      </section>

      {/* Modal */}
      {showModal && selectedOption && (
        <VoteModal
          option={selectedOption}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
