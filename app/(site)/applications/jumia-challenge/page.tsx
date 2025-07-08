"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const JumiaChallengePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    gender: "",
    previousParticipation: "",
    skillLevel: "",
    expectations: "",
    referralSource: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert previousParticipation to boolean
      const previousParticipationBool = formData.previousParticipation === "yes";

      // Insert data into Supabase
      const { data, error } = await supabase
        .from("challenge")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            location: formData.location,
            gender: formData.gender,
            previousparticipation: previousParticipationBool,
            skilllevel: formData.skillLevel,
            expectations: formData.expectations,
            referralsource: formData.referralSource,
          },
        ])
        .select();

      if (error) {
        console.error("Error submitting registration:", error);
        throw error;
      }

      // Redirect to success page
      router.push("/applications/jumia-challenge/success");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative z-10 overflow-hidden pb-16  md:pb-[120px] xl:pb-[160px] 2xl:pb-[200px]">
      <section className="overflow-hidden pt-30 md:pt-30">
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
                   
                  <div className="flex items-center gap-4">
                <button className="inline-flex items-center px-10 py-5 bg-[#3182CE] text-white text-xl font-semibold rounded-full hover:bg-[#2B6CB0] transition-all duration-300">
                  $35 Up for Grab
                </button>
              </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                
                 <div className=" relative aspect-[700/444] w-full">
                 <Image
                  src="/images/challenge/challenge.png"
                  alt="DataVerse Africa Challenge"
                  width={300}
                  height={300}
                  className="w-[500px]"
                  priority
                />
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      
      
      
      
  
          {/* Hero Section */}
      

          {/* Two Column Layout Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-[1400px] mt-15 mx-auto">
            {/* What to Expect Section - Left Column */}
            <div className="lg:w-[40%]">
              <div className=" rounded-[32px] p-12 text-white">
                <h2 className="text-3xl font-bold text-center mb-12 text-black">What to Expect:</h2>
                <div className="flex flex-col gap-8">
                  <div className="bg-[#3182CE] rounded-2xl p-8 backdrop-blur-sm text-center hover:bg-white/20 transition-colors duration-300">
                    <h3 className="text-2xl font-bold mb-4">Real-world Data Problem</h3>
                    <p className="text-lg">Tackle authentic business challenges</p>
                  </div>
                  <div className="bg-[#3C82CE] rounded-2xl p-8 backdrop-blur-sm text-center hover:bg-white/20 transition-colors duration-300">
                    <h3 className="text-2xl font-bold mb-4">Skill Enhancement</h3>
                    <p className="text-lg">Test & improve your data analysis abilities</p>
                  </div>
                  <div className="bg-[#3182CE] rounded-2xl p-8 backdrop-blur-sm text-center hover:bg-white/20 transition-colors duration-300">
                    <h3 className="text-2xl font-bold mb-4">Champion Title</h3>
                    <p className="text-lg">Chance to be crowned DataVerse Champion!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form - Right Column */}
            <div className="lg:w-[60%]">
              <div className="bg-white dark:bg-black/20 rounded-[2rem] p-12 shadow-xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Register for the Challenge</h2>
                
                <div className="mb-12">
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
                    <p className="text-yellow-700 dark:text-yellow-400 text-center text-lg">
                      <strong>Note:</strong> Dataset and Instructions will be sent to your email on Friday, 11th July, 2025
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="location">
                        City, Country
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="gender">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="previousParticipation">
                      Have you participated in the DataVerse Africa Challenge before?
                    </label>
                    <select
                      id="previousParticipation"
                      name="previousParticipation"
                      value={formData.previousParticipation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="skillLevel">
                      What is your level of Data Analysis skill set?
                    </label>
                    <select
                      id="skillLevel"
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select skill level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="expectations">
                      What are your expectations for the challenge?
                    </label>
                    <textarea
                      id="expectations"
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="referralSource">
                      How did you hear about the challenge?
                    </label>
                    <select
                      id="referralSource"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select source</option>
                      <option value="social-media">Social Media</option>
                      <option value="friend">Friend/Colleague</option>
                      <option value="email">Email</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 text-lg font-semibold text-white bg-[#3182CE] hover:bg-[#2B6CB0] rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    Register Now
                  </button>
                  </div>
                </form>

                <div className="mt-12 p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/30">
                  <p className="text-green-700 dark:text-green-400 font-medium mb-6 text-lg text-center">
                    Join our WhatsApp community for updates and discussions!
                  </p>
                  <div className="text-center">
                    <a
                      href="https://chat.whatsapp.com/GtapW3Q8yRS983mRnTYrTH"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Join WhatsApp Community
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
};

export default JumiaChallengePage; 