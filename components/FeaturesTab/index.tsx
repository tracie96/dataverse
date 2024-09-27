"use client";
import React from "react";
import featuresData from "./featuresTabData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "../Common/SectionHeader";
import { motion } from "framer-motion";
import SectionContent from "../Common/SectionContent";
import featuresMissionTabData from "./featuresTabData";

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

          {/* <!-- Quote Grid Start --> */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 py-6 lg:gap-12">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -10,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
            >
              <h3 className="mb-7 text-sm font-bold text-black dark:text-white sm:text-xl">
                Our Vision
              </h3>

              <p className="md:wlg:w-3/5 ">
                {" "}
                We envision an Africa where data-driven innovation is the norm.
                Our commitment is to ensure that everyone, regardless of their
                background, harnesses the benefits of cutting-edge technology.
                Where technology is just for the tech gurus we've always known
                but where even someone with a background that isn't even science
                can glide through technology and becoming gurus themselves.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5"
            >
              <h3 className="mb-7 text-sm font-bold text-black dark:text-white sm:text-xl">
                Why Choose Dataverse
              </h3>
              <p className="md:wlg:w-3/5 ">
                We don’t just handle data; we make it work for you! Our tools
                and training are crafted to revolutionize how businesses operate
                and communities thrive. Whether you’re a startup, a large
                enterprise, or an individual eager to enhance your skills,
                DataVerse is your trusted partner in navigating the data
                landscape.
              </p>
            </motion.div>
          </div>
          {/* <!-- Quote Grid End --> */}
          <div className="mt-10 mb-7">

      
          <SectionContent
            headerInfo={{
              title: "",
              subtitle: "AIMS AND OBJECTIVES OF DATAVERSE AFRICA",
              description: `
              `,
            }}
          />
              </div>
          {/* <!-- Features Grid Start --> */}
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-12.5">
            {/* <!-- Features item Start --> */}
            {featuresData.map((feature, key) => (
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
