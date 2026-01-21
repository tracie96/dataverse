"use client";

import { useState, useMemo, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Create a Supabase client helper function (outside component to avoid re-creation)
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

interface NigerianBankTransferProps {
  onSuccess: (transferId: string) => void;
  onError: (error: string) => void;
  userEmail?: string;
  userFullName?: string;
  userPhone?: string;
  amount?: number; // USD amount
  currency?: string;
  applicationData?: any; // Application data for saving after payment
  cohort?: string; // 'cohort3' or 'cohort4'
}

const NigerianBankTransfer = ({ 
  onSuccess, 
  onError, 
  userEmail = '', 
  userFullName = '', 
  userPhone = '',
  amount = 25, // Default to $25 (Intermediate track)
  currency = 'usd',
  applicationData = {},
  cohort = 'cohort4' // Default to cohort4
}: NigerianBankTransferProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    fullName: userFullName,
    email: userEmail,
    phone: userPhone,
    bankName: '',
    accountNumber: '',
    reference: ''
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  // Calculate NGN amount based on USD amount (rate: 1 USD = 1,500 NGN)
  // Use useMemo to ensure it recalculates when amount changes
  const bankDetails = useMemo(() => {
    const nairaAmount = amount * 1500;
    return {
    bankName: 'United Bank of Africa',
    accountName: 'Francis Ifiora',
    accountNumber: '2363765712',
    accountType: 'Current Account',
      nairaAmount: nairaAmount,
      usdAmount: amount
  };
  }, [amount]);

  // Debug: Log when amount changes
  useEffect(() => {
    console.log('NigerianBankTransfer - Amount prop changed:', amount, 'NGN Amount:', bankDetails.nairaAmount);
  }, [amount, bankDetails.nairaAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB');
        return;
      }
      // Check file type
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        setMessage('Please upload an image or PDF file');
        return;
      }
      setReceiptFile(file);
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (!receiptFile) {
        setMessage('Please upload your payment receipt');
        setIsSubmitting(false);
        return;
      }

      // Upload file to Supabase Storage
      const fileName = `${Date.now()}_${receiptFile.name}`;
      const filePath = `receipts/${fileName}`;
      
      // Simulate upload progress
      setUploadProgress(25);
      
      const supabase = getSupabaseClient();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipti-url')
        .upload(filePath, receiptFile);

      if (uploadError) {
        console.error('File upload error:', uploadError);
        throw new Error('Failed to upload receipt file. Please try again.');
      }

      setUploadProgress(75);

      // Get the public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('receipti-url')
        .getPublicUrl(filePath);

      const receiptUrl = urlData.publicUrl;

      setUploadProgress(90);

      // Call the appropriate bank transfer API based on cohort
      const apiRoute = cohort === 'cohort4' 
        ? '/api/cohort4-application/bank-transfer'
        : '/api/cohort3-application/bank-transfer';
      
      const successRoute = cohort === 'cohort4'
        ? `/internship-cohort4/apply/success?email=${encodeURIComponent(formData.email)}&payment_method=bank-transfer`
        : `/internship-cohort3/apply/success?email=${encodeURIComponent(formData.email)}&payment_method=bank-transfer`;

      const response = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          transferName: formData.fullName,
          receiptUrl,
          applicationData: applicationData // Include full application data
        }),
      });

      setUploadProgress(100);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save bank transfer details');
      }
      router.push(successRoute);
      setMessage('Bank transfer details saved successfully! Payment will be verified within 24-48 hours.');
      onSuccess(result.transferId);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = 'Failed to save bank transfer details. Please try again.';
      setMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
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
              Transfer ₦{bankDetails.nairaAmount.toLocaleString()} to the account details above
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-green-500 mt-1">•</span>
              Use your full name as payment reference
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
            
         
            
          </div>

          {/* Receipt Upload */}
          <div className="col-span-full">
            <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Receipt * <span className="text-red-500">(Required)</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-titlebg transition-colors">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="receipt"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-titlebg hover:text-titlebgdark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-titlebg"
                  >
                    <span>Upload a file</span>
                    <input
                      id="receipt"
                      name="receipt"
                      type="file"
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF, PDF up to 5MB
                </p>
                {receiptFile && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✓ {receiptFile.name}
                  </p>
                )}
              </div>
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

          {/* Upload Progress Bar */}
          {isSubmitting && uploadProgress > 0 && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-titlebg h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !receiptFile}
            className="w-full bg-titlebg hover:bg-titlebgdark disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-solid-5 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Saving Transfer Details...'}
              </>
            ) : (
              <>
                Submit Transfer Details
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
          <li>• Upload a clear image or PDF of your transfer receipt</li>
          <li>• Payment verification typically takes 24-48 hours</li>
          <li>• You will receive an email confirmation once payment is verified</li>
        </ul>
      </div>
    </div>
  );
};

export default NigerianBankTransfer;

