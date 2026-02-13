import { motion } from "motion/react";
import { Cpu, Code2, Award } from "lucide-react";

const iotProfessionalProjects = [
  "Designed and deployed LoRaWAN networks across 20+ sites",
  "Developed firmware for ESP32-based IoT devices using ESP-IDF",
  "Implemented sensor data collection systems with 300+ sensors",
  "Created Node-RED flows for data processing and automation",
  "Developed custom PCB designs for IoT applications",
  "Implemented NB-IoT solutions for remote monitoring"
];

const iotPersonalProjects = [
  {
    title: "TPMS (Tire Pressure Monitoring System)",
    description: "Developed an IoT-based tire pressure monitoring system for real-time vehicle safety monitoring"
  },
  {
    title: "Cookstove Monitoring System",
    description: "Created an innovative IoT solution for monitoring cookstove usage and emissions for environmental impact assessment"
  }
];

const iotCertifications = [
  "JavaScript Essentials for NodeRED - Udemy",
  "Mastering Modbus RS485 Network Communication - Udemy",
  "IoT Application Development with the ESP32 Using the ESP-IDF - Udemy"
];

const backendCertifications = [
  "API Beginner - Postman",
  "API Prototyping - Postman",
  "Comprehensive API Development Course Using Python - FreeCodeCamp",
  "Complete FastAPI Masterclass from Scratch - Udemy"
];

const backendProjects = [
  {
    title: "Forest Guardian",
    description: "Developed a comprehensive forest monitoring and management system with real-time data analytics"
  },
  {
    title: "Blog Site",
    description: "Built a full-featured blog platform with content management capabilities"
  },
  {
    title: "OCR Application",
    description: "Created an optical character recognition system for document processing and text extraction"
  },
  {
    title: "Warehouse Management System",
    description: "Developed a microservices-based warehouse application with Redis database for inventory management"
  }
];

const backendCurrentProjects = [
  {
    title: "Music Ministry App",
    description: "Developing a comprehensive application for church music ministry management and scheduling"
  },
  {
    title: "Civic Education Blog",
    description: "Building a blog platform focused on civic education from a biblical perspective"
  }
];

export function ExperienceTab() {
  return (
    <div className="space-y-20">
      {/* IoT Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="size-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">IoT Development</h2>
          </div>
          <div className="w-16 h-1 bg-primary"></div>
        </motion.div>

        {/* Professional IoT Experience */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Professional Experience
          </motion.h3>
          <div className="space-y-3">
            {iotProfessionalProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="text-primary mt-1">✓</span>
                <p className="text-muted-foreground">{project}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Personal IoT Projects */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Personal Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {iotPersonalProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-3">{project.title}</h4>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IoT Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Certifications
          </motion.h3>
          <div className="space-y-3">
            {iotCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 border border-border rounded-lg"
              >
                <Award className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Code2 className="size-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Backend Development</h2>
          </div>
          <div className="w-16 h-1 bg-primary"></div>
        </motion.div>

        {/* Backend Experience Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 p-6 border border-border rounded-lg bg-muted/20"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            I worked on the data pipeline for processing data from over 300 sensors using Node.js and Python. I processed this data and displayed it on dashboards for customers to make data-driven decisions.
          </p>
        </motion.div>

        {/* Completed Backend Projects */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Completed Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {backendProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h4 className="text-lg font-semibold mb-3">{project.title}</h4>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Backend Projects */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Current Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {backendCurrentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 border border-border rounded-lg bg-primary/5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-2 mb-3">
                  <div className="size-2 rounded-full bg-green-500 mt-2 animate-pulse"></div>
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Backend Certifications */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold mb-6"
          >
            Certifications
          </motion.h3>
          <div className="space-y-3">
            {backendCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 border border-border rounded-lg"
              >
                <Award className="size-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}