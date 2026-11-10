import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { Section } from "../layout/Section";

export function CapabilityStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      tone="white"
      labelledBy="capabilities-title"
      className="border-y border-border py-14 md:py-16"
    >
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2
          id="capabilities-title"
          className="font-display max-w-lg text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Three ways I ship useful systems
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Hardware at the edge, services in the middle, and reporting that people can act on.
        </p>
      </div>

      <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
        {profile.capabilities.map((pillar, index) => (
          <motion.li
            key={pillar.id}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
            className="relative border-t border-foreground/15 pt-5"
          >
            <span className="font-mono text-xs tracking-[0.16em] text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-3 text-xl font-semibold tracking-tight text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.summary}</p>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
