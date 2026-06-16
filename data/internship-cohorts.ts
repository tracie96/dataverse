export type CohortStatus = "open" | "closed" | "completed";

export interface InternshipCohort {
  id: string;
  number: number;
  title: string;
  status: CohortStatus;
  statusLabel: string;
  description: string;
  coverImage: string;
  href: string;
  applyHref?: string;
  year: number;
  durationWeeks: number;
  highlights: string[];
}

export const INTERNSHIP_COHORTS: InternshipCohort[] = [
  {
    id: "cohort-5",
    number: 5,
    title: "Cohort 5.0",
    status: "open",
    statusLabel: "Applications Open",
    description:
      "Four specialized tracks — Data Analytics, AI Automation, Data Science, and Microsoft Fabric — with mentorship and capstone projects.",
    coverImage: "/images/hero/hero-bg.jpg",
    href: "/internship-cohort5",
    applyHref: "/internship-cohort5/apply",
    year: 2026,
    durationWeeks: 12,
    highlights: ["4 specialized tracks", "Real-world projects", "$45 USD program fee"],
  },
  {
    id: "cohort-4",
    number: 4,
    title: "Cohort 4.0",
    status: "completed",
    statusLabel: "Completed",
    description:
      "Beginner and intermediate tracks in Data Analytics and Data Science with team-based capstone projects.",
    coverImage: "/images/cohort-history/11.4.png",
    href: "/internship-cohort4",
    year: 2025,
    durationWeeks: 12,
    highlights: ["Beginner & intermediate tracks", "Virtual program", "Capstone presentations"],
  },
  {
    id: "cohort-3",
    number: 3,
    title: "Cohort 3.0",
    status: "completed",
    statusLabel: "Completed",
    description:
      "A 12-week immersive program with tracks in Data Analytics and Data Science for African talent.",
    coverImage: "/images/cohort-history/6.3.1.jpg",
    href: "/internship-cohort3",
    year: 2025,
    durationWeeks: 12,
    highlights: ["Data Analytics & Data Science", "Expert mentorship", "Career support"],
  },
  {
    id: "cohort-2",
    number: 2,
    title: "Cohort 2.0",
    status: "completed",
    statusLabel: "Completed",
    description:
      "An early cohort that laid the foundation for DataVerse Africa's structured internship program.",
    coverImage: "/images/cohort-history/1.2.png",
    href: "/gallery/internship-cohorts?group=Cohort%202",
    year: 2024,
    durationWeeks: 12,
    highlights: ["Program highlights", "Community moments", "Graduation & beyond"],
  },
];

export function getInternshipCohort(id: string): InternshipCohort | undefined {
  return INTERNSHIP_COHORTS.find((cohort) => cohort.id === id);
}

export function getOpenCohort(): InternshipCohort | undefined {
  return INTERNSHIP_COHORTS.find((cohort) => cohort.status === "open");
}
