"use client";

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripePaymentProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const PaymentForm = ({ amount, currency = 'usd', onSuccess, onError }: StripePaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/internship-cohort3/apply/success`,
      },
    });

    if (result.error) {
      setMessage(result.error.message || 'An error occurred during payment.');
      onError(result.error.message || 'Payment failed');
      setIsProcessing(false);
    } else {
      setMessage('Payment successful!');
      onSuccess((result as any).paymentIntent.id);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes('successful') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-titlebg hover:bg-titlebgdark disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-solid-5 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Processing Payment...
          </>
        ) : (
          <>
            Pay ${amount} USD
          </>
        )}
      </button>
    </form>
  );
};

const StripePayment = ({ amount, currency, onSuccess, onError }: StripePaymentProps) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, currency]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-titlebg"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm 
        amount={amount} 
        currency={currency} 
        onSuccess={onSuccess} 
        onError={onError} 
      />
    </Elements>
  );
};

export default StripePayment;

