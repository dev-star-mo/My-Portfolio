import type { DomainCategory, ProjectItem, ProjectStatus } from '@/types/portfolio';

export const domainLabels: Record<DomainCategory, string> = {
  iot: 'IoT & Connected Systems',
  backend: 'Software',
  analytics: 'Data Analytics',
};

export const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'sample-case-study': 'Sample case study',
  'in-progress': 'In progress',
  concept: 'Concept',
};

/** Shown on the Featured tab (and on matching IoT / Software category filters). */
export const featuredProjects: ProjectItem[] = [
  {
    id: 'forest-acoustic-monitoring',
    title: 'Acoustic Forest Monitoring & Ranger Alert System (Wangari Maathai Foundation Hackathon)',
    subtitleBadge: 'Hackathon Entry',
    primaryCategory: 'iot',
    secondaryDomains: ['backend', 'analytics'],
    status: 'completed',
    contextProblem:
      'Kenya loses more than 87,000 Ha of forested land each year to illegal logging. Traditional response methods are slow, so illegal loggers often escape without being identified.',
    roleContribution:
      'Developed the TinyML sensor-to-alert pipeline (ESP32 sound classification, LoRaWAN alerting, Node-RED / Node.js processing with SMS notification) and the ranger dashboard for viewing and resolving alerts.',
    solutionArchitecture:
      'A LoRaWAN ESP32 sensor with a microphone listens to the forest. A quantized TinyML model running on the ESP32 classifies the sound; when it detects illegal logging activity (chainsaw, axe, truck engine), a LoRaWAN alert is sent through a gateway at the forest warden’s office. Node-RED and Node.js process the alert and send an SMS with the forest region, and rangers view and resolve alerts on a dedicated dashboard.',
    architectureFlow: [
      'ESP32 mic + TinyML',
      'LoRaWAN gateway',
      'Node-RED / Node.js',
      'FastAPI + PostgreSQL',
      'SMS + React ranger dashboard',
    ],
    techStack: ['ESP32 (ESP-IDF)', 'TinyML', 'LoRaWAN', 'Node-RED', 'FastAPI', 'PostgreSQL', 'React (Vite)'],
    outcomeEvidence:
      'Built for the Wangari Maathai Foundation Hackathon. The ranger dashboard and source code are publicly available.',
    links: {
      liveDemo: 'https://green-movers-254.vercel.app/',
      github: 'https://github.com/dev-star-mo/GreenMovers-254',
    },
  },
  {
    id: 'fuzzy-factory',
    title: 'Fuzzy Factory: Marketing Funnel & Traffic Performance Analytics',
    subtitleBadge: 'Ke Data Lab · BI Final Project',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'An e-commerce business tracked website traffic and orders in raw tables but could not answer marketing-channel, conversion-funnel or product-return questions without writing complex multi-table joins for every query.',
    roleContribution:
      'Final project for the Ke Data Lab Business Intelligence with SQL and Power BI course: modelled a session-grain hub-and-spoke schema in SQL Server, engineered fact tables and DAX measures, and built an interactive Power BI Desktop report.',
    solutionArchitecture:
      'Raw website sessions, pageviews, orders and refunds were reshaped into fact_sessions and related funnel / traffic / product-performance tables. Marketing channels were normalised from UTM fields, pageviews were pivoted into session milestones, and Power BI pages cover executive summary, ad performance, return rate and conversion funnel.',
    architectureFlow: [
      'Raw session & order tables',
      'T-SQL fact modelling',
      'DAX measures',
      'Power BI dashboards',
    ],
    techStack: ['SQL Server (T-SQL)', 'Power BI', 'DAX', 'Star / hub-spoke modelling'],
    outcomeEvidence:
      'Ke Data Lab BI final project with SQL engineering, DAX measures and multi-page Power BI report. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/Fuzzy_Factory',
    },
  },
  {
    id: 'angani-air-analysis',
    title: 'Angani Air: Loyalty Campaign Customer Analysis',
    subtitleBadge: 'Ke Data Lab · Python · In Progress',
    primaryCategory: 'analytics',
    status: 'in-progress',
    contextProblem:
      'Angani Air (a fictional African airline) ran a 2018 loyalty promotion that drove many new sign-ups. Management wanted to know whether the campaign changed customer behaviour and where to focus future loyalty investment.',
    roleContribution:
      'Ke Data Lab Python for Data Analytics course project: cleaned and merged loyalty and flight-activity data, engineered customer-level features, built like-for-like campaign comparison tables, and completed the first round of exploratory analysis.',
    solutionArchitecture:
      'Three CSVs (loyalty history, flight activity, calendar) are audited and cleaned in pandas, merged on loyalty number, and enriched with travel, points, membership-lifecycle and CLV features. Promotion vs standard members enrolled in the same months are compared over a fixed follow-up window.',
    architectureFlow: [
      'CSV loyalty & flight data',
      'pandas cleaning & merge',
      'Feature engineering',
      'Campaign comparison + EDA',
    ],
    techStack: ['Python', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'plotly', 'Jupyter'],
    outcomeEvidence:
      'Data cleaning, feature engineering, campaign comparison tables and first-pass EDA are complete. Statistical testing and final recommendations are still in progress.',
    progressNote:
      'Work in progress: statistical tests, retention/redemption deep-dives and final recommendations remain.',
    links: {
      github: 'https://github.com/dev-star-mo/angani_air_analysis',
    },
  },
  {
    id: 'novadrive-car-rentals',
    title: 'NovaDrive Car Rentals Platform',
    subtitleBadge: 'Live Production Site',
    primaryCategory: 'backend',
    status: 'completed',
    contextProblem:
      'A Nairobi luxury car rental and leasing business needed a single web platform where customers could browse the fleet, reserve a vehicle, sign a digital rental agreement, and pay — instead of juggling calls, WhatsApp threads and paper contracts.',
    roleContribution:
      'Designed and built the full stack: Next.js app, Supabase schema and RLS, booking and checkout APIs, BoldSign contract embedding, Paystack (M-Pesa / card) payments, lease-request intake, admin surfaces, and Netlify deployment.',
    solutionArchitecture:
      'Customers browse and book from the public site. A booking is created in Supabase, then moves through an in-app BoldSign contract (ID uploads + embedded signing) before Paystack checkout in KES. Owners can submit cars for leasing; admins manage fleet, bookings and reviews. Maps use OpenStreetMap Nominatim with Leaflet; transactional email goes through Brevo.',
    architectureFlow: [
      'Next.js App Router UI',
      'Supabase Auth + PostgreSQL + Storage',
      'BoldSign digital contracts',
      'Paystack (M-Pesa / cards)',
      'Netlify hosting',
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'BoldSign',
      'Paystack',
      'Leaflet',
      'Brevo',
      'Netlify',
    ],
    outcomeEvidence:
      'Live at novadriverentacar.com with the full browse → book → sign → pay journey, owner lease requests, and admin tooling. Source is on GitHub.',
    links: {
      liveDemo: 'https://novadriverentacar.com',
      github: 'https://github.com/dev-star-mo/nova',
    },
  },
  {
    id: 'farmer-cooperative-app',
    title: 'Farmer Cooperative Registration & Produce Inventory',
    subtitleBadge: 'Full-Stack Mobile System',
    primaryCategory: 'backend',
    status: 'completed',
    contextProblem:
      'A Kenyan farmer cooperative needed a simple way for farmers to register and record produce ready to sell, while ward officers and admins could see inventory without shared spreadsheets.',
    roleContribution:
      'Built the end-to-end system: Supabase schema and RLS migrations, FastAPI backend that verifies JWTs and enforces role/ownership checks, and a React Native (Expo) mobile app for farmers, officers and admins.',
    solutionArchitecture:
      'Mobile app (Expo) talks to FastAPI, which verifies the Supabase JWT and then queries Postgres. Authorisation is enforced twice — in the API and again via Row Level Security — so a bug in one layer still fails closed. Seeded wards, farmers, officers and inventory support local testing.',
    architectureFlow: [
      'React Native (Expo)',
      'FastAPI + JWT verify',
      'Supabase Auth',
      'PostgreSQL + RLS',
    ],
    techStack: ['React Native', 'Expo', 'TypeScript', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL'],
    outcomeEvidence:
      'Working cooperative workflow with dual-layer auth (API + RLS). Source and migrations are on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/farmer_app',
    },
  },
  {
    id: 'ble-tpms',
    title: 'BLE Tire Pressure Monitoring System (TPMS)',
    subtitleBadge: 'Embedded Prototype',
    primaryCategory: 'iot',
    status: 'completed',
    contextProblem:
      'Drivers rarely remember to check their tire pressure, and driving on underinflated tires is dangerous: it can lead to accidents and tire damage that goes unnoticed until it is too late.',
    roleContribution:
      'Personal project: designed the sensor PCB, wrote the ESP-IDF firmware in C++, and designed the dashboard display in Wokwi.',
    solutionArchitecture:
      'A Bluetooth Low Energy sensor fitted on the tire valve captures pressure and transmits it to a small OLED display on the dashboard, so drivers can see their tire pressure in real time.',
    architectureFlow: ['Valve-mounted pressure sensor', 'BLE transmission', 'OLED dashboard display'],
    techStack: ['C++ (ESP-IDF)', 'BLE', 'PCB Design', 'Wokwi (OLED Display)'],
    outcomeEvidence:
      'Embedded prototype covering sensor firmware, BLE transmission, PCB design and the in-car display design.',
  },
  {
    id: 'iot-ingestion-erp-pipeline',
    title: 'Multi-Site IoT Telemetry Ingestion & ERP Integration Pipeline',
    subtitleBadge: 'Commercial Architecture Highlight',
    primaryCategory: 'iot',
    secondaryDomains: ['backend'],
    status: 'completed',
    contextProblem:
      'Clients across water, agriculture and cold-chain operations needed sensor data from many remote sites turned into dashboards, alerts and ERP records, without manual readings.',
    roleContribution:
      'As IoT / Backend Engineer at Upande Limited, designed and implemented end-to-end sensor systems across 20+ sites and managed the data pipeline from sensor deployment to real-time dashboards: Node.js services decoding device uplinks, UDP control of RS485-Modbus pump controllers, and Frappe / ERPNext API integration for reporting.',
    solutionArchitecture:
      'LoRaWAN and NB-IoT uplinks (plus UDP packets from GPS/GPRS trackers) are decoded and processed by Node.js services. Processed readings drive real-time and historical dashboards and SMS threshold alerts, and are synced to Frappe / ERPNext through its APIs. For one Amref WaSH site, a wireless float switch talks over UDP to an RS485-Modbus device that switches the pump on or off based on tank level.',
    architectureFlow: [
      'LoRaWAN / NB-IoT sensors',
      'UDP / MQTT uplinks',
      'Node.js decoders',
      'Dashboards + SMS alerts',
      'Frappe / ERPNext API',
    ],
    techStack: ['Node.js', 'Node-RED', 'UDP', 'MQTT', 'RS485-Modbus', 'LoRaWAN', 'NB-IoT', 'Frappe / ERPNext'],
    outcomeEvidence:
      'Deployed across 20+ sites. On the Amref NB-IoT pilot, the client paid less than on LoRaWAN-powered sites and still received all the data it needed.',
    relatedExperienceId: 'upande-limited',
  },
];

