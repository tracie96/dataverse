"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

export type StackCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  theme: "primary" | "titlebg" | "meta";
};

const themeStyles = {
  primary: {
    card: "border-primary/15 bg-[#EDF5FF] dark:border-primary/20 dark:bg-primary/10",
    icon: "bg-primary text-white",
    dot: "bg-primary",
  },
  titlebg: {
    card: "border-titlebg/15 bg-[#FFF8F0] dark:border-titlebg/20 dark:bg-titlebg/10",
    icon: "bg-titlebg text-white",
    dot: "bg-titlebg",
  },
  meta: {
    card: "border-meta/15 bg-[#EDFBF8] dark:border-meta/20 dark:bg-meta/10",
    icon: "bg-meta text-white",
    dot: "bg-meta",
  },
};

const getCardMotion = (cardIndex: number, activeIndex: number) => {
  if (cardIndex === activeIndex) {
    return { y: 0, scale: 1, opacity: 1, zIndex: 10 };
  }

  if (cardIndex < activeIndex) {
    return { y: -48, scale: 0.96, opacity: 0, zIndex: 0 };
  }

  return { y: 48, scale: 0.96, opacity: 0, zIndex: 0 };
};

type CardStackProps = {
  cards: StackCard[];
  /** Viewport heights to scroll through the full stack. Default: 80vh per card */
  scrollPerCard?: number;
};

const CardStack = ({ cards, scrollPerCard = 80 }: CardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next =
      cards.length <= 1
        ? 0
        : Math.min(
            cards.length - 1,
            Math.max(0, Math.round(progress * (cards.length - 1))),
          );
    setActiveIndex(next);
  });

  const scrollHeight = `${cards.length * scrollPerCard}vh`;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: scrollHeight }}
      aria-label="Scroll to explore cards"
    >
      <div className="sticky top-20 z-20 flex h-[calc(100dvh-5rem)] min-h-[420px] flex-col items-center justify-center px-4 md:top-24 md:min-h-[480px] md:px-8">
        <div className="relative mx-auto w-full min-w-0 max-w-4xl lg:max-w-5xl">
          <div className="relative min-h-[320px] w-full sm:min-h-[340px]">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const theme = themeStyles[card.theme];
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={card.id}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={getCardMotion(index, activeIndex)}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className={cn(
                    "absolute inset-x-0 top-0 w-full rounded-2xl border p-8 text-left shadow-solid-5 sm:p-10 lg:p-12",
                    theme.card,
                    isActive ? "shadow-solid-7" : "pointer-events-none",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl",
                      theme.icon,
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-black dark:text-white sm:text-2xl">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-waterloo dark:text-manatee sm:text-base lg:text-lg">
                    {card.description}
                  </p>

                  <div
                    className={cn(
                      "mt-6 h-0.5 w-12 rounded-full opacity-40",
                      theme.dot,
                    )}
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${card.title}`}
                aria-current={index === activeIndex}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? cn("w-8", themeStyles[card.theme].dot)
                    : index < activeIndex
                      ? "w-2 bg-stroke/80 dark:bg-strokedark/80"
                      : "w-2 bg-stroke dark:bg-strokedark",
                )}
              />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2 px-1">
            {cards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex}
                className={cn(
                  "max-w-full truncate rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                  index === activeIndex
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : index < activeIndex
                      ? "text-black/60 dark:text-white/60"
                      : "text-waterloo dark:text-manatee",
                )}
              >
                {card.title}
              </button>
            ))}
          </div>

          <motion.p
            animate={{ opacity: activeIndex < cards.length - 1 ? 1 : 0 }}
            className="mt-8 text-center text-xs font-medium uppercase tracking-widest text-waterloo dark:text-manatee"
          >
            Scroll to reveal
          </motion.p>
        </div>

        <div className="absolute bottom-8 left-1/2 w-full max-w-4xl -translate-x-1/2 px-6 lg:max-w-5xl">
          <div className="h-1 overflow-hidden rounded-full bg-stroke dark:bg-strokedark">
            <motion.div
              className="h-full origin-left rounded-full bg-primary"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStack;
