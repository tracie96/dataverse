"use client";

import { Button } from "@/components/ui/button";
import { featuredCohort, llamaEventImages } from "@/data/events";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  GraduationCap,
  Images,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const EventsPage = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <div className="overflow-hidden pt-below-header">
      {/* Hero */}
      <section className="relative px-4 pb-12 md:px-8 lg:pb-16">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-titlebg/10 blur-3xl" />

        <div className="relative mx-auto max-w-c-1390 text-center 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              Events
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
              News, Programs &{" "}
              <span className="text-primary">Highlights</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-waterloo dark:text-manatee sm:text-lg">
              Stay up to date with DataVerse programs, accelerator events, and
              internship cohort openings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured — Cohort 5 */}
      <section className="px-4 pb-16 md:px-8 lg:pb-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-zumthor via-white to-[#E8F1FF] dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-titlebg/10 blur-3xl" />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={featuredCohort.image}
                  alt={featuredCohort.imageAlt ?? featuredCohort.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-titlebg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  {featuredCohort.applicationsOpen ? "Now Open" : "Closed"}
                </span>
              </div>

              <div className="p-8 md:p-10 lg:p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Featured Program
                </span>

                <h2 className="mt-4 text-2xl font-bold text-black dark:text-white sm:text-3xl xl:text-sectiontitle4">
                  {featuredCohort.title}
                </h2>
                <p className="mt-1 text-lg font-medium text-titlebg">
                  {featuredCohort.subtitle}
                </p>
                <p className="mt-4 leading-relaxed text-waterloo dark:text-manatee">
                  {featuredCohort.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white/80 px-4 py-2 text-sm dark:border-strokedark dark:bg-black/50">
                    <Calendar className="h-4 w-4 text-primary" />
                    Kickoff: {featuredCohort.kickoffDate}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white/80 px-4 py-2 text-sm dark:border-strokedark dark:bg-black/50">
                    <Clock className="h-4 w-4 text-primary" />
                    {featuredCohort.duration}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white/80 px-4 py-2 text-sm dark:border-strokedark dark:bg-black/50">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    {featuredCohort.tracks} specialized tracks
                  </span>
                </div>

                <p className="mt-4 text-sm text-waterloo dark:text-manatee">
                  {featuredCohort.applicationsOpen ? (
                    <>
                      Applications close{" "}
                      <span className="font-medium text-black dark:text-white">
                        {featuredCohort.applicationClose}
                      </span>
                    </>
                  ) : (
                    <>
                      Applications closed on{" "}
                      <span className="font-medium text-black dark:text-white">
                        {featuredCohort.applicationClose}
                      </span>
                    </>
                  )}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  {featuredCohort.applicationsOpen && (
                    <Link href="/internship-cohort5/apply">
                      <Button size="lg" className="group gap-2">
                        Apply Now
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  )}
                  <Link href={featuredCohort.detailsHref}>
                    <Button size="lg" variant="outline">
                      View Program Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Llama Accelerator Gallery */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Images className="h-4 w-4" />
              Past Event
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Llama Accelerator Program
            </h2>
            <p className="mt-4 text-waterloo dark:text-manatee">
              Highlights from the Llama Accelerator — empowering founders and
              innovators with data-driven tools and mentorship.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5"
          >
            {llamaEventImages.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                variants={itemVariants}
                onClick={() => setActiveImage(index)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-stroke bg-white shadow-solid-3 transition-all duration-300 hover:border-primary/30 hover:shadow-solid-5 dark:border-strokedark dark:bg-blacksection"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {image.caption && (
                    <span className="text-left text-xs font-medium text-white sm:text-sm">
                      {image.caption}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <Link href="/gallery/llama-accelerator">
              <Button variant="outline" className="group gap-2">
                View Full Gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            Close
          </button>
          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={llamaEventImages[activeImage].src}
              alt={llamaEventImages[activeImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            {llamaEventImages[activeImage].caption && (
              <p className="absolute bottom-4 left-0 right-0 text-center text-white">
                {llamaEventImages[activeImage].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
