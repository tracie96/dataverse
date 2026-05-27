"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Mail, Clock, MessageCircle } from "lucide-react";
import { COHORT5_META } from "@/config/cohort5";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "bank-transfer">("stripe");
  const [applicationData, setApplicationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const paymentIntentId = searchParams.get("payment_intent");
        const email = searchParams.get("email");
        const urlPaymentMethod = searchParams.get("payment_method") || "stripe";
        setPaymentMethod(urlPaymentMethod as "stripe" | "bank-transfer");

        const stored = localStorage.getItem("cohort5_application_data");
        if (!stored && !email) {
          setPaymentStatus("error");
          setErrorMessage("Application data not found");
          setIsProcessing(false);
          return;
        }

        const parsed = stored ? JSON.parse(stored) : { email };
        setApplicationData(parsed);

        const response = await fetch("/api/cohort5-application/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntentId || "webhook_updated",
            applicationData: parsed,
            paymentMethod: urlPaymentMethod,
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to update payment status");
        }

        localStorage.removeItem("cohort5_application_data");
        setPaymentStatus("success");
      } catch (error) {
        setPaymentStatus("error");
        setErrorMessage((error as Error).message);
      } finally {
        setIsProcessing(false);
      }
    };

    handlePaymentSuccess();
  }, [searchParams]);

  const programFee = applicationData?.programFee ? `$${applicationData.programFee}` : "—";
  const nairaFee = applicationData?.nairaFee
    ? `₦${Number(applicationData.nairaFee).toLocaleString()}`
    : "—";

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-titlebg mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Processing Your Payment</h2>
        </div>
      </div>
    );
  }

  if (paymentStatus === "error") {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Payment Processing Error</h2>
          <p className="text-red-700 mb-6">{errorMessage}</p>
          <Link href="/internship-cohort5/apply" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg">
            <ArrowLeft className="h-4 w-4" />
            Back to Application
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {paymentMethod === "stripe" ? "Payment Successful!" : "Transfer Details Submitted!"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your Cohort 5.0 application has been submitted successfully.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                {paymentMethod === "stripe" ? "Payment Confirmed" : "Transfer Submitted"}
              </h3>
              <p className="text-sm text-green-700">
                {paymentMethod === "stripe" ? `${programFee} processed` : `${nairaFee} transfer received`}
              </p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800 dark:text-green-200">Application Submitted</h3>
              <p className="text-sm text-green-700">Saved in our system</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800 dark:text-green-200">Next Steps</h3>
              <p className="text-sm text-green-700">Review within 48 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">What Happens Next?</h2>
          <div className="space-y-4">
            <p>1. Our team reviews your application within 48 hours.</p>
            <p>2. Orientation and kick-off on {COHORT5_META.kickoffDate}.</p>
            <p>3. Midpoint Project Review on {COHORT5_META.midpointReview}.</p>
            <p>4. Capstone Presentation Week: {COHORT5_META.capstoneWeek}.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/internship-cohort5"
            className="inline-flex items-center gap-2 bg-titlebg text-white px-8 py-3 rounded-lg font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cohort 5.0
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
