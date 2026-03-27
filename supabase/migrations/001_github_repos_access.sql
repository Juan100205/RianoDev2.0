-- ============================================================
-- RIANODEVZ – GitHub Repos + User Access Control
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. PROFILES (one row per auth.user)
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Auto-create profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. GITHUB_REPOS (synced from GitHub API by admin)
-- ---------------------------------------------------------------
create table if not exists public.github_repos (
  id                 bigint primary key,   -- GitHub repo ID
  name               text not null,
  full_name          text,
  description        text,
  html_url           text not null,
  homepage           text,
  language           text,
  topics             text[] not null default '{}',
  stars              int not null default 0,
  github_updated_at  timestamptz,
  synced_at          timestamptz not null default now()
);

-- 3. USER_REPO_ACCESS (admin grants per user)
-- ---------------------------------------------------------------
create table if not exists public.user_repo_access (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  repo_id     bigint not null references public.github_repos(id) on delete cascade,
  granted_at  timestamptz not null default now(),
  unique (user_id, repo_id)
);

-- ============================================================
-- RLS
-- ============================================================

alter table public.profiles        enable row level security;
alter table public.github_repos    enable row level security;
alter table public.user_repo_access enable row level security;

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- profiles
drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_admin_all" on public.profiles;

create policy "profiles_select"      on public.profiles for select using (auth.role() = 'authenticated');
create policy "profiles_update_own"  on public.profiles for update using (auth.uid() = id);
create policy "profiles_admin_all"   on public.profiles for all    using (public.is_admin());

-- github_repos
drop policy if exists "repos_select" on public.github_repos;
drop policy if exists "repos_admin_all" on public.github_repos;

create policy "repos_select"    on public.github_repos for select using (auth.role() = 'authenticated');
create policy "repos_admin_all" on public.github_repos for all    using (public.is_admin());

-- user_repo_access
drop policy if exists "access_select_own"   on public.user_repo_access;
drop policy if exists "access_admin_all"    on public.user_repo_access;

create policy "access_select_own" on public.user_repo_access for select
  using (auth.uid() = user_id or public.is_admin());
create policy "access_admin_all"  on public.user_repo_access for all
  using (public.is_admin());

-- ============================================================
-- MAKE YOURSELF ADMIN
-- After running this migration, execute the next line replacing
-- the email with yours to become admin:
--
-- update public.profiles set is_admin = true where email = 'tu@email.com';
-- ============================================================
