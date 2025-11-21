import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Force dynamic rendering to prevent build-time evaluation issues
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Initialize Stripe client lazily (only when needed)
const getStripeClient = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable');
  }
  return new Stripe(secretKey, {});
};

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient();
    const { amount, currency = 'usd', customerInfo } = await request.json();

    // Create payment intent with customer information
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency,
      // Add customer information to metadata for tracking
      metadata: {
        program: 'DataVerse Africa Internship Cohort 3',
        type: 'internship_fee',
        customer_name: customerInfo?.name || 'Unknown',
        customer_email: customerInfo?.email || 'Unknown',
        customer_phone: customerInfo?.phone || 'Unknown',
        application_id: customerInfo?.applicationId || 'Unknown',
      },
      // Set receipt email if provided
      receipt_email: customerInfo?.email || undefined,
      // Optional: Create and associate with a Stripe Customer
      customer: customerInfo?.email ? await getOrCreateCustomer(customerInfo) : undefined,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { message: 'Error creating payment intent' },
      { status: 500 }
    );
  }
}

// Helper function to get or create a Stripe Customer
async function getOrCreateCustomer(customerInfo: any) {
  try {
    const stripe = getStripeClient();
    // First, try to find existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      // Update existing customer with latest information
      await stripe.customers.update(existingCustomers.data[0].id, {
        name: customerInfo.name,
        phone: customerInfo.phone,
        metadata: {
          application_id: customerInfo.applicationId,
          last_payment_date: new Date().toISOString(),
        },
      });
      return existingCustomers.data[0].id;
    } else {
      // Create new customer
      const newCustomer = await stripe.customers.create({
        email: customerInfo.email,
        name: customerInfo.name,
        phone: customerInfo.phone,
        metadata: {
          application_id: customerInfo.applicationId,
          created_from: 'internship_application',
          first_payment_date: new Date().toISOString(),
        },
      });
      return newCustomer.id;
    }
  } catch (error) {
    console.error('Error creating/finding customer:', error);
    // If customer creation fails, continue without customer association
    return undefined;
  }
}
