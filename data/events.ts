export type EventGalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export const llamaEventImages: EventGalleryImage[] = [
  { id: "llama-1", src: "/images/llhama_event/1.jpg", alt: "Llama Accelerator event", caption: "Accelerator kickoff" },
  { id: "llama-2", src: "/images/llhama_event/2.jpg", alt: "Llama program session", caption: "Program session" },
  { id: "llama-3", src: "/images/llhama_event/3.jpg", alt: "Llama workshop", caption: "Workshop in progress" },
  { id: "llama-4", src: "/images/llhama_event/4.jpg", alt: "Llama community gathering", caption: "Community gathering" },
  { id: "llama-5", src: "/images/llhama_event/5.jpg", alt: "Llama mentorship", caption: "Mentorship moment" },
  { id: "llama-6", src: "/images/llhama_event/6.jpg", alt: "Llama innovation talk", caption: "Innovation talk" },
  { id: "llama-7", src: "/images/llhama_event/7.jpg", alt: "Llama networking", caption: "Networking session" },
  { id: "llama-8", src: "/images/llhama_event/8.jpg", alt: "Llama team photo", caption: "Team highlights" },
  { id: "llama-9", src: "/images/llhama_event/9.jpg", alt: "Llama panel discussion", caption: "Panel discussion" },
  { id: "llama-10", src: "/images/llhama_event/10.jpg", alt: "Llama closing ceremony", caption: "Closing highlights" },
];

export const featuredCohort = {
  title: "Internship Cohort 5.0",
  subtitle: "Applications Closed",
  description:
    "Our 12-week immersive, project-based virtual internship across four specialized tracks — with real-world projects, mentorship, and career readiness support.",
  kickoffDate: "Saturday, 5th September 2026",
  applicationClose: "Friday, 28th August, 2026",
  duration: "12 weeks",
  tracks: 4,
  image: "/images/llhama_event/4.jpg",
  imageAlt: "DataVerse cohort learning session in a tech workshop",
  applicationsOpen: false,
  detailsHref: "/internship-cohort5",
};
