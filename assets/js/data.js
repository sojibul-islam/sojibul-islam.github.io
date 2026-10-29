/*
 * ============================================================
 *  SITE CONTENT — edit this file to update your website.
 *  Every page (Home, About, Research, Publications, Contact, CV)
 *  reads its content from here.
 *  Leave a link as "" (empty) to hide it from the site.
 * ============================================================
 */
window.SITE = {
  profile: {
    name: "Md. Sojibul Islam",
    shortName: "Sojibul Islam",
    credentials: "MS in Statistics",
    title: "Monitoring & Evaluation Officer",
    unit: "Non-communicable Disease, Nutrition Research Division",
    affiliation: "icddr,b",
    affiliationUrl: "https://www.icddrb.org",
    location: "Mohakhali, Dhaka, Bangladesh",
    photo: "assets/img/profile.jpg",
    keywords: ["Biostatistics", "Non-communicable Diseases", "Environmental Health", "Health Systems"],
    roles: ["Biostatistician", "Public Health Researcher", "M&E Specialist", "Health Data Scientist"],
    tagline: "Turning complex health data into evidence for non-communicable disease prevention, environmental health and stronger health systems in Bangladesh.",
    bio: [
      "I am a statistician and public health researcher at icddr,b, where I work as a Monitoring & Evaluation Officer in the Non-communicable Disease Unit of the Nutrition Research Division. My work spans research design, protocol development, field implementation and the statistical analysis of large health datasets.",
      "My research focuses on non-communicable diseases (hypertension, diabetes and pediatric NCDs), environmental health and WASH in coastal Bangladesh, and child nutrition. I have more than six years of experience in R, STATA, SPSS and Python, including regression, mixed models, structural equation modelling, survival analysis, geospatial analysis and machine learning."
    ]
  },

  contact: {
    email: "sojibulstat@gmail.com",
    phone: "" // optional — left empty for privacy
  },

  links: {
    orcid: "0000-0002-9065-1733",
    scholar: "",        // TODO: full Google Scholar profile URL
    researchgate: "",   // TODO: full ResearchGate profile URL
    linkedin: "https://www.linkedin.com/in/md-sojibul-islam-301a631a5/",
    github: "https://github.com/Rproblemsolver",
    cv: "assets/cv.pdf" // create this from cv.html (see GUIDE_BN.md)
  },

  // Optional: free contact form from https://formspree.io — paste your form ID (e.g. "xyzabcd")
  formspreeId: "",

  // Headline numbers on the home page
  stats: [
    { value: 6, suffix: "+", label: "Years of research" },
    { value: "pubs", suffix: "", label: "Publications & preprints" },
    { value: 16.5, suffix: "K", label: "Households surveyed" },
    { value: "projects", suffix: "", label: "Research projects" }
  ],

  // icon: ncd | water | child | system | chart
  interests: [
    {
      id: "ncd", icon: "ncd",
      title: "Non-communicable Diseases",
      text: "Hypertension, diabetes and their risk factors; medication affordability; pediatric NCDs.",
      details: "I study the burden, risk factors and management of hypertension and diabetes in Bangladesh, from community risk-factor surveys (COBRA-BPS) and digital health records to the price and affordability of NCD medicines. I also contribute to a longitudinal study of pediatric NCDs and to evidence syntheses on NCD screening and prevention."
    },
    {
      id: "environment", icon: "water",
      title: "Environmental Health & WASH",
      text: "Drinking-water salinity and quality in coastal Khulna and Satkhira, and its health effects.",
      details: "In coastal Bangladesh, drinking-water salinity is a growing threat linked to climate change. I manage and analyse a water-quality survey linked to ~16,500 households, using geospatial methods in R to connect households to their water sources and study NCD and environmental risk among older people."
    },
    {
      id: "nutrition", icon: "child",
      title: "Child Nutrition",
      text: "Determinants of stunting among under-five children using survey data and machine learning.",
      details: "My MS thesis applied machine-learning techniques to the 2017-18 Bangladesh Demographic and Health Survey to identify factors affecting stunting among under-five children, and I have presented this work at an international conference."
    },
    {
      id: "health-systems", icon: "system",
      title: "Health Systems & M&E",
      text: "Monitoring, evaluation and learning frameworks, health systems gap analysis and local health planning.",
      details: "I design M&E frameworks, theories of change and real-time monitoring dashboards, and support district and upazila Health Systems Improvement Plans (HSIPs) through stakeholder workshops and gap analyses."
    },
    {
      id: "biostatistics", icon: "chart",
      title: "Biostatistics & Data Science",
      text: "Mixed models, SEM, survival analysis, geospatial analysis, ML and interactive dashboards.",
      details: "Across projects I apply regression, mixed models, structural equation modelling, survival and trend analysis, text mining and machine learning, and build interactive dashboards in R Shiny and Power BI. I also teach R for data analysis and research."
    }
  ],

  // area must match an interest id above
  projects: [
    {
      area: "environment",
      title: "Drinking-water salinity & household health survey",
      org: "icddr,b",
      period: "2024 – present",
      text: "Data management and analysis of a drinking-water salinity/quality survey in Koyra (Khulna) and Assasuni (Satkhira), linked to a household survey of ~16,546 households (~56,000 members) in 30 villages. Geospatial analysis in R to compute household-to-water-source distances."
    },
    {
      area: "environment",
      title: "NCDs & environmental risk among older people",
      org: "icddr,b",
      period: "2024 – present",
      text: "Contributed to a concept note on NCDs and environment-related risk factors among older people in coastal Khulna and Satkhira."
    },
    {
      area: "ncd",
      title: "COBRA-BPS: Control of Blood Pressure and Risk Attenuation",
      org: "icddr,b — Bangladesh, Pakistan & Sri Lanka",
      period: "2023",
      text: "Objective-wise analysis of community NCD risk-factor data (socio-economic status, metabolic risk, diet, smoking, physical activity) using logistic, linear and survival models; built an evidence review matrix."
    },
    {
      area: "ncd",
      title: "COBRA Urban Digitization Study",
      org: "NCD Unit, icddr,b",
      period: "2023 – 2024",
      text: "Led study design, implementation and monitoring at Primary Health Care Centre (PHCC-1) and Dhaka Mohanagar General Hospital."
    },
    {
      area: "ncd",
      title: "Hypertension & diabetes identification (WHO SEARO)",
      org: "icddr,b — Matlab",
      period: "2023 – 2024",
      text: "Supported implementation of hypertension and diabetes identification among adults aged 40+ in Matlab North and South."
    },
    {
      area: "ncd",
      title: "Pediatric NCD study & scoping review",
      org: "icddr,b",
      period: "2023 – 2024",
      text: "Longitudinal study of risk factors for cardiovascular disease, cancer, respiratory disease, diabetes and mental health in children; scoping review using PubMed, Scopus, EBSCO and Cochrane."
    },
    {
      area: "health-systems",
      title: "Health Systems Improvement Plans (HSIP)",
      org: "icddr,b",
      period: "2024 – present",
      text: "Supported the development, testing and piloting of local Health Systems Improvement Plans and toolkits at district and upazila levels, alongside complaint and feedback mechanisms."
    },
    {
      area: "nutrition",
      title: "MS thesis: stunting & machine learning",
      org: "Mawlana Bhashani Science and Technology University",
      period: "2021",
      text: "Factors affecting stunting among under-five children in Bangladesh: an illustration of various machine learning techniques using 2017-18 BDHS data."
    },
    {
      area: "biostatistics",
      title: "BSc project: rural–urban fertility",
      org: "Mawlana Bhashani Science and Technology University",
      period: "2019",
      text: "Comparative analysis of rural and urban ever-married women's fertility in Bangladesh using generalised linear models (BDHS data)."
    }
  ],

  // type: "journal" | "conference" | "preprint" | "other"
  // Wrap your own name in ** ** to show it in bold, e.g. "Author A, **Islam MS**, Author B"
  // topics: short tags used for the topic filter on the Publications page
  publications: [
    {
      type: "preprint",
      year: 2026,
      title: "Social marketing strategies for non-communicable disease screening and prevention in low- and middle-income countries: a systematic review using a social ecological model framework",
      authors: "Mondal S, Adhikary RK, Chakma N, Farzana N, Zabeen SI, Ali SB, Fattah MSH, **Islam MS**, Nahrin R, Tarique DA, Khan TU, Rahman M, Ahmed M, Sutarsa IN, Kelly M, Naheed A, Chakrabortty RK, Sarma H",
      venue: "SSRN Electronic Journal",
      details: "2026",
      doi: "10.2139/ssrn.6935380",
      note: "Preprint",
      topics: ["NCD", "Health promotion", "Systematic review"]
    },
    {
      type: "journal",
      year: 2026,
      title: "Patterns, prices, and affordability of hypertension and diabetes medications in Bangladesh: a community-based cross-sectional study",
      authors: "Islam MS, Ali SB, **Islam MS**, Zabeen SI, Khan KA, Madan J, Patel JV, Harris B, Gill P, Naheed A",
      venue: "BMC Public Health",
      details: "2026",
      doi: "10.1186/s12889-026-29888-4",
      note: "Accepted",
      topics: ["NCD", "Access to medicines"]
    },
    {
      type: "journal",
      year: 2023,
      title: "Evaluation of the potential associated factors contributing to various side effects of COVID-19 vaccines in Bangladesh",
      authors: "Tamanna S, Ghosh R, Reza S, **Islam S**, Khan NM",
      venue: "International Journal of Applied Pharmaceutics",
      details: "2023;15(6)",
      doi: "10.22159/ijap.2023v15i6.49298",
      note: "",
      topics: ["COVID-19", "Vaccine safety"]
    },
    {
      type: "conference",
      year: 2023,
      title: "Reduction of the prevalence of stunting among children in Bangladesh (case study)",
      authors: "**Islam MS**",
      venue: "International conference presentation",
      details: "",
      doi: "",
      note: "",
      topics: ["Child nutrition"]
    }
  ],

  // Latest news shown on the home page (newest first). link is optional.
  news: [
    {
      date: "2026-06",
      tag: "Preprint",
      title: "New preprint: social marketing strategies for NCD screening and prevention in LMICs",
      text: "A systematic review using a social ecological model framework, now available on SSRN.",
      link: "https://doi.org/10.2139/ssrn.6935380"
    },
    {
      date: "2026",
      tag: "Publication",
      title: "Paper accepted in BMC Public Health",
      text: "Patterns, prices and affordability of hypertension and diabetes medications in Bangladesh.",
      link: "https://doi.org/10.1186/s12889-026-29888-4"
    },
    {
      date: "2024-10",
      tag: "Career",
      title: "Joined icddr,b as Monitoring & Evaluation Officer",
      text: "Leading M&E, environmental health and health-systems research in coastal Khulna and Satkhira.",
      link: ""
    }
  ],

  experience: [
    {
      role: "Monitoring & Evaluation Officer",
      org: "icddr,b",
      period: "Oct 2024 – Present",
      points: [
        "Draft research protocols for IRB review; contribute to grant writing and concept notes.",
        "Design mixed-methods baseline and endline surveys; epidemiological and health-systems gap analyses.",
        "Develop M&E frameworks, theories of change and real-time monitoring dashboards in R.",
        "District-level project representative coordinating with local health authorities, NGOs and partners."
      ]
    },
    {
      role: "Senior Research Assistant",
      org: "icddr,b",
      period: "Feb 2024 – Oct 2024",
      points: [
        "Designed and implemented mixed-methods surveys; managed field operations and data collection.",
        "Analysed health datasets in R, STATA and SPSS; built Power BI and R Shiny dashboards."
      ]
    },
    {
      role: "Research Assistant",
      org: "icddr,b",
      period: "Aug 2023 – Feb 2024",
      points: [
        "Led the COBRA Urban Digitization Study; supported the WHO SEARO hypertension and diabetes study.",
        "Analysed cohort and case-control data; trained field teams; scoping review for the Pediatric NCD study."
      ]
    },
    {
      role: "Research Intern (Statistician)",
      org: "NCD Unit, Nutrition Research Division, icddr,b",
      period: "Mar 2023 – Jul 2023",
      points: [
        "Statistical analysis of COBRA-BPS data; data cleaning and quality checks.",
        "Contributed to epidemiology and health data science books in R (The Global Health Network Asia)."
      ]
    },
    {
      role: "Data Analyst",
      org: "Cognitive Solution Bangladesh",
      period: "Sep 2021 – Feb 2023",
      points: [
        "Infection, vaccine and surveillance research; RCT, cluster RCT and non-inferiority designs.",
        "Supervised the data management team; GIS (QGIS/ArcMap), text mining and dashboards."
      ]
    },
    {
      role: "Junior Data Analyst",
      org: "Cognitive Solution Bangladesh",
      period: "Feb 2020 – Sep 2021",
      points: [
        "Analysed hospital, field survey and DSS data; statistical modelling in STATA, R and Python."
      ]
    }
  ],

  education: [
    { degree: "MS in Statistics", org: "Mawlana Bhashani Science and Technology University", year: "2021", result: "CGPA 3.93 / 4.00" },
    { degree: "BSc (Hons) in Statistics", org: "Mawlana Bhashani Science and Technology University", year: "2019", result: "CGPA 3.72 / 4.00" }
  ],

  skills: [
    { group: "Statistical software", items: ["R", "R Markdown", "R Shiny", "Python", "STATA", "SPSS", "SAS"] },
    { group: "Visualisation & GIS", items: ["Power BI", "Tableau", "Flexdashboard", "QGIS", "ArcMap"] },
    { group: "Methods", items: ["Regression", "Mixed models", "SEM", "Survival analysis", "Machine learning", "Text mining", "Trend tests"] },
    { group: "Study designs", items: ["RCT", "Cluster RCT", "Cohort", "Case-control", "Cross-sectional", "Mixed methods"] }
  ],

  training: [
    { title: "Instructor, R Programming for Data Analysis and Research", org: "Data Skewed Consultancy", year: "" },
    { title: "R Programmer (professional course)", org: "Cognitive Solution Bangladesh", year: "" },
    { title: "Ethics in Research", org: "Initiative for Non-communicable Diseases, icddr,b", year: "2023" },
    { title: "Qualitative Research", org: "NCD, Nutrition Research Division, icddr,b", year: "2023" },
    { title: "Developing an analytical plan: the gateway to writing a manuscript", org: "icddr,b", year: "2023" },
    { title: "The Global Health Network Asia: leadership in health research and data science", org: "icddr,b", year: "2023" }
  ],

  languages: ["Bangla (native)", "English (fluent)"]
};
