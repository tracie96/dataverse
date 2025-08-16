# Stripe Integration Setup for DataVerse Africa Internship Program

## Overview
This document outlines the setup required to integrate Stripe payments with the internship application system.

## Required Dependencies

Add these packages to your `package.json`:

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.4.0",
    "@stripe/react-stripe-js": "^2.4.0",
    "stripe": "^14.10.0",
    "micro": "^10.0.1"
  }
}
```

Install with:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe micro
# or
yarn add @stripe/stripe-js @stripe/react-stripe-js stripe micro
```

## Environment Variables

Create or update your `.env.local` file:

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key
STRIPE_WEBHOOK_SECRET=whsec_... # Your Stripe webhook secret

# Optional: Currency conversion rates
NGN_TO_USD_RATE=0.00067 # 1 NGN = 0.00067 USD (approximate)
```

## Stripe Dashboard Setup

### 1. Create a Stripe Account
- Sign up at [stripe.com](https://stripe.com)
- Complete account verification

### 2. Get API Keys
- Go to Developers → API keys
- Copy your publishable and secret keys
- Use test keys for development

### 3. Set Up Webhooks
- Go to Developers → Webhooks
- Add endpoint: `https://yourdomain.com/api/stripe-webhook`
- Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
- Copy the webhook secret

### 4. Configure Payment Methods
- Go to Settings → Payment methods
- Enable the payment methods you want to accept
- For international payments, consider enabling:
  - Credit/Debit cards
  - Mobile money (M-Pesa, etc.)
  - Bank transfers

## Payment Flow

### 1. Application Form
- User fills out application form
- Payment section is shown first
- Form is disabled until payment is completed

### 2. Payment Process
- Stripe PaymentElement is displayed
- User enters payment details
- Payment is processed through Stripe

### 3. Post-Payment
- Webhook confirms payment success
- Application is enabled for submission
- User completes and submits application

### 4. Success
- User is redirected to success page
- Confirmation email is sent
- Application is stored in database

## API Endpoints

### Create Payment Intent
```
POST /api/create-payment-intent
Body: { amount: 25, currency: 'usd' }
Response: { clientSecret: 'pi_...' }
```

### Payment Success
```
POST /api/payment-success
Body: { paymentIntentId: 'pi_...', applicationData: {...} }
Response: { success: true, applicationId: 'APP-...' }
```

### Stripe Webhook
```
POST /api/stripe-webhook
Headers: { 'stripe-signature': '...' }
Body: Stripe webhook payload
```

## Testing

### Test Cards
Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`

### Test Mode
- All payments in test mode are free
- No real money is charged
- Perfect for development and testing

## Production Considerations

### 1. Security
- Always use HTTPS in production
- Verify webhook signatures
- Store sensitive data securely
- Implement rate limiting

### 2. Error Handling
- Handle payment failures gracefully
- Provide clear error messages
- Implement retry mechanisms
- Log all payment attempts

### 3. Compliance
- Ensure PCI compliance
- Follow local payment regulations
- Implement proper data protection
- Consider currency conversion fees

### 4. Monitoring
- Set up Stripe dashboard alerts
- Monitor webhook delivery
- Track payment success rates
- Implement logging and analytics

## Currency Support

The system currently supports:
- USD (Primary currency)
- NGN (Nigerian Naira) - converted to USD

To add more currencies:
1. Update the payment intent creation
2. Add currency selection in the form
3. Implement real-time conversion rates
4. Update success page display

## Troubleshooting

### Common Issues

1. **Payment fails immediately**
   - Check Stripe keys are correct
   - Verify webhook endpoint is accessible
   - Check browser console for errors

2. **Webhook not receiving events**
   - Verify webhook URL is correct
   - Check webhook secret matches
   - Ensure endpoint is publicly accessible

3. **Payment succeeds but application not enabled**
   - Check webhook is working
   - Verify payment success handling
   - Check browser console for errors

### Debug Mode

Enable debug logging by adding to your environment:
```env
DEBUG=stripe:*
NODE_ENV=development
```

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- [Stripe Community](https://community.stripe.com)

For application-specific issues:
- Contact: internship@DataVerseafrica.org
- Check application logs
- Review webhook delivery status

