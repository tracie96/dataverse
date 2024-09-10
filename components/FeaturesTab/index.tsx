"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FeaturesTab = () => {
  return (
    <>
      {/* <!-- ===== About Us Section Start ===== --> */}
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* Background Dotted Shapes */}
          <div className="absolute -top-16 -z-1 mx-auto h-[350px] w-[90%]">
            <Image
              fill
              className="dark:hidden"
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted Shape"
            />
            <Image
              fill
              className="hidden dark:block"
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted Shape"
            />
          </div>

          {/* About Us Content */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We are a passionate team dedicated to bringing you the best
              solutions in our field. Our mission is to innovate and inspire,
              providing top-notch services and products to our clients.
            </p>
          </div>

          {/* Mission, Aims, and Objectives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Mission Statement */}
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Mission Statement</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our mission is to revolutionize the industry by delivering
                innovative solutions that empower our clients and enhance their
                experiences.
              </p>
            </div>

            {/* Aims */}
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Aims</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We aim to exceed expectations through exceptional service,
                foster a culture of continuous improvement, and build lasting
                partnerships.
              </p>
            </div>

            {/* Objectives */}
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Objectives</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our objectives include expanding our market presence, advancing
                our technology, and promoting sustainable practices.
              </p>
            </div>
          </div>
      
        </div>
      </section>
      {/* <!-- ===== About Us Section End ===== --> */}
    </>
  );
};

export default FeaturesTab;

