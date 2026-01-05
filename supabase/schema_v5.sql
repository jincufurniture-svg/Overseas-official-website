-- Create cases table
CREATE TABLE cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public cases are viewable by everyone" ON cases FOR SELECT USING (true);
CREATE POLICY "Admins can do everything on cases" ON cases FOR ALL TO authenticated USING (true);
