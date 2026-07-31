-- Hot Seat: initial schema.
--
-- Five tables, every one owned by a user and every one protected by row-level
-- security. Isolation lives here rather than in application code because a
-- handler can forget a WHERE clause and a policy cannot, and because a forked
-- deployment inherits the protection without having to trust our handlers.

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, including anonymous ones.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  display_name  text,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

comment on table public.profiles is
  'One row per auth user. Anonymous players get one too, which is what lets RLS protect them from their very first answer.';

-- ---------------------------------------------------------------------------
-- attempts: every graded answer. The audit trail and the rate-limit source.
-- ---------------------------------------------------------------------------
create type public.answer_source as enum ('daily', 'hot_seat', 'practice');
create type public.verdict as enum ('correct', 'partial', 'wrong', 'ungraded');

create table public.attempts (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users on delete cascade,
  card_slug      text not null,
  facet          text not null,
  source         public.answer_source not null,
  verdict        public.verdict not null,
  -- Per-criterion rubric hits rather than one score, so a reveal can show the
  -- checklist and the scheduler can weight the specific move that was missed.
  rubric         jsonb not null default '{}'::jsonb,
  missed         text[] not null default '{}',
  answer_chars   int not null default 0,
  elapsed_ms     int,
  hesitated      boolean not null default false,
  created_at     timestamptz not null default now()
);

-- Rate limiting and the weekly cap are counting queries over this table rather
-- than separate counters, so there is one source of truth and nothing to keep
-- in sync. These indexes are what make that cheap.
create index attempts_user_time on public.attempts (user_id, created_at desc);
create index attempts_user_card on public.attempts (user_id, card_slug);

-- ---------------------------------------------------------------------------
-- leitner: spaced repetition state, one row per user per prompt.
-- ---------------------------------------------------------------------------
create table public.leitner (
  user_id              uuid not null references auth.users on delete cascade,
  card_slug            text not null,
  facet                text not null,
  box                  smallint not null default 1 check (box between 1 and 6),
  due_at               timestamptz not null default now(),
  consecutive_correct  smallint not null default 0,
  last_verdict         public.verdict,
  updated_at           timestamptz not null default now(),
  primary key (user_id, card_slug, facet)
);

create index leitner_due on public.leitner (user_id, due_at);

-- ---------------------------------------------------------------------------
-- streaks: the habit number. One row per user.
-- ---------------------------------------------------------------------------
create table public.streaks (
  user_id        uuid primary key references auth.users on delete cascade,
  current        int not null default 0,
  longest        int not null default 0,
  -- Stored as a local date, not a timestamp. A streak is about the player's
  -- day, and a UTC timestamp breaks that for everyone outside UTC.
  last_played_on date,
  time_zone      text not null default 'UTC',
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- sessions: Hot Seat runs. The unit the budget is actually enforced in.
-- ---------------------------------------------------------------------------
create type public.session_outcome as enum ('survived', 'wounded', 'burned', 'abandoned');

create table public.sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users on delete cascade,
  scenario     text not null,
  cards        text[] not null default '{}',
  turn_count   int not null default 0,
  credibility  smallint not null default 5,
  outcome      public.session_outcome,
  started_at   timestamptz not null default now(),
  ended_at     timestamptz
);

-- The weekly session cap is a count over this index.
create index sessions_user_time on public.sessions (user_id, started_at desc);

-- ---------------------------------------------------------------------------
-- Row-level security.
--
-- Enabled on every table with no exceptions. Each policy is the same shape:
-- you may touch a row only when it is yours. There is deliberately no policy
-- granting cross-user reads, not even for aggregate stats, because the moment
-- one exists it becomes the thing that has to be got right forever.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.attempts enable row level security;
alter table public.leitner  enable row level security;
alter table public.streaks  enable row level security;
alter table public.sessions enable row level security;

create policy "own profile" on public.profiles
  for all using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "own attempts" on public.attempts
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own leitner" on public.leitner
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own streaks" on public.streaks
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "own sessions" on public.sessions
  for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- A profile row is created by trigger rather than by the client, so it exists
-- before the first answer is graded and cannot be skipped by a client that
-- forgets to call an endpoint.
-- ---------------------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  insert into public.streaks (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
