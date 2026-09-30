import { supabase } from "@/lib/supabase";

interface CreateVoteParams {
  name: string;
  email: string;
  city: string;
  candidate: string;
  voteCount: number;
  pollId: string;
  comment?: string;
}

export const createVote = async ({
  name,
  email,
  city,
  candidate,
  voteCount,
  pollId,
  comment,
}: CreateVoteParams) => {
  const { data, error } = await supabase
    .from("votes")
    .insert({
      name,
      email,
      city,
      candidate,
      vote_count: voteCount,
      poll_id: pollId,
      comment,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
