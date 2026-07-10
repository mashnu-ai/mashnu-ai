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
  company text,
  use_case text not null,
  created_at timestamptz not null default now()
);

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
