"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, BookOpen, Target, CheckCircle } from "lucide-react";
import Link from "next/link";
import SmartPayment from "@/components/Payment/SmartPayment";
import toast from "react-hot-toast";

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    track: "",
    experience: "",
    motivation: "",
    portfolio: "",
    linkedin: "",
    github: "",
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.country || !formData.city || !formData.track || !formData.experience || !formData.motivation) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/cohort3-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log({response});
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save application');
      }
      
      // Save application data to localStorage for payment success page
      localStorage.setItem('cohort3_application_data', JSON.stringify(formData));
      
      toast.success('Application saved successfully! Proceeding to payment...');
      setShowPaymentForm(true);
      
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          const paymentSection = document.querySelector('[data-payment-section]');
          if (paymentSection) {
            paymentSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      
    } catch (error) {
      console.error('Error saving application:', error);
      toast.error('Failed to save application: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem]">
      {/* Header */}
      <div className="bg-titlebg text-white py-4 md:py-6">
        <div className="max-w-c-1390 mx-auto px-4">
          <Link href="/internship-cohort3" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Cohort 3
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-3 md:mt-4">Apply for Cohort 3</h1>
          <p className="text-white/80 mt-1 md:mt-2 text-sm md:text-base">DataVerse Africa Internship Program</p>
        </div>
      </div>

      <div className="max-w-c-1390 mx-auto px-3 md:px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-4 md:p-6 lg:p-8 shadow-solid-3">
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 md:mb-6">
                Application Form
              </h2>
              
              {/* Payment Section - Only shown when form is submitted */}
              {showPaymentForm && !paymentCompleted && (
                <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-titlebg/10 to-primary/10 border border-titlebg/20 rounded-lg" data-payment-section>
                  <h3 className="text-base md:text-lg font-semibold text-titlebg mb-3 md:mb-4 flex items-center gap-2">
                    <Target className="h-4 md:h-5 w-4 md:w-5" />
                    Payment Required
                  </h3>
                  <p className="text-sm md:text-base text-waterloo dark:text-manatee mb-3 md:mb-4">
                    To complete your application, you must first pay the program fee of $25 USD (or ₦37,500 NGN).
                  </p>
                  
                  {!showPaymentForm ? (
                    <button
                      type="button"
                      onClick={() => setShowPaymentForm(true)}
                      className="bg-titlebg hover:bg-titlebgdark text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 shadow-solid-5 text-sm md:text-base"
                    >
                      Proceed to Payment
                    </button>
                  ) : (
                    <div className="space-y-3 md:space-y-4">
                        <h4 className="font-semibold text-black dark:text-white mb-2 text-sm md:text-base">Program Fee: $25 USD</h4>
                        <p className="text-xs md:text-sm text-waterloo dark:text-manatee mb-3">
                          This covers access to tools, mentor support, certification, and career resources.
                        </p>
                        
                        <div className="bg-white dark:bg-blacksection p-3 md:p-4 rounded-lg border border-stroke dark:border-strokedark">
                          <div className="text-center mb-3 md:mb-4">
                            <div className="text-gray-500 dark:text-gray-400 mb-1 md:mb-2 text-sm">
                              💳 Secure Payment via Stripe
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 dark:text-gray-500">
                              Enter your payment details below
                            </div>
                          </div>
                          
                          <SmartPayment
                            amount={25}
                            currency="usd"
                            onSuccess={async (paymentId, paymentMethod) => {
                              console.log('Payment successful:', paymentId, paymentMethod);
                              
                              if (paymentMethod === 'stripe') {
                                toast.success('Payment completed successfully!');
                                setPaymentCompleted(true);
                              } else if (paymentMethod === 'bank-transfer') {
                                // Bank transfers are handled by the bank transfer API
                                toast.success('Bank transfer details submitted successfully! Payment will be verified within 24-48 hours.');
                                setPaymentCompleted(true);
                              }
                            }}
                            onError={(error) => {
                              console.error('Payment failed:', error);
                              toast.error('Payment failed: ' + error);
                            }}
                            userEmail={formData.email}
                            userFullName={`${formData.firstName} ${formData.lastName}`}
                            userPhone={formData.phone}
                            applicationData={formData}
                          />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {paymentCompleted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Payment Completed Successfully!</span>
                  </div>
                  <p className="text-green-600 dark:text-green-300 text-sm mt-1">
                    Your application is ready to be submitted. Click the button below to finalize your application.
                  </p>
                  
                  <div className="text-center">
                    <div className="text-green-600 dark:text-green-400 mb-4">
                      <CheckCircle className="h-16 w-16 mx-auto mb-2" />
                      <h3 className="text-xl font-semibold">Application Complete!</h3>
                      <p className="text-sm mt-1">Your application has been submitted and payment processed successfully.</p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">What happens next?</h4>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <li>• We'll review your application within 48 hours</li>
                        <li>• You'll receive an email with next steps</li>
                        <li>• Program starts September 26, 2025</li>
                        <li>• Check your email for program details</li>
                      </ul>
                    </div>
                    
                    <Link
                      href="/internship-cohort3"
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Cohort 3
                    </Link>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-black dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Mail className="h-4 md:h-5 w-4 md:w-5 text-titlebg" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      >
                        <option value="">Select Country</option>
                        <option value="nigeria">Nigeria</option>
                        <option value="ghana">Ghana</option>
                        <option value="kenya">Kenya</option>
                        <option value="south-africa">South Africa</option>
                        <option value="ethiopia">Ethiopia</option>
                        <option value="uganda">Uganda</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-titlebg" />
                    Program Selection
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Preferred Track *
                      </label>
                      <select
                        name="track"
                        value={formData.track}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white"
                      >
                        <option value="">Select Track</option>
                        <option value="data-analytics">Data Analytics</option>
                        <option value="data-science">Data Science</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Relevant Experience *
                      </label>
                      <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Describe your relevant experience in data analysis, programming, or related fields..."
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-titlebg" />
                    Motivation & Goals
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Why do you want to join this program? *
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell us about your motivation, career goals, and what you hope to achieve..."
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* Portfolio & Links */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                    Portfolio & Professional Links
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Portfolio/Projects URL
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://your-portfolio.com"
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/your-profile"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                          GitHub Profile
                        </label>
                        <input
                          type="url"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          placeholder="https://github.com/your-username"
                          className="w-full px-3 md:px-4 py-2 md:py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg focus:border-transparent dark:bg-blacksection dark:text-white text-sm md:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-titlebg focus:ring-titlebg border-stroke dark:border-strokedark rounded"
                    />
                    <label className="text-sm text-waterloo dark:text-manatee">
                      I agree to the program terms and conditions, including the $25 program fee. 
                      I understand that this fee is non-refundable and covers access to tools, 
                      mentor support, certification, and career resources. *
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 md:pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-titlebg hover:bg-titlebgdark disabled:bg-gray-400 text-white py-3 md:py-4 px-6 md:px-8 text-base md:text-lg font-medium rounded-lg transition-all duration-300 shadow-solid-5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 md:h-5 w-4 md:w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5" />
                        Continue to Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 md:space-y-6">
              {/* Program Summary */}
              <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-4 md:p-6 shadow-solid-3">
                <h3 className="text-base md:text-lg font-semibold text-black dark:text-white mb-3 md:mb-4">
                  Program Summary
                </h3>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Calendar className="h-4 md:h-5 w-4 md:w-5 text-titlebg" />
                    <div>
                      <div className="font-medium text-black dark:text-white text-sm md:text-base">Duration</div>
                      <div className="text-xs md:text-sm text-waterloo dark:text-manatee">12 Weeks</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <BookOpen className="h-4 md:h-5 w-4 md:w-5 text-titlebg" />
                    <div>
                      <div className="font-medium text-black dark:text-white text-sm md:text-base">Start Date</div>
                      <div className="text-xs md:text-sm text-waterloo dark:text-manatee">Sept 26, 2025</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <Target className="h-4 md:h-5 w-4 md:w-5 text-titlebg" />
                    <div>
                      <div className="font-medium text-black dark:text-white text-sm md:text-base">Program Fee</div>
                      <div className="text-xs md:text-sm text-waterloo dark:text-manatee">$25 USD</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-4 md:p-6 shadow-solid-3">
                <h3 className="text-base md:text-lg font-semibold text-black dark:text-white mb-3 md:mb-4">
                  Need Help?
                </h3>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Mail className="h-4 md:h-5 w-4 md:w-5 text-titlebg" />
                    <div>
                      <div className="font-medium text-black dark:text-white text-sm md:text-base">Email</div>
                      <div className="text-xs md:text-sm text-waterloo dark:text-manatee">info@dataverseafrica.org</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <Phone className="h-4 md:h-5 w-4 md:w-5 text-titlebg" />
                    <div>
                      <div className="font-medium text-black dark:text-white text-sm md:text-base">Phone</div>
                      <div className="text-xs md:text-sm text-waterloo dark:text-manatee">+234 XXX XXX XXXX</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-titlebg/10 border border-titlebg/20 rounded-lg p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-titlebg mb-3 md:mb-4">
                  Important Notes
                </h3>
                
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-titlebg">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 md:h-4 w-3 md:w-4 mt-0.5 flex-shrink-0" />
                    Applications close September 30th, 2025
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 md:h-4 w-3 md:w-4 mt-0.5 flex-shrink-0" />
                    Program fee is non-refundable
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 md:h-4 w-3 md:w-4 mt-0.5 flex-shrink-0" />
                    Basic knowledge required in chosen track
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-3 md:h-4 w-3 md:w-4 mt-0.5 flex-shrink-0" />
                    Reliable internet connection needed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
