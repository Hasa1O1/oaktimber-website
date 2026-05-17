create extension if not exists "pgcrypto";

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section text not null,
  content text not null,
  updated_at timestamp with time zone not null default now()
);

create unique index if not exists site_content_page_section_key
  on public.site_content (page, section);

create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  category text,
  title text not null,
  description text,
  features jsonb not null default '[]'::jsonb,
  image_url text,
  "order" integer not null default 0,
  created_at timestamp with time zone not null default now()
);

alter table public.site_content enable row level security;
alter table public.cards enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content
  for select
  using (true);

drop policy if exists "Authenticated users can insert site content" on public.site_content;
create policy "Authenticated users can insert site content"
  on public.site_content
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update site content" on public.site_content;
create policy "Authenticated users can update site content"
  on public.site_content
  for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can delete site content" on public.site_content;
create policy "Authenticated users can delete site content"
  on public.site_content
  for delete
  to authenticated
  using (auth.role() = 'authenticated');

drop policy if exists "Public can read cards" on public.cards;
create policy "Public can read cards"
  on public.cards
  for select
  using (true);

drop policy if exists "Authenticated users can insert cards" on public.cards;
create policy "Authenticated users can insert cards"
  on public.cards
  for insert
  to authenticated
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update cards" on public.cards;
create policy "Authenticated users can update cards"
  on public.cards
  for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can delete cards" on public.cards;
create policy "Authenticated users can delete cards"
  on public.cards
  for delete
  to authenticated
  using (auth.role() = 'authenticated');

create or replace function public.set_site_content_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
  before update on public.site_content
  for each row
  execute function public.set_site_content_updated_at();
