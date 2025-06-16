"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// Create a Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface Application {
    id: string;
    created_at: string;
    applicant: {
        full_name: string;
        email: string;
        phone: string;
        field_of_study: string;
        education_level: string;
    };
    internship_type: string;
    status: string;
    resume_url: string;
    academic_publications_url: string | null;
    motivation_letter: string;
}

export default function ApplicationsTable() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<string>("");
    const [selectedApplicant, setSelectedApplicant] = useState<string>("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data, error } = await supabase
                .from('internship_applications')
                .select(`
                    *,
                    applicant:applicant_id (
                        full_name,
                        email,
                        phone,
                        field_of_study,
                        education_level
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setApplications(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const openMotivationLetter = (letter: string, applicantName: string) => {
        setSelectedLetter(letter);
        setSelectedApplicant(applicantName);
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-28">
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg overflow-y-auto relative dark:bg-gray-800">
                    <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white dark:bg-gray-800 table-striped relative">
                        <thead>
                            <tr className="text-left">
                                {[
                                    'Date',
                                    'Name',
                                    'Email',
                                    'Position',
                                    'Education',
                                    'Status',
                                    'Motivation Letter',
                                    'Documents'
                                ].map((header) => (
                                    <th 
                                        key={header}
                                        className="bg-primary sticky top-0 border-b border-gray-200 px-6 py-3 text-white font-bold tracking-wider uppercase text-xs"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {applications.map((application) => (
                                <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="border-b border-gray-200 px-6 py-4 dark:text-gray-200">
                                        {formatDate(application.created_at)}
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4 dark:text-gray-200">
                                        {application.applicant.full_name}
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4 dark:text-gray-200">
                                        {application.applicant.email}
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4 dark:text-gray-200">
                                        {application.internship_type === 'research_associate' 
                                            ? 'Research Associate' 
                                            : 'Data Analytics'}
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4 dark:text-gray-200">
                                        {application.applicant.education_level.replace(/_/g, ' ').charAt(0).toUpperCase() + 
                                         application.applicant.education_level.replace(/_/g, ' ').slice(1)}
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${application.status === 'pending' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : application.status === 'approved' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'}`}>
                                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4">
                                        <button 
                                            onClick={() => openMotivationLetter(application.motivation_letter, application.applicant.full_name)}
                                            className="text-primary hover:text-primary/80 underline cursor-pointer transition-colors font-medium"
                                        >
                                            View Letter
                                        </button>
                                    </td>
                                    <td className="border-b border-gray-200 px-6 py-4">
                                        <div className="flex space-x-2">
                                            <a 
                                                href={application.resume_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80 transition-colors font-medium"
                                            >
                                                Resume
                                            </a>
                                            {application.academic_publications_url && (
                                                <>
                                                    <span className="text-gray-300">|</span>
                                                    <a 
                                                        href={application.academic_publications_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:text-primary/80 transition-colors font-medium"
                                                    >
                                                        Publications
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
                                    >
                                        Motivation Letter - {selectedApplicant}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
                                            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                                                {selectedLetter}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}