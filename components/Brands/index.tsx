"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Brands = () => {
  return (
    <>
      {/* <!-- ===== Internship Program Banner Start ===== --> */}
      <div className="container mx-auto px-4 pt-16">
        <section className="mx-auto rounded-lg bg-gradient-to-t from-[#F8F9FF] to-[#c3dbf2] dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark py-8">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:justify-between md:gap-0">
            {/* Text and Button Section */}
            <div className="animate_left md:w-[70%] lg:w-1/2">
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-black text-left dark:text-white xl:text-sectiontitle4 pt-6 px-8">
                Ongoing Internship Program
              </h2>
              <div className="px-8">
                <p className="text-left">
                  Jumpstart your career with our exciting internship
                  program gain practical experience, receive valuable
                  mentorship, and develop the skills you need to thrive in your
                  professional journey. Seize this opportunity to grow apply now
                  and take the first step toward your future success!
                </p>

                <Link
                  href="/internship"
                  className="inline-flex rounded-full bg-black px-6 py-3 mt-6 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
                  style={{ float: "left" }}
                >
                  Learn More
                  <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-dark.svg"
                    alt="Arrow"
                    className="dark:hidden"
                  />
                  <Image
                    width={20}
                    height={20}
                    src="/images/icon/icon-arrow-light.svg"
                    alt="Arrow"
                    className="hidden dark:block"
                  />
                </Link>
              </div>
            </div>

            <div className="animate_right lg:w-[30%]">
              <div className="flex items-center justify-end xl:justify-between">
              <Image
              src="/images/about/data.svg"
              alt="logo"
              width={70.03}
              height={30}
              style={{width:'70%'}}
            />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Brands;
