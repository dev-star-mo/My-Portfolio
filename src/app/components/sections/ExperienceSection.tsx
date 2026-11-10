import {
  Activity,
  Briefcase,
  Building2,
  Droplets,
  Lightbulb,
  MapPin,
  Thermometer,
  Truck,
  Wifi,
  Wind,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/data/experience";
import type { DeploymentCaseStudy, RdProjectItem } from "@/types/portfolio";
import { Section } from "../layout/Section";
import { SectionHeading } from "../layout/SectionHeading";

const deploymentIcons: Record<DeploymentCaseStudy["iconName"], typeof Thermometer> = {
  Thermometer,
  Building2,
  Droplets,
  Wind,
  Activity,
};

const rdIcons: Record<RdProjectItem["iconName"], typeof Wifi> = {
  Wifi,
  Truck,
  Lightbulb,
  MapPin,
};

export function ExperienceSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="experience" tone="light" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        index="03"
        eyebrow="Experience"
        title="Experience & deployments"
        description="Commercial IoT and backend work at Upande Limited across cold chain, WaSH, agriculture, and utility metering — plus R&D that tested harder field constraints."
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45 }}
        className="mb-14 flex flex-col gap-5 border-t border-foreground/15 pt-6 md:mb-16 md:flex-row md:items-start md:justify-between"
      >
        <div className="flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Briefcase className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {experience.company}
            </h3>
            <p className="mt-1 font-mono text-sm tracking-wide text-primary">{experience.role}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-mono">{experience.period}</span>
              <span className="mx-2 text-border" aria-hidden="true">
                ·
              </span>
              {experience.location}
            </p>
          </div>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:pt-1">
          {experience.summary}
        </p>
      </motion.div>

      <div className="mb-8 flex items-center gap-3">
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Major deployments
        </h3>
      </div>

      <ul className="space-y-8">
        {experience.deployments.map((study, index) => {
          const Icon = deploymentIcons[study.iconName];
          return (
            <motion.li
              key={study.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.05 }}
              className="border-t border-border pt-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {study.title}
                    </h4>
                    <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                    {study.domainTags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-sm border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                        Problem
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {study.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">
                        Contribution &amp; solution
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {study.roleAndContribution}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                        Outcome
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {study.outcomeSummary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <section aria-labelledby="rd-title" className="mt-16 border-t border-border pt-12 md:mt-20">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-amber-ink uppercase">
              <Zap className="size-3.5" aria-hidden="true" />
              Field experiments
            </p>
            <h3
              id="rd-title"
              className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              Research &amp; development
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Targeted R&amp;D that stress-tested NB-IoT, satellite, custom PCB, and vehicle telemetry paths.
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-2">
          {experience.rdProjects.map((item, index) => {
            const Icon = rdIcons[item.iconName];
            return (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.06 }}
                className="border-t border-border pt-5"
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h4 className="font-display mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.problem}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.solution}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech highlights">
                  {item.techHighlights.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      </section>
    </Section>
  );
}
