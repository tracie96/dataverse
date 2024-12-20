"use client";
import Image from "next/image";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { message } from "antd";
const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  //   Email.send({
  //     Host : "smtp.elasticemail.com",
  //     Username : "Tracy",
  //     Password : "upJesus1996",
  //     To : 'tracy@dataverseafrica.org',
  //     From : {email},
  //     Subject : "This is the subject",
  //     Body : "And this is the body"
  // })
  //     .then((message) => alert("Email sent successfully!"))
  //     .catch((error) => console.error("Failed to send email:", error));
  message.success({content:'Email Subscribed Successfully',  style: {
    zIndex:999999
  },})
  };

  return (
    <>
      <section className="overflow-hidden pt-35 md:pt-40  xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                WELCOME TO DATAVERSE
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Empowering Africa’s Digital Future.
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 ml-3 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark"></span>
              </h1>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                      className="rounded-full border border-stroke px-8 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
                      aria-label="get started button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Join The Community
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-dotted-light-02.svg"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className=" relative aspect-[700/444] w-full">
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/83f37706-f5fe-4926-ad27-82ed5e4aa2b0/TLgNj5jRUh.json"
                    style={{ height: "400px" }}
                    className="shadow-solid-l dark:hidden"
                  />
                  <Player
                    className="hidden shadow-solid-l dark:block"
                    autoplay
                    loop
                    src="https://lottie.host/83f37706-f5fe-4926-ad27-82ed5e4aa2b0/TLgNj5jRUh.json"
                    style={{ height: "400px", background: "#181C31" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
