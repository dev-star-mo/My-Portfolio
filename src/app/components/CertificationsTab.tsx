import { motion } from "motion/react";
import { Award, CheckCircle2 } from "lucide-react";

const certifications = [
    {
        category: "IoT Development",
        items: [
            "JavaScript Essentials for NodeRED - Udemy",
            "Mastering Modbus RS485 Network Communication - Udemy",
            "IoT Application Development with the ESP32 Using the ESP-IDF - Udemy"
        ]
    },
    {
        category: "Backend Development",
        items: [
            "API Beginner - Postman",
            "API Prototyping - Postman",
            "Comprehensive API Development Course Using Python - FreeCodeCamp",
            {
                title: "Complete FastAPI Masterclass from Scratch - Udemy",
                description: "Learnt API development, developing APIs using FastAPI that performed CRUD operations on a PostgreSQL database."
            }
        ]
    }
];

export function CertificationsTab() {
    return (
        <div className="space-y-12">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Certifications</h2>
                <div className="w-16 h-1 bg-primary mb-8"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certifications.map((section, idx) => (
                        <div key={section.category} className="space-y-6">
                            <h3 className="text-2xl font-semibold flex items-center gap-2">
                                <Award className="size-6 text-primary" />
                                {section.category}
                            </h3>
                            <div className="space-y-4">
                                {section.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={typeof item === 'string' ? item : item.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: (idx * 0.2) + (itemIdx * 0.1) }}
                                        className="p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {typeof item === 'string' ? item : item.title}
                                                </p>
                                                {typeof item !== 'string' && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
