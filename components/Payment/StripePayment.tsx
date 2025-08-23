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

// Add debugging for Stripe key
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
} else {
  console.log('Stripe key loaded:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 20) + '...');
}

interface StripePaymentProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  applicationData?: any; // Add application data prop
}

const PaymentForm = ({ amount, currency = 'usd', onSuccess, onError, applicationData }: StripePaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  // Add debugging
  console.log('PaymentForm render:', { stripe: !!stripe, elements: !!elements, applicationData });

    const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log('handleSubmit called!', { stripe: !!stripe, elements: !!elements });
    
    if (!stripe || !elements) {
      console.error('Stripe or elements not ready:', { stripe: !!stripe, elements: !!elements });
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/internship-cohort3/apply/success?email=${encodeURIComponent(applicationData?.email || '')}&payment_method=stripe`,
      },
    });
console.log({result});
    if (result.error) {
      let errorMessage = result.error.message || 'An error occurred during payment.';
      
      if (result.error.message?.includes('test card') && result.error.message?.includes('live mode')) {
        errorMessage = 'Test card detected in live mode. Please switch to test mode in your Stripe dashboard or use a real credit card.';
      } else if (result.error.message?.includes('card was declined')) {
        errorMessage = 'Card was declined. Please check your card details or try a different payment method.';
      }
      
      setMessage(errorMessage);
      onError(errorMessage);
      setIsProcessing(false);
    } else if ((result as any).paymentIntent && (result as any).paymentIntent.status === 'succeeded') {
      setMessage('Payment successful! Redirecting...');
      
      // The redirect will happen automatically via Stripe's return_url
      // The success page will handle the database update
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

const StripePayment = ({ amount, currency, onSuccess, onError, applicationData }: StripePaymentProps) => {
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Add debugging
  console.log('StripePayment render:', { amount, currency, applicationData });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    setIsLoading(true);
    setError('');
    
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Payment intent response:', data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError('No client secret received from server');
        }
      })
      .catch((err) => {
        console.error('Error creating payment intent:', err);
        setError(`Failed to create payment: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [amount, currency]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-titlebg"></div>
        <span className="ml-3 text-gray-600">Creating payment session...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-red-600 dark:text-red-400 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
              Payment Setup Error
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 dark:text-yellow-400 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Payment Not Ready
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Payment session is being prepared. Please wait a moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Test Mode Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 dark:text-yellow-400 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Payment Mode Notice
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              {process.env.NODE_ENV === 'development' 
                ? "You're in development mode. Use test card numbers like 4242 4242 4242 4242."
                : "You're in production mode. Please use real credit/debit cards only."
              }
            </p>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise} options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#3B82F6',
          },
        },
      }}>
        <PaymentForm 
          amount={amount} 
          currency={currency} 
          onSuccess={onSuccess} 
          onError={onError} 
          applicationData={applicationData} // Pass applicationData to PaymentForm
        />
      </Elements>
    </div>
  );
};

export default StripePayment;

