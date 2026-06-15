import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import {
  getGalleryCategory,
  getGalleryGroups,
  getGallerySlugs,
} from "@/data/gallery";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getGallerySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getGalleryCategory(params.slug);

  if (!category) {
    return { title: "Gallery | Dataverse" };
  }

  return {
    title: `${category.title} | Dataverse Gallery`,
    description: category.description,
  };
}

export default function GalleryCategoryPage({ params }: PageProps) {
  const category = getGalleryCategory(params.slug);

  if (!category) {
    notFound();
  }

  const groups = getGalleryGroups(category);
  const showFilters = category.slug === "internship-cohorts" && groups.length > 0;
  const heroVideo = category.coverVideo ?? category.items.find((i) => i.videoUrl)?.videoUrl;

  return (
    <main className="min-h-screen pt-below-header pb-20 lg:pb-28">
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <Link
          href="/gallery"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-stroke dark:border-strokedark">
          <div className="relative h-48 sm:h-64">
            {heroVideo ? (
              <video
                src={heroVideo}
                muted
                playsInline
                loop
                autoPlay
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={category.coverImage}
                alt={category.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {category.tag}
              </span>
              <h1 className="text-2xl font-bold text-white sm:text-4xl">
                {category.title}
              </h1>
            </div>
          </div>

          <div className="bg-white p-6 dark:bg-blacksection sm:p-8">
            <p className="max-w-3xl text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
              {category.description}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <GalleryGrid
            items={category.items}
            groups={groups}
            showFilters={showFilters}
          />
        </div>
      </div>
    </main>
  );
}
