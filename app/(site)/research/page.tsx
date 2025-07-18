"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Target, Award, Mail, Users, Lightbulb, Building, Search, BarChart3, FileText, GraduationCap, Database } from "lucide-react";

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-c-1390 mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-hero md:text-sectiontitle3 font-bold leading-tight">
            Dataverse Africa Research Institute
            <span className="block text-titlebg text-sectiontitle4 md:text-sectiontitle2 font-medium mt-4">
              (DARI)
            </span>
          </h1>
          
          <p className="text-para2 font-light max-w-3xl mx-auto leading-relaxed">
            Generating Insights. Driving Innovation. Transforming Africa.
          </p>
          
          <p className="text-metatitle3 max-w-4xl mx-auto leading-relaxed opacity-90">
            We bridge the gap between data and decision-making through applied research, 
            strategic insight, and capacity building across Africa's key development sectors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="bg-titlebg hover:bg-titlebgdark text-white px-8 py-4 text-metatitle3 font-medium rounded-lg transition-all duration-300 shadow-solid-5">
              Explore Our Work
            </button>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-metatitle3 font-medium rounded-lg backdrop-blur-sm transition-all duration-300">
              Let's Collaborate
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

// Services Component
const services = [
  {
    icon: Search,
    title: "Research, Development & Innovation",
    description: "Contract-based research & pilot projects, feasibility studies & innovation incubation, impact evaluations & R&D support. We design, test, and scale solutions tailored to Africa's complex development challenges."
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Visualization",
    description: "Quantitative & qualitative data analysis, big data modeling & statistical forecasting, dashboard development & interactive visualization. We turn complex data into clear, actionable insights using tools like Python, Power BI, and QGIS."
  },
  {
    icon: FileText,
    title: "Proposal, Grant & Academic Support",
    description: "Proposal and concept note development, grant sourcing and bid preparation, academic writing, systematic reviews, thesis support. We help individuals and institutions secure funding and publish research that matters."
  },
  {
    icon: Target,
    title: "Monitoring, Evaluation, Learning & Needs Assessment (MELNA)",
    description: "M&E frameworks, baseline/midline/endline studies, logic models & impact measurement, participatory needs assessments. We ensure programs are evidence-driven, adaptive, and results-oriented."
  },
  {
    icon: GraduationCap,
    title: "Capacity Building & Research Training",
    description: "Training in research methods, ethics, proposal writing, practical workshops in M&E, GIS, AI, and data analysis. We empower Africa's workforce and students with real-world research and data skills."
  },
  {
    icon: Users,
    title: "Policy & Strategy Consulting",
    description: "Evidence-based public policy analysis, government and private sector strategy design, market research & social impact assessments. We support informed decision-making through policy-relevant data and consulting."
  },
  {
    icon: Database,
    title: "Knowledge Management & Research Translation",
    description: "Webinars, conferences, open-access publishing, research-to-practice translation and dissemination, institutional knowledge repository development. We amplify research impact by making it accessible, engaging, and actionable."
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            What We Do
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Our comprehensive suite of services covers every aspect of research and innovation, 
            from conception to implementation and impact measurement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group hover:shadow-solid-7 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-7.5"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-itemtitle2 font-semibold text-black dark:text-white group-hover:text-primary transition-colors mb-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-regular text-waterloo dark:text-manatee leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Component
const projects = [
  {
    title: "Business Analytics Adoption Among African SMEs",
    description: "This groundbreaking project explores how small and medium enterprises across Africa are leveraging business analytics tools to transform operations and gain a competitive edge.",
    impact: "Offers actionable insights for African governments, business development agencies, and digital service providers to support SME digital transformation.",
    image: "/images/brand/brand-dark-01.svg",
    tags: ["Business Analytics", "SME Development", "Digital Transformation"]
  },
  {
    title: "ML-Driven Crop Disease Detection and Early Warning System",
    description: "In this agri-tech initiative, we are using machine learning models and image datasets to build a real-time disease detection and early warning system for crops like cassava.",
    impact: "Enhancing food security by reducing losses, enabling proactive response, and democratizing agri-intelligence for smallholder farmers across Africa.",
    features: [
      "1,000+ leaf image dataset (healthy & infected)",
      "CNN-based classification models", 
      "GIS integration for field-level disease mapping",
      "Real-time alerts and decision support for farmers"
    ],
    image: "/images/brand/brand-dark-02.svg",
    tags: ["Machine Learning", "Agriculture", "Food Security", "GIS"]
  },
  {
    title: "Cross-Sectoral African Databank Initiative",
    description: "This strategic project aims to build a centralized, user-friendly repository of Africa-centric datasets spanning health, agriculture, education, energy, and governance.",
    impact: "Laying the foundation for open data-driven research and innovation, enabling evidence-based policymaking, and promoting equitable access to quality African data.",
    features: [
      "Architecture inspired by Harvard Dataverse, customized for African needs",
      "FAIR-compliant dataset curation",
      "Data-sharing partnerships with local institutions",
      "Integration with continental initiatives"
    ],
    image: "/images/brand/brand-dark-03.svg",
    tags: ["Open Data", "Data Governance", "Policy", "Research Infrastructure"]
  }
];

const Projects = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            Our Flagship Projects
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Innovative research initiatives that are transforming Africa's development landscape 
            through cutting-edge technology and data-driven insights.
          </p>
        </div>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group hover:shadow-solid-7 transition-all duration-300 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Image 
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300"></div>
                </div>
                
                <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="bg-titlebg2 text-white px-3 py-1 rounded-full text-metatitle font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-itemtitle font-bold text-black dark:text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-regular text-waterloo dark:text-manatee leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.features && (
                      <div>
                        <h4 className="font-semibold text-black dark:text-white mb-2">Project Features:</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sectiontitle text-waterloo dark:text-manatee flex items-start">
                              <span className="text-titlebg mr-2 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <h4 className="font-semibold text-black dark:text-white mb-2">Impact:</h4>
                      <p className="text-sectiontitle text-waterloo dark:text-manatee leading-relaxed bg-titlebg/10 p-3 rounded-lg border-l-4 border-titlebg">
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section className="py-20 bg-alabaster dark:bg-blacksection">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            About Our Research Leaders
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Meet the visionary leaders driving innovation and research excellence at DARI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Valentine's Profile */}
          <div className="overflow-hidden shadow-solid-3 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Profile Section */}
              <div className="lg:col-span-1 bg-primary p-6 text-center text-white">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-itemtitle2 font-bold mb-2">Valentine Onyemeziri Chinazom</h3>
                <p className="text-white/90 text-regular font-medium">Research Lead</p>
                <p className="text-white/80 text-sectiontitle mt-1">Dataverse Africa Research Institute</p>
              </div>
              
              {/* Content Section */}
              <div className="lg:col-span-2 p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-metatitle3 font-semibold text-black dark:text-white mb-3 flex items-center">
                      <Target className="h-4 w-4 text-titlebg mr-2" />
                      About Valentine
                    </h4>
                    <p className="text-waterloo dark:text-manatee leading-relaxed text-sectiontitle">
                      Valentine is a dynamic researcher and data strategist with a passion for harnessing 
                      data science to address Africa's most pressing challenges. With expertise in statistical 
                      research, data analytics, and project leadership, he drives innovation-led research at 
                      Dataverse Africa, focusing on digital transformation, global health, and sustainable development.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-metatitle3 font-semibold text-black dark:text-white mb-3 flex items-center">
                      <Award className="h-4 w-4 text-titlebg mr-2" />
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-titlebg mr-2 mt-1">•</span>
                        <p className="text-waterloo dark:text-manatee text-sectiontitle">Led cross-sectoral research initiatives across multiple African countries</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-titlebg mr-2 mt-1">•</span>
                        <p className="text-waterloo dark:text-manatee text-sectiontitle">Mentored emerging talent in data science and research methodologies</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-titlebg mr-2 mt-1">•</span>
                        <p className="text-waterloo dark:text-manatee text-sectiontitle">Championed data-driven decision-making across academia, government, and industry</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-regular font-semibold text-black dark:text-white mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "Statistical Research",
                        "Data Analytics", 
                        "Project Leadership",
                        "Digital Transformation",
                        "Global Health",
                        "Sustainable Development"
                      ].map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-metatitle font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chidinma's Profile */}
          <div className="overflow-hidden shadow-solid-3 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Profile Section */}
              <div className="lg:col-span-1 bg-titlebg p-6 text-center text-white">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-itemtitle2 font-bold mb-2">Chidinma Helen Okorie</h3>
                <p className="text-white/90 text-regular font-medium">Strategy Associate</p>
                <p className="text-white/80 text-sectiontitle mt-1">Agriculture & Food Security Expert</p>
              </div>
              
              {/* Content Section */}
              <div className="lg:col-span-2 p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-metatitle3 font-semibold text-black dark:text-white mb-3 flex items-center">
                      <Target className="h-4 w-4 text-titlebg mr-2" />
                      About Chidinma
                    </h4>
                    <p className="text-waterloo dark:text-manatee leading-relaxed text-sectiontitle">
                      Chidinma is a multidisciplinary agriculture professional with a robust blend of technical expertise 
                      and leadership experience across integrated crop and livestock systems, mechanized farming, and field research. 
                      She expertly applies advanced analytical tools to assess cassava physiology, beta-carotene content, 
                      tuber bulk density, and food processing quality metrics.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-metatitle3 font-semibold text-black dark:text-white mb-3 flex items-center">
                      <Award className="h-4 w-4 text-titlebg mr-2" />
                      Research Focus & Publications
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-titlebg mr-2 mt-1">•</span>
                        <p className="text-waterloo dark:text-manatee text-sectiontitle">Plant genetics and improvement of underutilized crops, particularly Bambara groundnut</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-titlebg mr-2 mt-1">•</span>
                        <p className="text-waterloo dark:text-manatee text-sectiontitle">Published research on soil physico-chemical properties of hot yellow pepper (2021)</p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-titlebg mr-2 mt-1">•</span>
                        <p className="text-waterloo dark:text-manatee text-sectiontitle">Sustainable composting for containerized tomato production (2024)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-regular font-semibold text-black dark:text-white mb-2">Technical Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "Gene Editing",
                        "Molecular Breeding",
                        "Crop Physiology",
                        "Food Processing",
                        "Agricultural Innovation",
                        "Climate-Smart Agriculture"
                      ].map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-titlebg/10 text-titlebg px-3 py-1 rounded-full text-metatitle font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Joint Mission Statement */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="shadow-solid-3 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg">
            <div className="p-8 text-center">
              <blockquote className="text-waterloo dark:text-manatee italic text-metatitle3 leading-relaxed">
                "Together, we harness the power of data science and agricultural innovation to transform Africa 
                through evidence-based solutions that create lasting impact across communities, sectors, and food systems."
              </blockquote>
              <div className="mt-6 text-center text-sectiontitle text-waterloo dark:text-manatee">
                <p><strong>Valentine Onyemeziri Chinazom</strong> - Research Lead</p>
                <p><strong>Chidinma Helen Okorie</strong> - Strategy Associate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Component
