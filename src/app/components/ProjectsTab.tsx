import { motion } from "motion/react";
import { FolderGit2, Github, Monitor, Cpu, Code2, Rocket, ExternalLink } from "lucide-react";

const projects = [
    {
        title: "Wangari Maathai Foundation Hackathon",
        status: "Winner",
        problem: "Kenya loses more than 87,000 Ha of forested land each year to illegal logging. Traditional response methods are slow, enabling illegal loggers to escape without being identified.",
        solution: "A LoRaWAN TinyML ESP32 sensor that has a microphone connected. This microphone picks up sounds in the forest. A quantized ML model running on the ESP32 is able to classify the sound. If it is positively classified as an illegal logging activity (chainsaw, axe, truck engine, etc), a LoRaWAN alert is sent via a gateway in the forest warden's office. Using Node-RED and Node.js, the alert is processed and sends an SMS with the forest region. I also developed a dashboard for forest rangers to view and resolve alerts.",
        tech: ["React (Vite)", "FastAPI", "PostgreSQL", "ESP32 (ESP-IDF)", "TinyML", "LoRaWAN"],
        links: {
            dashboard: "https://green-movers-254.vercel.app/",
            github: "https://github.com/dev-star-mo/GreenMovers-254"
        },
        type: "Hackathon Success"
    },
    {
        title: "Tire Pressure Monitoring System (TPMS)",
        problem: "I noted the issue once when I drove off only to get a flat tire moments later. Drivers rarely remember to check their tire pressure, which is dangerous if they drive with underinflated tires. It can lead to accidents and tire damage that isn't noticed until too late.",
        solution: "A Bluetooth Low Energy (BLE) TPMS sensor fitted on the tire nozzle that captures pressure. Data is transmitted and displayed on a small OLED display on the dashboard, enabling drivers to know their tire pressure in real time.",
        tech: ["C++ (ESP-IDF)", "Wokwi (Display Design)", "PCB Design", "BLE"],
        type: "Personal Project"
    },
    {
        title: "Automation Scripts",
        solution: "Custom automation scripts to handle repetitive tasks, such as turning off Wi-Fi on my laptop to stop music and enable sleep mode properly.",
        tech: ["Bash/Python"],
        type: "Utility"
    }
];

const upcomingProjects = [
    {
        title: "Cattle Location Tracker & Geofence",
        problem: "Cattle theft in rural farms happens frequently when people are busy in their homes.",
        solution: "A solar-powered A9G GPS/GPRS tracker for cattle location. Includes geofencing alerts sent to the owner's phone if the cattle cross a boundary. I intend to do this in my own home upcountry",
        progress: "Sample code ready for A9G module; waiting to acquire hardware."
    },
    {
        title: "Car Hire Website",
        problem: "A business needs a sleek platform for customers to view and order vehicles.",
        solution: "A full-featured car hire site with order placement logic and potential AI chatbot integration."
    },
    {
        title: "Music Ministry Web App",
        problem: "Music ministry teams need an efficient way to manage practices, Sunday scheduling, band coordination, song requests, planning of their year's activities, among other needs.",
        solution: "A management tool designed to be as seamless as a WhatsApp group but with structured scheduling and planning."
    }
];

export function ProjectsTab() {
    return (
        <div className="space-y-20 pb-12">
            {/* Featured Projects */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Projects</h2>
                    <div className="w-16 h-1 bg-primary"></div>
                </motion.div>

                <div className="space-y-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl transition-all"
                        >
                            <div className="p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                            {project.title.includes("Hackathon") ? <Rocket className="size-6" /> : <FolderGit2 className="size-6" />}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">{project.title}</h3>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                                                {project.type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {project.links?.github && (
                                            <a href={project.links.github} target="_blank" rel="noreferrer" className="p-2 hover:bg-muted rounded-full transition-colors">
                                                <Github className="size-5" />
                                            </a>
                                        )}
                                        {project.links?.dashboard && (
                                            <a href={project.links.dashboard} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                                                <ExternalLink className="size-4" />
                                                Dashboard
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                                            Problem
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.problem || "Automating repetitive workflows."}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-muted-foreground uppercase flex items-center gap-2">
                                            Solution
                                        </h4>
                                        <p className="text-foreground leading-relaxed">
                                            {project.solution}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Upcoming Projects */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-3">
                        <Monitor className="size-7 text-primary" />
                        Upcoming Projects
                    </h2>
                    <div className="w-12 h-1 bg-primary"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {upcomingProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="p-6 bg-card/50 border border-border rounded-xl hover:bg-muted/30 transition-colors flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-bold mb-3 text-primary">{project.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                    {project.problem}
                                </p>
                                <p className="text-sm text-foreground/80 italic">
                                    {project.solution}
                                </p>
                            </div>
                            {project.progress && (
                                <div className="mt-6 pt-4 border-t border-border/50 text-xs font-medium text-primary uppercase tracking-widest">
                                    Status: {project.progress}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
