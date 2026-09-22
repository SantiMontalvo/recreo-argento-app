export type VoteOption = {
  id: string;
  text: string;
  description?: string;
  voteCount: number;
  isWinner?: boolean;
  isCustom?: boolean;
};

export type DailyWinner = {
  day: number;
  date: string;
  optionText: string;
  voteCount: number;
};

export type VotingDay = {
  weekId: string;
  day: number;
  date: string;
  isClosed: boolean;
  options: VoteOption[];
  winners: DailyWinner[];
};

export type PaymentStatus = "idle" | "processing" | "success" | "error";
