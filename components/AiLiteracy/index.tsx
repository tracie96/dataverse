"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Handshake,
  Lightbulb,
  Mail,
  Phone,
  School,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const VIDEO_SRC = "/images/enzy/1.mp4";

const SectionHeader = ({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mx-auto max-w-2xl text-center"
  >
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
      {badge}
    </span>
    <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-waterloo dark:text-manatee">{description}</p>
    )}
  </motion.div>
);

const offerings: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Cpu,
    title: "Digital Innovation Lab",
    desc: "Lab setup (where necessary), equipped for robotics and programming.",
  },
  {
    icon: GraduationCap,
    title: "Expert-Led Student Training",
    desc: "Delivered directly by DataVerse Africa instructors to global standards.",
  },
  {
    icon: Users,
    title: "Teacher Capacity Building",
    desc: "Workshops that equip staff with 21st-century tech and digital skills.",
  },
  {
    icon: Wrench,
    title: "Continuous Curriculum Support",
    desc: "Technical guidance and maintenance services throughout the partnership.",
  },
  {
    icon: Lightbulb,
    title: "STEM Challenges & Bootcamps",
    desc: "Access to inter-school STEM innovation challenges and AI bootcamps.",
  },
];

const objectives = [
  "Equip students with AI, robotics, and programming skills for the digital future.",
  "Train teachers in foundational digital literacy and modern pedagogy.",
  "Position participating schools as digital leaders within their state's education ecosystem.",
  "Foster innovation, creativity, and problem-solving among students.",
];

const outcomes = [
  "Students gain hands-on experience in AI, coding, and robotics.",
  "Teachers acquire practical knowledge to integrate digital tools into learning.",
  "Schools enhance their reputation and competitive advantage among parents seeking modern education.",
  "Participating schools earn recognition as early adopters of advanced technology education.",
];

const whyItMatters = [
  "Introduce students to AI, robotics, and programming through practical, hands-on learning.",
  "Train teachers to understand and support 21st-century digital education.",
  "Help schools meet the Federal Ministry's digital learning objectives to global standards of excellence.",
];

const CollaboratorCta = ({ className = "" }: { className?: string }) => (
  <Link href="/partner/register" className={className}>
    <Button size="lg" className="group gap-2">
      Become a Collaborator
      <Handshake className="h-4 w-4 transition-transform group-hover:scale-110" />
    </Button>
  </Link>
);

const AiLiteracyPage = () => {
  return (
    <div className="overflow-hidden bg-white dark:bg-black">
      {/* Hero */}
      <section className="relative px-4 pb-16 pt-below-header md:px-8 lg:pb-24">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-titlebg/10 blur-3xl" />

        <div className="relative mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <School className="h-4 w-4" />
              Schools Program · Secondary Education
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl xl:text-sectiontitle3">
              DataVerse Africa{" "}
              <span className="text-primary">
                Digital Literacy, AI, Programming &amp; Robotics
              </span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-waterloo dark:text-manatee sm:text-lg">
              Preparing the next generation of secondary school students for a
              digital future.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CollaboratorCta />
              <a href="#program-video">
                <Button size="lg" variant="outline" className="gap-2">
                  Watch Program Highlight
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video */}
      <section
        id="program-video"
        className="bg-zumthor/40 px-4 py-12 dark:bg-blacksection/50 md:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Partnership Highlight"
            title="See the Program in Action"
            description="Highlights from our partnership with Enzy Royal College — bringing data literacy and technology education to the next generation."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-stroke bg-black shadow-solid-5 dark:border-strokedark"
          >
            <video
              src={VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
          <p className="mt-4 text-center text-sm text-waterloo dark:text-manatee">
            Also featured in our{" "}
            <Link
              href="/gallery/enzy-partnership"
              className="font-medium text-primary hover:underline"
            >
              gallery
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader badge="Overview" title="Technology Is Redefining Education" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-waterloo dark:text-manatee"
          >
            <p>
              Technology is redefining education across the world, and Nigeria is
              no exception. The Federal Ministry of Education&apos;s directive to
              integrate Artificial Intelligence (AI), Programming, and Robotics
              into the curriculum from JS1 to SS3 has made it clear: schools must
              equip their students with the skills the digital economy demands.
            </p>
            <p>
              DataVerse Africa&apos;s Digital Literacy, AI, and Robotics Program
              is a world-class, hands-on learning initiative built to help
              schools meet this directive while positioning themselves as leaders
              in digital transformation. The program introduces students to real
              21st-century skills and supports teachers in delivering modern,
              technology-driven education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="Why It Matters"
            title="Schools as Centres of Influence"
            description="Institutions that embrace digital education today are the ones that will stand out academically and be recognised as pioneers in their communities."
          />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            {whyItMatters.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection"
              >
                <Bot className="mb-4 h-8 w-8 text-primary" />
                <p className="text-sm leading-relaxed text-black/80 dark:text-white/80">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About DataVerse */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="About DataVerse Africa"
            title="Pan-African EdTech & Data Innovation"
            description="Committed to empowering Africa's next generation through technology, innovation, and human-centred learning."
          />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                value: "1,000+",
                label: "Teenagers trained across Lagos, Delta & Awka",
              },
              {
                value: "Hands-on",
                label: "Project-based learning that makes tech fun",
              },
              {
                value: "Partners",
                label: "Federal Ministry of Education & Zion Tech Hub",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-stroke bg-white px-6 py-5 text-center dark:border-strokedark dark:bg-blacksection"
              >
                <div className="text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-waterloo dark:text-manatee">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What the Program Offers */}
      <section className="bg-zumthor/40 px-4 py-16 dark:bg-blacksection/50 md:px-8 lg:py-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <SectionHeader
            badge="What Schools Receive"
            title="What the Program Offers"
            description="Partner schools receive a premium, end-to-end program."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-waterloo dark:text-manatee">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives & Outcomes */}
      <section className="px-4 py-16 md:px-8 lg:py-24">
        <div className="mx-auto grid max-w-c-1390 gap-10 lg:grid-cols-2 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Key Objectives
              </h3>
            </div>
            <ul className="space-y-3">
              {objectives.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-black/80 dark:text-white/80"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Expected Outcomes
              </h3>
            </div>
            <ul className="space-y-3">
              {outcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-black/80 dark:text-white/80"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Partner CTA */}
      <section id="collaborate" className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-c-1390 2xl:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-zumthor via-white to-[#E8F1FF] p-8 text-center dark:border-strokedark dark:from-blacksection dark:via-black dark:to-hoverdark md:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <Handshake className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Partner With Us
              </h2>
              <p className="mt-3 text-sm text-waterloo dark:text-manatee sm:text-base">
                DataVerse Africa works with school leadership to tailor the
                program to each institution&apos;s existing structure and
                timelines. Together, we can prepare students not just for exams,
                but for the future of work and innovation.
              </p>
              <div className="mt-6 flex justify-center">
                <CollaboratorCta />
              </div>

              <div className="mt-8 space-y-2 text-sm text-waterloo dark:text-manatee">
                <p className="font-medium text-black dark:text-white">
                  Get in touch
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  <a
                    href="tel:+2348055094738"
                    className="inline-flex items-center gap-1.5 hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    +234 805 509 4738
                  </a>
                  <a
                    href="tel:+2347063083925"
                    className="inline-flex items-center gap-1.5 hover:text-primary"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    +234 706 308 3925
                  </a>
                </div>
                <a
                  href="mailto:info@dataverseafrica.org"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  info@dataverseafrica.org
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AiLiteracyPage;
