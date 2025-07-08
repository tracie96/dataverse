"use client" // Keep this at the very top if this component uses client-side features.

import React from "react";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";

// --- Data Definition (Moved outside component for clarity and potential reusability) ---
// It's often good practice to define static data outside of the component function
// if it doesn't depend on props or state, as it won't be redefined on every render.


// --- Functional Component ---
const CurriculumPage = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 lg:pt-32">
    <div className="container mx-auto px-4">
      {/* Internship Program Header Section */}
      <div className="mx-auto rounded-lg bg-gradient-to-t from-[#a0c8f2] to-[#F8F9FF] dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark">
        <div className="flex flex-wrap gap-8 md:flex-nowrap md:justify-between md:gap-0">
          <div className="animate_left md:w-[70%] lg:w-1/2">
            <h2 className="mb-4 w-11/12 text-3xl font-bold text-black text-left dark:text-white xl:text-sectiontitle4 pt-6 px-8 mt-6">
              Internship Program
            </h2>
            <div className="px-8">
              <p className="text-left">
              Our transformative internship program is designed to help you unlock your full potential. You'll gain invaluable hands-on experience, benefit from dedicated mentorship, and develop the critical skills needed for career excellence. Seize this chance to build a strong foundation for your future.
              </p>
              {/* Use a more semantic button if it triggers an action, Link if it navigates */}
         
            </div>
          </div>

          <div className="animate_right lg:w-[45%]">
            <div className="flex items-center justify-end xl:justify-between">
              <DotLottieReact
                src="https://lottie.host/61c130d8-8d18-4ff7-b3d5-c5596dac5430/EilbcylZaY.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 sm:py-10">
        <div className="mx-auto">
          {/* Programs Section */}
        

          {/* Programs Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-24">
            {/* Data Analytics & Science Program Card */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-gray-900/5 transition duration-300 hover:shadow-xl dark:ring-gray-700/5">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-600/10 dark:bg-blue-400/10 rounded-lg p-2">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">3 Months</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold leading-8 tracking-tight text-gray-900 dark:text-white text-left">Data Analytics & Science Internship</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300 text-left">A comprehensive program exposing interns to real-world data analytics across multiple domains.</p>
                  
                  <div className="mt-8 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white text-left">Key Focus Areas</h4>
                      <ul className="mt-4 grid grid-cols-1 gap-3">
                        {['Research Analytics', 'Healthcare Analytics', 'Finance Analytics', 'Trade Analytics'].map((area) => (
                          <li key={area} className="flex items-center gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            <svg className="h-1.5 w-1.5 flex-none fill-primary dark:fill-blue-400" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white text-left">Required Skills</h4>
                      <ul className="mt-4 grid grid-cols-1 gap-3">
                        {['Excel & Power BI/Tableau', 'SPSS', 'Python for Data Analysis', 'Machine Learning basics'].map((skill) => (
                          <li key={skill} className="flex items-center gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            <svg className="h-1.5 w-1.5 flex-none fill-primary dark:fill-blue-400" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      disabled
                      className="rounded-lg bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm cursor-not-allowed"
                    >
                      Closed
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Associate Program Card */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-gray-900/5 transition duration-300 hover:shadow-xl dark:ring-gray-700/5">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="bg-purple-600/10 dark:bg-purple-400/10 rounded-lg p-2">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10">2 Months</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold leading-8 tracking-tight text-gray-900 dark:text-white text-left">Research Associate Internship</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300 text-left">A structured program designed to equip participants with essential skills in professional research and analysis.</p>
                  
                  <div className="mt-8 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white text-left">Research Areas</h4>
                      <ul className="mt-4 grid grid-cols-1 gap-3">
                        {['Public Health Research', 'Education Research', 'Business Analytics', 'Development Sectors'].map((area) => (
                          <li key={area} className="flex items-center gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            <svg className="h-1.5 w-1.5 flex-none fill-purple-600 dark:fill-purple-400" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white text-left">Program Benefits</h4>
                      <ul className="mt-4 grid grid-cols-1 gap-3">
                        {['Hands-on Research Experience', 'Mentorship & Training', 'Co-authoring Opportunities', 'Professional Certification'].map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            <svg className="h-1.5 w-1.5 flex-none fill-purple-600 dark:fill-purple-400" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      disabled
                      className="rounded-lg bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm cursor-not-allowed"
                    >
                      Closed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mx-auto max-w-2xl text-left mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl ">Program Benefits</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Unlock valuable opportunities and resources to accelerate your career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Real Projects Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md ring-1 ring-gray-900/5 transition duration-300 hover:shadow-xl dark:ring-gray-700/5">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-400/10">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real Projects</h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Work on actual projects across different domains and build your portfolio.</p>
              </div>
            </div>

            {/* Mentorship Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md ring-1 ring-gray-900/5 transition duration-300 hover:shadow-xl dark:ring-gray-700/5">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent dark:from-purple-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-purple-600/10 dark:bg-purple-400/10">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mentorship</h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Get guidance from experienced professionals in your field of interest.</p>
              </div>
            </div>

            {/* Certification Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md ring-1 ring-gray-900/5 transition duration-300 hover:shadow-xl dark:ring-gray-700/5">
              <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-transparent dark:from-green-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-green-600/10 dark:bg-green-400/10">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certification</h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Receive a professional certification upon successful completion.</p>
              </div>
            </div>

            {/* Alumni Network Card */}
            <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md ring-1 ring-gray-900/5 transition duration-300 hover:shadow-xl dark:ring-gray-700/5">
              <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-transparent dark:from-pink-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-pink-600/10 dark:bg-pink-400/10">
                  <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Alumni Network</h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Join our growing network of professionals and get access to future opportunities.</p>
              </div>
            </div>
          </div>

          {/* Curriculum Section - Hidden for now */}
          <div className="hidden">
            {/* ... existing curriculum code ... */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CurriculumPage;