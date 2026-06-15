import ResearchPage from "@/components/Research";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research - DataVerse Africa",
  description:
    "DataVerse Africa Research Institute (DARI) — applied research, data analytics, and capacity building across Africa.",
};

export default function page() {
  return <ResearchPage />;
}
