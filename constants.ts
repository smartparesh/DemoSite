
export const INSTITUTE_INFO = {
  name: "Smart Education Centre",
  slogan: "Be Smart. Join Smart.",
  founder: "Paresh Joshi",
  email: "smartparesh@gmail.com",
  facebook: "https://www.facebook.com/smarteducationcentremumbai",
  whatsapp: "9221763659",
  established: "2000",
  branches: [
    {
      name: "Worli Branch",
      address: "BDD Chawl No. 48/19, Opp. Babasaheb Gawde School, Worli, Mumbai.",
      contacts: ["8097704000", "9221763659"],
      mapUrl: "https://maps.google.com/?q=Smart+Education+Centre+Worli"
    },
    {
      name: "Dadar (E) Branch",
      address: "5/249, Kohinoor Mill Compound, Naigaon, Dadar (E), Mumbai.",
      contacts: ["9987226967", "9221763659"],
      mapUrl: "https://maps.google.com/?q=Smart+Education+Centre+Dadar"
    }
  ],
  history: `Smart Education Centre is a trusted computer training institute dedicated to empowering students and working professionals with job-oriented, practical, and industry-relevant skills. Established in the year 2000, our mission has always been simple — to make quality computer education accessible, affordable, and career-focused. With over two decades of teaching experience, we understand the real challenges faced by students in today’s competitive job market.`
};

