"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface FormData {
  fullName: string;
  email: string;
  coverLetter?: string;
  coverLetterFile?: File | null;
  resumeFile?: File | null;
  experience?: string;
}

export default function InternshipForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    coverLetter: "",
    experience: "",
    resumeFile: null,
    coverLetterFile: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  // Upload file function to Supabase storage
  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(path, file);
    if (error) throw error;
    return data.path;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let resumePath = "";
      let coverLetterPath = "";

      if (formData.resumeFile) {
        resumePath = await uploadFile(
          formData.resumeFile,
          `resumes/${Date.now()}-${formData.resumeFile.name}`
        );
      }
      if (formData.coverLetterFile) {
        coverLetterPath = await uploadFile(
          formData.coverLetterFile,
          `cover-letters/${Date.now()}-${formData.coverLetterFile.name}`
        );
      }

      // Insert data into Supabase
      const { error } = await supabase.from("applications").insert({
        full_name: formData.fullName,
        email: formData.email,
        cover_letter: formData.coverLetter,
        cover_letter_file: coverLetterPath,
        resume_file: resumePath,
        experience: formData.experience,
      });

      if (error) throw error;

      alert("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        coverLetter: "",
        experience: "",
        resumeFile: null,
        coverLetterFile: null,
      });
    } catch (error) {
      console.error("Error submitting application:", error.message);
      alert("There was an error submitting your application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="support">
      <div className="relative pt-20 lg:px-15 lg:pt-25 xl:px-20 xl:pt-30">
        <div className="absolute bottom-[-255px] -0 -z-1 h-full"></div>
        <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
          <div className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white text-center">
              Join Our Internship Program
            </h2>
            <p className="mb-8 text-center text-black dark:text-white">
              Fill out the form below to apply.
              <strong> Beginners will be prioritized!</strong>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-7.5 mt-4 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                />
              </div>

              <div className="mb-12.5">
                <label
                  htmlFor="coverLetter"
                  className="block mb-2 text-black dark:text-white"
                >
                  Cover Letter (Optional)
                </label>
                <input
                  id="coverLetter"
                  name="coverLetterFile"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                />
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Or type your cover letter"
                  rows={4}
                  className="w-full border-b border-stroke bg-transparent mt-3 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                ></textarea>
              </div>

              <div className="mb-12.5">
                <label
                  htmlFor="resume"
                  className="block mb-2 text-black dark:text-white"
                >
                  Resume
                </label>
                <input
                  id="resume"
                  name="resumeFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                />
              </div>

              <div className="mb-12.5">
                <label
                  htmlFor="experience"
                  className="block mb-2 text-black dark:text-white"
                >
                  Years of Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="Enter years of experience"
                  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                />
              </div>

              <div className="flex flex-wrap gap-4 xl:justify-between ">
                <button
                  type="submit"
                  aria-label="send message"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
