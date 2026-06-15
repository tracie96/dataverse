"use client";

import { motion } from "framer-motion";
import { CircleHelp, MessageSquare } from "lucide-react";
import { useState } from "react";
import FAQItem from "./FAQItem";
import faqData from "./faqData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(1);

  const handleFaqToggle = (id: number) => {
    setActiveFaq(activeFaq === id ? 0 : id);
  };

  return (
    <section className="relative px-4 py-16 md:px-8 lg:py-24">
      <div className="relative mx-auto max-w-c-1390 2xl:px-0">
        <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-titlebg/5 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:pt-4"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <CircleHelp className="h-4 w-4" />
              FAQs
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
              Frequently Asked{" "}
              <span className="relative inline-block">
                Questions
                <span className="absolute -bottom-1 left-0 -z-1 h-3 w-full bg-primary/20 dark:bg-primary/30" />
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
              Everything you need to know about DataVerse — from joining the
              community to participating in events and getting support.
            </p>

           
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-4 lg:col-span-7"
          >
            {faqData.map((faq) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <FAQItem
                  faqData={{ ...faq, activeFaq, handleFaqToggle }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
