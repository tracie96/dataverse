import EventsPage from "@/components/Events";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events - DataVerse Africa",
  description:
    "Explore DataVerse events, the Llama Accelerator program, and current internship cohort openings.",
};

export default function BlogPage() {
  return <EventsPage />;
}
