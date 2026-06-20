-- Reviews + coupon support

-- Product reviews ---------------------------------------------
create table if not exists reviews (
  id          bigint generated always as identity primary key,
  product_id  text not null references products (id) on delete cascade,
  author_name text not null,
  rating      int  not null check (rating between 1 and 5),
  title       text not null default '',
  body        text not null default '',
  status      text not null default 'approved', -- approved | pending | rejected
  created_at  timestamptz not null default now()
);

create index if not exists idx_reviews_product on reviews (product_id, status);

alter table reviews enable row level security;

-- Public can read approved reviews; writes happen server-side (service role).
drop policy if exists "public read approved reviews" on reviews;
create policy "public read approved reviews"
  on reviews for select using (status = 'approved');

-- Coupon fields on orders -------------------------------------
alter table orders add column if not exists coupon_code text;
alter table orders add column if not exists discount int not null default 0;
