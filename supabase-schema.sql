-- ============================================================
-- DUMBSHIRTS — Supabase Schema
-- Run this in the Supabase SQL Editor to set up the database.
-- ============================================================

-- ── Products ────────────────────────────────────────────────
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  drop_number   text unique not null,
  title         text not null,
  meme_origin   text,
  material      text,
  price         integer not null,
  status        text default 'draft' check (status in ('available', 'sold', 'draft')),
  sold_date     timestamptz,
  dimensions    text,
  video_url     text,
  image_hero    text,
  image_macro1  text,
  image_macro2  text,
  image_macro3  text,
  sort_order    integer default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Orders ──────────────────────────────────────────────────
create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    text unique not null,
  customer_email  text not null,
  customer_name   text,
  status          text default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total           integer,
  notes           text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── Order Items ─────────────────────────────────────────────
create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  product_id  uuid not null references products(id),
  price       integer not null
);

-- ── Site Settings (key-value) ───────────────────────────────
create table if not exists site_settings (
  key    text primary key,
  value  jsonb not null default '{}'::jsonb
);

-- Seed default settings
insert into site_settings (key, value) values
  ('announcement', '{"text": "", "visible": false}'::jsonb),
  ('store_status', '{"open": true, "message": ""}'::jsonb),
  ('brand', '{"tagline": "one of one in existence"}'::jsonb)
on conflict (key) do nothing;

-- ── Updated-at trigger ──────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

-- ── Storage bucket ──────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;

-- ── RLS Policies ────────────────────────────────────────────

-- Products: public reads non-draft; authenticated full access
alter table products enable row level security;

create policy "Public can read non-draft products"
  on products for select
  using (status != 'draft');

create policy "Authenticated full access to products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Orders: authenticated only
alter table orders enable row level security;

create policy "Authenticated full access to orders"
  on orders for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Order items: authenticated only
alter table order_items enable row level security;

create policy "Authenticated full access to order_items"
  on order_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Site settings: public reads; authenticated writes
alter table site_settings enable row level security;

create policy "Public can read site_settings"
  on site_settings for select
  using (true);

create policy "Authenticated can manage site_settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage: public reads; authenticated writes
create policy "Public can read product-media"
  on storage.objects for select
  using (bucket_id = 'product-media');

create policy "Authenticated can upload product-media"
  on storage.objects for insert
  with check (bucket_id = 'product-media' and auth.role() = 'authenticated');

create policy "Authenticated can update product-media"
  on storage.objects for update
  using (bucket_id = 'product-media' and auth.role() = 'authenticated');

create policy "Authenticated can delete product-media"
  on storage.objects for delete
  using (bucket_id = 'product-media' and auth.role() = 'authenticated');
