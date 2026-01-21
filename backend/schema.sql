-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table if not exists public.users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  hashed_password text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Characters Table (The Jiaguwen dictionary)
create table if not exists public.characters (
  id uuid default uuid_generate_v4() primary key,
  char_cn text not null, -- The modern Chinese character
  char_oracle_url text, -- URL to the oracle bone script image
  pinyin text,
  meaning_en text,
  meaning_cn text,
  description text,
  category text, -- e.g., Astronomy, Geography
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Uploads Table (For library/tracing)
create table if not exists public.user_uploads (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  file_url text not null,
  file_name text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies
alter table public.users enable row level security;
alter table public.characters enable row level security;
alter table public.user_uploads enable row level security;

-- Users can see their own data
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Public can view characters
create policy "Public can view characters" on public.characters
  for select using (true);

-- User uploads policies
create policy "Users can view own uploads" on public.user_uploads
  for select using (auth.uid() = user_id);

create policy "Users can insert own uploads" on public.user_uploads
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own uploads" on public.user_uploads
  for delete using (auth.uid() = user_id);
