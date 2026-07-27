"use client";

import { Button } from "@/components/ui/button";
import {
  COHORT5_META,
  COHORT5_TIMELINE,
  COHORT5_TRACK_LIST,
  type Cohort5TrackId,
} from "@/config/cohort5";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Cloud,
  FileText,
  FolderKanban,
  GraduationCap,
  LineChart,
  Mail,
  MessageCircle,
  PlayCircle,
  Target,
  Trophy,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const SectionHeader = ({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mx-auto max-w-2xl text-center"
  >
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
      {badge}
    </span>
    <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-waterloo dark:text-manatee">{description}</p>
    )}
  </motion.div>
);

const trackIcons: Record<Cohort5TrackId, LucideIcon> = {
  "data-analytics-intermediate": LineChart,
  "ai-automation-business-analytics": Workflow,
  "data-science-intermediate": Zap,
  "microsoft-fabric-data-engineering": Cloud,
};

const timelineIcons: LucideIcon[] = [
  Users,
  PlayCircle,
  BookOpen,
  Target,
  Trophy,
];

const benefits = [
  {
    icon: FolderKanban,
    title: "Team & Project Management",
    desc: "Work in teams on real-world projects for African businesses.",
  },
  {
    icon: Users,
    title: "Mentorship & Community",
    desc: "Expert mentors, alumni network, and weekly live sessions.",
  },
  {
    icon: FileText,
    title: "Resource Vault",
    desc: "Certification tracking, resume templates, career guides, and job boards.",
  },
  {
    icon: Target,
    title: "Capstone Evaluation",
    desc: "Midpoint Project Review and final Capstone Presentation Day milestones.",
  },
];

const stats = [
  { value: String(COHORT5_META.durationWeeks), label: "Weeks Duration" },
  { value: String(COHORT5_TRACK_LIST.length), label: "Specialized Tracks" },
  {
    value: `$${COHORT5_META.programFeeUsd}`,
    label: `${COHORT5_META.discountPercent}% Discounted Program Fee`,
  },
];

