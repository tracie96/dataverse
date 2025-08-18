import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - DataVerse Africa",
  description: "Learn more about DataVerse Africa",
};

export default function page() {
  return (
    <main>
      <h1>About Page</h1>
      <p>This is a test page to isolate the build issue.</p>
    </main>
  );
}