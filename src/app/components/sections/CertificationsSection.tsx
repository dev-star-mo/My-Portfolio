import { Award, BarChart3, CheckCircle2, Cpu, ServerCog } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { certificationGroups } from "@/data/certifications";
import type { DomainCategory } from "@/types/portfolio";
import { Section } from "../layout/Section";
import { SectionHeading } from "../layout/SectionHeading";

const groupIcons: Record<DomainCategory, typeof Cpu> = {
  iot: Cpu,
  backend: ServerCog,
  analytics: BarChart3,
};

export function CertificationsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="certifications" tone="white" labelledBy="certifications-title">
      <SectionHeading
        id="certifications-title"
        index="04"
        eyebrow="Certifications"
        title="Certifications"
        description="Training across IoT tooling, API and backend development, and data analytics — including Ke Data Lab coursework in SQL, Power BI, and Python."
      />

      <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
        {certificationGroups.map((group, groupIndex) => {
          const Icon = groupIcons[group.id];
          return (
            <motion.div
              key={group.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : groupIndex * 0.08 }}
              className="border-t border-foreground/15 pt-5"
            >
              <div className="mb-5 flex items-center gap-2.5">
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {group.title}
                </h3>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium leading-snug text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground">
                        <Award className="size-3" aria-hidden="true" />
                        {item.issuer}
                      </p>
                      {item.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
