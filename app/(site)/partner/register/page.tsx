"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, CheckCircle, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import type { OrganizationType } from "@/types/partner";

const ORGANIZATION_TYPES: { value: OrganizationType; label: string }[] = [
  { value: "university", label: "University / College" },
  { value: "company", label: "Company" },
  { value: "ngo", label: "NGO" },
  { value: "community", label: "Community Group" },
  { value: "individual", label: "Individual" },
  { value: "other", label: "Other" },
];

export default function PartnerRegisterPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    organizationType: "other" as OrganizationType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/partners/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitted(true);
      toast.success("Partner application submitted!");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem] px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-black dark:text-white mb-3">Application Received</h1>
          <p className="text-waterloo dark:text-manatee mb-6">
            Thank you for registering as a DataVerse partner. Our team will review your application
            and email your referral code once approved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-titlebg text-white px-6 py-3 rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-[8rem]">
      <div className="bg-titlebg text-white py-4 md:py-6">
        <div className="max-w-c-1390 mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-3 md:mt-4">Partner With DataVerse</h1>
          <p className="text-white/80 mt-1 text-sm md:text-base">
            Register as a partner and receive a referral code for internship applicants
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-6 md:p-8 shadow-solid-3">
          <p className="text-waterloo dark:text-manatee mb-6 text-sm">
            Partners receive a unique referral code to share with students and applicants. When
            someone applies for the internship program using your code, they are attributed to your
            organization.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <Building2 className="inline h-4 w-4 mr-1 text-titlebg" />
                Organization Name *
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <User className="inline h-4 w-4 mr-1 text-titlebg" />
                Contact Name *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Mail className="inline h-4 w-4 mr-1 text-titlebg" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Phone className="inline h-4 w-4 mr-1 text-titlebg" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Organization Type *
              </label>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
              >
                {ORGANIZATION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Why do you want to partner with DataVerse?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-titlebg dark:bg-blacksection dark:text-white"
                placeholder="Tell us about your organization and how you'd like to collaborate..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-titlebg hover:bg-titlebgdark disabled:bg-gray-400 text-white py-4 px-8 text-lg font-medium rounded-lg transition-all"
            >
              {isSubmitting ? "Submitting..." : "Submit Partner Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