const collaborationTypes = [
  {
    icon: Building,
    title: "Policymakers",
    description: "Evidence-based policy analysis and strategic guidance for informed governance decisions."
  },
  {
    icon: Users,
    title: "Academic Institutions",
    description: "Research partnerships, capacity building, and knowledge sharing initiatives."
  },
  {
    icon: Lightbulb,
    title: "Startups & Innovation",
    description: "R&D support, feasibility studies, and innovation incubation services."
  },
  {
    icon: Users,
    title: "Development Partners",
    description: "Impact evaluations, M&E frameworks, and program effectiveness assessments."
  }
];

const Contact = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="max-w-c-1390 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sectiontitle2 md:text-sectiontitle3 font-bold text-black dark:text-white mb-6">
            📞 Let's Collaborate
          </h2>
          <p className="text-metatitle3 text-waterloo dark:text-manatee max-w-3xl mx-auto">
            Whether you're a policymaker, academic, startup, or development partner, 
            Dataverse Africa Research Institute is your trusted partner for research, 
            innovation, and insight.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {collaborationTypes.map((type, index) => (
            <div 
              key={index}
              className="text-center group hover:shadow-solid-7 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg p-7.5"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-titlebg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <type.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-metatitle3 font-semibold text-black dark:text-white group-hover:text-primary transition-colors mb-4">
                {type.title}
              </h3>
              <p className="text-sectiontitle text-waterloo dark:text-manatee leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="shadow-solid-3 bg-white dark:bg-blacksection border border-stroke dark:border-strokedark rounded-lg">
            <div className="p-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <Mail className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-itemtitle font-bold text-black dark:text-white mb-4">
                Ready to Start Your Project?
              </h3>
              
              <p className="text-waterloo dark:text-manatee mb-8 leading-relaxed">
                Get in touch with our research team to discuss how we can support your 
                research, innovation, or capacity building needs. We're here to transform 
                your data challenges into opportunities for impact.
              </p>
              
              <div className="space-y-4">
                {/* <Link href="/contact">
                  <button className="bg-primary hover:bg-primaryho text-white px-8 py-4 text-metatitle3 font-medium w-full sm:w-auto transition-all duration-300 shadow-solid-5 rounded-lg">
                    Contact Our Research Team
                  </button>
                </Link> */}
                
                <div className="text-sectiontitle text-waterloo dark:text-manatee">
                  <p>Research Lead: Valentine Onyemeziri Chinazom</p>
                  <p>Email: valentine.onyemeziri@dataverseafrica.org</p>
                  <p className="mt-1">Dataverse Africa Research Institute</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchPage; 