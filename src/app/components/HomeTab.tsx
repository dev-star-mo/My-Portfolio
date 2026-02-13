import { motion } from "motion/react";
import { Code2, Cpu, Database, Network, Wrench, FileCode } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Backend Development",
    skills: [
      "System design and development",
      "FastAPI",
      "Node.js",
      "Containerization",
      "CI/CD",
      "Git and version control",
      "Database development (PostgreSQL, MongoDB, MySQL, SQLite)",
      "Data analysis",
      "Troubleshooting",
      "Documentation",
      "ERPNext development"
    ]
  },
  {
    icon: Cpu,
    title: "IoT Development",
    skills: [
      "LoRaWAN design and deployment",
      "NB-IoT",
      "FreeRTOS",
      "Node.js development in Node-RED",
      "Firmware development (ESP-IDF)",
      "PCB development"
    ]
  }
];

const additionalSkills = [
  { name: "Communication", percentage: 90 },
  { name: "Flexibility", percentage: 85 },
  { name: "Team Player", percentage: 86 },
  { name: "Creativity", percentage: 90 },
];

export function HomeTab() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-[60vh] flex items-center"
      >
        <div>
          <motion.p
            className="text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Moses Muuo
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Backend/IoT Engineer
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I am a backend/IoT developer with over 2 years of experience developing end-to-end IoT solutions across 20+ sites, and the data pipelines to process the data from over 300 sensors to display the data on dashboards for data-driven decisions.
          </motion.p>
        </div>
      </motion.section>

      {/* Services Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Services Offered</h2>
          <div className="w-16 h-1 bg-primary"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="size-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <service.icon className="size-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <ul className="space-y-2">
                {service.skills.map((skill) => (
                  <li key={skill} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Skills Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Additional Skills</h2>
          <div className="w-16 h-1 bg-primary"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.percentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}