import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
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
  return new Stripe(secretKey, {
    apiVersion: '2025-07-30.basil',
  });
};

const getWebhookSecret = () => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
  }
  return secret;
};

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const endpointSecret = getWebhookSecret();
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  console.log('Webhook event received:', event.type);

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      console.log('Payment metadata:', paymentIntent.metadata);
      
      // Try to update the database
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
        
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          // First try to find by payment intent ID
          let { data, error } = await supabase
            .from('cohort3_applications')
            .update({
              payment_completed: true,
              payment_id: paymentIntent.id,
              payment_method: 'stripe',
              payment_date: new Date().toISOString(),
              payment_status: 'completed',
              updated_at: new Date().toISOString()
            })
            .eq('payment_id', paymentIntent.id)
            .select();

          // If no application found by payment_id, try to find by email from metadata
          if (!data || data.length === 0) {
            const customerEmail = paymentIntent.metadata?.customer_email;
            if (customerEmail) {
              console.log('Looking for application by email:', customerEmail);
              
              const { data: emailData, error: emailError } = await supabase
                .from('cohort3_applications')
                .update({
                  payment_completed: true,
                  payment_id: paymentIntent.id,
                  payment_method: 'stripe',
                  payment_date: new Date().toISOString(),
                  payment_status: 'completed',
                  updated_at: new Date().toISOString()
                })
                .eq('email', customerEmail)
                .select();

              if (emailError) {
                console.error('Failed to update application by email via webhook:', emailError);
              } else if (emailData && emailData.length > 0) {
                console.log('Application updated by email via webhook:', emailData);
              } else {
                console.log('No application found by email:', customerEmail);
              }
            }
          } else {
            console.log('Application updated via webhook:', data);
          }
        }
      } catch (error) {
        console.error('Error updating application via webhook:', error);
      }
      break;
      
    case 'customer.created':
      const customer = event.data.object as Stripe.Customer;
      console.log('Customer created:', customer.id, customer.email);
      console.log('Customer metadata:', customer.metadata);
      break;
      
    case 'customer.updated':
      const updatedCustomer = event.data.object as Stripe.Customer;
      console.log('Customer updated:', updatedCustomer.id, updatedCustomer.email);
      console.log('Updated customer metadata:', updatedCustomer.metadata);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
}
