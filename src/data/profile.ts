import type { NavItem, Profile } from '@/types/portfolio';

export const profile: Profile = {
  name: 'Moses Muuo',
  roles: ['IoT Engineer', 'Software / Backend Developer', 'Data Analyst'],
  coreMessage:
    'I build connected systems, develop the software behind them, and turn operational data into useful insights.',
  shortBio:
    'IoT and backend engineer with over 2 years of professional experience developing end-to-end IoT and backend solutions. Whether in a corporate environment or on personal projects, I tackle challenges by building working solutions that users find genuinely useful.',
  location: 'Nairobi, Kenya',
  yearsExperience: '2+',
  contact: [
    {
      id: 'email',
      label: 'Email',
      value: 'muuomose@gmail.com',
      href: 'mailto:muuomose@gmail.com',
    },
    {
      id: 'phone',
      label: 'Phone',
      value: '+254707057174',
      href: 'tel:+254707057174',
    },
    {
      id: 'location',
      label: 'Location',
      value: 'Nairobi, Kenya',
    },
  ],
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      handle: '@dev-star-mo',
      href: 'https://github.com/dev-star-mo',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'Moses Muuo',
      href: 'https://www.linkedin.com/in/moses-muuo-25915118b',
    },
  ],
  education: {
    degree: 'BSc. Electronic and Computer Engineering',
    institution: 'Jomo Kenyatta University of Agriculture and Technology',
    period: '2016 – 2022',
  },
  capabilities: [
    {
      id: 'iot',
      title: 'IoT & Connected Systems',
      summary:
        'Sensor deployments, LoRaWAN and NB-IoT networks, embedded firmware and edge-to-cloud telemetry.',
      skills: [
        'LoRaWAN design & deployment',
        'NB-IoT',
        'ESP-IDF firmware',
        'FreeRTOS',
        'RS485 / Modbus, I2C, SPI, UART, BLE',
        'PCB development',
        'Node-RED',
      ],
    },
    {
      id: 'backend',
      title: 'Software & Backend',
      summary:
        'APIs, Node.js and Python services, ingestion pipelines, databases and ERP integrations.',
      skills: [
        'System design',
        'FastAPI',
        'Node.js',
        'PostgreSQL, MongoDB, MySQL, SQLite',
        'ERPNext / Frappe',
        'Containerization & CI/CD',
        'Linux administration',
      ],
    },
    {
      id: 'analytics',
      title: 'Data Analytics & BI',
      summary:
        'SQL, data modelling and Power BI reporting that turn operational telemetry into decisions.',
      skills: ['SQL', 'Power BI', 'Python for data analytics', 'Data analysis', 'Reporting & dashboards'],
    },
  ],
  cvUrl: undefined,
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
