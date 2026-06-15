"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface VideoLightboxProps {
  src: string;
  title?: string;
  onClose: () => void;
}

const VideoLightbox = ({ src, title, onClose }: VideoLightboxProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    videoRef.current?.play().catch(() => {});

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close video"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          className="max-h-[80vh] w-full rounded-2xl bg-black"
        >
          <track kind="captions" />
        </video>
        {title && (
          <p className="mt-4 text-center text-base font-medium text-white">
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoLightbox;
