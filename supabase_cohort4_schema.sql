-- Create table for Cohort 4.0 Applications
-- This table stores all applications for DataVerse Africa Internship Program Cohort 4.0

CREATE TABLE IF NOT EXISTS cohort4_applications (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  
  -- Track Information
  track_level TEXT NOT NULL CHECK (track_level IN ('beginners', 'intermediate')),
  track TEXT NOT NULL CHECK (track IN ('data-analytics', 'data-science')),
  specialization TEXT, -- Only required for intermediate track
  
  -- Application Details
  experience TEXT NOT NULL,
  motivation TEXT NOT NULL,
  
  -- Portfolio & Links (Optional)
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  
  -- Payment Information
  payment_completed BOOLEAN DEFAULT FALSE,
  payment_id TEXT,
  payment_method TEXT CHECK (payment_method IN ('stripe', 'bank-transfer')),
  payment_date TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_cohort4_applications_email ON cohort4_applications(email);

-- Create index on track_level for filtering
CREATE INDEX IF NOT EXISTS idx_cohort4_applications_track_level ON cohort4_applications(track_level);

-- Create index on track for filtering
CREATE INDEX IF NOT EXISTS idx_cohort4_applications_track ON cohort4_applications(track);

-- Create index on payment_completed for filtering
CREATE INDEX IF NOT EXISTS idx_cohort4_applications_payment_completed ON cohort4_applications(payment_completed);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_cohort4_applications_created_at ON cohort4_applications(created_at DESC);

-- Create unique constraint on email to prevent duplicate applications
CREATE UNIQUE INDEX IF NOT EXISTS idx_cohort4_applications_email_unique ON cohort4_applications(email);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_cohort4_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at on row update
CREATE TRIGGER update_cohort4_applications_updated_at
  BEFORE UPDATE ON cohort4_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_cohort4_applications_updated_at();

-- Add comments to table and columns for documentation
COMMENT ON TABLE cohort4_applications IS 'Stores applications for DataVerse Africa Internship Program Cohort 4.0';
COMMENT ON COLUMN cohort4_applications.track_level IS 'Track level: beginners ($40) or intermediate ($25)';
COMMENT ON COLUMN cohort4_applications.track IS 'Selected track: data-analytics or data-science';
COMMENT ON COLUMN cohort4_applications.specialization IS 'Specialization for intermediate track (e.g., healthcare-analytics, applied-machine-learning)';
COMMENT ON COLUMN cohort4_applications.payment_method IS 'Payment method: stripe or bank-transfer';

-- Enable Row Level Security (RLS) - Adjust policies based on your needs
ALTER TABLE cohort4_applications ENABLE ROW LEVEL SECURITY;

-- Example RLS Policy: Allow service role to do everything
-- Note: Adjust these policies based on your security requirements
CREATE POLICY "Service role can do everything on cohort4_applications"
  ON cohort4_applications
  FOR ALL
  USING (auth.role() = 'service_role');

-- Optional: Create a view for easy querying with formatted data
CREATE OR REPLACE VIEW cohort4_applications_view AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  country,
  city,
  track_level,
  track,
  specialization,
  experience,
  motivation,
  portfolio_url,
  linkedin_url,
  github_url,
  payment_completed,
  payment_id,
  payment_method,
  payment_date,
  created_at,
  updated_at,
  -- Computed fields
  CONCAT(first_name, ' ', last_name) AS full_name,
  CASE 
    WHEN track_level = 'beginners' THEN '$40'
    WHEN track_level = 'intermediate' THEN '$25'
    ELSE NULL
  END AS program_fee,
  CASE 
    WHEN payment_completed = true THEN 'Paid'
    ELSE 'Pending'
  END AS payment_status
FROM cohort4_applications;

COMMENT ON VIEW cohort4_applications_view IS 'Enhanced view of cohort4_applications with computed fields';

