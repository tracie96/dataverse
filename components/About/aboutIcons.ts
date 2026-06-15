import type { Icon } from "@phosphor-icons/react";

export type AboutIcon = Icon;

export const aboutIconProps = {
  badge: { size: 16, weight: "bold" as const },
  card: { size: 20, weight: "duotone" as const },
  feature: { size: 20, weight: "duotone" as const },
  step: { size: 20, weight: "fill" as const },
};
