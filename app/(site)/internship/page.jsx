"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Award, BookOpen, Clock, CheckCircle, Star, Target, GraduationCap, Building, Mail, ArrowRight, Play, Users2, FileText, Briefcase, Lightbulb, Calendar, Globe } from "lucide-react";

export default function InternshipPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Programs />
      <Features />
      <CTA />
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen mt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-titlebg/30 to-primary/10">
        <div className="absolute inset-0 bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-c-1390 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-hero md:text-sectiontitle3 font-bold leading-tight text-black dark:text-white">
            DataVerse Africa Internship Programs
          </h1>
          
          <p className="text-para2 font-light max-w-3xl mx-auto leading-relaxed text-waterloo dark:text-manatee">
            Empowering African talent through immersive, project-based learning experiences 
            in data science, analytics, and emerging technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/internship-cohort3">
              <button className="bg-titlebg hover:bg-titlebgdark text-white px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all duration-300 shadow-solid-5 flex items-center gap-2">
                Apply for Cohort 3
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <button className="border-2 border-titlebg/30 text-titlebg hover:bg-titlebg/10 px-8 py-4 text-metatitle3 font-medium rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
              <Play className="h-4 w-4" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Programs Component
const programs = [
  {
    title: "Cohort 3 (2025)",
    status: "Active",
    description: "Our latest 12-week immersive program with specialized tracks in Data Analytics and Data Science.",
    features: [
      "12-week duration",
      "4 specialized tracks",
      "Real-world projects",
      "Expert mentorship",
      "Career support"
    ],
    fee: "$25 USD",
    startDate: "Sept 26, 2025",
    cta: "Apply Now",
    ctaLink: "/internship-cohort3",
    badge: "Applications Open"
  },
  {
    title: "General Internship",
    status: "Ongoing",
    description: "Flexible internship opportunities throughout the year for various skill levels and interests.",
    features: [
      "Flexible duration",
      "Multiple domains",
      "Project-based learning",
      "Skill development",
      "Networking opportunities"
    ],
    fee: "Free",
    startDate: "Rolling",
    cta: "Learn More",
    ctaLink: "#",
    badge: "Always Available"
  }
];

const Programs = () => {
  return (
    <section className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Choose Your Internship Path
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            We offer structured programs and flexible opportunities to match your learning goals and schedule.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="group hover:shadow-solid-7 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-itemtitle font-bold text-black dark:text-white">
                  {program.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  program.status === 'Active' 
                    ? 'bg-titlebg/10 text-titlebg' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {program.badge}
                </span>
              </div>
              
              <p className="text-waterloo dark:text-manatee mb-6 leading-relaxed">
                {program.description}
              </p>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-black dark:text-white">Key Features:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-titlebg flex-shrink-0" />
                      <span className="text-sm text-waterloo dark:text-manatee">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-titlebg">{program.fee}</div>
                  <div className="text-sm text-waterloo dark:text-manatee">Program Fee</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-black dark:text-white">{program.startDate}</div>
                  <div className="text-sm text-waterloo dark:text-manatee">Start Date</div>
                </div>
              </div>
              
              <Link href={program.ctaLink}>
                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  program.status === 'Active'
                    ? 'bg-titlebg hover:bg-titlebgdark text-white shadow-solid-5'
                    : 'bg-primary hover:bg-primaryho text-white shadow-solid-5'
                }`}>
                  {program.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Component
const features = [
  {
    icon: Users2,
    title: "Expert Mentorship",
    description: "Learn from industry professionals and experienced researchers"
  },
  {
    icon: Briefcase,
    title: "Real Projects",
    description: "Work on actual problems facing African businesses and communities"
  },
  {
    icon: Award,
    title: "Certification",
    description: "Earn recognized certificates to boost your career prospects"
  },
  {
    icon: Building,
    title: "Career Support",
    description: "Get referrals and connections to job opportunities"
  },
  {
    icon: Globe,
    title: "African Focus",
    description: "Solutions and projects specifically designed for African contexts"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Access to cutting-edge tools and emerging technologies"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Why Choose DataVerse Africa?
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Our internship programs are designed to provide comprehensive learning experiences 
            that prepare you for real-world challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group hover:shadow-solid-7 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-7.5 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-titlebg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-itemtitle2 font-semibold text-black dark:text-white group-hover:text-primary transition-colors mb-4">
                {feature.title}
              </h3>
              <p className="text-regular text-waterloo dark:text-manatee leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-titlebg to-titlebgdark">
      <div className="max-w-c-1390 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 text-metatitle3 mb-8 leading-relaxed">
            Join our community of learners and innovators who are shaping the future of technology in Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/internship-cohort3/apply">
              <button className="bg-white text-titlebg hover:bg-gray-100 px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all duration-300 shadow-solid-5">
                Apply for Cohort 3
              </button>
            </Link>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-metatitle3 font-medium rounded-lg backdrop-blur-sm transition-all duration-300">
              Contact Us
            </button>
          </div>
          
          <div className="mt-8 text-white/80 text-sm">
            <p>Questions? Contact us at info@dataverseafrica.org</p>
          </div>
        </div>
      </div>
    </section>
  );
};
