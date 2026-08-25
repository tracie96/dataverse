import AiLiteracyPage from "@/components/AiLiteracy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Literacy, AI, Programming & Robotics Program - DataVerse Africa",
  description:
    "A hands-on Digital Literacy, AI, Programming & Robotics program for secondary schools — preparing the next generation for a digital future. Partner with DataVerse Africa.",
};

export default function page() {
  return <AiLiteracyPage />;
}
