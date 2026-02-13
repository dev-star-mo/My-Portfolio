import { motion } from "motion/react";
import { GraduationCap, Briefcase } from "lucide-react";

export function AboutTab() {
  return (
    <div className="space-y-20">
      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
        <div className="w-16 h-1 bg-primary mb-8"></div>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
          I am a backend/IoT developer with over 2 years of experience developing end-to-end IoT solutions across 20+ sites, and the data pipelines to process the data from over 300 sensors to display the data on dashboards for data-driven decisions.
        </p>
      </motion.section>

      {/* Education Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Education</h3>
          <div className="w-16 h-1 bg-primary"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 border border-border rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="size-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <h4 className="text-xl font-semibold">BSc. Electronic and Computer Engineering</h4>
                <span className="text-sm text-muted-foreground">2016 - 2022</span>
              </div>
              <p className="text-muted-foreground">Jomo Kenyatta University of Agriculture and Technology</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Experience</h3>
          <div className="w-16 h-1 bg-primary"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 border border-border rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Briefcase className="size-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <h4 className="text-xl font-semibold">IoT/Backend Developer</h4>
                <span className="text-sm text-muted-foreground">Feb 2023 - Dec 2025</span>
              </div>
              <p className="text-muted-foreground">Upande Limited</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
