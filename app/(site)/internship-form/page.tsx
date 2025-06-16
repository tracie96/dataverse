"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion"
import { Dialog } from "@headlessui/react"
import { useSearchParams } from 'next/navigation'

// Create a Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

// Define the education level type
type EducationLevel = 'high_school' | 'bachelors' | 'masters' | 'phd' | 'undergraduate' | 'others';
type InternshipType = 'data_analytics' | 'research_associate';

// Define the structure of the form data
interface FormData {
    fullName: string;
    email: string;
    phone: string;
    fieldOfStudy: string;
    currentLevel: EducationLevel;
    cvResume: File | null;
    coverLetter: string;
    experienceLevel: 'beginner' | 'intermediate';
    // Additional fields for research associate
    researchExperience?: string;
    researchInterests?: string;
    academicPublications?: File | null;
}

// Add type definitions for the database schema
type education_level = 'high_school' | 'bachelors' | 'masters' | 'phd' | 'undergraduate' | 'others';

interface ApplicantData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    education_level: education_level;
    institution: string;
    field_of_study: string;
    graduation_year: number;
    linkedin_url?: string;
    github_url?: string;
    portfolio_url?: string;
}

interface InternshipApplicationData {
    applicant_id: string;
    internship_type: 'data_analytics' | 'research_associate';
    motivation_letter: string;
    relevant_experience?: string;
    technical_skills: string[];
    availability_date: string;
    preferred_duration: number;
    resume_url: string;
    how_did_you_hear?: string;
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

const submitToSupabase = async (formData: FormData, resumeUrl: string, isResearchInternship: boolean, academicPublicationsUrl?: string): Promise<void> => {
    // First, create the applicant
    const { data: applicantData, error: applicantError } = await supabase
        .from('applicants')
        .insert({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            field_of_study: formData.fieldOfStudy,
            education_level: formData.currentLevel
        })
        .select()
        .single();

    if (applicantError) {
        console.error('Error creating applicant:', applicantError);
        if (applicantError.code === '23505') {
            throw new Error('An application with this email already exists.');
        }
        throw new Error(applicantError.message);
    }

    // Create internship application
    const { error: applicationError } = await supabase
        .from('internship_applications')
        .insert({
            applicant_id: applicantData.id,
            internship_type: isResearchInternship ? 'research_associate' : 'data_analytics',
            status: 'pending',
            motivation_letter: formData.coverLetter,
            relevant_experience: isResearchInternship ? formData.researchExperience : null,
            technical_skills: [],
            resume_url: resumeUrl,
            academic_publications_url: academicPublicationsUrl || null
        });

    if (applicationError) {
        // If application creation fails, clean up the created applicant
        await supabase
            .from('applicants')
            .delete()
            .match({ id: applicantData.id });
            
        console.error('Error creating internship application:', applicationError);
        throw new Error('Failed to submit internship application. Please try again.');
    }
};

export default function InternshipForm() {
    const searchParams = useSearchParams()
    const internshipType = searchParams.get('type')
    const isResearchInternship = internshipType === 'research-associate'

    // Add suggested skills based on internship type
    const suggestedSkills = {
        data_analytics: [
            'Python',
            'R',
            'SQL',
            'Excel',
            'Tableau',
            'Power BI',
            'Machine Learning',
            'Statistical Analysis',
            'Data Visualization',
            'ETL'
        ],
        research_associate: [
            'Research Methodology',
            'Academic Writing',
            'Statistical Analysis',
            'Literature Review',
            'Data Collection',
            'SPSS',
            'Research Design',
            'Python',
            'R',
            'LaTeX'
        ]
    };

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        fieldOfStudy: "",
        currentLevel: "undergraduate",
        cvResume: null,
        coverLetter: "",
        experienceLevel: "beginner",
        researchExperience: "",
        researchInterests: "",
        // academicPublications: null
    });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isApplicationClosed = false;

    // Handle input change for text fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }; 

    // Handle file change for file inputs
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name } = e.target;
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Validate file type
            if (![".pdf", ".doc", ".docx", ".txt"].some(ext => file.name.toLowerCase().endsWith(ext))) {
                alert("Invalid file type. Please upload a .pdf, .doc, .docx, or .txt file.");
                return;
            }
            setFormData({ ...formData, [name]: file });
            setSelectedFileName(file.name);
        }
    };

  
    const uploadFile = async (file: File, path: string) => {
        try {
            console.log('Starting file upload to:', path);
            console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
            
            const { data, error } = await supabase.storage
                .from("documents")
                .upload(path, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error("File upload error:", error);
                throw error;
            }

            console.log('File uploaded successfully:', data);

            // Get public URL for the uploaded file
            const publicURL = supabase.storage
                .from("documents")
                .getPublicUrl(data.path);

            if (!publicURL) {
                console.error("Error getting public URL:", path);
                throw new Error("Failed to get public URL for uploaded file");
            }

            console.log('Generated public URL:', publicURL);
            return publicURL.data.publicUrl;
        } catch (error) {
            console.error('Upload error details:', error);
            throw new Error(`File upload failed: ${error.message}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Common required fields for both forms
            if (!formData.fullName || !formData.email || !formData.phone ||
                !formData.fieldOfStudy || !formData.currentLevel || 
                !formData.experienceLevel || !formData.cvResume || 
                !formData.coverLetter) {
                throw new Error("Please fill in all required fields");
            }

            // Additional validation for research internship
            if (isResearchInternship) {
                if (!formData.researchExperience || !formData.researchInterests) {
                    throw new Error("Please fill in all research-related fields");
                }
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Please enter a valid email address");
            }

            let resumeUrl = "";
            let academicPublicationsUrl = "";

            // Upload resume
            if (formData.cvResume) {
                try {
                    resumeUrl = await uploadFile(
                        formData.cvResume,
                        `resumes/${Date.now()}-${formData.cvResume.name}`
                    );
                } catch (error) {
                    console.error("Resume upload error:", error);
                    throw new Error("Failed to upload resume. Please try again.");
                }
            }

            // Upload academic publications if provided (for research internships)
            if (isResearchInternship && formData.academicPublications) {
                try {
                    academicPublicationsUrl = await uploadFile(
                        formData.academicPublications,
                        `publications/${Date.now()}-${formData.academicPublications.name}`
                    );
                } catch (error) {
                    console.error("Publications upload error:", error);
                    throw new Error("Failed to upload academic publications. Please try again.");
                }
            }

            // Submit to Supabase
            await submitToSupabase(formData, resumeUrl, isResearchInternship, academicPublicationsUrl);

            // Reset form and filename
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                fieldOfStudy: "",
                currentLevel: "undergraduate",
                cvResume: null,
                coverLetter: "",
                experienceLevel: "beginner",
                researchExperience: "",
                researchInterests: "",
            });
            setSelectedFileName("");
            setIsModalOpen(true);

        } catch (error) {
            console.error("Error submitting application:", error);
            alert(error.message || "There was an error submitting your application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="support">
            <div className="relative pt-20 lg:px-15 lg:pt-25 xl:px-20 xl:pt-30">
             

                <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
                    <div className="animate_top w-full rounded-xl bg-white p-8 shadow-lg dark:border dark:border-strokedark dark:bg-black xl:p-12">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                                {isResearchInternship ? 'Research Associate Internship' : 'Data Science and Analytics Internship'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">Complete the form below to apply</p>
                        </div>
                        <form 
                            onSubmit={handleSubmit} 
                            className="space-y-8"
                            method="POST"
                            action=""
                        >
                            {/* Basic Information */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder=" "
                                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Full Name
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder=" "
                                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Email Address
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder=" "
                                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Phone Number
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="fieldOfStudy"
                                    value={formData.fieldOfStudy}
                                    onChange={handleInputChange}
                                    placeholder=" "
                                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                />
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Field of Study
                                </label>
                            </div>

                            <div className="relative">
                                <select
                                    name="currentLevel"
                                    value={formData.currentLevel}
                                    onChange={handleInputChange}
                                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                >
                                    <option value="" disabled></option>
                                    <option value="high_school">High School</option>
                                    <option value="undergraduate">Undergraduate</option>
                                    <option value="bachelors">Bachelor's Degree</option>
                                    <option value="masters">Master's Degree</option>
                                    <option value="phd">PhD</option>
                                    <option value="others">Others</option>
                                </select>
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Current Level of Study
                                </label>
                            </div>

                            <div className="relative">
                                <select
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleInputChange}
                                    className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1.5 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                >
                                    <option value="" disabled></option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                </select>
                                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Experience Level
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    CV/Resume
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors dark:border-gray-600 dark:hover:border-blue-400">
                                    <div className="space-y-1 text-center">
                                        {selectedFileName ? (
                                            <div className="flex flex-col items-center">
                                                <svg className="mx-auto h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {selectedFileName}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({ ...formData, cvResume: null });
                                                        setSelectedFileName("");
                                                    }}
                                                    className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Remove file
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                    <label htmlFor="cvResume" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="cvResume"
                                                            name="cvResume"
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleFileChange}
                                                            className="sr-only"
                                                            required
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PDF, DOC up to 10MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder=" "
                                    className="peer w-full border-2 rounded-lg border-gray-300 bg-transparent p-4 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                    required
                                ></textarea>
                                <label className="pointer-events-none absolute top-0 left-0 ml-4 origin-left -translate-y-1/2 transform bg-white px-2 text-sm text-gray-800 opacity-75 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 dark:bg-black dark:text-gray-200 dark:peer-focus:text-blue-400">
                                    Cover Letter
                                </label>
                            </div>

                            {/* Research-specific fields */}
                            {isResearchInternship && (
                                <>
                                    <div className="relative">
                                        <textarea
                                            name="researchExperience"
                                            value={formData.researchExperience}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder=" "
                                            className="peer w-full border-2 rounded-lg border-gray-300 bg-transparent p-4 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                            required
                                        ></textarea>
                                        <label className="pointer-events-none absolute top-0 left-0 ml-4 origin-left -translate-y-1/2 transform bg-white px-2 text-sm text-gray-800 opacity-75 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 dark:bg-black dark:text-gray-200 dark:peer-focus:text-blue-400">
                                            Research Experience
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            name="researchInterests"
                                            value={formData.researchInterests}
                                            onChange={handleInputChange}
                                            rows={4}
                                            placeholder=" "
                                            className="peer w-full border-2 rounded-lg border-gray-300 bg-transparent p-4 font-normal outline-none transition-all focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400"
                                            required
                                        ></textarea>
                                        <label className="pointer-events-none absolute top-0 left-0 ml-4 origin-left -translate-y-1/2 transform bg-white px-2 text-sm text-gray-800 opacity-75 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 dark:bg-black dark:text-gray-200 dark:peer-focus:text-blue-400">
                                            Research Interests
                                        </label>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Academic Publications (Optional)
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors dark:border-gray-600 dark:hover:border-blue-400">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                    <label htmlFor="academicPublications" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="academicPublications"
                                                            name="academicPublications"
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleFileChange}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PDF, DOC up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </div>
                                    ) : "Submit Application"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </section>
    );
}
