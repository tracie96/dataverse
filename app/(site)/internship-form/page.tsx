"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion"
import { Dialog } from "@headlessui/react"

// Create a Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// Define the structure of the form data
interface FormData {
    fullName: string;
    email: string;
    coverLetter?: string;
    coverLetterFile?: File | null;
    resumeFile?: File | null;
    experience?: string;
}

type ModalProps = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

 const SuccessModal = ({ isOpen, setIsOpen }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    as="div"
                    className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
                >
                    <div className="flex flex-col py-8 px-4 text-center">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <motion.div
                            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                            initial={{
                                opacity: 0,
                                scale: 0.75,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    ease: "easeOut",
                                    duration: 0.15,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.75,
                                transition: {
                                    ease: "easeIn",
                                    duration: 0.15,
                                },
                            }}
                        >
                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>

                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg
                                                className="h-6 w-6 text-green-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-headline"
                                            >
                                                Application Submitted Successfully!
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <Dialog.Description
                                                    as="p"
                                                    className="text-sm text-gray-500"
                                                >
                                                    Your application has been submitted successfully! We will review it and get back to you shortly.
                                                </Dialog.Description>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        tabIndex={0}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Close
                                    </button>
                                    {/* Optional cancel button */}
                                    {/* 
                                    <button
                                        type="button"
                                        tabIndex={0}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button> 
                                    */}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handle input change for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }; 

    // Handle file change for file inputs
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            // Validate file type
            if (![".pdf", ".doc", ".docx", ".txt"].some(ext => file.name.endsWith(ext))) {
                alert("Invalid file type. Please upload a .pdf, .doc, .docx, or .txt file.");
                return;
            }
            setFormData({ ...formData, [name]: file });
        }
    };

  
    const uploadFile = async (file: File, path: string) => {
        const { data, error } = await supabase.storage.from("documents").upload(path, file);
        if (error) {
            console.error("File upload error:", error);
            throw error;
        }

        // Get public URL for the uploaded file
        const publicURL = supabase.storage.from("documents").getPublicUrl(data.path);
        if (!publicURL) {
            console.error("Error getting public URL:", path);
            throw publicURL; 
        }

        return publicURL.data.publicUrl;
    };

    const handleSubmit = async () => {
        const { fullName, email, experience, resumeFile } = formData;

        // Validate required fields
        if (!fullName || !email || !experience || !resumeFile) {
            alert("Please fill out all required fields.");
            return;
        }
        setLoading(true);
     
        try {
            let resumeUrl; 
            let coverLetterUrl; 

            // Upload resume if provided and get its public URL
            if (formData.resumeFile) {
                resumeUrl = await uploadFile(formData.resumeFile, `resumes/${Date.now()}-${formData.resumeFile.name}`);
            }

            // Upload cover letter if provided and get its public URL
            if (formData.coverLetterFile) {
                coverLetterUrl = await uploadFile(formData.coverLetterFile, `cover-letters/${Date.now()}-${formData.coverLetterFile.name}`);
            }

            // Insert application data into the database with URLs for uploaded files
            const { error } = await supabase.from("interns").insert({
                full_name: formData.fullName,
                email: formData.email,
                years_of_experience: formData.experience,
                resume: resumeUrl,
                cover_letter: coverLetterUrl,
                created_at: new Date().toISOString(),
            });

            if (error) throw error;

            setIsModalOpen(true);
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
                <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
                    <div className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15">
                        <h2 className="text-3xl font-bold mb-6 text-black dark:text-white text-center">Join Our Internship Program</h2>
                        <p className="mb-8 text-center text-black dark:text-white">Fill out the form below to apply. <strong>Beginners will be prioritized!</strong></p>
                        <div className="mb-7.5 mt-4 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full name" className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark lg:w-1/2" required />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email address"  className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark lg:w-1/2" required />
                        </div>
                        <div className="mb-7.5">
                            <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Years of experience" className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark" required />
                        </div>
                        <div className="mb-7.5">
                            <label htmlFor="resumeFile" className="block mb-2 text-black dark:text-white">Upload Resume</label>
                            <input id="resumeFile" name="resumeFile" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark" required />
                        </div>
                        <div className="mb-12.5">
                            <label htmlFor="coverLetter" className="block mb-2 text-black dark:text-white">Cover Letter (Optional)</label>
                            <input id="coverLetter" name="coverLetterFile" type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo dark:border-strokedark" />
                            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} placeholder="Or type your cover letter" rows={4} className="w-full border-b border-stroke bg-transparent mt-3 focus:border-waterloo dark:border-strokedark"></textarea>
                        </div>
                        <div className="mb-12.5">
                            <label htmlFor="experience" className="block mb-2 text-black dark:text-white">Years of Experience</label>
                            <input id="experience" aria-required name="experience" value={formData.experience} onChange={handleInputChange} type="number" placeholder="Enter years of experience" className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white" required />
                        </div>
                        <button type="button" onClick={handleSubmit} disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-md">
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </div>
            </div>

            <SuccessModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </section>
    );
}
