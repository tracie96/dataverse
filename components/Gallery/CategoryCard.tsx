"use client";

import { cn } from "@/lib/utils";
import { GalleryCategory } from "@/types/gallery";
import { ArrowRight, ExternalLink, Images, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoLightbox from "./VideoLightbox";

interface CategoryCardProps {
  category: GalleryCategory;
  className?: string;
}

const CategoryCard = ({ category, className }: CategoryCardProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const isExternal = Boolean(category.externalUrl);
  const isVideo = Boolean(category.coverVideo);
  const videoSrc = category.coverVideo ?? category.items[0]?.videoUrl;

  const cardContent = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        {isVideo && videoSrc ? (
          <>
            <video
              src={videoSrc}
              muted
              playsInline
              loop
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                <Play className="h-5 w-5 fill-primary" />
              </span>
            </div>
          </>
        ) : (
          <Image
            src={category.coverImage}
            alt={category.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          {category.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {category.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-waterloo dark:text-manatee">
          {category.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm font-medium text-primary">
          <span className="inline-flex items-center gap-1.5 text-waterloo dark:text-manatee">
            {isExternal ? (
              <>
                <ExternalLink className="h-4 w-4" />
                Visit platform
              </>
            ) : isVideo ? (
              <>
                <Play className="h-4 w-4" />
                Watch video
              </>
            ) : (
              <>
                <Images className="h-4 w-4" />
                {category.items.length} items
              </>
            )}
          </span>
          <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
            {isExternal ? "Open" : isVideo ? "Play" : "View"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </>
  );

  const cardClassName = cn(
    "group relative flex flex-col overflow-hidden rounded-2xl border border-stroke bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-solid-7 dark:border-strokedark dark:bg-blacksection",
    className,
  );

  return (
    <>
      {isExternal ? (
        <a
          href={category.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClassName}
        >
          {cardContent}
        </a>
      ) : isVideo && videoSrc ? (
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className={cn(cardClassName, "text-left")}
        >
          {cardContent}
        </button>
      ) : (
        <Link href={`/gallery/${category.slug}`} className={cardClassName}>
          {cardContent}
        </Link>
      )}

      {videoOpen && videoSrc && (
        <VideoLightbox
          src={videoSrc}
          title={category.title}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </>
  );
};

export default CategoryCard;
