"use client";

import { galleryCategories } from "@/data/gallery";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const ImpactSection = () => {
  return (
    <section className="relative px-4 py-16 md:px-8 lg:py-24">
      <div className="relative mx-auto max-w-c-1390 2xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Images className="h-4 w-4" />
            Our Impact
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
            Programs, Partnerships & Moments
          </h2>

          <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
            Explore highlights from our accelerator programs, internships,
            partnerships, webinars, and community stories.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {galleryCategories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/gallery">
            <Button size="lg" variant="outline" className="group gap-2">
              View Full Gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
