-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for internship types
CREATE TYPE internship_type AS ENUM ('data_analytics', 'research_associate');

-- Enum for application status
CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'accepted', 'rejected');

-- Enum for education level
CREATE TYPE education_level AS ENUM ('high_school', 'bachelors', 'masters', 'phd', 'other');

-- Table for applicants
CREATE TABLE applicants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    education_level education_level NOT NULL,
    institution VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    graduation_year INTEGER,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for internship applications
CREATE TABLE internship_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    applicant_id UUID NOT NULL REFERENCES applicants(id),
    internship_type internship_type NOT NULL,
    status application_status DEFAULT 'pending',
    motivation_letter TEXT NOT NULL,
    relevant_experience TEXT,
    technical_skills TEXT[] NOT NULL,
    availability_date DATE NOT NULL,
    preferred_duration INTEGER NOT NULL, -- in months
    resume_url VARCHAR(255) NOT NULL,
    how_did_you_hear VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for challenge registrations
CREATE TABLE challenge_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    previous_participation BOOLEAN NOT NULL,
    skill_level VARCHAR(50) NOT NULL,
    expectations TEXT NOT NULL,
    referral_source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for application reviews
CREATE TABLE application_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES internship_applications(id),
    reviewer_id UUID NOT NULL, -- This would reference your auth users table
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating timestamps
CREATE TRIGGER update_applicants_updated_at
    BEFORE UPDATE ON applicants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON internship_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON application_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better query performance
CREATE INDEX idx_applications_status ON internship_applications(status);
CREATE INDEX idx_applications_type ON internship_applications(internship_type);
CREATE INDEX idx_applications_created_at ON internship_applications(created_at);
CREATE INDEX idx_applicants_email ON applicants(email);

-- Row Level Security (RLS) policies
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for applicants table
CREATE POLICY "Applicants are viewable by authenticated users" ON applicants
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Applicants can be created by anyone" ON applicants
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policies for internship_applications table
CREATE POLICY "Applications are viewable by authenticated users" ON internship_applications
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Applications can be created by anyone" ON internship_applications
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policies for application_reviews table
CREATE POLICY "Reviews are viewable by authenticated users" ON application_reviews
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Reviews can only be created by authenticated users" ON application_reviews
    FOR INSERT
    TO authenticated
    WITH CHECK (true); 