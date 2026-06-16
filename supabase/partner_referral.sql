-- Run this in the Supabase SQL editor before using the partner referral system.

create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_name text not null,
  email text not null unique,
  phone text,
  organization_type text not null default 'other',
  message text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists referral_codes (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references partners(id) on delete cascade,
  code text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_referral_codes_code on referral_codes (code);
create index if not exists idx_referral_codes_partner_id on referral_codes (partner_id);
create index if not exists idx_partners_status on partners (status);
create index if not exists idx_partners_email on partners (email);

alter table cohort5_applications
  add column if not exists referral_code text,
  add column if not exists partner_id uuid references partners(id);

create index if not exists idx_cohort5_applications_partner_id on cohort5_applications (partner_id);
create index if not exists idx_cohort5_applications_referral_code on cohort5_applications (referral_code);
