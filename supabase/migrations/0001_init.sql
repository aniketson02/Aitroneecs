-- Aitroneecs storefront schema
-- Run in the Supabase SQL editor (or via `supabase db push`).

-- ============================================================
-- Tables
-- ============================================================

create table if not exists categories (
  id          text primary key,
  slug        text unique not null,
  name        text not null,
  tagline     text not null default '',
  description text not null default '',
  image_url   text not null default '',
  sort_order  int  not null default 0
);

create table if not exists products (
  id               text primary key,
  slug             text unique not null,
  name             text not null,
  tagline          text not null default '',
  description      text not null default '',
  price            int  not null check (price >= 0),
  compare_at_price int,
  category_id      text references categories (id) on delete set null,
  featured         boolean not null default false,
  stock            int not null default 0,
  rating           numeric(2, 1) not null default 5.0,
  reviews          int not null default 0,
  badge            text,
  highlights       jsonb not null default '[]'::jsonb,
  specs            jsonb not null default '[]'::jsonb,
  options          jsonb,
  created_at       timestamptz not null default now()
);

create table if not exists product_images (
  id         bigint generated always as identity primary key,
  product_id text not null references products (id) on delete cascade,
  url        text not null,
  alt        text not null default '',
  sort_order int  not null default 0
);

create table if not exists orders (
  id                 uuid primary key default gen_random_uuid(),
  order_number       text unique not null,
  customer_name      text not null,
  email              text not null,
  phone              text not null,
  shipping_address   jsonb not null,
  amount             int  not null,
  currency           text not null default 'INR',
  status             text not null default 'paid',
  razorpay_order_id  text,
  razorpay_payment_id text,
  created_at         timestamptz not null default now()
);

create table if not exists order_items (
  id         bigint generated always as identity primary key,
  order_id   uuid not null references orders (id) on delete cascade,
  product_id text,
  name       text not null,
  unit_price int  not null,
  qty        int  not null
);

create index if not exists idx_products_category on products (category_id);
create index if not exists idx_product_images_product on product_images (product_id);
create index if not exists idx_order_items_order on order_items (order_id);

-- ============================================================
-- View consumed by the storefront data layer
-- ============================================================

create or replace view products_with_images as
select
  p.id,
  p.slug,
  p.name,
  p.tagline,
  p.description,
  p.price,
  p.compare_at_price,
  c.slug as category_slug,
  p.featured,
  p.stock,
  p.rating,
  p.reviews,
  p.badge,
  p.highlights,
  p.specs,
  p.options,
  coalesce(
    (
      select jsonb_agg(jsonb_build_object('url', pi.url, 'alt', pi.alt) order by pi.sort_order)
      from product_images pi
      where pi.product_id = p.id
    ),
    '[]'::jsonb
  ) as images
from products p
left join categories c on c.id = p.category_id;

-- ============================================================
-- Row Level Security
-- ============================================================

alter table categories      enable row level security;
alter table products        enable row level security;
alter table product_images  enable row level security;
alter table orders          enable row level security;
alter table order_items     enable row level security;

-- Public read access to the catalog
create policy "public read categories"     on categories     for select using (true);
create policy "public read products"        on products        for select using (true);
create policy "public read product_images"  on product_images  for select using (true);

-- Orders are written only by the server (service-role key bypasses RLS).
-- No public policies are created for orders / order_items, so anon/auth
-- clients can neither read nor write them.

-- ============================================================
-- Storage bucket for product imagery
-- ============================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "public read product images bucket"
  on storage.objects for select
  using (bucket_id = 'product-images');
