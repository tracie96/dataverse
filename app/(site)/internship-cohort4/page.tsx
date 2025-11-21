"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, Award, BookOpen, Clock, DollarSign, CheckCircle, Star, Target, TrendingUp, Globe, Zap, GraduationCap, Building, Mail, ArrowRight, Play, Users2, FileText, Briefcase, Lightbulb, BarChart3, Brain, Sparkles } from "lucide-react";

const InternshipCohort4Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <ProgramOverview />
      <Tracks />
      <Timeline />
      <Benefits />
      <Application />
      <Sponsorship />
      <FAQ />
      <CTA />
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen mt-[7rem] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-titlebg/30 to-primary/10">
        <div className="absolute inset-0 bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-c-1390 mx-auto px-4 text-center mt-[7rem]">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-titlebg/10 text-titlebg px-4 py-2 rounded-full text-metatitle font-medium">
            <Star className="h-4 w-4" />
            Cohort 4.0 Applications Open
          </div>
          
          <h1 className="text-hero md:text-sectiontitle3 font-bold leading-tight text-black dark:text-white">
            DataVerse Africa Internship Program
            <span className="block text-titlebg text-sectiontitle4 md:text-sectiontitle2 font-medium mt-4">
              Cohort 4.0
            </span>
          </h1>
          
          <p className="text-para2 font-light max-w-3xl mx-auto leading-relaxed text-waterloo dark:text-manatee">
            A 12-week immersive, project-based virtual internship designed to equip passionate Africans 
            with real-world experience in key tech domains. Now with Beginner and Intermediate tracks!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/internship-cohort4/apply">
              <button className="bg-titlebg hover:bg-titlebgdark text-white px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all duration-300 shadow-solid-5 flex items-center gap-2">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-titlebg mb-2">12</div>
              <div className="text-waterloo dark:text-manatee">Weeks Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-titlebg mb-2">2</div>
              <div className="text-waterloo dark:text-manatee">Track Levels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-titlebg mb-2">$40/$25</div>
              <div className="text-waterloo dark:text-manatee">Program Fee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Program Overview Component
