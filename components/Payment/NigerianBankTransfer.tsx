"use client";

import { useState } from 'react';

interface NigerianBankTransferProps {
  onSuccess: (transferId: string) => void;
  onError: (error: string) => void;
  userEmail?: string;
  userFullName?: string;
  userPhone?: string;
}

const NigerianBankTransfer = ({ 
  onSuccess, 
  onError, 
  userEmail = '', 
  userFullName = '', 
  userPhone = '' 
}: NigerianBankTransferProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userFullName,
    email: userEmail,
    phone: userPhone,
    bankName: '',
    accountNumber: '',
    reference: ''
  });
  const [message, setMessage] = useState('');

  // Bank details - update with your actual account information
  const bankDetails = {
    bankName: 'Access Bank Plc',
    accountName: 'DataVerse Africa',
    accountNumber: '1234567890', // Replace with actual account number
    accountType: 'Current Account',
    nairaAmount: 37500,
    usdAmount: 25
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Generate unique reference number
      const uniqueReference = `NGN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Bank transfer request created successfully! Please complete the transfer and upload proof.');
      onSuccess(uniqueReference);
    } catch (error) {
      const errorMessage = 'Failed to create transfer request. Please try again.';
      setMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bank Details Display */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Nigerian Bank Transfer Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Bank Name</p>
            <p className="font-medium text-gray-900 dark:text-white">{bankDetails.bankName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Account Name</p>
            <p className="font-medium text-gray-900 dark:text-white">{bankDetails.accountName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
            <p className="font-medium text-gray-900 dark:text-white font-mono">{bankDetails.accountNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Account Type</p>
            <p className="font-medium text-gray-900 dark:text-white">{bankDetails.accountType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Amount (NGN)</p>
            <p className="font-medium text-2xl text-green-600">₦{bankDetails.nairaAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Amount (USD)</p>
            <p className="font-medium text-lg text-blue-600">${bankDetails.usdAmount}</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Instructions:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-green-500 mt-1">•</span>
              Transfer ₦37,500 to the account details above
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-green-500 mt-1">•</span>
              Use your full name as payment reference
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-green-500 mt-1">•</span>
              Upload proof of payment after transfer
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-green-500 mt-1">•</span>
              Payment will be verified within 24-48 hours
            </li>
          </ul>
        </div>
      </div>

      {/* Transfer Request Form */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Transfer Request Form
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Bank Name *
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your bank name"
              />
            </div>
            
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Account Number *
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter your account number"
              />
            </div>
            
            <div>
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Reference
              </label>
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Optional payment reference"
              />
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('successfully') 
                ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-titlebg hover:bg-titlebgdark disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-solid-5 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Transfer Request...
              </>
            ) : (
              <>
                Create Transfer Request
              </>
            )}
          </button>
        </form>
      </div>

      {/* Important Notes */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Important Notes:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Please use your full name as the payment reference when making the transfer</li>
          <li>• Keep your transfer receipt/proof of payment for verification</li>
          <li>• Payment verification typically takes 24-48 hours</li>
          <li>• You will receive an email confirmation once payment is verified</li>
        </ul>
      </div>
    </div>
  );
};

export default NigerianBankTransfer;

