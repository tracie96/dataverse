"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import SectionContent from "../Common/SectionContent";
import { featuresTabData } from "../FeaturesTab/featuresTabData";
import featuresMissionTabData from "../FeaturesTab/featuresTabData";
import SingleFeature from "../FeaturesTab/SingleFeature";

const About = () => {
  return (
    <>
       <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "",
              subtitle: "About Us",
              description: `At DataVerse, we're on a mission to transform Africa through the power of data. 
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
                Why Choose DataVerse
              </h3>
              <p className="md:wlg:w-3/5 ">
                We don't just handle data; we make it work for you! Our tools
                and training are crafted to revolutionize how businesses operate
                and communities thrive. Whether you're a startup, a large
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
                subtitle: "Aims And Objectives Of DataVerse Africa",
                description: ``,
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
                description: ``,
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
      <section className="overflow-hidden">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image
                src="/images/about/about-light-01.png"
                alt="About"
                className="dark:hidden"
                fill
              />
              <Image
                src="/images/about/about-dark-01.png"
                alt="About"
                className="hidden dark:block"
                fill
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white"></span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Connect
                </span>
              </h2>
              <p>Connect With Others Across DataVerse.</p>
              <p>
                Grow Apply knowledge and connections to build great products and
                advance your skills, career, and network. Help your community
                learn too.
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle3 font-semibold text-black dark:text-white">
                    01
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                    Discover friends who are like minded and share your passion
                    for learning!
                  </h3>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle3 font-semibold text-black dark:text-white">
                    02
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                    Engage in discussions, exchange ideas, and support one
                    another.
                  </h3>
                </div>
              </div>
              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className="text-metatitle3 font-semibold text-black dark:text-white">
                    03
                  </p>
                </div>
                <div className="w-3/4">
                  <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                    Build a community where everyone can grow together!
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Learn
                </span>
              </h2>
              <p>Learn And Discover With DataVerse.</p>
              <div>
                <div className="mt-7.5 flex items-center gap-5">
                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                    <p className="text-metatitle3 font-semibold text-black dark:text-white">
                      01
                    </p>
                  </div>
                  <div className="w-3/4">
                    <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                      Dive into a variety of exciting topics.
                    </h3>
                  </div>
                </div>
                <div className="mt-7.5 flex items-center gap-5">
                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                    <p className="text-metatitle3 font-semibold text-black dark:text-white">
                      02
                    </p>
                  </div>
                  <div className="w-3/4">
                    <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                      Participate in interactive activities that make learning
                      fun.
                    </h3>
                  </div>
                </div>
                <div className="mt-7.5 flex items-center gap-5">
                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                    <p className="text-metatitle3 font-semibold text-black dark:text-white">
                      03
                    </p>
                  </div>
                  <div className="w-3/4">
                    <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                      Curious about something? Feel free to ask questions at any
                      time! We are here to serve!
                    </h3>
                  </div>
                </div>
                <div className="mt-7.5 flex items-center gap-5">
                  <div className="flex h-15 w-15 items-center justify-center rounded-[50%] border border-stroke dark:border-strokedark dark:bg-blacksection">
                    <p className="text-metatitle3 font-semibold text-black dark:text-white">
                      04
                    </p>
                  </div>
                  <div className="w-3/4">
                    <h3 className="mb-0.5 text-metatitle4 text-black dark:text-white">
                      Share your newfound knowledge with others and inspire
                      them too, They would be glad to learn from you.{" "}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Player
                autoplay
                loop
                src="https://lottie.host/ae44c372-f025-45bf-bc98-d4fc57d39f6b/4vcLrqbWDt.json"
                style={{ height: "400px" }}
                className="dark:hidden"
              />
              <Player
                autoplay
                loop
                src="https://lottie.host/ae44c372-f025-45bf-bc98-d4fc57d39f6b/4vcLrqbWDt.json"
                style={{ height: "400px", background: "#181C31" }}
                className="hidden dark:block"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== About Two End ===== --> */}

      {/* <!-- ===== Team Section Start ===== --> */}
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
            {/* Team Members */}
            <div className="team-member text-center">
              <Image
                src={"/images/brand/ifiora-francis.png"}
                width={250}
                height={250}
                className="rounded-full mx-auto mb-4 mt-7"
                alt="Francis Ifiora"
              />
              <h3 className="text-xl font-semibold text-black dark:text-white">Francis Ifiora</h3>
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
                alt="Godsent Ndoma"
              />
              <h3 className="text-xl font-semibold text-black dark:text-white">Godsent Ndoma</h3>
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
                alt="Precious Williams"
              />
              <h3 className="text-xl font-semibold text-black dark:text-white">Precious Williams</h3>
              <p className="text-gray-600 dark:text-gray-400">CTO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Precious leads the technology and innovation strategy at the company. With a strong background in technology, she ensures that our products are cutting-edge and meet the highest standards of quality and performance.</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== Team Section End ===== --> */}

      {/* <!-- ===== About Us Section Start ===== --> */}
   
      {/* <!-- ===== About Us Section End ===== --> */}
    </>
  );
};

export default About;
