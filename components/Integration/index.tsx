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
              title: `Meet The Team`,
              subtitle: ``,
              description: ``,
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
                src={"/images/brand/ifiora-francis.png"}
                width={250}
                height={250}
                className="rounded-full mx-auto mb-4 mt-7"
                alt="Team Member 1"
              />
              <h3 className="text-xl font-semibold">Francis Ifiora</h3>
              <p className="text-gray-600 dark:text-gray-400">
                CEO & Co-Founder
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Francis is the visionary behind our company, leading the team with a passion for innovation and growth. With extensive experience in business development, he oversees the strategic direction and business development of the company.</p>
            </div>

            <div className="team-member text-center">
              <Image
                src={"/images/brand/godsent-ndoma.jpeg"}
                width={250}
                height={250}
                className="rounded-full mx-auto mb-4 mt-7"
                alt="Team Member 2"
              />
              <h3 className="text-xl font-semibold">Godsent Ndoma</h3>
              <p className="text-gray-600 dark:text-gray-400">
                CGO & Co-Founder
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Godsent drives our company's growth initiatives, focusing on strategic partnerships and market expansion. As Chief Growth Officer, his expertise in specific areas, like marketing, scaling startups, helps propel our business forward.</p>

            </div>

            <div className="team-member text-center">
              <Image
                src={"/images/brand/precious.png"}
                width={250}
                height={250}
                className="rounded-full mx-auto mb-4 mt-7"
                alt="Team Member 3"
              />
              <h3 className="text-xl font-semibold">Precious Williams</h3>
              <p className="text-gray-600 dark:text-gray-400">CTO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2" >Precious leads the technology and innovation strategy at the company. With a strong background in technology, she ensures that our products are cutting-edge and meet the highest standards of quality and performance.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Integration;