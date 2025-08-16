# Supabase Setup for Cohort 3 Applications

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys

## 2. Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## 3. Database Schema

Run this SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Simple table for cohort 3 applications
CREATE TABLE cohort3_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    
    -- Program Selection
    track VARCHAR(50) NOT NULL,
    experience TEXT NOT NULL,
    
    -- Motivation
    motivation TEXT NOT NULL,
    
    -- Portfolio & Links
    portfolio_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    
    -- Payment Status
    payment_completed BOOLEAN DEFAULT false,
    payment_id VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Simple index on email for basic lookups
CREATE INDEX idx_applications_email ON cohort3_applications(email);
```

## 4. How It Works

1. **Form Submission**: User fills out the application form
2. **Database Save**: Application is saved to `cohort3_applications` table
3. **Payment**: User proceeds to payment (Stripe)
4. **Payment Update**: After successful payment, `payment_completed` is set to `true`
5. **Application Complete**: User sees success message

## 5. API Endpoints

- `POST /api/cohort3-application` - Save new application
- `PUT /api/cohort3-application/payment` - Update payment status
- `GET /api/cohort3-application?email=...` - Get application by email
- `GET /api/test-env` - Test environment variables (debugging)

## 6. Testing

1. Fill out the application form
2. Check your Supabase dashboard to see the data
3. Complete payment to see payment status update
4. Verify all data is properly stored

## 7. Data Access

You can view all applications in your Supabase dashboard:
- Go to Table Editor
- Select `cohort3_applications` table
- View, edit, or export data as needed

## 8. Troubleshooting

### If you get a 500 error:

1. **Check environment variables**:
   ```bash
   # Visit this URL in your browser
   http://localhost:3000/api/test-env
   ```
   This will show you which environment variables are missing.

2. **Verify your .env.local file**:
   - Make sure it's in the project root (same level as package.json)
   - Check that there are no spaces around the `=` sign
   - Ensure the file is named exactly `.env.local`

3. **Restart your development server**:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

4. **Check Supabase project settings**:
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy the Project URL and anon key
   - For the service role key, use the `service_role` key (not the anon key)

### Common Issues:

- **Missing .env.local**: Create the file in your project root
- **Wrong key type**: Use `service_role` key for SUPABASE_SERVICE_ROLE_KEY, not the anon key
- **File location**: .env.local must be in the same directory as package.json
- **Server restart**: Environment variables require a server restart to take effect
