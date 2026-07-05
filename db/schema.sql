create table if not exists public.lessons (
  id text primary key,
  title text not null,
  lesson_number integer not null,
  player_title text not null,
  video_duration text not null,
  about_description text not null,
  youtube_video_id text not null,
  youtube_url text not null,
  thumbnail_url text not null,
  thumbnail_label text not null,
  status text not null check (status in ('current', 'next', 'locked')),
  ai_context text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.module_progress (
  id text primary key default 'current',
  module_title text not null,
  completed_lessons integer not null default 0,
  total_lessons integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.home_summary (
  id text primary key default 'default',
  user_name text not null,
  pending_assignments integer not null default 0,
  completed_lessons integer not null default 0,
  streak_days integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignments (
  id text primary key,
  title text not null,
  description text not null,
  due_date date not null,
  is_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.lessons enable row level security;
alter table public.module_progress enable row level security;
alter table public.home_summary enable row level security;
alter table public.assignments enable row level security;

drop policy if exists "Public read lessons" on public.lessons;
create policy "Public read lessons"
on public.lessons for select
using (true);

drop policy if exists "Public read module progress" on public.module_progress;
create policy "Public read module progress"
on public.module_progress for select
using (true);

drop policy if exists "Public read home summary" on public.home_summary;
create policy "Public read home summary"
on public.home_summary for select
using (true);

drop policy if exists "Public read assignments" on public.assignments;
create policy "Public read assignments"
on public.assignments for select
using (true);
