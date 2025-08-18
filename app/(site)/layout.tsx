import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToasterContext from "../context/ToastContext";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeWrapper from "@/components/ThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

// Force dynamic rendering to prevent SSR issues with client-side components
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Dataverse",
  description: "DataVerse Africa - Empowering Data-Driven Innovation Across Africa",
  keywords: "DataVerse, Africa, Data Science, Analytics, Innovation, Technology",
  authors: [{ name: "DataVerse Africa" }],
  creator: "DataVerse Africa",
  publisher: "DataVerse Africa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dataverseafrica.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DataVerse Africa",
    description: "Empowering Data-Driven Innovation Across Africa",
    url: "https://dataverseafrica.org",
    siteName: "DataVerse Africa",
    images: [
      {
        url: "/images/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "DataVerse Africa",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DataVerse Africa",
    description: "Empowering Data-Driven Innovation Across Africa",
    images: ["/images/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeWrapper>
          <Lines />
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeWrapper>
      </body>
    </html>
  );
}
