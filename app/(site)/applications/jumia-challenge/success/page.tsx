"use client";

import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
      
      <div className="container">
    

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <div className="mb-8 inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Registration Successful!
              </h1>
              <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Thank you for registering for the Jumia Jitters Challenge. Here are your next steps:
              </p>

              <div className="bg-white dark:bg-black/20 rounded-2xl p-8 shadow-xl">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="mb-4">
                          <svg className="w-8 h-8 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Connect with fellow participants and get important updates
                        </p>
                        <a
                          href="https://chat.whatsapp.com/GtapW3Q8yRS983mRnTYrTH"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition duration-300 ease-in-out"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Join WhatsApp Group
                        </a>
                      </div>

                      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div className="mb-4">
                          <svg className="w-8 h-8 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          On Friday, 11th July 2025, you'll receive:
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li>• Challenge Dataset</li>
                          <li>• Detailed Instructions</li>
                          <li>• Submission Guidelines</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Important Dates</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Start Date</p>
                        <p className="text-primary">11th July, 2025</p>
                      </div>
                      <div>
                        <p className="font-medium">End Date</p>
                        <p className="text-primary">14th July, 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 