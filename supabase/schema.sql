-- Mashnu AI website schema
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
-- Both tables are written to exclusively by server-side code using the
-- secret/service-role key, which bypasses RLS — so RLS is enabled with
-- no policies, meaning the anon/publishable key can never read or write
-- these tables directly from the browser.

-- Leads captured from the Contact page, the homepage early-access form,
-- and Careers internship applications.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'contact_form',
  full_name text,
  email text not null,
  phone text,
  company text,
  use_case text not null,
  created_at timestamptz not null default now()
);

-- Adds the phone column to a leads table created before it existed.
-- Safe to re-run; no-ops if the column is already present.
alter table public.leads add column if not exists phone text;

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- AI Assistant chat messages, grouped by session_id so a full
-- conversation can be reconstructed later.
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_id_idx on public.chat_messages (session_id, created_at);

alter table public.chat_messages enable row level security;

-- Internal marketing "AI team" (src/pages/Team.tsx). Each row is one role's
-- result from a single run; run_group_id ties together the rows produced by
-- the same "Run All" click (or a single row for an individual role click).
create table if not exists public.team_runs (
  id uuid primary key default gen_random_uuid(),
  run_group_id uuid not null,
  role text not null check (role in ('content_strategist', 'copy_producer', 'publisher', 'community_rep', 'growth_analyst')),
  status text not null check (status in ('done', 'needs_approval', 'needs_setup', 'error')),
  input jsonb,
  output jsonb,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists team_runs_run_group_idx on public.team_runs (run_group_id, created_at);
create index if not exists team_runs_created_at_idx on public.team_runs (created_at desc);

alter table public.team_runs enable row level security;
