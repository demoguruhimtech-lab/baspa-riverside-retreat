CREATE TABLE public.booking_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  guest_count integer NOT NULL,
  room_count integer NOT NULL,
  room_category text NOT NULL,
  message text NOT NULL DEFAULT ''
);
GRANT ALL ON public.booking_enquiries TO service_role;
ALTER TABLE public.booking_enquiries ENABLE ROW LEVEL SECURITY;