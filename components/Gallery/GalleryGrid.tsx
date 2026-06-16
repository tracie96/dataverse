"use client";

import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types/gallery";
import { Play } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import GalleryLightbox from "./GalleryLightbox";
import VideoLightbox from "./VideoLightbox";

interface GalleryGridProps {
  items: GalleryItem[];
  groups?: string[];
  showFilters?: boolean;
  initialGroup?: string;
}

const GalleryGrid = ({
  items,
  groups = [],
  showFilters = false,
  initialGroup,
}: GalleryGridProps) => {
  const [activeGroup, setActiveGroup] = useState<string>(initialGroup || "All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (!showFilters || activeGroup === "All") return items;
    return items.filter((item) => item.group === activeGroup);
  }, [items, activeGroup, showFilters]);

  const imageItems = filteredItems.filter((item) => item.type !== "video");

  return (
    <>
      {showFilters && groups.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", ...groups].map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeGroup === group
                  ? "bg-primary text-white"
                  : "border border-stroke bg-white text-waterloo hover:border-primary/30 dark:border-strokedark dark:bg-blacksection dark:text-manatee",
              )}
            >
              {group}
            </button>
          ))}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <p className="py-12 text-center text-waterloo dark:text-manatee">
          No items in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredItems.map((item) => {
            const imageIndex = imageItems.findIndex((i) => i.id === item.id);
            const isVideo = item.type === "video" && Boolean(item.videoUrl);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isVideo && item.videoUrl) {
                    setActiveVideo(item);
                  } else if (imageIndex >= 0) {
                    setLightboxIndex(imageIndex);
                  }
                }}
                className="group relative overflow-hidden rounded-2xl border border-stroke bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-solid-5 dark:border-strokedark dark:bg-blacksection"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                        <Play className="h-5 w-5 fill-primary" />
                      </span>
                    </div>
                  )}

                  {item.group && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                      {item.group}
                    </span>
                  )}
                </div>

                {item.caption && (
                  <div className="p-4">
                    <p className="text-sm font-medium text-black dark:text-white">
                      {item.caption}
                    </p>
                    {isVideo && (
                      <p className="mt-1 text-xs text-waterloo dark:text-manatee">
                        Click to play
                      </p>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={imageItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {activeVideo?.videoUrl && (
        <VideoLightbox
          src={activeVideo.videoUrl}
          title={activeVideo.caption ?? activeVideo.alt}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
};

export default GalleryGrid;
