"use client";

import { bentoMissionObjectives, Target } from "./aboutData";
import BentoGridSection from "./BentoGridSection";

const MissionSection = () => {
  return (
    <BentoGridSection
      badgeIcon={Target}
      badgeLabel="Mission"
      title={
        <>
          What We{" "}
          <span className="text-primary">Stand For</span>
        </>
      }
      description="Building tools, communities, and leadership that shape Africa's data-driven future."
      objectives={bentoMissionObjectives}
      className="bg-zumthor/40 dark:bg-blacksection/50"
    />
  );
};

export default MissionSection;
