import { GalleryCategory } from "@/types/gallery";

const cohortHistoryImages = [
  { file: "1.2.png", group: "Cohort 2" },
  { file: "2.2.png", group: "Cohort 2" },
  { file: "3.2.png", group: "Cohort 2" },
  { file: "4.2.png", group: "Cohort 2" },
  { file: "5.2.png", group: "Cohort 2" },
  { file: "6.3.1.jpg", group: "Cohort 3" },
  { file: "7.3.jpeg", group: "Cohort 3" },
  { file: "8.3.jpeg", group: "Cohort 3" },
  { file: "9.3.jpeg", group: "Cohort 3" },
  { file: "10.3.jpeg", group: "Cohort 3" },
  { file: "11.4.png", group: "Cohort 4" },
  { file: "12.4.png", group: "Cohort 4" },
  { file: "13.4.png", group: "Cohort 4" },
  { file: "14.4.png", group: "Cohort 4" },
  { file: "15.4.png", group: "Cohort 4" },
];

const testimonialImages = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
];

const webinarImages = [
  "1.jpg",
  "2.jpg.jpeg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
];

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "llama-accelerator",
    title: "Llama Accelerator Program",
    description:
      "Highlights from the Llama Accelerator Program — empowering founders and innovators with data-driven tools and mentorship.",
    coverImage: "/images/llhama_event/1.jpg",
    type: "story",
    tag: "Program",
    items: [
      {
        id: "llama-1",
        src: "/images/llhama_event/1.jpg",
        alt: "Llama Accelerator kickoff session",
        caption: "Program kickoff and orientation",
      },
      {
        id: "llama-2",
        src: "/images/llhama_event/4.jpg",
        alt: "Accelerator workshop",
        caption: "Hands-on accelerator workshop",
      },
      {
        id: "llama-3",
        src: "/images/llhama_event/8.jpg",
        alt: "Data innovation showcase",
        caption: "Innovation showcase day",
      },
      {
        id: "llama-4",
        src: "/images/llhama_event/10.jpg",
        alt: "Llama closing highlights",
        caption: "Closing highlights",
      },
    ],
  },
  {
    slug: "interviewprepai",
    title: "InterviewPrepAI",
    description:
      "InterviewPrepAI helps candidates prepare for technical interviews with AI-powered practice sessions and feedback.",
    coverImage: "/images/interview-prep/1.jpeg",
    externalUrl: "https://www.interviewprepai.org/",
    type: "story",
    tag: "Initiative",
    items: [],
  },
  {
    slug: "internship-cohorts",
    title: "Internship Cohort History",
    description:
      "A visual journey through every DataVerse internship cohort — from orientation to graduation and beyond.",
    coverImage: "/images/cohort-history/1.2.png",
    type: "album",
    tag: "Internship",
    items: cohortHistoryImages.map(({ file, group }, index) => ({
      id: `cohort-${index + 1}`,
      src: `/images/cohort-history/${file}`,
      alt: `Internship cohort highlight ${index + 1}`,
      caption: `${group} — program highlight`,
      group,
    })),
  },
  {
    slug: "enzy-partnership",
    title: "Enzy Royal College Partnership",
    description:
      "Partnering with Enzy Royal College to bring data literacy and technology education to the next generation.",
    coverImage: "/images/cohort-history/6.3.1.jpg",
    coverVideo: "/images/enzy/1.mp4",
    type: "video",
    tag: "Partnership",
    items: [
      {
        id: "enzy-1",
        src: "/images/cohort-history/6.3.1.jpg",
        alt: "Enzy Royal College partnership video",
        caption: "Enzy Royal College partnership highlights",
        type: "video",
        videoUrl: "/images/enzy/1.mp4",
      },
    ],
  },
  {
    slug: "testimonials",
    title: "Internship Testimonials",
    description:
      "Hear from DataVerse alumni and community members about their experience and growth through our programs.",
    coverImage: "/images/testimonials/1.jpg",
    type: "album",
    tag: "Testimonials",
    items: testimonialImages.map((file, index) => ({
      id: `test-${index + 1}`,
      src: `/images/testimonials/${file}`,
      alt: `Internship testimonial ${index + 1}`,
      caption: `Community testimonial ${index + 1}`,
    })),
  },
  {
    slug: "webinars",
    title: "Webinars",
    description:
      "Highlights from DataVerse webinars covering data science, career growth, and industry insights.",
    coverImage: "/images/webinars/1.jpg",
    type: "album",
    tag: "Events",
    items: webinarImages.map((file, index) => ({
      id: `web-${index + 1}`,
      src: `/images/webinars/${file}`,
      alt: `Webinar highlight ${index + 1}`,
      caption: `Webinar session ${index + 1}`,
    })),
  },
];

export function getGalleryCategory(slug: string): GalleryCategory | undefined {
  return galleryCategories.find((category) => category.slug === slug);
}

export function getGallerySlugs(): string[] {
  return galleryCategories
    .filter((category) => !category.externalUrl)
    .map((category) => category.slug);
}

export function getGalleryGroups(category: GalleryCategory): string[] {
  const groups = category.items
    .map((item) => item.group)
    .filter((group): group is string => Boolean(group));
  return Array.from(new Set(groups));
}
