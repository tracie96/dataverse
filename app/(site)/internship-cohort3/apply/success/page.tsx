"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, Calendar, Users, ArrowRight, Download } from "lucide-react";

const SuccessPage = () => {
  const [applicationId, setApplicationId] = useState<string>("");

  useEffect(() => {
    // Get application ID from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('application_id') || `APP-${Date.now()}`;
    setApplicationId(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <div className="max-w-c-1390 mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Application Submitted Successfully!
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Welcome to DataVerse Africa Internship Program Cohort 3! 
            We're excited to have you join our community of learners and innovators.
          </p>

          {/* Application Details */}
          <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-8 shadow-solid-3 mb-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
              Application Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-titlebg/10 rounded-full flex items-center justify-center">
                    <span className="text-titlebg font-semibold">#</span>
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">Application ID</div>
                    <div className="text-sm text-waterloo dark:text-manatee">{applicationId}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">Program Start</div>
                    <div className="text-sm text-waterloo dark:text-manatee">September 26, 2025</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">Payment Status</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Completed</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-black dark:text-white">Cohort</div>
                    <div className="text-sm text-waterloo dark:text-manatee">Cohort 3 (2025)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-8 shadow-solid-3 mb-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
              What Happens Next?
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-titlebg text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-medium text-black dark:text-white">Confirmation Email</div>
                  <div className="text-sm text-waterloo dark:text-manatee">
                    You'll receive a confirmation email within 24 hours with program details and next steps.
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-titlebg text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-medium text-black dark:text-white">Welcome Package</div>
                  <div className="text-sm text-waterloo dark:text-manatee">
                    Access to onboarding materials, program schedule, and community platform.
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-titlebg text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-medium text-black dark:text-white">Orientation Week</div>
                  <div className="text-sm text-waterloo dark:text-manatee">
                    Join us for orientation on September 26, 2025, where you'll meet mentors and fellow interns.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/internship-cohort3">
                <button className="bg-titlebg hover:bg-titlebgdark text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 shadow-solid-5 flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" />
                  Back to Program Details
                </button>
              </Link>
              
              <button className="border-2 border-titlebg/30 text-titlebg hover:bg-titlebg/10 px-8 py-4 text-lg font-medium rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Welcome Guide
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Questions? Contact us at{" "}
                <a 
                  href="mailto:info@dataverseafrica.org" 
                  className="text-titlebg hover:text-titlebgdark font-medium"
                >
                  info@dataverseafrica.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