/**
 * Full Data Analytics catalogue for the Data Analytics tab.
 * Fuzzy Factory and Angani Air also appear on Featured; the rest are tab-only.
 */
export const analyticsProjects: ProjectItem[] = [
  featuredProjects.find((p) => p.id === 'fuzzy-factory')!,
  featuredProjects.find((p) => p.id === 'angani-air-analysis')!,
  {
    id: 'rossmann-sales-analysis',
    title: 'Rossmann Store Sales Analytics',
    subtitleBadge: 'Ke Data Lab · Python',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'Rossmann operates thousands of drug stores across Europe. Leadership needed clarity on how promotions, store types, assortment and seasonality influence daily sales.',
    roleContribution:
      'Ke Data Lab Python analytics project: cleaned and joined store and sales data, engineered time and customer features, and ran exploratory analysis on promotions, store types and seasonal trends.',
    solutionArchitecture:
      'Daily store sales were left-joined to store attributes, with missing competition and promo fields handled carefully. Feature engineering added calendar fields, sales-per-customer, rolling sales and growth metrics; EDA covered distributions, promo impact and seasonality.',
    architectureFlow: [
      'train.csv + store.csv',
      'pandas merge & clean',
      'Feature engineering',
      'EDA & recommendations',
    ],
    techStack: ['Python', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'plotly', 'Jupyter'],
    outcomeEvidence:
      'Full business-analytics notebook covering cleaning, integration, feature engineering and EDA with strategic recommendations. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/rossman_sales_analysis',
    },
  },
  {
    id: 'hotel-booking-cancellation-analysis',
    title: 'Hotel Booking Cancellation Analysis',
    subtitleBadge: 'Ke Data Lab · Python',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'High hotel cancellation rates disrupt staffing, revenue forecasting and room allocation. Booking volume alone does not guarantee occupancy.',
    roleContribution:
      'Cleaned ~119k hotel bookings down to a reliable analysis set, engineered stay and guest features, and analysed cancellation patterns by hotel type and geography.',
    solutionArchitecture:
      'Missing agent/company/children values and duplicates were handled in pandas. Features such as total nights, total guests, family flag and season supported EDA on overall risk, city vs resort hotels and top booking countries.',
    architectureFlow: [
      'Raw hotel bookings',
      'Cleaning & feature engineering',
      'EDA & visualisation',
      'Operational recommendations',
    ],
    techStack: ['Python', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'Jupyter'],
    outcomeEvidence:
      'Analysis of cleaned booking data with cancellation patterns and overbooking / planning recommendations. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/hotel_booking_cancellation_analysis',
    },
  },
  {
    id: 'dirty-cafe-sales-analysis',
    title: 'Dirty Cafe Sales: Data Cleaning & Analysis',
    subtitleBadge: 'Ke Data Lab · Python',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'Real sales datasets are rarely clean. Missing values, inconsistent entries and invalid types block reliable product and sales analysis.',
    roleContribution:
      'Ke Data Lab practice project: took a deliberately messy cafe sales dataset, cleaned it with pandas, explored product and sales patterns, and extracted business insights.',
    solutionArchitecture:
      'Notebook workflow from raw inspection through type fixes, missing-value handling, date cleaning and standardisation, then EDA on product performance, sales over time and payment behaviour with Python visualisations.',
    architectureFlow: [
      'Dirty cafe CSV',
      'pandas cleaning',
      'EDA & metrics',
      'Business insights',
    ],
    techStack: ['Python', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'Jupyter'],
    outcomeEvidence:
      'End-to-end cleaning-to-insights notebook for intentionally dirty cafe transaction data. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/dirty_cafe_sales_analysis',
    },
  },
  {
    id: 'us-candy-sales',
    title: 'US Candy Distributor: Sales & Logistics Intelligence',
    subtitleBadge: 'Ke Data Lab · SQL & Power BI',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'A national candy distributor needed clear views of product profitability versus targets, and of logistics cost and fulfilment patterns across US regions.',
    roleContribution:
      'Rebuilt a flat transactional extract into a SQL Server star schema, designed DAX measures, and delivered an interactive Power BI Desktop executive report covering sales/margin and logistics.',
    solutionArchitecture:
      'Fact_Sales and Fact_Targets sit with customer, product, factory and date dimensions. Power BI pages track revenue and margin performance plus fulfilment mode and regional order density.',
    architectureFlow: [
      'Flat sales export',
      'T-SQL star schema',
      'DAX measures',
      'Power BI executive report',
    ],
    techStack: ['SQL Server (T-SQL)', 'Power BI', 'DAX', 'Star schema'],
    outcomeEvidence:
      'BI solution with star-schema modelling and multi-page Power BI dashboards. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/US_Candy_Sales',
    },
  },
  {
    id: 'adventureworks-analysis',
    title: 'AdventureWorks Sales Analysis',
    subtitleBadge: 'Ke Data Lab · Power BI',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'AdventureWorks stakeholders needed an interactive view of financial performance, product profitability and customer purchasing behaviour across bike and accessory sales.',
    roleContribution:
      'Built a two-page Power BI dashboard on a star-schema model with centralised DAX measures, YoY tracking and slicers for year and product category.',
    solutionArchitecture:
      'Executive summary covers revenue, profit, margin and YoY growth with category profitability. A detailed page covers order volume, seasonality and customer education demographics with cross-filtering navigation.',
    architectureFlow: [
      'Sales / product / customer data',
      'Star schema + Dim_Date',
      'DAX _Measures table',
      'Two-page Power BI report',
    ],
    techStack: ['Power BI', 'DAX', 'Star schema'],
    outcomeEvidence:
      'Interactive AdventureWorks BI report with overview and detailed-insight pages. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/AdventureWorks_Analysis',
    },
  },
  {
    id: 'olist-data-analysis',
    title: 'Olist E-Commerce Power BI Dashboard',
    subtitleBadge: 'Ke Data Lab · Power BI',
    primaryCategory: 'analytics',
    status: 'completed',
    contextProblem:
      'Olist, a major Brazilian e-commerce marketplace, needed executives, marketing and logistics teams to track revenue, customer behaviour and operational issues in one place.',
    roleContribution:
      'Designed a Power BI solution on an optimised star schema with custom date intelligence, centralised DAX measures and pages for executive overview and customer analysis.',
    solutionArchitecture:
      'Executive overview tracks revenue, profit, margin and YoY growth with category drill-down. Customer analysis covers unique buyers, AOV, payment mix, shopping-day patterns and review scores by Brazilian state.',
    architectureFlow: [
      'Olist marketplace data',
      'Star schema + Dim_Date',
      'DAX measure hive',
      'Executive & customer dashboards',
    ],
    techStack: ['Power BI', 'DAX', 'Star schema'],
    outcomeEvidence:
      'End-to-end Olist BI dashboard with executive and customer pages. Source is on GitHub.',
    links: {
      github: 'https://github.com/dev-star-mo/Olist-Data-Analysis',
    },
  },
];

