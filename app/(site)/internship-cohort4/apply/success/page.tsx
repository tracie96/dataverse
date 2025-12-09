"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, Mail, Clock, Users, Award, MessageCircle } from 'lucide-react';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bank-transfer'>('stripe');
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get parameters from URL
        const paymentIntentId = searchParams.get('payment_intent');
        const email = searchParams.get('email');
        const urlPaymentMethod = searchParams.get('payment_method') || 'stripe';
        
        // Set payment method state
        setPaymentMethod(urlPaymentMethod as 'stripe' | 'bank-transfer');
        
        // Get application data from localStorage (set during form submission)
        const storedApplicationData = localStorage.getItem('cohort4_application_data');
        
        if (!storedApplicationData && !email) {
          setPaymentStatus('error');
          setErrorMessage('Application data not found');
          setIsProcessing(false);
          return;
        }

        let parsedApplicationData;
        
        if (storedApplicationData) {
          parsedApplicationData = JSON.parse(storedApplicationData);
          setApplicationData(parsedApplicationData);
        } else if (email) {
          // Fallback: create minimal application data from email
          parsedApplicationData = { email };
        }

        // Call payment success API to update database
        const response = await fetch('/api/cohort4-application/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntentId || 'webhook_updated',
            applicationData: parsedApplicationData,
            paymentMethod: urlPaymentMethod
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update payment status');
        }

        // Clear application data from localStorage
        localStorage.removeItem('cohort4_application_data');

        setPaymentStatus('success');
        setIsProcessing(false);

      } catch (error) {
        console.error('Error processing payment success:', error);
        setPaymentStatus('error');
        setErrorMessage((error as Error).message);
        setIsProcessing(false);
      }
    };

    handlePaymentSuccess();
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-titlebg mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Processing Your Payment
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              Payment Processing Error
            </h2>
            <p className="text-red-700 dark:text-red-300 mb-4">
              {errorMessage}
            </p>
            <p className="text-sm text-red-600 dark:text-red-400 mb-6">
              Don't worry, your payment was likely successful. Please contact support for assistance.
            </p>
            <Link
              href="/internship-cohort4/apply"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Application
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 5% discount applied
  const programFee = applicationData?.trackLevel === 'beginners' ? '$38' : '$23.75';
  const originalProgramFee = applicationData?.trackLevel === 'beginners' ? '$40' : '$25';
  const nairaFee = applicationData?.trackLevel === 'beginners' ? '₦57,000' : '₦35,625';
  const originalNairaFee = applicationData?.trackLevel === 'beginners' ? '₦60,000' : '₦37,500';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="text-green-600 dark:text-green-400 mb-6">
            <CheckCircle className="w-24 h-24 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {paymentMethod === 'stripe' ? 'Payment Successful!' : 'Transfer Details Submitted!'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {paymentMethod === 'stripe' 
              ? `Congratulations! Your payment has been processed successfully and your application for Cohort 4.0 has been submitted.`
              : 'Thank you! Your bank transfer details have been submitted successfully. Payment will be verified within 24-48 hours.'
            }
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-6 text-center">
            Application Complete! 🎉
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                {paymentMethod === 'stripe' ? 'Payment Confirmed' : 'Transfer Submitted'}
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {paymentMethod === 'stripe' 
                  ? (
                    <span>
                      Your <span className="font-bold">{programFee}</span> payment has been processed
                      <span className="block text-xs text-gray-500 line-through mt-1">Original: {originalProgramFee}</span>
                    </span>
                  )
                  : (
                    <span>
                      Your <span className="font-bold">{nairaFee}</span> transfer details received
                      <span className="block text-xs text-gray-500 line-through mt-1">Original: {originalNairaFee}</span>
                    </span>
                  )
                }
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                Application Submitted
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your application is now in our system
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                Next Steps
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Review within 48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bank Transfer Verification Note */}
        {paymentMethod === 'bank-transfer' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 dark:text-blue-400 mt-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Payment Verification in Progress
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your bank transfer receipt has been uploaded and will be verified by our team within 24-48 hours. 
                  You'll receive an email confirmation once the payment is verified and your application is fully processed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What Happens Next */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            What Happens Next?
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-titlebg text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Application Review
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team will review your application within 48 hours and send you an email with the results.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-titlebg text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Track Selection
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If accepted, you'll finalize your track selection during orientation week (February 21st, 2026).
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-titlebg text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Program Start
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cohort 4.0 begins on Saturday, February 21st, 2026. You'll receive detailed program information via email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join WhatsApp Group - Prominent Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-300 dark:border-green-700 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="mb-4">
              <MessageCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                Join the Cohort 4.0 Community!
              </h3>
              <p className="text-green-800 dark:text-green-200 mb-6 max-w-2xl mx-auto">
                Connect with fellow interns, mentors, and get real-time updates, support, and networking opportunities in our dedicated WhatsApp group.
              </p>
            </div>
            <a
              href="https://chat.whatsapp.com/DTbY8rBosPW9F8NdjydaGm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle className="h-6 w-6" />
              Join Cohort 4.0 WhatsApp Group
            </a>
            <p className="text-sm text-green-700 dark:text-green-300 mt-4">
              Click the button above to join our community group
            </p>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-center">
            Need Help?
          </h3>
          <div className="text-center text-blue-800 dark:text-blue-200">
            <p className="mb-2">
              If you have any questions about your application or the program, 
              please don't hesitate to reach out:
            </p>
            <p className="font-medium">
              📧 info@dataverseafrica.org
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            href="/internship-cohort4"
            className="inline-flex items-center gap-2 bg-titlebg hover:bg-titlebgdark text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-solid-5"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cohort 4.0
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>You can close this page. A confirmation email has been sent to your email address.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

