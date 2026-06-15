import { Metadata } from "next";
import { galleryCategories } from "@/data/gallery";
import CategoryCard from "@/components/Gallery/CategoryCard";
import { Images } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | Dataverse",
  description:
    "Explore DataVerse programs, partnerships, internship cohorts, testimonials, and webinars.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-below-header pb-20 lg:pb-28">
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-56 w-56 rounded-full bg-titlebg/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Images className="h-4 w-4" />
            Gallery
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
            Our Impact in Pictures
          </h1>

          <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
            Browse highlights from our accelerator programs, internship cohorts,
            partnerships, webinars, and community testimonials.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {galleryCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}
