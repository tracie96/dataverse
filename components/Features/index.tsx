"use client";

import CardStack from "@/components/CardStack";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { featuresStackCards } from "./featuresStackData";

const Feature = () => {
  return (
    <section id="features" className="relative w-full px-4 py-16 md:px-8 lg:py-24">
      <div className="relative mx-auto w-full min-w-0 max-w-c-1390 2xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Compass className="h-4 w-4" />
            Who We Are
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
            Transforming Africa Through Data
          </h2>

          <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
            At DataVerse, we&apos;re on a mission to transform Africa through
            the power of data — where technology fuels progress, improves
            lives, and drives growth across the continent. That future is here.
          </p>
        </motion.div>

        <CardStack cards={featuresStackCards} scrollPerCard={70} />
      </div>
    </section>
  );
};

export default Feature;
