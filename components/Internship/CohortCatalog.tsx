"use client";

import { INTERNSHIP_COHORTS } from "@/data/internship-cohorts";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, CheckCircle, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statusStyles = {
  open: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  closed: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  completed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const CohortCatalog = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
      {INTERNSHIP_COHORTS.map((cohort) => (
        <Link
          key={cohort.id}
          href={cohort.href}
          className="group flex flex-col overflow-hidden rounded-2xl border border-stroke bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-solid-5 dark:border-strokedark dark:bg-blacksection"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={cohort.coverImage}
              alt={cohort.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span
              className={cn(
                "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium",
                statusStyles[cohort.status]
              )}
            >
              {cohort.statusLabel}
            </span>
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-sm font-medium text-white/80">{cohort.year}</p>
              <h3 className="text-xl font-bold text-white sm:text-2xl">{cohort.title}</h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <p className="flex-1 text-sm leading-relaxed text-waterloo dark:text-manatee">
              {cohort.description}
            </p>

            <ul className="mt-4 space-y-2">
              {cohort.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2 text-sm text-black dark:text-white"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-titlebg" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-4 dark:border-strokedark">
              <div className="flex items-center gap-4 text-xs text-waterloo dark:text-manatee">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {cohort.durationWeeks} weeks
                </span>
                {cohort.href.includes("/gallery/") && (
                  <span className="inline-flex items-center gap-1">
                    <Images className="h-3.5 w-3.5" />
                    Photo album
                  </span>
                )}
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {cohort.status === "open" ? "View & Apply" : "View Cohort"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>

            {cohort.applyHref && cohort.status === "open" && (
              <div className="mt-3">
                <span className="inline-flex w-full items-center justify-center rounded-lg bg-titlebg px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-titlebgdark">
                  Apply for {cohort.title}
                </span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CohortCatalog;
