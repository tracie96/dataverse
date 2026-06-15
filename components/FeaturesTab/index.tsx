"use client";
import React from "react";
import { featuresTabData } from "./featuresTabData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";
import SectionContent from "../Common/SectionContent";
import featuresMissionTabData from "./featuresTabData";
import CardStack from "../CardStack";
import { aboutStackCards } from "./aboutStackData";

const FeaturesTab = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "",
              subtitle: "About Us",
              description: `At DataVerse, we’re on a mission to transform Africa through the power of data. 
              Imagine a future where technology fuels progress, improves lives, and causes growth across the continent.
              Sure you can imagine that and that future isn't far fetched anymore, that future is now!
              `,
            }}
          />
          {/* <!-- Section Title End --> */}

          {/* <!-- Card Stack Start --> */}
          <div className="mt-10 py-6">
            <CardStack cards={aboutStackCards} />
          </div>
          {/* <!-- Card Stack End --> */}
          <div className="mt-10 mb-7">

      
          <SectionContent
            headerInfo={{
              title: "",
              subtitle: "Aims And Objectives Of DataVerse Africa",
              description: `
              `,
            }}
          />
              </div>
          {/* <!-- Features Grid Start --> */}
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5 py-4">
            {/* <!-- Features item Start --> */}
            {featuresTabData.slice(0,6).map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
          <div className="mt-10 mb-7">

          <SectionContent
            headerInfo={{
              title: "",
              subtitle: "Mission",
              description: `
              `,
            }}
          />
          </div>
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5">
            {/* <!-- Features item Start --> */}
            {featuresMissionTabData.map((feature, key) => (
              <SingleFeature feature={feature} key={key} />
            ))}
            {/* <!-- Features item End --> */}
          </div>
          {/* <!-- Features Grid End --> */}
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
    
  );
};

export default FeaturesTab;
