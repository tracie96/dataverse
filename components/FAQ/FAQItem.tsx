"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

type FaqData = {
  activeFaq: number;
  id: number;
  handleFaqToggle: (id: number) => void;
  quest: string;
  ans: string;
};

const FAQItem = ({ faqData }: { faqData: FaqData }) => {
  const { activeFaq, id, handleFaqToggle, quest, ans } = faqData;
  const isOpen = activeFaq === id;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-colors duration-300",
        isOpen
          ? "border-primary/30 bg-white shadow-solid-5 dark:border-primary/20 dark:bg-blacksection"
          : "border-stroke bg-white/80 dark:border-strokedark dark:bg-blacksection/80",
      )}
    >
      <button
        type="button"
        onClick={() => handleFaqToggle(id)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left lg:px-6 lg:py-6"
      >
        <span className="text-base font-semibold text-black dark:text-white sm:text-lg">
          {quest}
        </span>

        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            isOpen
              ? "bg-primary text-white"
              : "bg-zumthor text-primary dark:bg-hoverdark",
          )}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="border-t border-stroke px-5 py-4 text-sm leading-relaxed text-waterloo dark:border-strokedark dark:text-manatee lg:px-6 lg:py-5 sm:text-base">
              {ans}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
