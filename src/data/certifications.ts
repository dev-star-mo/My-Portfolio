import type { CertificationItem, DomainCategory } from '@/types/portfolio';

export interface CertificationGroup {
  id: DomainCategory;
  title: string;
  items: CertificationItem[];
}

export const certifications: CertificationItem[] = [
  {
    id: 'nodered-js-essentials',
    title: 'JavaScript Essentials for NodeRED',
    issuer: 'Udemy',
    category: 'iot',
  },
  {
    id: 'modbus-rs485',
    title: 'Mastering Modbus RS485 Network Communication',
    issuer: 'Udemy',
    category: 'iot',
  },
  {
    id: 'esp32-esp-idf',
    title: 'IoT Application Development with the ESP32 Using the ESP-IDF',
    issuer: 'Udemy',
    category: 'iot',
  },
  {
    id: 'fastapi-masterclass',
    title: 'Complete FastAPI Masterclass from Scratch',
    issuer: 'Udemy',
    category: 'backend',
    description:
      'Learnt API development, developing APIs using FastAPI that performed CRUD operations on a PostgreSQL database.',
  },
  {
    id: 'python-api-freecodecamp',
    title: 'Comprehensive API Development Course Using Python',
    issuer: 'FreeCodeCamp',
    category: 'backend',
  },
  {
    id: 'postman-api-beginner',
    title: 'API Beginner',
    issuer: 'Postman',
    category: 'backend',
  },
  {
    id: 'postman-api-prototyping',
    title: 'API Prototyping',
    issuer: 'Postman',
    category: 'backend',
  },
  {
    id: 'ke-data-lab-bi',
    title: 'Business Intelligence with SQL and Power BI',
    issuer: 'Ke Data Lab',
    category: 'analytics',
  },
  {
    id: 'ke-data-lab-python',
    title: 'Python for Data Analytics',
    issuer: 'Ke Data Lab',
    category: 'analytics',
  },
];

export const certificationGroups: CertificationGroup[] = [
  {
    id: 'iot',
    title: 'IoT Development',
    items: certifications.filter((item) => item.category === 'iot'),
  },
  {
    id: 'backend',
    title: 'Software & Backend',
    items: certifications.filter((item) => item.category === 'backend'),
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    items: certifications.filter((item) => item.category === 'analytics'),
  },
];
