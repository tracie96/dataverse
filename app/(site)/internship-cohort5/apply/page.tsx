"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  Sparkles,
  Award,
} from "lucide-react";
import Link from "next/link";
import SmartPayment from "@/components/Payment/SmartPayment";
import toast from "react-hot-toast";
import {
  COHORT5_META,
  COHORT5_TRACK_LIST,
  COHORT5_TRACKS,
  getTrackFeeUsd,
  getTrackFeeNgn,
  type Cohort5TrackId,
} from "@/config/cohort5";
import type { ApplicationType } from "@/types/cohort5";

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    trackId: "" as Cohort5TrackId | "",
    specialization: "",
    experience: "",
    motivation: "",
    portfolio: "",
    linkedin: "",
    github: "",
    applicationType: "paid" as ApplicationType,
    scholarshipReason: "",
    financialNeedStatement: "",
    agreeToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [applicationSaved, setApplicationSaved] = useState(false);
  const [isScholarshipApp, setIsScholarshipApp] = useState(false);
  const [scholarshipSlots, setScholarshipSlots] = useState<{ remaining: number; available: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/cohort5-application/scholarship")
      .then((r) => r.json())
      .then((data) => {
        if (data.remaining !== undefined) {
          setScholarshipSlots({ remaining: data.remaining, available: data.available });
        }
      })
      .catch(() => {});
  }, []);

  const selectedTrack = formData.trackId ? COHORT5_TRACKS[formData.trackId] : null;
  const programFee = formData.trackId ? getTrackFeeUsd(formData.trackId) : 0;
  const nairaFee = formData.trackId ? getTrackFeeNgn(formData.trackId) : 0;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => {
        const next = { ...prev, [name]: value };
        if (name === "trackId") next.specialization = "";
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country ||
      !formData.city ||
      !formData.trackId ||
      !formData.experience ||
      !formData.motivation
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedTrack?.requiresSpecialization && !formData.specialization) {
      toast.error("Please select a specialization for your track");
      return;
    }

    if (formData.applicationType === "scholarship") {
      if (!formData.scholarshipReason || !formData.financialNeedStatement) {
        toast.error("Please complete the scholarship application fields");
        return;
      }
      if (scholarshipSlots && !scholarshipSlots.available) {
        toast.error("Scholarship slots are currently full");
        return;
      }
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cohort5-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to save application");

      if (result.data?.id) {
        setApplicationId(result.data.id);
        localStorage.setItem(
          "cohort5_application_data",
          JSON.stringify({ ...formData, applicationId: result.data.id, programFee, nairaFee })
        );
      }

      setApplicationSaved(true);
      setIsScholarshipApp(!!result.isScholarship);

      if (result.isScholarship) {
        setPaymentCompleted(true);
        toast.success("Scholarship application submitted! We will review within 5–7 business days.");
      } else {
        toast.success("Application registered! Proceed to payment.");
        setShowPaymentForm(true);
        setTimeout(() => {
          document.querySelector("[data-payment-section]")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (error) {
      toast.error("Failed to save application: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem]">
      <div className="bg-titlebg text-white py-4 md:py-6">
        <div className="max-w-c-1390 mx-auto px-4">
          <Link
            href="/internship-cohort5"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cohort 5.0
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-3 md:mt-4">Apply for Cohort 5.0</h1>
          <p className="text-white/80 mt-1 text-sm md:text-base">DataVerse Africa Internship Program</p>
        </div>
      </div>

      <div className="max-w-c-1390 mx-auto px-3 md:px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-4 md:p-8 shadow-solid-3">
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-6">Application Form</h2>

              {applicationSaved && !paymentCompleted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Application Registered Successfully!</span>
                  </div>
                </div>
              )}

              {showPaymentForm && !paymentCompleted && formData.applicationType === "paid" && (
                <div
                  className="mb-8 p-4 md:p-6 bg-gradient-to-r from-titlebg/10 to-primary/10 border border-titlebg/20 rounded-lg"
                  data-payment-section
                >
                  <h3 className="text-lg font-semibold text-titlebg mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Payment Required — ${programFee} USD
                  </h3>
                  <p className="text-sm text-waterloo dark:text-manatee mb-4">
                    Complete payment of ${programFee} USD (₦{nairaFee.toLocaleString()} NGN) for{" "}
                    {selectedTrack?.name}.
                  </p>
                  <SmartPayment
                    key={`payment-${formData.trackId}-${programFee}`}
                    amount={programFee}
                    currency="usd"
                    cohort="cohort5"
                    applicationData={{
                      ...formData,
                      applicationId,
                      programFee,
                      nairaFee,
                    }}
                    onSuccess={(_paymentId, paymentMethod) => {
                      if (paymentMethod === "bank-transfer") {
                        toast.success("Bank transfer submitted! Verification within 24–48 hours.");
                        setPaymentCompleted(true);
                      } else {
                        toast.success("Payment completed! Redirecting...");
                      }
                    }}
                    onError={(error) => toast.error("Payment failed: " + error)}
                    userEmail={formData.email}
                    userFullName={`${formData.firstName} ${formData.lastName}`}
                    userPhone={formData.phone}
                  />
                </div>
              )}

              {(paymentCompleted || isScholarshipApp) && (
                <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                    {isScholarshipApp ? "Scholarship Application Submitted!" : "Application Complete!"}
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                    {isScholarshipApp
                      ? "Our team will review your scholarship request within 5–7 business days."
                      : "Your application and payment have been processed successfully."}
                  </p>
                  <Link
                    href="/internship-cohort5"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Cohort 5.0
                  </Link>
                </div>
              )}

              {!paymentCompleted && !isScholarshipApp && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-titlebg" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(["firstName", "lastName"] as const).map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            {field === "firstName" ? "First Name" : "Last Name"} *
                          </label>
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                        >
                          <option value="">Select Country</option>
                          {["nigeria", "ghana", "kenya", "south-africa", "ethiopia", "uganda", "tanzania", "other"].map(
                            (c) => (
                              <option key={c} value={c}>
                                {c.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </option>
                            )
                          )}
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
                          className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Track Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-titlebg" />
                      Select Your Track *
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {COHORT5_TRACK_LIST.map((track) => (
                        <div
                          key={track.id}
                          onClick={() => setFormData((prev) => ({ ...prev, trackId: track.id, specialization: "" }))}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.trackId === track.id
                              ? "border-titlebg bg-titlebg/5"
                              : "border-stroke dark:border-strokedark hover:border-titlebg/50"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-black dark:text-white text-sm">{track.name}</h4>
                            <span className="text-titlebg font-bold text-sm">${track.feeUsd}</span>
                          </div>
                          <p className="text-xs text-waterloo dark:text-manatee">{track.description}</p>
                        </div>
                      ))}
                    </div>

                    {selectedTrack?.requiresSpecialization && selectedTrack.specializations && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                          Domain Specialization *
                        </label>
                        <select
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                        >
                          <option value="">Select Specialization</option>
                          {selectedTrack.specializations.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Relevant Experience *
                      </label>
                      <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                        placeholder="Describe your experience in data, programming, or related fields..."
                      />
                    </div>
                  </div>

                  {/* Motivation */}
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-titlebg" />
                      Motivation & Goals
                    </h3>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                      placeholder="Why do you want to join Cohort 5.0?"
                    />
                  </div>

                  {/* Application Type */}
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-titlebg" />
                      Application Type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          formData.applicationType === "paid"
                            ? "border-titlebg bg-titlebg/5"
                            : "border-stroke dark:border-strokedark"
                        }`}
                      >
                        <input
                          type="radio"
                          name="applicationType"
                          value="paid"
                          checked={formData.applicationType === "paid"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="font-semibold text-black dark:text-white">Paid Application</div>
                        <p className="text-sm text-waterloo dark:text-manatee mt-1">
                          Pay the program fee after registration
                        </p>
                      </label>
                      <label
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          formData.applicationType === "scholarship"
                            ? "border-titlebg bg-titlebg/5"
                            : "border-stroke dark:border-strokedark"
                        } ${scholarshipSlots && !scholarshipSlots.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <input
                          type="radio"
                          name="applicationType"
                          value="scholarship"
                          checked={formData.applicationType === "scholarship"}
                          onChange={handleInputChange}
                          disabled={scholarshipSlots !== null && !scholarshipSlots.available}
                          className="sr-only"
                        />
                        <div className="font-semibold text-black dark:text-white">Need-Based Scholarship</div>
                        <p className="text-sm text-waterloo dark:text-manatee mt-1">
                          {scholarshipSlots
                            ? `${scholarshipSlots.remaining} of ${COHORT5_META.maxScholarships} slots remaining`
                            : "Limited slots available"}
                        </p>
                      </label>
                    </div>

                    {formData.applicationType === "scholarship" && (
                      <div className="mt-4 space-y-4 p-4 bg-alabaster dark:bg-blacksection rounded-lg border border-stroke dark:border-strokedark">
                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Why are you applying for a scholarship? *
                          </label>
                          <textarea
                            name="scholarshipReason"
                            value={formData.scholarshipReason}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Describe your financial need *
                          </label>
                          <textarea
                            name="financialNeedStatement"
                            value={formData.financialNeedStatement}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-titlebg focus:ring-titlebg border-stroke rounded"
                    />
                    <label className="text-sm text-waterloo dark:text-manatee">
                      I agree to the program terms.{" "}
                      {formData.applicationType === "paid" && formData.trackId
                        ? `Program fee: $${programFee} USD for ${selectedTrack?.name}.`
                        : "Scholarship applications are subject to review and approval."}{" "}
                      *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.trackId}
                    className="w-full bg-titlebg hover:bg-titlebgdark disabled:bg-gray-400 text-white py-4 px-8 text-lg font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        {formData.applicationType === "scholarship"
                          ? "Submit Scholarship Application"
                          : "Register & Continue to Payment"}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-6 shadow-solid-3">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Program Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-titlebg" />
                  <div>
                    <div className="font-medium text-black dark:text-white">Kick-off</div>
                    <div className="text-waterloo dark:text-manatee">{COHORT5_META.kickoffDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-titlebg" />
                  <div>
                    <div className="font-medium text-black dark:text-white">Duration</div>
                    <div className="text-waterloo dark:text-manatee">{COHORT5_META.durationWeeks} Weeks</div>
                  </div>
                </div>
                {selectedTrack && (
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-titlebg" />
                    <div>
                      <div className="font-medium text-black dark:text-white">Selected Track Fee</div>
                      <div className="text-titlebg font-bold">${programFee} USD</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-titlebg/10 border border-titlebg/20 rounded-lg p-6">
              <h3 className="font-semibold text-titlebg mb-3">Important Dates</h3>
              <ul className="space-y-2 text-xs text-titlebg">
                <li>Applications: {COHORT5_META.applicationOpen} – {COHORT5_META.applicationClose}</li>
                <li>Midpoint Review: {COHORT5_META.midpointReview}</li>
                <li>Capstone Week: {COHORT5_META.capstoneWeek}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-6">
              <h3 className="font-semibold text-black dark:text-white mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm text-waterloo dark:text-manatee">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-titlebg" />
                  info@dataverseafrica.org
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-titlebg" />
                  +234 706 308 3925
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
