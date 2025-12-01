# Enquiry Form Setup Guide

The enquiry form has been set up and is ready to use! No need for SendGrid - we're using your existing ElasticEmail setup with Nodemailer.

## What's Been Created

1. **API Route**: `/app/api/enquiry/route.ts` - Handles form submissions and sends emails
2. **Updated Contact Form**: `/components/Contact/index.tsx` - Simple form with name, email, and message fields

## Environment Variables Setup

Add these variables to your `.env` or `.env.local` file:

```env
# SMTP Configuration (ElasticEmail or other SMTP service)
SMTP_HOST=smtp.elasticemail.com
SMTP_PORT=587
SMTP_USER=your_elasticemail_username
SMTP_PASSWORD=your_elasticemail_password

# Email Addresses
SMTP_FROM_EMAIL=tracy@dataverseafrica.org
SMTP_TO_EMAIL=tracy@dataverseafrica.org
```

### Getting Your ElasticEmail Credentials

1. Log into your ElasticEmail account
2. Go to Settings → SMTP/API
3. Copy your:
   - **SMTP Server**: Usually `smtp.elasticemail.com`
   - **Port**: Usually `587` (or `465` for SSL)
   - **Username**: Your ElasticEmail account email or username
   - **Password**: Your SMTP password (not your account password - you may need to generate an SMTP password)

### Alternative SMTP Services

You can use any SMTP service by updating the environment variables:

**Gmail (Not recommended for production)**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**SendGrid**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

**AWS SES**:
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-aws-access-key
SMTP_PASSWORD=your-aws-secret-key
```

## How It Works

1. User fills out the form on the `/support` page
2. Form submits to `/api/enquiry`
3. API validates the data and sends an email using Nodemailer
4. Email is sent to the address specified in `SMTP_TO_EMAIL`
5. You can reply directly to the email (reply-to is set to the user's email)

## Testing

1. Fill out the form on the Support page
2. Check your email inbox for the enquiry
3. Reply directly to the email - it will go to the user who submitted the form

## Notes

- The form is currently on the `/support` page (`/app/(site)/support/page.tsx`)
- Form validation is handled on both client and server side
- Emails are sent in both HTML and plain text format
- The `replyTo` field is set to the user's email for easy replies


