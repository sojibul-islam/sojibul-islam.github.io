/*
 * ============================================================
 *  SITE CONTENT — edit this file to update your website.
 *  index.html and cv.html both read everything from here.
 *  Lines marked TODO need your real information.
 *  Leave a link as "" (empty) to hide it from the site.
 * ============================================================
 */
window.SITE = {
  profile: {
    name: "Md. Sojibul Islam",
    shortName: "Sojibul Islam",
    title: "Monitoring & Evaluation Officer",
    affiliation: "icddr,b",
    affiliationUrl: "https://www.icddrb.org",
    location: "Mohakhali, Dhaka, Bangladesh",
    photo: "assets/img/profile.jpg", // put your photo here; initials are shown if missing
    tagline: "Statistician & public health researcher working on non-communicable diseases, environmental health and health systems in Bangladesh.",
    bio: [
      "I am a statistician and public health researcher at icddr,b, where I work as a Monitoring & Evaluation Officer. My work spans research design, protocol development, field implementation and the statistical analysis of large health datasets.",
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
  formspreeId: "", // TODO (optional)

  interests: [
    { title: "Non-communicable diseases", text: "Hypertension, diabetes and their risk factors; medication affordability; pediatric NCDs." },
    { title: "Environmental health & WASH", text: "Drinking-water salinity and quality in coastal Khulna and Satkhira, and its health effects." },
    { title: "Child nutrition", text: "Determinants of stunting among under-five children using survey data and machine learning." },
    { title: "Health systems & M&E", text: "Monitoring, evaluation and learning frameworks, health systems gap analysis and local health planning." },
    { title: "Biostatistics & data science", text: "Mixed models, SEM, survival analysis, geospatial analysis, ML and interactive dashboards." }
  ],

  projects: [
    {
      title: "Drinking-water salinity & household health survey",
      org: "icddr,b",
      period: "2024 – present",
      text: "Data management and analysis of a drinking-water salinity/quality survey in Koyra (Khulna) and Assasuni (Satkhira), linked to a household survey of ~16,546 households (~56,000 members) in 30 villages. Geospatial analysis in R to compute household-to-water-source distances."
    },
    {
      title: "NCDs & environmental risk among older people",
      org: "icddr,b",
      period: "2024 – present",
      text: "Contributed to a concept note on NCDs and environment-related risk factors among older people in coastal Khulna and Satkhira."
    },
    {
      title: "COBRA-BPS: Control of Blood Pressure and Risk Attenuation",
      org: "icddr,b — Bangladesh, Pakistan & Sri Lanka",
      period: "2023",
      text: "Objective-wise analysis of community NCD risk-factor data (socio-economic status, metabolic risk, diet, smoking, physical activity) using logistic, linear and survival models; built an evidence review matrix."
    },
    {
      title: "COBRA Urban Digitization Study",
      org: "NCD Unit, icddr,b",
      period: "2023 – 2024",
      text: "Led study design, implementation and monitoring at Primary Health Care Centre (PHCC-1) and Dhaka Mohanagar General Hospital."
    },
    {
      title: "Hypertension & diabetes identification (WHO SEARO)",
      org: "icddr,b — Matlab",
      period: "2023 – 2024",
      text: "Supported implementation of hypertension and diabetes identification among adults aged 40+ in Matlab North and South."
    },
    {
      title: "Pediatric NCD study & scoping review",
      org: "icddr,b",
      period: "2023 – 2024",
      text: "Longitudinal study of risk factors for cardiovascular disease, cancer, respiratory disease, diabetes and mental health in children; scoping review using PubMed, Scopus, EBSCO and Cochrane."
    },
    {
      title: "MS thesis: stunting & machine learning",
      org: "Mawlana Bhashani Science and Technology University",
      period: "2021",
      text: "Factors affecting stunting among under-five children in Bangladesh: an illustration of various machine learning techniques using 2017-18 BDHS data."
    },
    {
      title: "BSc project: rural–urban fertility",
      org: "Mawlana Bhashani Science and Technology University",
      period: "2019",
      text: "Comparative analysis of rural and urban ever-married women's fertility in Bangladesh using generalised linear models (BDHS data)."
    }
  ],

  // type: "journal" | "conference" | "preprint" | "other"
  // Wrap your own name in ** ** to show it in bold, e.g. "Author A, **Islam MS**, Author B"
  publications: [
    {
      type: "preprint",
      year: 2026,
      title: "Social marketing strategies for non-communicable disease screening and prevention in low- and middle-income countries: a systematic review using a social ecological model framework",
      authors: "Mondal S, Adhikary RK, Chakma N, Farzana N, Zabeen SI, Ali SB, Fattah MSH, **Islam MS**, Nahrin R, Tarique DA, Khan TU, Rahman M, Ahmed M, Sutarsa IN, Kelly M, Naheed A, Chakrabortty RK, Sarma H",
      venue: "SSRN Electronic Journal",
      details: "2026",
      doi: "10.2139/ssrn.6935380",
      note: "Preprint"
    },
    {
      type: "journal",
      year: 2026,
      title: "Patterns, prices, and affordability of hypertension and diabetes medications in Bangladesh: a community-based cross-sectional study",
      authors: "Islam MS, Ali SB, **Islam MS**, Zabeen SI, Khan KA, Madan J, Patel JV, Harris B, Gill P, Naheed A",
      venue: "BMC Public Health",
      details: "2026",
      doi: "10.1186/s12889-026-29888-4",
      note: "Accepted"
    },
    {
      type: "journal",
      year: 2023,
      title: "Evaluation of the potential associated factors contributing to various side effects of COVID-19 vaccines in Bangladesh",
      authors: "Tamanna S, Ghosh R, Reza S, **Islam S**, Khan NM",
      venue: "International Journal of Applied Pharmaceutics",
      details: "2023;15(6)",
      doi: "10.22159/ijap.2023v15i6.49298",
      note: ""
    },
    {
      type: "conference",
      year: 2023,
      title: "Reduction of the prevalence of stunting among children in Bangladesh (case study)",
      authors: "**Islam MS**",
      venue: "International conference presentation",
      details: "",
      doi: "",
      note: ""
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
