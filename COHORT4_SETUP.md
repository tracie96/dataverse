# Cohort 4.0 Database Setup Guide

## Quick Setup

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Create a new query

2. **Run the Schema**
   - Copy and paste the contents of `supabase_cohort4_schema.sql`
   - Execute the query
   - Verify the table was created successfully

## Table Structure

The `cohort4_applications` table includes:

### Required Fields
- `first_name` - Applicant's first name
- `last_name` - Applicant's last name
- `email` - Unique email address (enforced by unique index)
- `country` - Country of residence
- `city` - City of residence
- `track_level` - Either 'beginners' or 'intermediate'
- `track` - Either 'data-analytics' or 'data-science'
- `experience` - Relevant experience description
- `motivation` - Motivation for joining the program

### Optional Fields
- `phone` - Phone number
- `specialization` - Required for intermediate track only
  - Data Analytics: 'healthcare-analytics', 'financial-analytics', 'agricultural-analytics'
  - Data Science: 'applied-machine-learning', 'deep-learning', 'llm-gen-ai'
- `portfolio_url` - Portfolio website URL
- `linkedin_url` - LinkedIn profile URL
- `github_url` - GitHub profile URL

### Payment Fields
- `payment_completed` - Boolean, defaults to false
- `payment_id` - Stripe payment intent ID or bank transfer reference
- `payment_method` - Either 'stripe' or 'bank-transfer'
- `payment_date` - Timestamp of payment completion

### System Fields
- `id` - UUID primary key (auto-generated)
- `created_at` - Timestamp of application creation
- `updated_at` - Timestamp of last update (auto-updated)

## Indexes Created

The schema includes indexes for:
- Email lookups (unique constraint)
- Track level filtering
- Track filtering
- Payment status filtering
- Created date sorting

## Views

A view `cohort4_applications_view` is created with:
- All original columns
- `full_name` - Concatenated first and last name
- `program_fee` - Calculated fee based on track level
- `payment_status` - Human-readable payment status

## Row Level Security (RLS)

RLS is enabled with a default policy allowing service role full access. Adjust this based on your security requirements.

## Verification

After running the schema, verify the table exists:

```sql
SELECT * FROM cohort4_applications LIMIT 1;
```

Check the view:

```sql
SELECT * FROM cohort4_applications_view LIMIT 1;
```

## Notes

- Email addresses are stored in lowercase and must be unique
- The `updated_at` field is automatically updated via trigger
- Specialization is only required for intermediate track applications
- Payment fields are updated via the `/api/cohort4-application/payment` endpoint

