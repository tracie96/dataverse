"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import {
  StarFilled,
  ArrowRightOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ReadOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  ThunderboltOutlined,
  CloudServerOutlined,
  TeamOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  AimOutlined,
  ProjectOutlined,
  FileTextOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  COHORT5_META,
  COHORT5_TRACK_LIST,
  COHORT5_TIMELINE,
} from "@/config/cohort5";

type AntIcon = ComponentType<{ className?: string; style?: React.CSSProperties }>;

const trackIcons: Record<string, AntIcon> = {
  "data-analytics-intermediate": LineChartOutlined,
  "ai-automation-business-analytics": NodeIndexOutlined,
  "data-science-intermediate": ThunderboltOutlined,
  "microsoft-fabric-data-engineering": CloudServerOutlined,
};

const timelineIcons: AntIcon[] = [
  TeamOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  AimOutlined,
  TrophyOutlined,
];

const InternshipCohort5Page = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative min-h-screen mt-[7rem] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-titlebg/30 to-primary/10">
          <div className="absolute inset-0 bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative z-10 max-w-c-1390 mx-auto px-4 text-center mt-[7rem]">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-titlebg/10 text-titlebg px-4 py-2 rounded-full text-metatitle font-medium">
              <StarFilled style={{ fontSize: 16 }} />
              Cohort 5.0 Applications Open
            </div>
            <h1 className="text-hero md:text-sectiontitle3 font-bold leading-tight text-black dark:text-white">
              DataVerse Africa Internship Program
              <span className="block text-titlebg text-sectiontitle4 md:text-sectiontitle2 font-medium mt-4">
                Cohort 5.0
              </span>
            </h1>
            <p className="text-para2 font-light max-w-3xl mx-auto leading-relaxed text-waterloo dark:text-manatee">
              A 12-week immersive, project-based virtual internship across four specialized tracks,
              with real-world projects, mentorship, and career readiness support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center pt-8 w-full max-w-md sm:max-w-none mx-auto">
              <Link href="/internship-cohort5/apply" className="w-full sm:w-auto">
                <button className="w-full bg-titlebg hover:bg-titlebgdark text-white px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all shadow-solid-5 flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowRightOutlined style={{ fontSize: 16 }} />
                </button>
              </Link>
              <a
                href="https://chat.whatsapp.com/HPfkfv0m1jSLCsmocAzgxQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all shadow-solid-5 flex items-center justify-center gap-2"
              >
                Join WhatsApp Group
                <MessageOutlined style={{ fontSize: 16 }} />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-titlebg mb-2">12</div>
                <div className="text-waterloo dark:text-manatee">Weeks Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-titlebg mb-2">4</div>
                <div className="text-waterloo dark:text-manatee">Specialized Tracks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-titlebg mb-2">$45</div>
                <div className="text-waterloo dark:text-manatee">Flat Program Fee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-alabaster dark:bg-blacksection">
        <div className="max-w-c-1390 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
              Program Overview
            </h2>
            <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
              Cohort 5.0 runs from {COHORT5_META.kickoffDate} through {COHORT5_META.endDate}. Choose the
              track that matches your experience level and career goals — each with dedicated mentors,
              real-world African business projects, and career readiness support.
            </p>
          </div>
          <div className="bg-white dark:bg-blacksection p-6 rounded-lg border border-stroke dark:border-strokedark max-w-2xl mx-auto">
            <h4 className="font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
              <ClockCircleOutlined className="text-titlebg" style={{ fontSize: 20 }} />
              Key Dates
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-waterloo dark:text-manatee">Applications Open:</span>
                <span className="font-medium text-black dark:text-white">{COHORT5_META.applicationOpen} – {COHORT5_META.applicationClose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-waterloo dark:text-manatee">Kick-off:</span>
                <span className="font-medium text-black dark:text-white">{COHORT5_META.kickoffDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-waterloo dark:text-manatee">Program End:</span>
                <span className="font-medium text-black dark:text-white">{COHORT5_META.endDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-20 bg-gradient-to-b from-alabaster via-white to-alabaster dark:from-black dark:via-blacksection dark:to-black">
        <div className="max-w-c-1390 mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-titlebg/10 text-titlebg border border-titlebg/20">
              4 Specialized Tracks · $45 USD each
            </span>
            <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-4">
              Course Tracks & Pricing
            </h2>
            <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-2xl mx-auto">
              Pick the path that fits your goals. Every track includes mentorship, real-world projects, and career support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COHORT5_TRACK_LIST.map((track) => {
              const Icon = trackIcons[track.id] || ReadOutlined;
              return (
                <div
                  key={track.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-stroke/50 dark:border-strokedark/50 bg-white/80 dark:bg-blacksection/80 backdrop-blur-sm p-6 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(199,129,55,0.12)] dark:hover:shadow-[0_20px_40px_rgba(199,129,55,0.08)] hover:border-titlebg/30"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-titlebg to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-titlebg to-titlebgdark shadow-lg shadow-titlebg/25 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="text-white" style={{ fontSize: 26 }} />
                      </div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize bg-stroke/30 dark:bg-strokedark/50 text-waterloo dark:text-manatee">
                        {track.level}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold text-titlebg leading-none">
                        ${COHORT5_META.programFeeUsd}
                      </div>
                      <div className="text-[11px] text-waterloo dark:text-manatee mt-0.5 uppercase tracking-wide">
                        USD
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg lg:text-xl font-bold text-black dark:text-white mb-2 group-hover:text-titlebg dark:group-hover:text-titlebg transition-colors duration-300">
                    {track.name}
                  </h3>
                  <p className="text-sm text-waterloo dark:text-manatee leading-relaxed mb-5 flex-grow">
                    {track.description}
                  </p>

                  <div className="pt-5 border-t border-stroke/40 dark:border-strokedark/40">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-waterloo dark:text-manatee mb-3">
                      What you&apos;ll cover
                    </p>
                    <ul className="space-y-2">
                      {track.skills.slice(0, 4).map((skill, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-black/80 dark:text-white/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-titlebg/10">
                            <CheckCircleOutlined className="text-titlebg" style={{ fontSize: 11 }} />
                          </span>
                          {skill}
                        </li>
                      ))}
                      {track.skills.length > 4 && (
                        <li className="pl-7 text-xs font-medium text-titlebg">
                          +{track.skills.length - 4} more modules
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-alabaster dark:bg-blacksection">
        <div className="max-w-c-1390 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
              Operational Timeline 2026
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {COHORT5_TIMELINE.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.status === "active" ? "bg-titlebg text-white" : "bg-stroke dark:bg-strokedark text-waterloo"
                  }`}
                >
                  {(() => {
                    const TimelineIcon = timelineIcons[index] ?? TrophyOutlined;
                    return <TimelineIcon style={{ fontSize: 24 }} />;
                  })()}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-black dark:text-white">{item.activity}</h3>
                    {item.status === "active" && (
                      <span className="bg-titlebg/10 text-titlebg px-2 py-1 rounded-full text-xs font-medium">
                        Active Now
                      </span>
                    )}
                  </div>
                  <p className="text-waterloo dark:text-manatee">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-c-1390 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
              Platform Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ProjectOutlined, title: "Team & Project Management", desc: "Work in teams on real-world projects for African businesses." },
              { icon: TeamOutlined, title: "Mentorship & Community", desc: "Expert mentors, alumni network, and weekly live sessions." },
              { icon: FileTextOutlined, title: "Resource Vault", desc: "Certification tracking, resume templates, career guides, and job boards." },
              { icon: AimOutlined, title: "Capstone Evaluation", desc: "Midpoint Project Review and final Capstone Presentation Day milestones." },
            ].map((b, i) => (
              <div key={i} className="text-center p-6 border border-stroke dark:border-strokedark rounded-lg">
                <div className="w-14 h-14 mx-auto mb-4 bg-titlebg rounded-full flex items-center justify-center">
                  <b.icon className="text-white" style={{ fontSize: 28 }} />
                </div>
                <h3 className="font-semibold text-black dark:text-white mb-2">{b.title}</h3>
                <p className="text-sm text-waterloo dark:text-manatee">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-titlebg to-titlebgdark">
        <div className="max-w-c-1390 mx-auto px-4 text-center">
          <h2 className="text-sectiontitle2 font-bold text-white mb-6">Ready to Apply?</h2>
          <p className="text-white/90 text-metatitle3 mb-8 max-w-2xl mx-auto">
            Applications close {COHORT5_META.applicationClose}. Join Cohort 5.0 and accelerate your tech career in Africa.
          </p>
          <Link href="/internship-cohort5/apply">
            <button className="bg-white text-titlebg hover:bg-gray-100 px-8 py-4 rounded-lg font-medium flex items-center gap-2 mx-auto">
              <MailOutlined style={{ fontSize: 20 }} />
              Apply for Cohort 5.0
            </button>
          </Link>
          <p className="mt-6 text-white/80 text-sm">Questions? info@dataverseafrica.org</p>
        </div>
      </section>
    </div>
  );
};

export default InternshipCohort5Page;
