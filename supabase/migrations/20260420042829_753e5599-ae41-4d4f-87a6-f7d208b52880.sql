
-- RSVP table
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir','tidak_hadir','ragu')),
  guest_count INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert rsvp" ON public.rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read rsvp" ON public.rsvps FOR SELECT USING (true);

-- Guestbook (ucapan & doa) table
CREATE TABLE public.guestbook (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert guestbook" ON public.guestbook FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read guestbook" ON public.guestbook FOR SELECT USING (true);

CREATE INDEX idx_guestbook_created_at ON public.guestbook(created_at DESC);
CREATE INDEX idx_rsvps_created_at ON public.rsvps(created_at DESC);
