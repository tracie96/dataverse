"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscriptionStatus("success");
    setTimeout(() => setSubscriptionStatus("idle"), 3000);
  };

  return (
    <>
      <footer className="border-t border-stroke shadow-lg transition duration-100 bg-white dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top col-span-1 lg:col-span-1"
              >
                <a href="/" className="inline-block mb-6">
                  <Image
                    src="/images/logo/logo.png"
                    alt="DataVerse Africa Logo"
                    width={140}
                    height={60}
                    className="hidden dark:block"
                  />
                  <Image
                    src="/images/logo/logo.png"
                    alt="DataVerse Africa Logo"
                    width={140}
                    height={60}
                    className="dark:hidden"
                  />
                </a>

                <p className="mb-8 text-gray-600 dark:text-gray-400">
                  Empowering Africa through data-driven solutions and innovative technology.
                </p>

                <div className="space-y-3">
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Contact Us
                  </p>
                  <a
                    href="mailto:info@dataverseafrica.org"
                    className="inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    info@dataverseafrica.org
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top col-span-1"
              >
                <h4 className="mb-6 text-lg font-semibold text-black dark:text-white">
                  Quick Links
                </h4>

                <ul className="space-y-3">
                  <li>
                    <a
                      href="/about"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="/projects"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top col-span-1"
              >
                <h4 className="mb-6 text-lg font-semibold text-black dark:text-white">
                  Resources
                </h4>

                <ul className="space-y-3">
                  <li>
                    <a
                      href="/blog"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/documentation"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help"
                      className="inline-block text-base text-gray-700 hover:text-primary dark:text-gray-300"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top col-span-1"
              >
                <h4 className="mb-6 text-lg font-semibold text-black dark:text-white">
                  Newsletter
                </h4>
                <p className="mb-6 text-base text-gray-600 dark:text-gray-400">
                  Subscribe to our newsletter for updates, insights, and news about data in Africa.
                </p>

                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 outline-none focus:border-primary dark:border-strokedark dark:bg-blacksection"
                  />

                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                  >
                    {subscriptionStatus === "idle" && (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                    {subscriptionStatus === "success" && (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </form>
                {subscriptionStatus === "success" && (
                  <p className="mt-3 text-sm text-green-500">
                    Thank you for subscribing!
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* <!-- Footer Bottom --> */}
          <div className="border-t border-stroke py-6 dark:border-strokedark">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top"
              >
                <p className="text-center text-base text-gray-600 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} DataVerse Africa. All rights reserved.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top"
              >
                <div className="flex items-center gap-5">
                  <a
                    href="https://x.com/DataverseAfrica"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Twitter"
                    className="group"
                  >
                    <svg
                      className="h-5 w-5 fill-gray-600 transition-colors duration-200 group-hover:fill-primary dark:fill-gray-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/dataverseafrica/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on LinkedIn"
                    className="group"
                  >
                    <svg
                      className="h-5 w-5 fill-gray-600 transition-colors duration-200 group-hover:fill-primary dark:fill-gray-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