export const COURSE_CATALOG: any[] = [
  {
    id: "da",
    name: "Masters in Data Analysis",
    duration: "6 Months",
    fee: "30,000/-",
    offer: "22,500/-",
    installments: { admission: "₹7,500", emi: "₹3,000 x 5 Months" },
    icon: "fa-chart-pie",
    description: "Our flagship program designed for future Data Scientists and Analysts.",
    syllabus: [
      { 
        title: "Advanced Excel With AI", 
        points: ["Advanced Formulas & Nesting", "Pivot Tables & Slicers", "Excel Automation using AI", "Data Cleaning Techniques"] 
      },
      { 
        title: "Data Analysis With Python", 
        points: ["Pandas & NumPy Libraries", "Matplotlib for Visualization", "Exploratory Data Analysis (EDA)", "Scripting for Automation"] 
      },
      { 
        title: "Power BI", 
        points: ["Interactive Dashboards", "DAX Formulas", "Data Modeling", "Publishing Reports"] 
      },
      { 
        title: "MySQL", 
        points: ["Relational Database Basics", "SQL Queries (CRUD)", "Joins & Subqueries", "Database Management"] 
      }
    ]
  },
  {
    id: "cp",
    name: "Masters in Computer Programming",
    duration: "6 Months",
    fee: "30,000/-",
    offer: "22,500/-",
    installments: { admission: "₹7,500", emi: "₹3,000 x 5 Months" },
    icon: "fa-code",
    description: "Master the logic and languages behind modern software development.",
    syllabus: [
      { 
        title: "Programming in C", 
        points: ["Data Types & Variables", "Control Statements", "Arrays & Functions", "Pointers & Memory Management"] 
      },
      { 
        title: "OOP's in C++", 
        points: ["Classes & Objects", "Inheritance & Polymorphism", "Encapsulation", "Templates & File Handling"] 
      },
      { 
        title: "Python Programming", 
        points: ["Python Fundamentals", "File I/O", "GUI Programming Basics", "Integration with Databases"] 
      },
      { 
        title: "Core Java", 
        points: ["Java Virtual Machine (JVM)", "Multi-threading", "Exception Handling", "Java Collections Framework"] 
      },
      { 
        title: "MySQL", 
        points: ["Database Connectivity", "Transaction Management"] 
      }
    ]
  },
  {
    id: "tally",
    name: "Tally Master with GST",
    duration: "3 Months",
    fee: "9,000/-",
    installments: { admission: "₹3,000", emi: "₹3,000 x 2 Months" },
    icon: "fa-calculator",
    description: "Professional accounting training for students and commerce professionals.",
    syllabus: [
      { 
        title: "Manual to Computerized Accounting", 
        points: ["Golden Rules of Accounting", "Journal Entries", "Ledger Postings", "Trial Balance Preparation"] 
      },
      { 
        title: "Vouchers & Transactions", 
        points: ["Payment & Receipt Vouchers", "Sales & Purchase Cycles", "Contra & Journal Vouchers"] 
      },
      { 
        title: "GST (Goods & Services Tax)", 
        points: ["GST Setup in Tally", "IGST, CGST, SGST calculations", "GSTR Filing Basics", "E-Way Bill Generation"] 
      },
      { 
        title: "Taxation & Payroll", 
        points: ["TDS (Tax Deducted at Source)", "Payroll Management (Employee data)", "EPF & ESI Compliance"] 
      }
    ]
  },
  {
    id: "excel",
    name: "Smart Excel Expert With A.I.",
    duration: "3 Months",
    fee: "9,000/-",
    installments: { admission: "₹3,000", emi: "₹3,000 x 2 Months" },
    icon: "fa-file-excel",
    description: "Become an Excel power user by leveraging the latest AI tools and automation.",
    syllabus: [
      { 
        title: "Basic Excel", 
        points: ["Worksheet Basics", "Simple Arithmetic Formulas", "Formatting Cells", "Printing & Sorting Data"] 
      },
      { 
        title: "Advanced Excel", 
        points: ["VLOOKUP & HLOOKUP", "IF/OR/AND Conditions", "Array Formulas", "Macro Recording"] 
      },
      { 
        title: "Excel Automation with AI & VBA", 
        points: ["AI-powered Data Insights", "Introduction to VBA Scripting", "User-Defined Functions (UDF)", "Custom Excel Applications"] 
      }
    ]
  },
  {
    id: "mscit",
    name: "MS-CIT (Govt. Certified)",
    duration: "2 Months",
    fee: "6,000/-",
    installments: { admission: "₹3,000", emi: "₹3,000 x 1 Month" },
    icon: "fa-certificate",
    description: "The essential IT literacy course for every student in Maharashtra.",
    syllabus: [
      { 
        title: "Theory", 
        points: ["Computer Fundamentals", "Operating Systems", "Hardware Components", "Networking Basics"] 
      },
      { 
        title: "Practical Topics", 
        points: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Internet & Email Skills"] 
      },
      { 
        title: "ERA: eLearning Revolution", 
        points: ["Self-paced Learning Modules", "Interative Sessions", "MKCL Certification Guidance"] 
      }
    ]
  },
  {
    id: "dcm",
    name: "Diploma in Computer Management",
    duration: "2 Months",
    fee: "5,000/-",
    installments: { admission: "₹2,500", emi: "₹2,500 x 1 Month" },
    icon: "fa-desktop",
    description: "A comprehensive short-term course for administrative and design skills.",
    syllabus: [
      { 
        title: "MS-Office 2019", 
        points: ["Word Document Creation", "Spreadsheet Management", "Professional Presentations"] 
      },
      { 
        title: "Internet Skills", 
        points: ["Web Research", "Online Services", "Safety & Privacy"] 
      },
      { 
        title: "Canva Graphic Designing", 
        points: ["Social Media Post Design", "Brand Logos", "Flyers & Brochures", "Typography Basics"] 
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Aniket M.",
    course: "Masters in Data Analysis",
    text: "Excellent teaching! Paresh Sir explains complex topics like Python and Power BI in a very simple way. The practical lab sessions are the best part.",
    rating: 5
  },
  {
    name: "Priya Gupta",
    course: "Tally Master with GST",
    text: "I joined for Tally and was amazed by the detailed GST training. Very affordable and highly professional environment. Highly recommended for students.",
    rating: 5
  },
  {
    name: "Sandeep Parab",
    course: "MS-CIT",
    text: "The best computer institute in Dadar. Personal attention is given to every student, which you won't find in big classes. Truly value for money.",
    rating: 5
  }
];
