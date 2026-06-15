"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: ButtonProps["variant"];
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: { src: string; alt: string }[];
  children?: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroSection = ({
  title,
  subtitle,
  actions,
  stats,
  images,
  children,
  className,
}: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-zumthor/60 via-white to-white pt-below-header dark:from-black dark:via-black dark:to-black lg:pt-36",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:-left-24 sm:h-72 sm:w-72" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-titlebg/10 blur-3xl sm:-right-24 sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto w-full max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="grid min-w-0 grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <motion.div
            className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="mb-4 inline-flex rounded-full border border-stroke bg-zumthor px-4 py-1.5 text-sm font-medium text-primary dark:border-strokedark dark:bg-blacksection"
              variants={itemVariants}
            >
              Welcome to Dataverse
            </motion.span>

            <motion.h1
              className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl xl:text-hero"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-lg text-waterloo dark:text-manatee"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
              variants={itemVariants}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant}
                  size="lg"
                  className={action.className}
                >
                  {action.text}
                </Button>
              ))}
            </motion.div>

            {children && (
              <motion.div
                className="mt-6 w-full max-w-md"
                variants={itemVariants}
              >
                {children}
              </motion.div>
            )}

            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zumthor dark:bg-blacksection">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-black dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-waterloo dark:text-manatee">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto h-[380px] w-full min-w-0 max-w-xl sm:h-[460px] lg:max-w-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-primary/20 dark:bg-primary/30"
              variants={floatingVariants}
              animate="animate"
            />
            <motion.div
              className="absolute bottom-8 right-1/4 h-12 w-12 rounded-lg bg-titlebg/20 dark:bg-titlebg/30"
              variants={floatingVariants}
              animate="animate"
              style={{ transitionDelay: "0.5s" }}
            />
            <motion.div
              className="absolute bottom-1/3 left-2 h-6 w-6 rounded-full bg-meta/30"
              variants={floatingVariants}
              animate="animate"
              style={{ transitionDelay: "1s" }}
            />

            <motion.div
              className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-stroke bg-white p-2 shadow-solid-7 dark:border-strokedark dark:bg-blacksection sm:h-60 sm:w-60"
              variants={imageVariants}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 240px"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute right-0 top-1/3 h-40 w-40 overflow-hidden rounded-2xl border border-stroke bg-white p-2 shadow-solid-5 dark:border-strokedark dark:bg-blacksection sm:h-52 sm:w-52"
              variants={imageVariants}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 160px, 208px"
                />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 h-32 w-32 overflow-hidden rounded-2xl border border-stroke bg-white p-2 shadow-solid-5 dark:border-strokedark dark:bg-blacksection sm:h-44 sm:w-44"
              variants={imageVariants}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 176px"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
