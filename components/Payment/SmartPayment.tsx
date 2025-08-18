"use client";

import { useState } from 'react';
import { useCountryDetection } from '../../hooks/useCountryDetection';
import StripePayment from './StripePayment';
import NigerianBankTransfer from './NigerianBankTransfer';

interface SmartPaymentProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentId: string, paymentMethod: string) => void;
  onError: (error: string) => void;
  userEmail?: string;
  userFullName?: string;
  userPhone?: string;
}

const SmartPayment = ({ 
  amount, 
  currency = 'usd', 
  onSuccess, 
  onError,
  userEmail = '',
  userFullName = '',
  userPhone = ''
}: SmartPaymentProps) => {
  const { countryInfo, isLoading } = useCountryDetection();

  const handleSuccess = (paymentId: string, paymentMethod: string) => {
    onSuccess(paymentId, paymentMethod);
  };

  const handleError = (error: string) => {
    onError(error);
  };

  // Wrapper functions to match child component signatures
  const handleBankTransferSuccess = (transferId: string) => {
    onSuccess(transferId, 'bank-transfer');
  };

  const handleStripeSuccess = (paymentIntentId: string) => {
    onSuccess(paymentIntentId, 'stripe');
  };

  // Auto-detect based on country
  const isNigerian = countryInfo?.isNigeria;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-titlebg"></div>
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Detecting your location...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Country Detection Info - Clean and minimal */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <div className="text-blue-600 dark:text-blue-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Location: {countryInfo?.country || 'Unknown'}
            </p>
            {countryInfo?.city && (
              <p className="text-xs text-blue-700 dark:text-blue-300">
                {countryInfo.city}, {countryInfo.region}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      {isNigerian ? (
        <NigerianBankTransfer
          onSuccess={handleBankTransferSuccess}
          onError={handleError}
          userEmail={userEmail}
          userFullName={userFullName}
          userPhone={userPhone}
        />
      ) : (
        <StripePayment
          amount={amount}
          currency={currency}
          onSuccess={handleStripeSuccess}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default SmartPayment;

