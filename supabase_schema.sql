-- Create a table for Doctor Profiles
create table public.doctors (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  title text,
  specialization text,
  license_number text,
  hospital text,
  address text,
  bio text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.doctors enable row level security;

create policy "Doctors can view their own profile" on public.doctors
  for select using (auth.uid() = id);

create policy "Doctors can update their own profile" on public.doctors
  for update using (auth.uid() = id);

-- TRIGGER TO AUTOMATICALLY CREATE DOCTOR PROFILE ON SIGNUP
-- This function will run every time a new user is created in Supabase Auth
create or replace function public.handle_new_doctor()
returns trigger as $$
begin
  insert into public.doctors (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_doctor();

-- Create a table for Patients
create table public.patients (
  id uuid default gen_random_uuid() primary key,
  doctor_id uuid references auth.users not null,
  name text not null,
  age integer,
  gender text,
  dob date,
  blood_group text,
  phone text,
  email text,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.patients enable row level security;

create policy "Doctors can view their own patients" on public.patients
  for select using (auth.uid() = doctor_id);

create policy "Doctors can manage their own patients" on public.patients
  for all using (auth.uid() = doctor_id);

-- Create a table for Medical Reports
create table public.reports (
  id uuid default gen_random_uuid() primary key,
  patient_id uuid references public.patients on delete cascade not null,
  doctor_id uuid references auth.users not null,
  type text, -- Blood Work, MRI, etc.
  file_url text,
  extracted_data jsonb, -- JSON storage for disease, entities, etc.
  status text default 'pending', -- pending, completed, failed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reports enable row level security;

create policy "Doctors can view their own reports" on public.reports
  for select using (auth.uid() = doctor_id);

create policy "Doctors can manage their own reports" on public.reports
  for all using (auth.uid() = doctor_id);

-- Storage bucket for reports
-- (You need to create a 'reports' bucket in Supabase Storage and set policies)
