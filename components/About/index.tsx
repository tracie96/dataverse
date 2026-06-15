"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  aboutStats,
  connectSteps,
  Eye,
  BookOpen,
  Compass,
  learnSteps,
  Target,
  teamMembers,
  Users,
} from "./aboutData";
import { aboutIconProps, type AboutIcon } from "./aboutIcons";
import AimsObjectives from "./AimsObjectives";
import MissionSection from "./MissionSection";
import TeamCard from "./TeamCard";

const SectionBadge = ({
  icon: Icon,
  label,
}: {
  icon: AboutIcon;
  label: string;
}) => (
  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
    <Icon {...aboutIconProps.badge} />
    {label}
  </span>
);

const About = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-below-header">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-titlebg/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <SectionBadge icon={Compass} label="About Us" />

            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
            Transforming Africa Through{" "}
              <span className="relative inline-block">
                Data
                <span className="absolute -bottom-1 left-0 -z-1 h-3 w-full bg-primary/20 dark:bg-primary/30" />
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
              At DataVerse, we&apos;re on a mission to transform Africa through
              the power of data — where technology fuels progress, improves
              lives, and drives growth across the continent. That future is here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-stroke bg-white/80 p-5 text-center backdrop-blur-sm dark:border-strokedark dark:bg-blacksection"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-waterloo dark:text-manatee">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Why */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-zumthor via-white to-[#E8F1FF] p-8 dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark md:p-10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-solid-11">
                <Eye {...aboutIconProps.feature} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-4 leading-relaxed text-waterloo dark:text-manatee">
                We envision an Africa where data-driven innovation is the norm.
                Our commitment is to ensure that everyone, regardless of
                background, harnesses the benefits of cutting-edge technology —
                where anyone can glide through technology and become experts
                themselves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-[#FFF8F0] via-white to-zumthor p-8 dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark md:p-10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-titlebg text-white shadow-solid-11">
                <Target {...aboutIconProps.feature} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Why Choose DataVerse
              </h2>
              <p className="mt-4 leading-relaxed text-waterloo dark:text-manatee">
                We don&apos;t just handle data; we make it work for you. Our
                tools and training revolutionize how businesses operate and
                communities thrive. Whether you&apos;re a startup, enterprise,
                or individual, DataVerse is your trusted partner in navigating
                the data landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aims & Objectives */}
      <AimsObjectives />

      <MissionSection />

      {/* Connect */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 to-titlebg/20 blur-2xl" />
              <div className="relative aspect-[588/526] overflow-hidden rounded-3xl border border-stroke bg-white p-4 dark:border-strokedark dark:bg-blacksection">
                <Image
                  src="/images/about/about-light-01.png"
                  alt="Connect with DataVerse community"
                  fill
                  className="object-contain p-4 dark:hidden"
                />
                <Image
                  src="/images/about/about-dark-01.png"
                  alt="Connect with DataVerse community"
                  fill
                  className="hidden object-contain p-4 dark:block"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionBadge icon={Users} label="Connect" />
              <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Connect With Others Across DataVerse
              </h2>
              <p className="mt-4 text-waterloo dark:text-manatee">
                Apply knowledge and connections to build great products, advance
                your skills, career, and network — and help your community
                learn too.
              </p>

              <div className="mt-8 space-y-4">
                {connectSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 rounded-2xl border border-stroke bg-white p-5 transition-colors hover:border-primary/30 dark:border-strokedark dark:bg-blacksection"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon {...aboutIconProps.step} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Step {step.step}
                        </span>
                        <p className="mt-1 text-sm font-medium text-black dark:text-white sm:text-base">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learn */}
      <section className="px-4 pb-16 md:px-8 lg:pb-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <SectionBadge icon={BookOpen} label="Learn" />
              <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Learn & Discover With DataVerse
              </h2>
              <p className="mt-4 text-waterloo dark:text-manatee">
                Explore topics, join interactive sessions, ask questions, and
                share what you learn with the community.
              </p>

              <div className="mt-8 space-y-4">
                {learnSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 rounded-2xl border border-stroke bg-white p-5 transition-colors hover:border-primary/30 dark:border-strokedark dark:bg-blacksection"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-titlebg/10 text-titlebg">
                        <Icon {...aboutIconProps.step} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-titlebg">
                          Step {step.step}
                        </span>
                        <p className="mt-1 text-sm font-medium text-black dark:text-white sm:text-base">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={cn("relative order-1 lg:order-2")}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-titlebg/20 to-primary/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/ae44c372-f025-45bf-bc98-d4fc57d39f6b/4vcLrqbWDt.json"
                  style={{ height: "360px" }}
                  className="dark:hidden"
                />
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/ae44c372-f025-45bf-bc98-d4fc57d39f6b/4vcLrqbWDt.json"
                  style={{ height: "360px", background: "#181C31" }}
                  className="hidden dark:block"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <SectionBadge icon={Users} label="Leadership" />
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Meet The Team
            </h2>
            <p className="mt-4 text-waterloo dark:text-manatee">
              The people driving DataVerse&apos;s mission to empower Africa
              through data and technology.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
