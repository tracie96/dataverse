"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TeamMember } from "./aboutData";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-stroke bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-solid-7 dark:border-strokedark dark:bg-blacksection"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {member.role}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {member.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-waterloo dark:text-manatee">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};

export default TeamCard;