const ProgramOverview = () => {
  return (
    <section className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Program Overview
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Unlike our previous cohorts, this fourth edition introduces <strong className="text-titlebg">Beginners and Intermediate tracks</strong>. 
            Based on feedback from Cohort 3, we understand that most interns are beginners and need a more structured learning approach. 
            Cohort 4.0 offers two distinct tracks: <strong className="text-titlebg">Beginners</strong> (combo of project-based mentoring and training) 
            and <strong className="text-titlebg">Intermediate</strong> (strictly project mentoring).
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-itemtitle font-bold text-black dark:text-white">
                What Makes Cohort 4.0 Special?
              </h3>
              <ul className="space-y-3">
                {[
                  "Two-track system: Beginners and Intermediate levels",
                  "Beginners track: Project-based mentoring + structured training",
                  "Intermediate track: Advanced project mentoring for experienced learners",
                  "Real-world projects with African businesses and NGOs",
                  "Expert mentorship from industry professionals",
                  "Career readiness and job placement support",
                  "Access to premium tools and resources",
                  "Community of like-minded tech enthusiasts"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-titlebg mt-0.5 flex-shrink-0" />
                    <span className="text-waterloo dark:text-manatee">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white dark:bg-blacksection p-6 rounded-lg border border-stroke dark:border-strokedark">
              <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-titlebg" />
                Program Timeline
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-waterloo dark:text-manatee">Start Date:</span>
                  <span className="font-medium text-black dark:text-white">Friday, 9th January, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-waterloo dark:text-manatee">End Date:</span>
                  <span className="font-medium text-black dark:text-white">Friday, 30th March, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-waterloo dark:text-manatee">Duration:</span>
                  <span className="font-medium text-titlebg">12 Weeks (3 Months)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Image 
              src="/images/hero/databank.png"
              alt="DataVerse Africa Internship"
              width={600}
              height={400}
              className="rounded-lg shadow-solid-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Tracks Component
const tracks = [
  {
    level: "Beginners",
    fee: "$40 USD",
    description: "Perfect for those new to data analytics or data science. Combines structured training with project-based mentoring.",
    icon: Sparkles,
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
    borderColor: "border-green-200 dark:border-green-700",
    tracks: [
      {
        title: "Data Analytics",
        skills: [
          "Excel",
          "Power BI",
          "PostgreSQL",
          "Introduction to Python for Data Analysis",
          "Project Delivery"
        ]
      },
      {
        title: "Data Science",
        skills: [
          "Python Fundamentals",
          "Python for Data Analysis",
          "Machine Learning Fundamentals"
        ]
      }
    ]
  },
  {
    level: "Intermediate",
    fee: "$25 USD",
    description: "For learners with prior experience. Focuses on advanced project mentoring and real-world applications.",
    icon: Target,
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
    borderColor: "border-purple-200 dark:border-purple-700",
    tracks: [
      {
        title: "Data Analytics",
        specializations: [
          {
            name: "Healthcare Analytics",
            description: "Analyze healthcare data to improve patient outcomes and operational efficiency."
          },
          {
            name: "Financial Analytics",
            description: "Work with financial data to drive business decisions and risk management."
          },
          {
            name: "Agricultural Analytics",
            description: "Apply analytics to agricultural data for better crop management and yield optimization."
          }
        ]
      },
      {
        title: "Data Science",
        description: "Advanced project-based mentoring in Applied Machine Learning, Deep Learning, and Applications of LLM and Gen AI. No domain specialization required.",
        specializations: [] // No specializations for Data Science intermediate track
      }
    ]
  }
];

const Tracks = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Specialized Tracks Available
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Interns will select one of the following career-aligned tracks based on their experience level, 
            each tailored with mentors, hands-on projects, and job readiness skills.
          </p>
        </div>
        
        <div className="space-y-12">
          {tracks.map((trackLevel, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${trackLevel.bgColor} border ${trackLevel.borderColor} rounded-2xl p-8 hover:shadow-solid-7 transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Track Level Header */}
              <div className="text-center mb-8">
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${trackLevel.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <trackLevel.icon className="h-12 w-12 text-white" />
                </div>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h3 className="text-sectiontitle4 font-bold text-black dark:text-white group-hover:text-primary transition-colors">
                    {trackLevel.level} Track
                  </h3>
                  <span className="bg-white dark:bg-blacksection px-4 py-1 rounded-full text-titlebg font-semibold text-sm border border-titlebg/20">
                    {trackLevel.fee}
                  </span>
                </div>
                <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-2xl mx-auto">
                  {trackLevel.description}
                </p>
              </div>
              
              {/* Tracks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trackLevel.tracks.map((track, trackIndex) => (
                  <div 
                    key={trackIndex}
                    className="bg-white/80 dark:bg-blacksection/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-strokedark/50 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-itemtitle2 font-bold text-black dark:text-white mb-4">
                      {track.title}
                    </h4>
                    
                    {trackLevel.level === "Beginners" ? (
                      <div className="space-y-3">
                        <h5 className="font-semibold text-black dark:text-white text-sm mb-3 flex items-center gap-2">
                          <span className="text-titlebg">📚</span>
                          Skills You'll Learn
                        </h5>
                        <ul className="space-y-2">
                          {track.skills?.map((skill, skillIndex) => (
                            <li key={skillIndex} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-titlebg mt-0.5 flex-shrink-0" />
                              <span className="text-regular text-waterloo dark:text-manatee">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {track.specializations && track.specializations.length > 0 ? (
                          <>
                            <h5 className="font-semibold text-black dark:text-white text-sm mb-3 flex items-center gap-2">
                              <span className="text-titlebg">🎯</span>
                              Domain Specialization (Choose Any)
                            </h5>
                            {track.specializations.map((spec, specIndex) => (
                              <div key={specIndex} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4">
                                <p className="text-metatitle3 text-black dark:text-white font-medium mb-1">
                                  {spec.name}
                                </p>
                                <p className="text-regular text-waterloo dark:text-manatee text-sm">
                                  {spec.description}
                                </p>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="space-y-3">
                            {track.description && (
                              <p className="text-regular text-waterloo dark:text-manatee leading-relaxed mb-3">
                                {track.description}
                              </p>
                            )}
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                              <p className="text-metatitle3 text-black dark:text-white font-medium mb-2 flex items-center gap-2">
                                <span className="text-titlebg">🚀</span>
                                Project-Based Mentoring
                              </p>
                              <p className="text-regular text-waterloo dark:text-manatee text-sm">
                                Focus on advanced projects in Applied Machine Learning, Deep Learning, and LLM/Gen AI applications with expert mentorship.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Track Selection Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-titlebg/10 to-primary/10 rounded-2xl p-8 border border-titlebg/20">
            <h3 className="text-itemtitle font-bold text-black dark:text-white mb-4">
              🎯 Track Selection Process
            </h3>
            <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto mb-6">
              During orientation week (January 9th, 2026), you'll have the opportunity to explore each track in detail and make your final selection. 
              Our mentors will guide you through the decision-making process based on your experience level, interests, and career goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white dark:bg-blacksection px-4 py-2 rounded-full border border-stroke dark:border-strokedark">
                🔍 Deep Dive Sessions
              </span>
              <span className="bg-white dark:bg-blacksection px-4 py-2 rounded-full border border-stroke dark:border-strokedark">
                💬 Mentor Consultations
              </span>
              <span className="bg-white dark:bg-blacksection px-4 py-2 rounded-full border border-stroke dark:border-strokedark">
                🎯 Career Alignment
              </span>
              <span className="bg-white dark:bg-blacksection px-4 py-2 rounded-full border border-stroke dark:border-strokedark">
                📊 Project Preview
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Timeline Component
const timelineData = [
  {
    date: "October 24 – January 5th, 2025",
    activity: "Application Open + Outreach Campaign",
    icon: Users,
    status: "active"
  },
  {
    date: "Nov 7 – Nov 14, 2025",
    activity: "Webinars and Social Media Drills and Ads",
    icon: Play,
    status: "upcoming"
  },
  {
    date: "January 9th, 2026",
    activity: "Cohort Kickoff (Orientation and Track Selection)",
    icon: GraduationCap,
    status: "upcoming"
  },
  {
    date: "February 13, 2026",
    activity: "Midpoint Project Review",
    icon: Target,
    status: "upcoming"
  },
  {
    date: "March 28th – 29th, 2026",
    activity: "Capstone Presentation Week and Graduation",
    icon: Award,
    status: "upcoming"
  }
];

const Timeline = () => {
  return (
    <section className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Application & Onboarding Timeline
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Mark your calendar and stay updated with our comprehensive timeline for Cohort 4.0.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.status === 'active' 
                    ? 'bg-titlebg text-white' 
                    : 'bg-stroke dark:bg-strokedark text-waterloo dark:text-manatee'
                }`}>
                  <item.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-black dark:text-white">
                      {item.activity}
                    </h3>
                    {item.status === 'active' && (
                      <span className="bg-titlebg/10 text-titlebg px-2 py-1 rounded-full text-xs font-medium">
                        Active Now
                      </span>
                    )}
                  </div>
                  <p className="text-waterloo dark:text-manatee font-medium">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Component
const benefits = [
  {
    icon: Briefcase,
    title: "Real-World Projects",
    description: "Interns work in teams to solve real problems for African businesses, partner companies or NGOs."
  },
  {
    icon: Users2,
    title: "Mentorship & Community",
    description: "Access to expert mentors, past alumni, and weekly live sessions with industry leaders."
  },
  {
    icon: FileText,
    title: "Portfolio Development",
    description: "Build a professional portfolio to showcase to employers and clients."
  },
  {
    icon: Award,
    title: "Certificate of Completion",
    description: "Interns receive a recognized digital certificate upon successful program completion."
  },
  {
    icon: Building,
    title: "Job & Internship Referrals",
    description: "Top-performing interns will be referred to partner organizations for roles and opportunities."
  },
  {
    icon: Star,
    title: "Access to Premium Resources",
    description: "Including resume templates, career guides, and internship/job boards."
  },
  {
    icon: Target,
    title: "Capstone Project Presentation Day",
    description: "Finalists present their work to an audience of tech leaders and hiring partners."
  }
];

const Benefits = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Benefits of Joining the Internship
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Discover what makes our internship program unique and how it can accelerate your career.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group hover:shadow-solid-7 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-7.5 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-titlebg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-itemtitle2 font-semibold text-black dark:text-white group-hover:text-primary transition-colors mb-4">
                {benefit.title}
              </h3>
              <p className="text-regular text-waterloo dark:text-manatee leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Application Component
const Application = () => {
  return (
    <section id="application" className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Ready to Apply?
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Join Cohort 4.0 and take the first step towards your tech career in Africa.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Requirements */}
            <div className="bg-white dark:bg-blacksection p-8 rounded-lg border border-stroke dark:border-strokedark">
              <h3 className="text-itemtitle font-bold text-black dark:text-white mb-6">
                Requirements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-titlebg mt-0.5 flex-shrink-0" />
                  <span className="text-waterloo dark:text-manatee">Basic knowledge in chosen track (not for total beginners)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-titlebg mt-0.5 flex-shrink-0" />
                  <span className="text-waterloo dark:text-manatee">Access to a computer and reliable internet</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-titlebg mt-0.5 flex-shrink-0" />
                  <span className="text-waterloo dark:text-manatee">Commitment to 12-week program</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-titlebg mt-0.5 flex-shrink-0" />
                  <span className="text-waterloo dark:text-manatee">Passion for technology and innovation</span>
                </div>
              </div>
            </div>
            
            {/* Program Fee */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-lg">
                <h3 className="text-itemtitle font-bold mb-6">Beginners Track</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">$40 USD</div>
                  <div className="text-lg opacity-90">or ₦60,000 NGN</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Project-based mentoring + Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Access to tools and project hosting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Mentor support and guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Certification upon completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Career webinars and live workshops</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-lg">
                <h3 className="text-itemtitle font-bold mb-6">Intermediate Track</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">$25 USD</div>
                  <div className="text-lg opacity-90">or ₦37,500 NGN</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Advanced project mentoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Access to tools and project hosting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Mentor support and guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Certification upon completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Career webinars and live workshops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Application Button */}
          <div className="text-center mt-12">
            <Link href="/internship-cohort4/apply">
              <button className="bg-titlebg hover:bg-titlebgdark text-white px-12 py-4 text-metatitle3 font-medium rounded-lg transition-all duration-300 shadow-solid-5 flex items-center gap-2 mx-auto">
                <Mail className="h-5 w-5" />
                Apply for Cohort 4.0
              </button>
            </Link>
            <p className="text-waterloo dark:text-manatee mt-4">
              Applications close January 5th, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sponsorship Component
const Sponsorship = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Sponsorship & Scholarship Opportunities
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            We believe in making quality education accessible to all passionate learners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-alabaster dark:bg-blacksection p-8 rounded-lg border border-stroke dark:border-strokedark">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-itemtitle font-bold text-black dark:text-white mb-4">
              Need-Based Scholarships
            </h3>
            <p className="text-waterloo dark:text-manatee mb-4">
              A limited number of need-based scholarships will be available for exceptional candidates 
              who demonstrate financial need and strong potential.
            </p>
          </div>
          
          <div className="bg-alabaster dark:bg-blacksection p-8 rounded-lg border border-stroke dark:border-strokedark">
            <div className="w-16 h-16 bg-titlebg rounded-full flex items-center justify-center mb-6">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-itemtitle font-bold text-black dark:text-white mb-4">
              Organization Sponsorship
            </h3>
            <p className="text-waterloo dark:text-manatee mb-4">
              Organizations can sponsor participants or entire tracks, building a pipeline of 
              skilled talent while supporting African tech education.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Component
const faqs = [
  {
    question: "What's the difference between Beginners and Intermediate tracks?",
    answer: "Beginners track ($40) combines structured training with project-based mentoring, perfect for those new to data analytics or data science. Intermediate track ($25) focuses on advanced project mentoring for learners with prior experience."
  },
  {
    question: "Is this internship suitable for complete beginners?",
    answer: "While we welcome learners at various levels, complete beginners may find the pace challenging. We recommend having basic knowledge in your chosen track. The Beginners track provides more structured training to help bridge knowledge gaps."
  },
  {
    question: "What happens if I can't complete the full 12 weeks?",
    answer: "We understand that circumstances can change. However, the program fee is non-refundable, and we encourage full participation to maximize learning outcomes."
  },
  {
    question: "Will I receive a certificate even if I don't complete all projects?",
    answer: "Certificates are awarded upon successful completion of the program requirements. Partial completion may result in a certificate of participation."
  },
  {
    question: "How are mentors assigned?",
    answer: "Mentors are carefully matched based on your chosen track level (Beginners/Intermediate), specialization, and career goals. You'll have access to both individual mentorship and group sessions."
  },
  {
    question: "Can I switch tracks after the program starts?",
    answer: "Track selection is finalized during the orientation week (January 9th, 2026). Changes may be possible in exceptional circumstances but are generally not recommended."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Get answers to common questions about our internship program.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-blacksection p-6 rounded-lg border border-stroke dark:border-strokedark"
            >
              <h3 className="font-semibold text-black dark:text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-waterloo dark:text-manatee leading-relaxed">
                {faq.answer}
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
            Ready to Transform Your Tech Career?
          </h2>
          <p className="text-white/90 text-metatitle3 mb-8 leading-relaxed">
            Join Cohort 4.0 of the DataVerse Africa Internship Program and become part of a community 
            that's shaping the future of technology in Africa. Choose the track that fits your experience level!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/internship-cohort4/apply">
              <button className="bg-white text-titlebg hover:bg-gray-100 px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all duration-300 shadow-solid-5">
                Apply Now
              </button>
            </Link>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-metatitle3 font-medium rounded-lg backdrop-blur-sm transition-all duration-300">
              Download Brochure
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

export default InternshipCohort4Page;

