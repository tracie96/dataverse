import React from "react";
import { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About - DataVerse Africa",
  description: "Learn more about DataVerse Africa",
};

export default function page() {
  return <About />;
}