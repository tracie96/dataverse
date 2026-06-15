"use client";

import { bentoAimsObjectives, Globe } from "./aboutData";
import BentoGridSection from "./BentoGridSection";

const AimsObjectives = () => {
  return (
    <BentoGridSection
      badgeIcon={Globe}
      badgeLabel="Our Purpose"
      title={
        <>
          Aims & Objectives of{" "}
          <span className="text-primary">DataVerse Africa</span>
        </>
      }
      description="Driving innovation, capacity building, and economic empowerment across the continent."
      objectives={bentoAimsObjectives}
      className="pb-16 lg:pb-24"
    />
  );
};

export default AimsObjectives;
