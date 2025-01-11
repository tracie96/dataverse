"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface Application {
  id: number;
  full_name: string;
  email: string;
  years_of_experience: number;
  resume: string;
  cover_letter: string;
  created_at: string;
}

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase.from("interns").select("*");
      if (error) {
        console.error("Error fetching applications:", error);
      } else {
        setApplications(data || []);
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  }

  return (
    <section id="support">
      <div className="relative pt-20 lg:px-15 lg:pt-25 xl:px-20 xl:pt-30">
        <div className="animate_top w-full p-6 shadow-lg bg-white dark:border dark:border-strokedark dark:bg-black">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-strokedark dark:bg-black">
              <thead className="dark:border-strokedark dark:bg-black">
                <tr>
                  <th className="border border-gray-300 dark:border-strokedark dark:bg-black px-4 py-2 text-left">Full Name</th>
                  <th className="border border-gray-300 dark:border-strokedark dark:bg-black px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 dark:border-strokedark dark:bg-black px-4 py-2 text-left">Years of Experience</th>
                  <th className="border border-gray-300 dark:border-strokedark dark:bg-black px-4 py-2 text-left">Resume</th>
                  <th className="border border-gray-300 dark:border-strokedark dark:bg-black px-4 py-2 text-left">Cover Letter</th>
                  <th className="border border-gray-300 dark:border-strokedark dark:bg-black px-4 py-2 text-left">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="even:bg-gray-100 dark:border-strokedark dark:bg-black odd:bg-white dark:odd:bg-gray-800"
                  >
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{app.full_name}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{app.email}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      {app.years_of_experience}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Resume
                      </a>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      {app.cover_letter ? (
                        <a
                          href={app.cover_letter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Cover Letter
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                      {new Date(app.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
