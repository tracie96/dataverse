# DataVerse Africa Internship Program - Cohort 3

## Overview

This repository contains the implementation of the DataVerse Africa Internship Program (Cohort 3) website and application system. The program is a 12-week immersive, project-based virtual internship designed to equip passionate Africans with real-world experience in key tech domains.

## Features

### 🎯 Program Information
- Comprehensive program overview and timeline
- Specialized tracks (Data Analytics & Data Science)
- Detailed benefits and requirements
- Application timeline and important dates

### 💳 Payment Integration
- Stripe payment processing for $25 program fee
- Secure payment flow with webhook verification
- Support for USD and NGN currencies
- Payment status tracking

### 📝 Application System
- Multi-step application form
- Payment-first approach (form disabled until payment)
- Professional portfolio and experience collection
- Track selection and motivation assessment

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/light theme support
- Interactive components and animations
- Professional branding and styling

## Program Details

### Timeline
- **Applications Open**: August 12 - August 30, 2025
- **Program Start**: September 26, 2025
- **Program End**: December 12, 2025
- **Duration**: 12 Weeks (3 Months)

### Tracks Available
1. **Data Analytics**
   - Healthcare Analytics
   - Financial Analytics
   - Agricultural Analytics
   - Agronomics Intelligence

2. **Data Science**
   - Machine Learning
   - Deep Learning
   - Applications of LLM and Gen AI

### Program Fee
- **USD**: $25
- **NGN**: ₦37,500 (equivalent)

## Technical Implementation

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: React functional components with TypeScript
- **Icons**: Lucide React icons
- **State Management**: React hooks (useState, useEffect)

### Backend
- **API Routes**: Next.js API routes
- **Payment Processing**: Stripe integration
- **Webhooks**: Secure payment verification
- **Database**: Ready for integration (currently using localStorage)

### Payment Flow
1. User visits application page
2. Payment section is displayed first
3. User completes Stripe payment
4. Application form is enabled
5. User submits application
6. Success page with confirmation

## File Structure

```
app/
├── (site)/
│   ├── internship/                    # Main internship landing page
│   └── internship-cohort3/           # Cohort 3 specific page
│       ├── page.tsx                  # Main cohort page
│       └── apply/                    # Application system
│           ├── page.tsx              # Application form
│           └── success/              # Success page
├── pages/
│   └── api/                          # API endpoints
│       ├── create-payment-intent.ts  # Stripe payment intent
│       ├── payment-success.ts        # Payment success handler
│       └── stripe-webhook.ts         # Stripe webhook handler
└── globals.css                       # Global styles

components/
├── Header/                           # Navigation components
├── Payment/                          # Payment components
│   └── StripePayment.tsx            # Stripe integration
└── ...                               # Other UI components
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Stripe account and API keys
- Next.js development environment

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dataverse
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Stripe dependencies**
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js stripe micro
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Stripe keys
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Environment Variables

Create a `.env.local` file with:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional
NGN_TO_USD_RATE=0.00067
```

## Stripe Setup

### 1. Create Stripe Account
- Sign up at [stripe.com](https://stripe.com)
- Complete account verification

### 2. Get API Keys
- Go to Developers → API keys
- Copy publishable and secret keys
- Use test keys for development

### 3. Configure Webhooks
- Add endpoint: `https://yourdomain.com/api/stripe-webhook`
- Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copy webhook secret

### 4. Enable Payment Methods
- Credit/debit cards
- Mobile money (optional)
- Bank transfers (optional)

## Usage

### For Applicants
1. Visit `/internship-cohort3` to learn about the program
2. Click "Apply Now" to start application
3. Complete payment of $25 USD
4. Fill out application form
5. Submit application
6. Receive confirmation and next steps

### For Administrators
1. Monitor applications through Stripe dashboard
2. Check webhook delivery status
3. Process successful applications
4. Send welcome emails and materials

## Customization

### Program Details
- Update dates and timeline in `app/(site)/internship-cohort3/page.tsx`
- Modify tracks and specializations
- Adjust program fee and currency options

### Styling
- Customize colors in `tailwind.config.js`
- Update design system in `app/globals.css`
- Modify component styling as needed

### Payment
- Adjust payment amount in payment components
- Add new currencies in Stripe configuration
- Modify webhook handling logic

## Testing

### Payment Testing
- Use Stripe test cards (no real charges)
- Test webhook delivery locally
- Verify payment success flow

### Application Testing
- Test form validation
- Verify payment integration
- Check responsive design

### Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile and desktop views
- Dark/light theme switching

## Deployment

### Production Considerations
1. **Security**
   - Use production Stripe keys
   - Enable HTTPS
   - Verify webhook signatures

2. **Performance**
   - Optimize images and assets
   - Enable Next.js optimizations
   - Monitor Core Web Vitals

3. **Monitoring**
   - Set up error tracking
   - Monitor payment success rates
   - Track application submissions

### Deployment Options
- **Vercel**: Recommended for Next.js
- **Netlify**: Alternative deployment
- **AWS/GCP**: Self-hosted option

## Support & Maintenance

### Regular Tasks
- Monitor Stripe dashboard
- Check webhook delivery
- Update program information
- Review application submissions

### Troubleshooting
- Check Stripe webhook logs
- Verify API endpoint responses
- Review browser console errors
- Test payment flow end-to-end

## Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit pull request
5. Code review and merge

### Code Standards
- Use TypeScript for type safety
- Follow React best practices
- Maintain consistent styling
- Add proper error handling

## License

This project is proprietary to DataVerse Africa. All rights reserved.

## Contact

For technical support:
- Email: info@dataverseafrica.org
- GitHub Issues: [Repository Issues]

For program information:
- Website: [DataVerse Africa Website]
- Email: info@DataVerseafrica.org

---

**Note**: This is a production-ready implementation. Ensure proper testing and security measures before deploying to production.
