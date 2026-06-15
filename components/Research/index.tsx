"use client";

import { Button } from "@/components/ui/button";
import {
  collaborationTypes,
  researchLeaders,
  researchProjects,
  researchServices,
} from "@/data/research";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FlaskConical,
  Mail,
  Microscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SectionHeader = ({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
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
    <p className="mt-4 text-waterloo dark:text-manatee">{description}</p>
  </motion.div>
);

const ResearchPage = () => {
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
              <Microscope className="h-4 w-4" />
              Research Institute
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
              DataVerse Africa{" "}
              <span className="text-primary">Research Institute</span>
            </h1>
            <p className="mt-2 text-lg font-medium text-titlebg">(DARI)</p>

            <p className="mt-6 text-lg text-black dark:text-white">
              Generating Insights. Driving Innovation. Transforming Africa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
              We bridge the gap between data and decision-making through applied
              research, strategic insight, and capacity building across
              Africa&apos;s key development sectors.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#services">
                <Button size="lg" className="group gap-2">
                  Explore Our Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline">
                  Let&apos;s Collaborate
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="What We Do"
            title="Research Services"
            description="Comprehensive support from research conception to implementation and impact measurement."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {researchServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-stroke bg-white p-6 transition-shadow hover:shadow-solid-5 dark:border-strokedark dark:bg-blacksection"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-waterloo dark:text-manatee">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Flagship Work"
            title="Our Projects"
            description="Research initiatives transforming Africa through technology and data-driven insights."
          />

          <div className="mt-12 space-y-6">
            {researchProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="overflow-hidden rounded-2xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5">
                  <div className="relative aspect-[16/10] lg:col-span-2 lg:aspect-auto lg:min-h-[240px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 lg:col-span-3 lg:p-8">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-waterloo dark:text-manatee">
                      {project.description}
                    </p>
                    <p className="mt-4 rounded-xl border border-stroke bg-zumthor/50 p-4 text-sm text-waterloo dark:border-strokedark dark:bg-black/40 dark:text-manatee">
                      <span className="font-medium text-black dark:text-white">
                        Impact:{" "}
                      </span>
                      {project.impact}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Leaders */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Leadership"
            title="Research Leaders"
            description="The team driving innovation and research excellence at DARI."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {researchLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection"
              >
                <div className="flex items-center gap-4 border-b border-stroke p-6 dark:border-strokedark">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-primary">{leader.role}</p>
                    <p className="text-xs text-waterloo dark:text-manatee">
                      {leader.subtitle}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-waterloo dark:text-manatee">
                    {leader.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {leader.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-stroke bg-zumthor/50 px-3 py-1 text-xs text-black dark:border-strokedark dark:bg-black/40 dark:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Collaborate"
            title="Let's Work Together"
            description="Whether you're a policymaker, academic, startup, or development partner — we're ready to collaborate."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-stroke bg-white p-5 text-center dark:border-strokedark dark:bg-blacksection"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-black dark:text-white">
                  {type.title}
                </h3>
                <p className="mt-2 text-sm text-waterloo dark:text-manatee">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-zumthor via-white to-[#E8F1FF] p-8 text-center dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark md:p-10"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Ready to Start Your Project?
            </h3>
            <p className="mt-3 text-sm text-waterloo dark:text-manatee">
              Reach out to discuss research, innovation, or capacity building
              support.
            </p>
            <div className="mt-6 space-y-1 text-sm text-waterloo dark:text-manatee">
              <p className="font-medium text-black dark:text-white">
                Valentine Onyemeziri Chinazom — Research Lead
              </p>
              <Link
                href="mailto:valentine.onyemeziri@DataVerseafrica.org"
                className="text-primary hover:underline"
              >
                valentine.onyemeziri@DataVerseafrica.org
              </Link>
            </div>
            <div className="mt-6">
              <Link href="/support">
                <Button className="gap-2">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;
