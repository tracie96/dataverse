import type { StackCard } from "@/components/CardStack";
import { BarChart3, Handshake, Layers } from "lucide-react";

export const aboutStackCards: StackCard[] = [
  {
    id: "vision",
    title: "Our Vision",
    description:
      "We envision an Africa where data-driven innovation is the norm. Our commitment is to ensure that everyone, regardless of their background, harnesses the benefits of cutting-edge technology — where even someone without a science background can glide through technology and become gurus themselves.",
    icon: BarChart3,
    theme: "primary",
  },
  {
    id: "mission",
    title: "Mission Statement",
    description:
      "Our mission is to drive business growth, improve decision-making, and stimulate economic development in Africa.",
    icon: Layers,
    theme: "titlebg",
  },
  {
    id: "why",
    title: "Why Choose DataVerse",
    description:
      "We don't just handle data; we make it work for you. Our tools and training are crafted to revolutionize how businesses operate and communities thrive. Whether you're a startup, enterprise, or individual eager to enhance your skills, DataVerse is your trusted partner.",
    icon: Handshake,
    theme: "meta",
  },
];
