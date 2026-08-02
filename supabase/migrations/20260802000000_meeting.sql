-- ---------------------------------------------------------------------------
-- M4: the meeting.
--
-- Two additive columns on `attempts`, both nullable, so every existing row and
-- every existing query keeps working untouched.
--
-- Why they exist: the ending of a meeting says whether the board approved,
-- deferred or redirected the ask, and that is derived from what the player
-- actually did across the meeting. Without a join from an answer back to its
-- meeting, the only way to know is to have the client add it up and send the
-- total, which makes the ending a claim rather than a fact. Every other piece
-- of game state in this schema is written by the server from something it
-- observed, and the ending should be no different.
--
-- `stance` is stored for the same reason. The verdict says whether the answer
-- worked; the stance says what move it made, and conceding to a director who is
-- right is a different meeting from countering one who is wrong even when both
-- score correct. The ending cannot tell those apart from `verdict` alone.
-- ---------------------------------------------------------------------------

-- ON DELETE SET NULL rather than CASCADE: an attempt is a real answer a real
-- person gave, and it outlives the meeting it happened in. Deleting a session
-- should orphan the attempt, never erase it.
alter table public.attempts
  add column if not exists session_id uuid references public.sessions (id) on delete set null;

-- Text with a check rather than an enum. The values come from the verdict
-- schema, which is versioned in application code and will gain values there
-- first; a check constraint can follow that in one migration, where an enum
-- needs a type alteration and a deploy ordering.
alter table public.attempts
  add column if not exists stance text
  check (stance is null or stance in ('countered', 'conceded', 'refused', 'accepted', 'none'));

-- The ending reads every attempt in one meeting. Partial, because the
-- overwhelming majority of rows are Daily answers with no session at all.
create index if not exists attempts_session on public.attempts (session_id)
  where session_id is not null;
