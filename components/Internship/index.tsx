"use client"
import React from "react";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from "next/link";

const CurriculumPage = () => {
  const curriculum = [
    {
      week: 1,
      icon: "/images/icon/icon-01.svg",
      title: "Business Data Cleaning & Analysis with Excel",
      objective:
        "Understand how to clean and preprocess raw data for analysis.",
      project: {
        description:
          "A retail company provides sales data containing missing values, duplicates, and errors.",
        tasks: [
          "Clean the data (remove duplicates, handle missing values).",
          "Use advanced formulas (e.g., VLOOKUP, IF, SUMIFS) to calculate KPIs like total revenue, average sales per region, and product trends.",
        ],
        deliverables: ["Cleaned dataset", "KPI calculations"],
      },
    },
    {
      week: 2,
      title: "Advanced Excel Visualization",
      icon: "/images/icon/icon-01.svg",
      objective: "Create professional dashboards in Excel.",
      project: {
        description:
          "Visualize sales performance using slicers, pivot tables, and charts.",
        tasks: [
          "Design a dynamic dashboard that shows top-performing products, sales by region, and monthly trends.",
        ],
        deliverables: ["Interactive Excel dashboard"],
      },
    },
    {
      week: 3,
      title: "Introduction to SQL for Data Retrieval",
      objective: "Query data from a database.",
      icon: "/images/icon/icon-01.svg",

      project: {
        description:
          "A company database contains employee and department data.",
        tasks: [
          "Write SQL queries to extract employee information by department, salary ranges, and job roles.",
          "Use basic SQL clauses like SELECT, WHERE, ORDER BY, and GROUP BY.",
        ],
        deliverables: ["SQL query scripts with results"],
      },
    },
    {
      week: 4,
      title: "Data Transformation with SQL",
      icon: "/images/icon/icon-01.svg",

      objective: "Transform data using SQL for analysis.",
      project: {
        description:
          "Analyze customer transactions from an e-commerce database.",
        tasks: [
          "Write SQL queries for data aggregation (total sales, average order value).",
          "Use CASE statements to categorize customers by spending levels.",
        ],
        deliverables: ["SQL scripts and insights"],
      },
    },
    {
      week: 5,
      title: "Introduction to Power BI",
      icon: "/images/icon/icon-01.svg",

      objective: "Connect to datasets and create basic visualizations.",
      project: {
        description:
          "Create a Power BI report for a logistics company’s shipping performance.",
        tasks: [
          "Connect to Excel/SQL datasets.",
          "Create visuals (bar charts, pie charts, and line graphs).",
          "Use slicers for interactivity.",
        ],
        deliverables: ["Power BI report file"],
      },
    },
    {
      week: 6,
      title: "Power BI Data Modeling",
      icon: "/images/icon/icon-01.svg",

      objective: "Build a robust data model and DAX formulas.",
      project: {
        description:
          "Create a data model for a healthcare provider’s patient visit data.",
        tasks: [
          "Develop relationships between tables.",
          "Write DAX formulas (e.g., YTD, rolling averages) to analyze patient visits and revenue trends.",
        ],
        deliverables: ["Power BI report with a functional data model"],
      },
    },
    {
      week: 7,
      title: "Advanced SQL Joins",
      icon: "/images/icon/icon-01.svg",

      objective: "Work with multiple datasets using SQL joins.",
      project: {
        description: "Merge sales and customer datasets for a telecom company.",
        tasks: [
          "Use INNER JOIN, LEFT JOIN, and FULL OUTER JOIN to integrate data.",
          "Analyze churn rates and customer lifetime value.",
        ],
        deliverables: ["SQL scripts and insights"],
      },
    },
    {
      week: 8,
      title: "Advanced Power BI Dashboards",
      icon: "/images/icon/icon-01.svg",

      objective: "Develop an end-to-end business dashboard.",
      project: {
        description:
          "Create an executive dashboard for a finance company’s quarterly performance.",
        tasks: [
          "Combine data from Excel and SQL.",
          "Create KPIs, custom visuals, and a clean layout.",
        ],
        deliverables: ["Power BI dashboard file"],
      },
    },
    {
      week: 9,
      title: "Data Automation in Excel",
      icon: "/images/icon/icon-01.svg",

      objective: "Use advanced Excel features for automation.",
      project: {
        description: "Automate monthly reporting for a manufacturing company.",
        tasks: [
          "Use macros and Power Query to clean and transform data.",
          "Automate creation of pivot tables and charts.",
        ],
        deliverables: ["Excel file with automated workflows"],
      },
    },
    {
      week: 10,
      title: "Case Study Analysis",
      icon: "/images/icon/icon-01.svg",

      objective: "Solve a real-world business problem.",
      project: {
        description:
          "A retail company needs insights into customer purchase behavior.",
        tasks: [
          "Use SQL to extract data, Excel for cleaning, and Power BI for visualization.",
          "Provide actionable recommendations.",
        ],
        deliverables: [
          "Final report with SQL scripts, Excel file, and Power BI report",
        ],
      },
    },
    {
      week: 11,
      title: "Predictive Modeling with Power BI",
      icon: "/images/icon/icon-01.svg",

      objective: "Create forecasts and predictions in Power BI.",
      project: {
        description: "Develop a sales forecasting model for a startup.",
        tasks: [
          "Use historical sales data to forecast future revenue trends.",
          "Incorporate Power BI’s forecasting and analytics tools.",
        ],
        deliverables: ["Forecasting dashboard"],
      },
    },
    {
      week: 12,
      title: "Capstone Project",
      icon: "/images/icon/icon-01.svg",

      objective: "Synthesize all skills in a comprehensive project.",
      project: {
        description:
          "Participants choose a domain (e.g., finance, healthcare, retail) and solve a business problem end-to-end.",
        tasks: [
          "Use SQL for data extraction and transformation.",
          "Use Excel for additional cleaning and KPIs.",
          "Build a Power BI dashboard for reporting.",
        ],
        deliverables: ["Final project report and presentation"],
      },
    },
    // {
    //   icon: "/images/icon/icon-01.svg",

    //   additional_elements: [
    //     {
    //       title: "Weekly Feedback Sessions",
    //       icon: "/images/icon/icon-01.svg",
    //       description:
    //         "Provide feedback on projects to help participants improve.",
    //     },
    //     {
    //       title: "Mentorship",
    //       icon: "/images/icon/icon-01.svg",
    //       description:
    //         "Assign mentors to guide participants through challenges.",
    //     },
    //     {
    //       title: "Portfolio Development",
    //       icon: "/images/icon/icon-01.svg",

    //       description:
    //         "Ensure participants leave with polished projects for their portfolios.",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto rounded-lg bg-gradient-to-t from-[#a0c8f2] to-[#F8F9FF] dark:bg-blacksection dark:bg-gradient-to-t dark:from-transparent dark:to-transparent dark:stroke-strokedark">
          <div className="flex flex-wrap gap-8 md:flex-nowrap md:justify-between md:gap-0">
            <div className="animate_left md:w-[70%] lg:w-1/2">
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-black text-left dark:text-white xl:text-sectiontitle4 pt-6 px-8">
                Internship Program
              </h2>
              <div  className="px-8">
              <p className="text-left">
                Unlock your potential with our transformative internship
                program—gain hands-on experience, mentorship, and the skills to
                excel in your career. Don't miss this chance to build your
                future—join us today and take the first step toward success!
              </p>
              <Link
                href="/internship-form"
                className="inline-flex rounded-full bg-black px-6 py-3 mt-6 font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
                style={{float:'left'}}
              >
                Closed
            
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

            <div className="animate_right lg:w-[45%]">
              <div className="flex items-center justify-end xl:justify-between">

    <DotLottieReact
      src="https://lottie.host/61c130d8-8d18-4ff7-b3d5-c5596dac5430/EilbcylZaY.lottie"
      loop
      autoplay
    />
 
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-8 mt-8">Courses Outline</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curriculum.map((item, index) => (
            <div className="animate_top z-40 rounded-lg border border-white bg-white p-7.5 shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark xl:p-12.5">
              <div className="relative flex h-16 w-16 items-center mb-4  justify-center rounded-[4px] bg-primary">
                <Image src={item?.icon} width={36} height={36} alt="title" />
              </div>
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
              <p className="text-gray-600 text-left">{item.objective}</p>
              {item.project && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2 text-left">
                    Project
                  </h3>
                  <p className="text-left">{item.project.description}</p>
                  <ul className="list-disc list-inside text-left text-gray-600 mt-2">
                    {item.project.tasks.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                  <h4 className="mt-2 font-semibold text-left">Deliverables</h4>
                  <ul className="list-disc list-inside text-left text-gray-600 mt-2">
                    {item.project.deliverables.map((deliverable, i) => (
                      <li key={i}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              )}
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
