"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const getCardMotion = (
  cardIndex: number,
  activeIndex: number,
  total: number,
  reduceMotion: boolean,
) => {
  if (cardIndex > activeIndex) {
    return {
      y: 72,
      scale: 0.94,
      rotate: 0,
      opacity: 0,
      zIndex: 0,
    };
  }

  const position = activeIndex - cardIndex;

  return {
    y: position * 18,
    scale: 1 - position * 0.035,
    rotate:
      reduceMotion || position === 0
        ? 0
        : position === 1
          ? 1.5
          : -1.5,
    opacity: position === 0 ? 1 : position === 1 ? 0.95 : 0.88,
    zIndex: total - position,
  };
};

type CardStackProps = {
  cards: StackCard[];
  /** Viewport heights to scroll through the full stack. Default: 80vh per card */
  scrollPerCard?: number;
};

const CardStack = ({ cards, scrollPerCard = 80 }: CardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(
      cards.length - 1,
      Math.max(0, Math.floor(progress * cards.length)),
    );
    setActiveIndex(next);
  });

  const scrollHeight = `${cards.length * scrollPerCard}vh`;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden"
      style={{ height: scrollHeight }}
      aria-label="Scroll to explore cards"
    >
      <div className="sticky top-0 z-10 flex h-[100dvh] min-h-0 flex-col items-center justify-center overflow-x-hidden px-4 md:min-h-[560px] md:px-8">
        <div className="relative mx-auto w-full min-w-0 max-w-4xl lg:max-w-5xl">
          <div className="relative min-h-[360px] w-full overflow-hidden sm:min-h-[380px]">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const theme = themeStyles[card.theme];
              const cardMotion = getCardMotion(
                index,
                activeIndex,
                cards.length,
                isMobile,
              );
              const isTop = index === activeIndex;

              return (
                <motion.div
                  key={card.id}
                  aria-hidden={!isTop}
                  className={cn(
                    "absolute inset-x-0 top-4 w-full rounded-2xl border p-8 text-left shadow-solid-5 sm:p-10 lg:p-12",
                    theme.card,
                    isTop && "shadow-solid-7",
                  )}
                  animate={cardMotion}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
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
                      "mt-6 h-0.5 rounded-full transition-all duration-300",
                      isTop ? "w-12 opacity-40" : "w-8 opacity-20",
                      theme.dot,
                    )}
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {cards.map((card, index) => (
              <div
                key={card.id}
                aria-label={`${card.title}${index === activeIndex ? " (current)" : ""}`}
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
              <span
                key={card.id}
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
              </span>
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
