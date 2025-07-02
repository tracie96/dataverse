"use client";

import Image from "next/image";
import Link from "next/link";

const ResearchPage = () => {
  const services = [
    {
      title: "Research, Development & Innovation",
      description: "We design, test, and scale solutions tailored to Africa's complex development challenges.",
      items: [
        "Contract-based research & pilot projects",
        "Feasibility studies & innovation incubation",
        "Impact evaluations & R&D support",
      ]
    },
    {
      title: "Data Analytics & Visualization",
      description: "We turn complex data into clear, actionable insights using tools like Python, Power BI, and QGIS.",
      items: [
        "Quantitative & qualitative data analysis",
        "Big data modeling & statistical forecasting",
        "Dashboard development & interactive visualization",
      ]
    },
    {
      title: "Proposal, Grant & Academic Support",
      description: "We help individuals and institutions secure funding and publish research that matters.",
      items: [
        "Proposal and concept note development",
        "Grant sourcing and bid preparation",
        "Academic writing, systematic reviews, thesis support",
      ]
    },
    {
      title: "Monitoring, Evaluation, Learning & Needs Assessment (MELNA)",
      description: "We ensure programs are evidence-driven, adaptive, and results-oriented.",
      items: [
        "M&E frameworks, baseline/midline/endline studies",
        "Logic models & impact measurement",
        "Participatory needs assessments",
      ]
    },
    {
      title: "Capacity Building & Research Training",
      description: "We empower Africa's workforce and students with real-world research and data skills.",
      items: [
        "Training in research methods, ethics, proposal writing",
        "Practical workshops in M&E, GIS, AI, and data analysis",
      ]
    },
    {
      title: "Policy & Strategy Consulting",
      description: "We support informed decision-making through policy-relevant data and consulting.",
      items: [
        "Evidence-based public policy analysis",
        "Government and private sector strategy design",
        "Market research & social impact assessments",
      ]
    },
    {
      title: "Knowledge Management & Research Translation",
      description: "We amplify research impact by making it accessible, engaging, and actionable.",
      items: [
        "Webinars, conferences, open-access publishing",
        "Research-to-practice translation and dissemination",
        "Institutional knowledge repository development",
      ]
    },
  ];

  const flagshipProjects = [
    {
      title: "Business Analytics Adoption Among African SMEs",
      description: "This groundbreaking project explores how small and medium enterprises across Africa are leveraging business analytics tools to transform operations and gain a competitive edge.",
      impact: "Offers actionable insights for African governments, business development agencies, and digital service providers to support SME digital transformation."
    },
    {
      title: "ML-Driven Crop Disease Detection and Early Warning System",
      description: "In this agri-tech initiative, we are using machine learning models and image datasets to build a real-time disease detection and early warning system for crops like cassava.",
      features: [
        "1,000+ leaf image dataset (healthy & infected)",
        "CNN-based classification models",
        "GIS integration for field-level disease mapping",
        "Real-time alerts and decision support for farmers"
      ],
      impact: "Enhancing food security by reducing losses, enabling proactive response, and democratizing agri-intelligence for smallholder farmers across Africa."
    },
    {
      title: "Cross-Sectoral African Databank Initiative",
      description: "This strategic project aims to build a centralized, user-friendly repository of Africa-centric datasets spanning health, agriculture, education, energy, and governance.",
      features: [
        "Architecture inspired by Harvard Dataverse, customized for African needs",
        "FAIR-compliant dataset curation",
        "Data-sharing partnerships with local institutions",
        "Integration with continental initiatives"
      ],
      impact: "Laying the foundation for open data-driven research and innovation, enabling evidence-based policymaking, and promoting equitable access to quality African data."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 mt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Dataverse Africa Research Institute (DARI)
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-primary mb-8">
              Generating Insights. Driving Innovation. Transforming Africa.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              We exist to bridge the gap between data and decision-making through applied research, 
              strategic insight, and capacity building across Africa's key development sectors.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Our Flagship Projects
          </h2>
          <div className="space-y-12">
            {flagshipProjects.map((project, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {project.description}
                </p>
                {project.features && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      Project Features:
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    Impact:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Lead Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            About Research Lead
          </h2>
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-12">
            <div className="flex flex-col items-center text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Valentine Onyemeziri Chinazom
              </h3>
              <h4 className="text-xl text-blue-500 font-medium">
                Research Lead, Dataverse Africa Research Institute
              </h4>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 shrink-0">
                <Image
                  src="/images/brand/alex.jpg"
                  alt="Valentine Onyemeziri Chinazom"
                  width={192}
                  height={192}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Valentine is a dynamic researcher and data strategist with a passion for harnessing 
                data science to address Africa's most pressing challenges. With expertise in statistical 
                research, data analytics, and project leadership, he drives innovation-led research at 
                Dataverse Africa, focusing on digital transformation, global health, and sustainable development. 
                He has led cross-sectoral research initiatives, mentored emerging talent, and championed 
                data-driven decision-making across academia, government, and industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              📞 Let's Collaborate
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Whether you're a policymaker, academic, startup, or development partner, 
              Dataverse Africa Research Institute is your trusted partner for research, 
              innovation, and insight.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage; 