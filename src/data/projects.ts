import type { DomainCategory, ProjectItem, ProjectStatus } from '@/types/portfolio';

export const domainLabels: Record<DomainCategory, string> = {
  iot: 'IoT & Connected Systems',
  backend: 'Software & Backend',
  analytics: 'Data Analytics & BI',
};

export const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'sample-case-study': 'Sample case study',
  'in-progress': 'In progress',
  concept: 'Concept',
};

export const featuredProjects: ProjectItem[] = [
  {
    id: 'forest-acoustic-monitoring',
    title: 'Acoustic Forest Monitoring & Ranger Alert System (Wangari Maathai Foundation Hackathon)',
    subtitleBadge: 'Hackathon Winner',
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
      'Winning entry at the Wangari Maathai Foundation Hackathon. The ranger dashboard and source code are publicly available.',
    links: {
      liveDemo: 'https://green-movers-254.vercel.app/',
      github: 'https://github.com/dev-star-mo/GreenMovers-254',
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
    primaryCategory: 'backend',
    secondaryDomains: ['iot'],
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
    relatedExperienceId: 'upande',
  },
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
    id: 'sample-wash-bi-analytics',
    title: 'Sample BI Case Study: WaSH & Smart Water Telemetry Analytics',
    subtitleBadge: 'SAMPLE BI CASE STUDY (DEMONSTRATION)',
    primaryCategory: 'analytics',
    status: 'sample-case-study',
    contextProblem:
      'Water projects need to curb Non-Revenue Water (NRW) and show donors usage and service KPIs. Night-time flow that should be near zero is a common early signal of leaks or unmetered draw-off.',
    roleContribution:
      'Demonstration project applying Ke Data Lab training in SQL, Power BI and Python for data analytics to the kind of telemetry produced by smart water deployments.',
    solutionArchitecture:
      'Synthetic flow and tank-level readings are cleaned in Python, modelled in SQL (a fact table of readings joined to site and meter dimensions), and used to compare each reading with an expected demand baseline. Readings outside a tolerance band are flagged as candidate NRW events, and Power BI pages report night-flow anomalies, tank-level trends and donor-facing KPIs.',
    architectureFlow: ['Synthetic telemetry CSV', 'Python cleaning', 'SQL data model', 'Baseline + anomaly rules', 'Power BI KPI report'],
    techStack: ['SQL', 'Python', 'Power BI', 'Data modelling'],
    outcomeEvidence:
      'Demonstration only: every value is synthetic or anonymized and no client data is used. The night-flow chart in the hero shows the same baseline-and-band detection logic.',
    progressNote: 'Dataset is a synthetic demonstration, not a client deployment.',
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
  {
    id: 'car-hire-platform',
    title: 'Car Hire Ordering Platform',
    subtitleBadge: 'Concept',
    primaryCategory: 'backend',
    status: 'concept',
    contextProblem: 'A business needs a sleek platform for customers to view and order vehicles.',
    roleContribution: 'Concept stage.',
    solutionArchitecture:
      'A full-featured car hire site with order placement logic and potential AI chatbot integration.',
    techStack: [],
    outcomeEvidence: 'Not yet built.',
    progressNote: 'Concept: not yet built.',
  },
  {
    id: 'music-ministry-app',
    title: 'Music Ministry Scheduling & Coordination App',
    subtitleBadge: 'Concept',
    primaryCategory: 'backend',
    status: 'concept',
    contextProblem:
      'Music ministry teams need an efficient way to manage practices, Sunday scheduling, band coordination, song requests and yearly activity planning.',
    roleContribution: 'Concept stage.',
    solutionArchitecture:
      'A management tool designed to feel as seamless as a WhatsApp group, but with structured scheduling and planning.',
    techStack: [],
    outcomeEvidence: 'Not yet built.',
    progressNote: 'Concept: not yet built.',
  },
];
