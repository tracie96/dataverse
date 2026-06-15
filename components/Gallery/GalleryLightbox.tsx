"use client";

import { GalleryItem } from "@/types/gallery";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryLightbox = ({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) => {
  const item = items[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(activeIndex - 1);
  }, [activeIndex, hasPrev, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(activeIndex + 1);
  }, [activeIndex, hasNext, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-16"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        className="relative flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[70vh] w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {(item.caption || items.length > 1) && (
          <div className="mt-4 w-full text-center">
            {item.caption && (
              <p className="text-base font-medium text-white">{item.caption}</p>
            )}
            {items.length > 1 && (
              <p className="mt-1 text-sm text-white/60">
                {activeIndex + 1} of {items.length}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
