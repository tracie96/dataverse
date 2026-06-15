"use client";

import { cn } from "@/lib/utils";
import { Feature } from "@/types/feature";
import { motion } from "framer-motion";
import Image from "next/image";

const accentStyles = [
  "from-primary/15 to-primary/5 border-primary/20",
  "from-titlebg/15 to-titlebg/5 border-titlebg/20",
  "from-meta/15 to-meta/5 border-meta/20",
];

const iconBgStyles = [
  "bg-primary shadow-solid-11 ring-1 ring-primary/30",
  "bg-titlebg shadow-solid-11 ring-1 ring-titlebg/30",
  "bg-meta shadow-solid-11 ring-1 ring-meta/30",
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const SingleFeature = ({
  feature,
  index = 0,
}: {
  feature: Feature;
  index?: number;
}) => {
  const { icon, title, description } = feature;
  const accent = accentStyles[index % accentStyles.length];
  const iconBg = iconBgStyles[index % iconBgStyles.length];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8 transition-shadow duration-300 hover:shadow-solid-7 dark:border-strokedark dark:bg-blacksection",
        accent,
      )}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl transition-opacity group-hover:opacity-80 dark:bg-white/5" />

      <div
        className={cn(
          "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl dark:bg-opacity-90",
          iconBg,
        )}
      >
        <Image
          src={icon}
          width={32}
          height={32}
          alt=""
          aria-hidden
          className="h-8 w-8 shrink-0"
        />
      </div>

      <h3 className="relative mt-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h3>

      <p className="relative mt-3 text-sm leading-relaxed text-waterloo dark:text-manatee sm:text-base">
        {description}
      </p>

      <div className="relative mt-6 h-0.5 w-10 rounded-full bg-current opacity-20 transition-all duration-300 group-hover:w-16 group-hover:opacity-40" />
    </motion.div>
  );
};

export default SingleFeature;
