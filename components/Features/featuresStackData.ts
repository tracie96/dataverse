import type { StackCard } from "@/components/CardStack";
import { BarChart3, Handshake, Layers } from "lucide-react";
import featuresData from "./featuresData";

const icons = [BarChart3, Layers, Handshake];
const themes: StackCard["theme"][] = ["primary", "titlebg", "meta"];

export const featuresStackCards: StackCard[] = featuresData.map(
  (feature, index) => ({
    id: String(feature.id),
    title: feature.title.trim(),
    description: feature.description,
    icon: icons[index],
    theme: themes[index],
  }),
);
