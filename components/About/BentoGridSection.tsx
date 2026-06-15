"use client";

import { cn } from "@/lib/utils";
import { BentoObjective } from "./aboutData";
import { aboutIconProps, type AboutIcon } from "./aboutIcons";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoGridSectionProps {
  badgeIcon: AboutIcon;
  badgeLabel: string;
  title: ReactNode;
  description: string;
  objectives: BentoObjective[];
  className?: string;
}

const BentoGridSection = ({
  badgeIcon: BadgeIcon,
  badgeLabel,
  title,
  description,
  objectives,
  className,
}: BentoGridSectionProps) => {
  return (
    <section className={cn("relative px-4 py-16 md:px-8 lg:py-24", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(55,125,199,0.08)_1px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]"
      />

      <div className="relative mx-auto max-w-c-1390 2xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <BadgeIcon {...aboutIconProps.badge} />
            {badgeLabel}
          </div>

          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
            {title}
          </h2>

          <p className="mt-4 text-pretty text-base text-waterloo dark:text-manatee sm:text-lg">
            {description}
          </p>
        </motion.div>

        <div className="mt-14 grid w-full auto-rows-[8rem] grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            const [gradientFrom, gradientTo, ...ringClasses] =
              objective.accent.split(" ");

            return (
              <motion.article
                key={objective.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border border-stroke bg-white p-6 shadow-solid-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-solid-7 dark:border-strokedark dark:bg-blacksection",
                  objective.className,
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity duration-300 group-hover:opacity-100",
                    gradientFrom,
                    gradientTo,
                  )}
                />

                <span className="pointer-events-none absolute right-5 top-4 text-5xl font-black tracking-tight text-black/15 dark:text-white/25 sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex h-full flex-col">
                  <div
                    className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 shadow-sm dark:bg-blacksection",
                      ringClasses.join(" "),
                    )}
                  >
                    <Icon {...aboutIconProps.card} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-black dark:text-white">
                    {objective.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-waterloo dark:text-manatee">
                    {objective.description}
                  </p>

                  {objective.metric && (
                    <div className="mt-auto flex items-baseline gap-2 pt-5">
                      <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
                        {objective.metric.value}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-waterloo dark:text-manatee">
                        {objective.metric.label}
                      </span>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoGridSection;
