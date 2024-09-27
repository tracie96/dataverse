"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
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
              <p>Connect with Others Across Data Verse.</p>
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
              <p>Learn and Discover with Data Verse.</p>
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
    </>
  );
};

export default About;
