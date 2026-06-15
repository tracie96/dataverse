import InternshipCohort5Page from "@/components/InternshipCohort5";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internship Cohort 5.0 - DataVerse Africa",
  description:
    "Join DataVerse Africa's 12-week virtual internship program — four specialized tracks, real-world projects, mentorship, and career readiness support.",
};

export default function page() {
  return <InternshipCohort5Page />;
}
