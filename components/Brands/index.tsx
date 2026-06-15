"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const highlights = [
  { icon: Briefcase, label: "Hands-on projects" },
  { icon: Users, label: "Expert mentorship" },
  { icon: Target, label: "Career-ready skills" },
];

const Brands = () => {
  return (
    <section className="relative px-4 pt-12 md:px-8 lg:pt-16">
      <div className="relative mx-auto max-w-c-1390 2xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-zumthor via-white to-[#E8F1FF] p-8 dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark md:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-titlebg/10 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <GraduationCap className="h-4 w-4" />
                Now Enrolling
              </span>

              <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle4">
                Ongoing Internship Program
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
                Jumpstart your career with practical experience, expert
                mentorship, and the skills to thrive in data and tech. Apply now
                and take the first step toward your future.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {highlights.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white/80 px-4 py-2 text-sm text-black dark:border-strokedark dark:bg-black/50 dark:text-white"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/internship">
                  <Button size="lg" className="group gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto flex max-w-sm items-center justify-center lg:ml-auto lg:max-w-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-titlebg/20 blur-2xl" />
                <div
                  className={cn(
                    "relative flex w-full items-center justify-center rounded-2xl border border-stroke/80 bg-white/70 p-10 backdrop-blur-sm dark:border-strokedark dark:bg-black/40",
                  )}
                >
                  <Image
                    src="/images/about/data.svg"
                    alt="Dataverse data illustration"
                    width={280}
                    height={120}
                    className="h-auto w-full max-w-[280px] object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
