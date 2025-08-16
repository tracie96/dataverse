import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd' } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency,
      metadata: {
        program: 'DataVerse Africa Internship Cohort 3',
        type: 'internship_fee'
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { message: 'Error creating payment intent' },
      { status: 500 }
    );
  }
}
