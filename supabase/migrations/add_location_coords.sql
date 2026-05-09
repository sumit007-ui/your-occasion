-- Add precise location fields to inquiries table
ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS location_lat  DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS location_lng  DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS location_display TEXT;
