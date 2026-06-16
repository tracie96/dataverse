import CohortCatalog from "@/components/Internship/CohortCatalog";
import { getOpenCohort, INTERNSHIP_COHORTS } from "@/data/internship-cohorts";
import { GraduationCap, Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Internship Programs | DataVerse Africa",
  description:
    "Explore DataVerse Africa internship cohorts — from the current open cohort to past programs and highlights.",
};

export default function InternshipPage() {
  const openCohort = getOpenCohort();

  return (
    <main className="min-h-screen pt-below-header pb-20 lg:pb-28">
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-56 w-56 rounded-full bg-titlebg/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <GraduationCap className="h-4 w-4" />
            Internship Programs
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
            DataVerse Africa Internship Cohorts
          </h1>

          <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
            Browse every internship cohort — open the current program to apply, or explore past
            cohorts to see how our community has grown.
          </p>

          {openCohort && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={openCohort.href}
                className="inline-flex items-center gap-2 rounded-lg bg-titlebg px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-titlebgdark"
              >
                {openCohort.title} — Apply Now
              </Link>
              <Link
                href="/gallery/internship-cohorts"
                className="inline-flex items-center gap-2 rounded-lg border border-stroke px-6 py-3 text-sm font-medium text-black transition-colors hover:border-primary/30 dark:border-strokedark dark:text-white"
              >
                <Users className="h-4 w-4" />
                Cohort Photo History
              </Link>
            </div>
          )}
        </div>

        <div className="relative mt-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white sm:text-2xl">
                All Cohorts
              </h2>
              <p className="mt-1 text-sm text-waterloo dark:text-manatee">
                {INTERNSHIP_COHORTS.length} programs · newest first
              </p>
            </div>
          </div>

          <CohortCatalog />
        </div>
      </div>
    </main>
  );
}
