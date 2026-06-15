"use client";

import { message } from "antd";
import { Globe, GraduationCap, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeroSection from "./HeroSection";

const Hero = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      message.warning({
        content: "Please enter your email address",
        style: { zIndex: 999999 },
      });
      return;
    }

    message.success({
      content: "Email subscribed successfully",
      style: { zIndex: 999999 },
    });
    setEmail("");
  };

  return (
    <HeroSection
      title={
        <>
          Empowering Africa&apos;s{" "}
          <span className="relative inline-block">
            Digital Future
            <span className="absolute -bottom-1 left-0 -z-1 h-3 w-full bg-titlebg/40 dark:bg-titlebgdark/40" />
          </span>
          .
        </>
      }
      subtitle="Join a growing community of data scientists, analysts, and innovators building Africa's data-driven future through mentorship, programs, and real-world impact."
      actions={[
        {
          text: "Join The Community",
          onClick: () => window.open("https://x.com/DataverseAfrica", "_blank"),
          variant: "default",
        },
        {
          text: "Explore Programs",
          onClick: () => router.push("/internship"),
          variant: "outline",
        },
      ]}
      stats={[
        {
          value: "5+",
          label: "Cohorts Launched",
          icon: <GraduationCap className="h-5 w-5 text-primary" />,
        },
        {
          value: "1K+",
          label: "Community Members",
          icon: <Users className="h-5 w-5 text-primary" />,
        },
        {
          value: "15+",
          label: "Countries Reached",
          icon: <Globe className="h-5 w-5 text-primary" />,
        },
      ]}
      images={[
        {
          src: "/images/hero/agriculture.jpg",
          alt: "Dataverse community learning",
        },
        {
          src: "/images/hero/sme.jpg",
          alt: "Collaborative data training",
        },
        {
          src: "/images/hero/databank.png",
          alt: "Data-driven innovation in Africa",
        },
      ]}
    >
      <div className="flex min-w-0 flex-col gap-3 rounded-2xl border border-stroke bg-alabaster p-2 dark:border-strokedark dark:bg-blacksection sm:flex-row sm:items-center">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          type="email"
          placeholder="Enter your email to stay updated"
          className="w-full rounded-full border border-transparent bg-white px-5 py-2.5 text-black outline-none transition focus:border-primary dark:bg-black dark:text-white dark:focus:border-primary"
        />
        <button
          type="button"
          onClick={handleSubscribe}
          aria-label="Subscribe to newsletter"
          className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho"
        >
          Subscribe
        </button>
      </div>
    </HeroSection>
  );
};

export default Hero;
