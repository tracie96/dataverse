"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";

const Integration = () => {
  return (
    <>
      <section>
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: `Meet the team`,
              subtitle: `Our pictures should be here i guess.`,
              description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.`,
            }}
          />
    {/* Team Section */}
    <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Example Team Members */}
            <div className="team-member text-center">
              <Image
                src="/images/team/member1.jpg"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
                alt="Team Member 1"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-400">CEO</p>
            </div>

            <div className="team-member text-center">
              <Image
                src="/images/team/member2.jpg"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
                alt="Team Member 2"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600 dark:text-gray-400">CTO</p>
            </div>

            <div className="team-member text-center">
              <Image
                src="/images/team/member3.jpg"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
                alt="Team Member 3"
              />
              <h3 className="text-xl font-semibold">Sam Lee</h3>
              <p className="text-gray-600 dark:text-gray-400">COO</p>
            </div>
          </motion.div>
          {/* <!-- Section Title End --> */}
        </div>

      
      </section>
    </>
  );
};

export default Integration;