export const labProjects: ProjectItem[] = [
  {
    id: 'cattle-geofence-tracker',
    title: 'Solar GPS/GPRS Cattle Tracker & Geofence',
    subtitleBadge: 'In Progress · Hardware Pending',
    primaryCategory: 'iot',
    status: 'in-progress',
    contextProblem: 'Cattle theft on rural farms happens frequently while people are busy in their homes.',
    roleContribution: 'Planned personal build for use at home upcountry.',
    solutionArchitecture:
      'A solar-powered A9G GPS/GPRS tracker reports cattle location, with geofencing alerts sent to the owner’s phone if the cattle cross a boundary.',
    techStack: ['A9G GPS/GPRS', 'Solar power', 'Geofencing'],
    outcomeEvidence: 'Not yet deployed.',
    progressNote: 'Sample code ready for A9G module; waiting to acquire hardware.',
  },
];

/** Shown only under the Additional filter — not listed in Featured / IoT / Software / Data Analytics. */
export const additionalProjects: ProjectItem[] = [
  {
    id: 'workflow-automation-scripts',
    title: 'System & Workflow Automation Scripts',
    subtitleBadge: 'Utility Tooling',
    primaryCategory: 'backend',
    status: 'completed',
    contextProblem: 'Repetitive manual system tasks are worth automating.',
    roleContribution: 'Wrote the scripts for personal use.',
    solutionArchitecture:
      'Custom scripts that handle repetitive tasks, such as turning off Wi-Fi on a laptop so music stops and sleep mode engages properly.',
    techStack: ['Python', 'Bash', 'Linux'],
    outcomeEvidence: 'Small personal utilities that automate repetitive laptop tasks.',
  },
  {
    id: 'symptom-report-chat-agent',
    title: 'AI Symptom Report Chat Agent',
    subtitleBadge: '2nd Place · Claude Hackathon',
    primaryCategory: 'backend',
    secondaryDomains: ['analytics'],
    status: 'completed',
    contextProblem:
      'People who feel unwell often struggle to explain symptoms clearly when they reach a doctor or pharmacist, which slows triage and can leave important details out.',
    roleContribution:
      'Built a conversational AI agent that interviews the patient about their symptoms and produces a structured clinical-style report they can share with a doctor or pharmacist.',
    solutionArchitecture:
      'A chat interface walks the patient through symptom questions. The agent organises the answers into a detailed report suitable for handing to a clinician or pharmacist, without replacing professional medical advice.',
    architectureFlow: [
      'Patient chat session',
      'Symptom intake dialogue',
      'Structured report generation',
      'Shareable doctor / pharmacist summary',
    ],
    techStack: ['Claude', 'Conversational AI', 'Report generation'],
    outcomeEvidence: 'Took 2nd place at a Claude hackathon.',
  },
  {
    id: 'jua-kali-showroom',
    title: 'Jua Kali Digital Showroom',
    subtitleBadge: "Africa's Talking Hackathon",
    primaryCategory: 'backend',
    secondaryDomains: ['iot'],
    status: 'completed',
    contextProblem:
      'Jua kali artisans often lack an easy way to list products online, so their customer base stays limited to people who physically find their workshops.',
    roleContribution:
      "Built for an Africa's Talking hackathon: USSD registration and product listing for artisans, plus a web showroom where customers browse products, call the artisan, and schedule a meeting to see the goods.",
    solutionArchitecture:
      "Artisans dial a USSD service (Africa's Talking) to register their workshop and list products into SQLite via an Express API. A public web showroom lets buyers browse listings, request contact, and arrange a visit. SMS notifications support the inquiry flow.",
    architectureFlow: [
      "Africa's Talking USSD",
      'Express + SQLite API',
      'Web showroom',
      'Buyer inquiry + call / meet',
    ],
    techStack: ["Africa's Talking", 'USSD', 'Express', 'SQLite', 'Node.js', 'HTML'],
    outcomeEvidence:
      "Hackathon build connecting feature-phone USSD listing with a browsable web showroom. Source is on GitHub.",
    links: {
      github: 'https://github.com/dev-star-mo/Jua-Kali-Showroom',
    },
  },
];
