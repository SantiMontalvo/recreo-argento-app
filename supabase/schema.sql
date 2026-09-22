-- Votos individuales
create table votes (
  id uuid primary key default gen_random_uuid(),
  week_id text not null,
  option_id text not null,
  option_text text,
  day smallint not null,
  payment_id text not null unique,
  amount numeric not null,
  vote_count smallint not null default 1,  -- pack de votos (1, 2 o 5)
  voter_name text,
  voter_email text,
  voter_city text,
  created_at timestamptz default now()
);

-- Ganadores por día
create table daily_winners (
  id uuid primary key default gen_random_uuid(),
  week_id text not null,
  day smallint not null,
  date date not null,
  option_id text not null,
  option_text text not null,
  vote_count int not null,
  unique(week_id, day)
);

-- Índices
create index votes_week_day on votes(week_id, day);
create index winners_week on daily_winners(week_id);