const InternshipCohort5Page = () => {
  return (
    <div className="overflow-hidden bg-white dark:bg-black">
      {/* Hero */}
      <section className="relative px-4 pb-16 pt-below-header md:px-8 lg:pb-24">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-titlebg/10 blur-3xl" />

        <div className="relative mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <GraduationCap className="h-4 w-4" />
              Cohort 5.0 · Applications Open
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
              DataVerse Africa{" "}
              <span className="text-primary">Internship Program</span>
            </h1>
            <p className="mt-2 text-lg font-medium text-titlebg">Cohort 5.0</p>

            <p className="mt-6 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
              A 12-week immersive, project-based virtual internship across four
              specialized tracks — with real-world projects, mentorship, and
              career readiness support.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/internship-cohort5/apply">
                <Button size="lg" className="group gap-2">
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a
                href="https://chat.whatsapp.com/HPfkfv0m1jSLCsmocAzgxQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-green-600/30 text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/30"
                >
                  Join WhatsApp Group
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="rounded-2xl border border-stroke bg-white/80 px-6 py-5 backdrop-blur-sm dark:border-strokedark dark:bg-blacksection/80"
                >
                  <div className="text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-waterloo dark:text-manatee">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Program Overview"
            title="What to Expect"
            description={`Cohort 5.0 kicks off on ${COHORT5_META.kickoffDate} and runs for ${COHORT5_META.durationWeeks} weeks. Choose the track that matches your experience level and career goals — each with dedicated mentors, real-world African business projects, and career readiness support.`}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto mt-12 max-w-xl rounded-2xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Key Dates
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Applications Open",
                  value: `${COHORT5_META.applicationOpen} – ${COHORT5_META.applicationClose}`,
                },
                { label: "Kick-off", value: COHORT5_META.kickoffDate },
                { label: "Application Ends", value: COHORT5_META.applicationClose },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 border-b border-stroke pb-4 last:border-0 last:pb-0 dark:border-strokedark sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-waterloo dark:text-manatee">
                    {row.label}
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tracks */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge={`${COHORT5_TRACK_LIST.length} Tracks · $${COHORT5_META.programFeeUsd} USD each · ${COHORT5_META.discountPercent}% off`}
            title="Course Tracks & Pricing"
            description="Pick the path that fits your goals. Every track includes mentorship, real-world projects, and career support."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {COHORT5_TRACK_LIST.map((track, index) => {
              const Icon = trackIcons[track.id];
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex flex-col rounded-2xl border border-stroke bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-solid-5 dark:border-strokedark dark:bg-blacksection lg:p-8"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-stroke bg-zumthor/50 px-3 py-1 text-xs font-medium capitalize text-waterloo dark:border-strokedark dark:bg-black/40 dark:text-manatee">
                        {track.level}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${COHORT5_META.programFeeUsd}
                      </div>
                      <div className="mt-1 flex items-baseline justify-end gap-2">
                        <span className="text-[11px] line-through text-waterloo dark:text-manatee opacity-70">
                          ${COHORT5_META.originalProgramFeeUsd}
                        </span>
                        <span className="text-[11px] uppercase tracking-wide text-primary font-semibold">
                          {COHORT5_META.discountPercent}% off
                        </span>
                      </div>
                      <div className="text-[11px] uppercase tracking-wide text-waterloo dark:text-manatee">
                        USD
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-black dark:text-white lg:text-xl">
                    {track.name}
                  </h3>
                  <p className="mt-2 flex-grow text-sm leading-relaxed text-waterloo dark:text-manatee">
                    {track.description}
                  </p>

                  <div className="mt-5 border-t border-stroke pt-5 dark:border-strokedark">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-waterloo dark:text-manatee">
                      What you&apos;ll cover
                    </p>
                    <ul className="space-y-2">
                      {track.skills.slice(0, 4).map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-2.5 text-sm text-black/80 dark:text-white/80"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {skill}
                        </li>
                      ))}
                      {track.skills.length > 4 && (
                        <li className="pl-6 text-xs font-medium text-primary">
                          +{track.skills.length - 4} more modules
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Schedule"
            title="Operational Timeline 2026"
          />

          <div className="mx-auto mt-12 max-w-2xl space-y-4">
            {COHORT5_TIMELINE.map((item, index) => {
              const TimelineIcon = timelineIcons[index] ?? Trophy;
              const isActive = item.status === "active";
              return (
                <motion.div
                  key={item.activity}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="flex items-start gap-4 rounded-2xl border border-stroke bg-white p-5 dark:border-strokedark dark:bg-blacksection"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-zumthor text-waterloo dark:bg-black/40 dark:text-manatee"
                    }`}
                  >
                    <TimelineIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-black dark:text-white">
                        {item.activity}
                      </h3>
                      {isActive && (
                        <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          Active Now
                        </span>
                      )}
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-waterloo dark:text-manatee">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {item.date}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Platform"
            title="What You Get"
            description="Everything included in the Cohort 5.0 experience — from project delivery to career support."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-stroke bg-white p-6 text-center dark:border-strokedark dark:bg-blacksection"
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-black dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-waterloo dark:text-manatee">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-zumthor via-white to-[#E8F1FF] p-8 text-center dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark md:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Ready to Apply?
              </h2>
              <p className="mt-3 text-sm text-waterloo dark:text-manatee sm:text-base">
                Applications close {COHORT5_META.applicationClose}. Join Cohort
                5.0 and accelerate your tech career in Africa.
              </p>
              <div className="mt-6">
                <Link href="/internship-cohort5/apply">
                  <Button size="lg" className="gap-2">
                    Apply for Cohort 5.0
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-sm text-waterloo dark:text-manatee">
                Questions?{" "}
                <a
                  href="mailto:info@dataverseafrica.org"
                  className="font-medium text-primary hover:underline"
                >
                  info@dataverseafrica.org
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InternshipCohort5Page;
