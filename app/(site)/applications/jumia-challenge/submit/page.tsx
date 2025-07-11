"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { ChallengeSubmission, AVAILABLE_TOOLS, PERFORMANCE_METRICS, DELIVERY_HYPOTHESIS_RESULTS } from "@/types/challenge";

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const ChallengeSubmissionPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ChallengeSubmission>>({
    full_name: "",
    email: "",
    phone_number: "",
    country_of_residence: "",
    social_media_verified: false,
    tools_used: [],
    classification_model_built: false,
    performance_metrics: [],
    seller_behavior_insight: "",
    suspended_sellers_rationale: "",
    delivery_hypothesis_result: undefined,
    submission_file_url: "",
  });

  const [otherTool, setOtherTool] = useState("");
  const [otherMetric, setOtherMetric] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleToolChange = (tool: string) => {
    const updatedTools = formData.tools_used?.includes(tool)
      ? formData.tools_used.filter((t) => t !== tool)
      : [...(formData.tools_used || []), tool];
    setFormData({ ...formData, tools_used: updatedTools });
  };

  const handleMetricChange = (metric: string) => {
    const updatedMetrics = formData.performance_metrics?.includes(metric)
      ? formData.performance_metrics.filter((m) => m !== metric)
      : [...(formData.performance_metrics || []), metric];
    setFormData({ ...formData, performance_metrics: updatedMetrics });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Submitting your project...");

    try {
      // First upload the file if present
      let submission_file_url = "";
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('challengesubmissions')
          .upload(fileName, file);

        if (fileError) {
          toast.error("Failed to upload file. Please try again.");
          throw fileError;
        }
        submission_file_url = fileData.path;
      }

      // Prepare the final submission data
      const submissionData: Partial<ChallengeSubmission> = {
        ...formData,
        submission_file_url,
        tools_used: [...formData.tools_used || [], ...(otherTool ? [otherTool] : [])],
        performance_metrics: [...formData.performance_metrics || [], ...(otherMetric ? [otherMetric] : [])],
      };

      // Submit to database
      const { data, error } = await supabase
        .from('challenge_submissions')
        .insert([submissionData])
        .select();

      if (error) throw error;

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Project submitted successfully! Redirecting...", {
        duration: 3000,
      });

      // Wait for toast to be visible before redirecting
      setTimeout(() => {
        router.push("/applications/jumia-challenge/success");
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to submit. Please try again.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 overflow-hidden pb-16 pt-8 md:pb-[120px] xl:pb-[160px] 2xl:pb-[200px]">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[800px]">
            <div className="mb-10 text-center">
              <h1 className="mb-5 text-3xl font-bold text-black dark:text-white">
                Challenge Submission Form
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Please fill out all the required information about your project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details Section */}
              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold">Personal Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full rounded-lg border p-3 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border p-3 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="w-full rounded-lg border p-3 dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Country of Residence</label>
                    <input
                      type="text"
                      required
                      value={formData.country_of_residence}
                      onChange={(e) => setFormData({ ...formData, country_of_residence: e.target.value })}
                      className="w-full rounded-lg border p-3 dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Verification */}
              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold">Social Media Verification</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Have you posted your project introduction on LinkedIn or Twitter and tagged @DataVerseAfrica?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        required
                        checked={formData.social_media_verified === true}
                        onChange={() => setFormData({ ...formData, social_media_verified: true })}
                        className="h-5 w-5"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        required
                        checked={formData.social_media_verified === false}
                        onChange={() => setFormData({ ...formData, social_media_verified: false })}
                        className="h-5 w-5"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold">Project Details</h2>
                <div className="space-y-6">
                  {/* Tools Used */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">What tools did you use?</label>
                    <div className="space-y-2">
                      {AVAILABLE_TOOLS.map((tool) => (
                        <label key={tool} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.tools_used?.includes(tool)}
                            onChange={() => handleToolChange(tool)}
                            className="h-5 w-5"
                          />
                          <span>{tool}</span>
                        </label>
                      ))}
                      <div className="mt-3">
                        <label className="mb-2 block text-sm font-medium">Other tools:</label>
                        <input
                          type="text"
                          value={otherTool}
                          onChange={(e) => setOtherTool(e.target.value)}
                          className="w-full rounded-lg border p-3 dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Classification Model */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Did you build a classification model to predict return risk?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          required
                          checked={formData.classification_model_built === true}
                          onChange={() => setFormData({ ...formData, classification_model_built: true })}
                          className="h-5 w-5"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          required
                          checked={formData.classification_model_built === false}
                          onChange={() => setFormData({ ...formData, classification_model_built: false })}
                          className="h-5 w-5"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {/* Models Used */}
                  {formData.classification_model_built && (
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        What model(s) did you use for classification?
                      </label>
                      <input
                        type="text"
                        value={formData.models_used || ""}
                        onChange={(e) => setFormData({ ...formData, models_used: e.target.value })}
                        placeholder="e.g., Logistic Regression, Random Forest, XGBoost"
                        className="w-full rounded-lg border p-3 dark:bg-gray-700"
                      />
                    </div>
                  )}

                  {/* Performance Metrics */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      What performance metrics did you report?
                    </label>
                    <div className="space-y-2">
                      {PERFORMANCE_METRICS.map((metric) => (
                        <label key={metric} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.performance_metrics?.includes(metric)}
                            onChange={() => handleMetricChange(metric)}
                            className="h-5 w-5"
                          />
                          <span>{metric}</span>
                        </label>
                      ))}
                      <div className="mt-3">
                        <label className="mb-2 block text-sm font-medium">Other metrics:</label>
                        <input
                          type="text"
                          value={otherMetric}
                          onChange={(e) => setOtherMetric(e.target.value)}
                          className="w-full rounded-lg border p-3 dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights & Strategy */}
              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold">Insights & Strategy</h2>
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      What was your most surprising insight about seller behavior or customer complaints?
                    </label>
                    <textarea
                      required
                      value={formData.seller_behavior_insight}
                      onChange={(e) => setFormData({ ...formData, seller_behavior_insight: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg border p-3 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Which 5 sellers did you recommend for suspension and why?
                    </label>
                    <textarea
                      required
                      value={formData.suspended_sellers_rationale}
                      onChange={(e) => setFormData({ ...formData, suspended_sellers_rationale: e.target.value })}
                      rows={6}
                      placeholder="Please list in bullet points"
                      className="w-full rounded-lg border p-3 dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Did you validate the hypothesis: "Delivery method affects customer rating"?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          required
                          checked={formData.delivery_hypothesis_result === DELIVERY_HYPOTHESIS_RESULTS.TRUE}
                          onChange={() => setFormData({ ...formData, delivery_hypothesis_result: DELIVERY_HYPOTHESIS_RESULTS.TRUE })}
                          className="h-5 w-5"
                        />
                        <span>Yes, and the hypothesis was true</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          required
                          checked={formData.delivery_hypothesis_result === DELIVERY_HYPOTHESIS_RESULTS.FALSE}
                          onChange={() => setFormData({ ...formData, delivery_hypothesis_result: DELIVERY_HYPOTHESIS_RESULTS.FALSE })}
                          className="h-5 w-5"
                        />
                        <span>Yes, and the hypothesis was false</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          required
                          checked={formData.delivery_hypothesis_result === DELIVERY_HYPOTHESIS_RESULTS.NOT_TESTED}
                          onChange={() => setFormData({ ...formData, delivery_hypothesis_result: DELIVERY_HYPOTHESIS_RESULTS.NOT_TESTED })}
                          className="h-5 w-5"
                        />
                        <span>No, I didn't test it</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <h2 className="mb-6 text-xl font-semibold">Upload Your Project</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium">Upload your final zipped folder:</label>
                  <input
                    type="file"
                    required
                    accept=".zip"
                    onChange={handleFileChange}
                    className="w-full rounded-lg border p-3 dark:bg-gray-700"
                  />
                  <p className="mt-2 text-sm text-gray-500">Please upload a zip file containing all your project files.</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#3182CE] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#2B6CB0] disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Project"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSubmissionPage; 