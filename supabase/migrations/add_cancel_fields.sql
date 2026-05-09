-- Run this in Supabase SQL Editor to add cancel fields
ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS cancellation_message TEXT,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ;
