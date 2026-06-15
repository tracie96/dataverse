import {
  BookOpen,
  ChartBar,
  ChatCircle,
  Compass,
  Cpu,
  Eye,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Question,
  ShareNetwork,
  Sparkle,
  Target,
  TrendUp,
  Users,
  UsersThree,
} from "@phosphor-icons/react";
import type { AboutIcon } from "./aboutIcons";

export type BentoObjective = {
  id: number;
  icon: AboutIcon;
  title: string;
  description: string;
  metric?: { value: string; label: string };
  accent: string;
  className: string;
};

export type AboutStep = {
  step: string;
  title: string;
  icon: AboutIcon;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export const aboutStats = [
  { value: "5+", label: "Internship Cohorts" },
  { value: "1K+", label: "Community Members" },
  { value: "15+", label: "Countries Reached" },
];

export const bentoAimsObjectives: BentoObjective[] = [
  {
    id: 1,
    icon: ChartBar,
    title: "Data-Driven Innovation",
    description:
      "Develop and deploy cutting-edge data analytics technologies to drive business growth and improvement across industries in Africa.",
    metric: { value: "40+", label: "Industries served" },
    accent:
      "from-sky-500/15 to-sky-500/0 text-sky-600 ring-sky-500/20 dark:text-sky-400",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Capacity Building",
    description:
      "Provide training and conferences to equip tech enthusiasts with skills in data analytics, machine learning, and emerging technologies.",
    metric: { value: "5,000+", label: "Learners trained" },
    accent:
      "from-orange-500/15 to-orange-500/0 text-orange-600 ring-orange-500/20 dark:text-orange-400",
    className: "md:col-span-5 md:row-span-3",
  },
  {
    id: 3,
    icon: Cpu,
    title: "Technological Advancement",
    description:
      "Foster a culture of innovation and R&D, creating new technologies and intellectual property that solve African problems.",
    accent:
      "from-emerald-500/15 to-emerald-500/0 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    id: 4,
    icon: Lightbulb,
    title: "Thought Leadership",
    description:
      "Establish DataVerse as a thought leader in data analytics and technological innovation, influencing policy and decision-making in Africa.",
    accent:
      "from-violet-500/15 to-violet-500/0 text-violet-600 ring-violet-500/20 dark:text-violet-400",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    id: 5,
    icon: TrendUp,
    title: "Economic Empowerment",
    description:
      "Create jobs, stimulate economic growth, and contribute to Africa's digital economy through data-driven innovations.",
    metric: { value: "1,200+", label: "Jobs catalyzed" },
    accent:
      "from-amber-500/15 to-amber-500/0 text-amber-600 ring-amber-500/20 dark:text-amber-400",
    className: "md:col-span-6 md:col-start-4 md:row-span-2",
  },
];

export const bentoMissionObjectives: BentoObjective[] = [
  {
    id: 1,
    icon: Sparkle,
    title: "Innovative Tools",
    description:
      "We develop advanced data solutions that empower businesses to grow and make informed decisions.",
    metric: { value: "20+", label: "Solutions built" },
    accent:
      "from-violet-500/15 to-violet-500/0 text-violet-600 ring-violet-500/20 dark:text-violet-400",
    className: "md:col-span-7 md:row-span-2",
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Empowering Leaders",
    description:
      "Our tech innovation conferences equip individuals with essential skills in data analytics, machine learning, and emerging technologies.",
    metric: { value: "50+", label: "Events hosted" },
    accent:
      "from-sky-500/15 to-sky-500/0 text-sky-600 ring-sky-500/20 dark:text-sky-400",
    className: "md:col-span-5 md:row-span-3",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Fostering Creativity",
    description:
      "We nurture a culture of innovation, creating technologies that address real challenges faced by Africans.",
    accent:
      "from-amber-500/15 to-amber-500/0 text-amber-600 ring-amber-500/20 dark:text-amber-400",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    id: 4,
    icon: UsersThree,
    title: "Community Engagement",
    description:
      "Build a vibrant community of data scientists, analysts, and enthusiasts, promoting collaboration, knowledge sharing, and networking.",
    accent:
      "from-emerald-500/15 to-emerald-500/0 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    id: 5,
    icon: Handshake,
    title: "Building Community",
    description:
      "Join a vibrant network of data enthusiasts, professionals, and innovators where sharing, learning, and growth are at the forefront.",
    accent:
      "from-orange-500/15 to-orange-500/0 text-orange-600 ring-orange-500/20 dark:text-orange-400",
    className: "md:col-span-6 md:row-span-2",
  },
  {
    id: 6,
    icon: TrendUp,
    title: "Leading the Charge",
    description:
      "As the voice of data and technology in Africa, we guide the decisions that shape our collective future.",
    metric: { value: "10+", label: "Policy initiatives" },
    accent:
      "from-rose-500/15 to-rose-500/0 text-rose-600 ring-rose-500/20 dark:text-rose-400",
    className: "md:col-span-6 md:row-span-2",
  },
];

export const connectSteps: AboutStep[] = [
  {
    step: "01",
    title: "Discover like-minded peers who share your passion for learning.",
    icon: Users,
  },
  {
    step: "02",
    title: "Engage in discussions, exchange ideas, and support one another.",
    icon: ChatCircle,
  },
  {
    step: "03",
    title: "Build a community where everyone can grow together.",
    icon: Handshake,
  },
];

export const learnSteps: AboutStep[] = [
  {
    step: "01",
    title: "Dive into a variety of exciting topics across data and technology.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Participate in interactive activities that make learning engaging.",
    icon: Sparkle,
  },
  {
    step: "03",
    title: "Ask questions anytime — our community is here to help you grow.",
    icon: Question,
  },
  {
    step: "04",
    title: "Share your knowledge with others and inspire the next generation.",
    icon: ShareNetwork,
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Francis Ifiora",
    role: "CEO & Co-Founder",
    image: "/images/brand/ifiora-francis.png",
    bio: "Francis is the visionary behind DataVerse, leading the team with a passion for innovation and growth. He oversees strategic direction and business development across the organization.",
  },
  {
    name: "Godsent Ndoma",
    role: "CGO & Co-Founder",
    image: "/images/brand/godsent-ndoma.jpeg",
    bio: "Godsent drives growth initiatives, focusing on strategic partnerships and market expansion. His expertise in marketing and scaling startups helps propel DataVerse forward.",
  },
  {
    name: "Precious Williams",
    role: "CTO",
    image: "/images/brand/precious.png",
    bio: "Precious leads technology and innovation strategy at DataVerse. With a strong technical background, she ensures our products meet the highest standards of quality and performance.",
  },
];

// Re-export section badge icons for convenience
export { BookOpen, Compass, Eye, Globe, Target, Users };
