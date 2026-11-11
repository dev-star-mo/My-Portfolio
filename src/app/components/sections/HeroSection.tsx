import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { Section } from "../layout/Section";
import { TelemetryDemo } from "../widgets/TelemetryDemo";
import { cn } from "../ui/utils";

const ctaBase =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="home"
      tone="light"
      labelledBy="home-title"
      className="paper-grain flex flex-col justify-center overflow-hidden py-12 md:py-16 lg:min-h-[calc(100svh-4rem)] lg:py-16"
      containerClassName="w-full"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <motion.div
          className="lg:col-span-6"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {profile.location}
          </p>

          <h1
            id="home-title"
            className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <p className="mt-5 max-w-[28ch] text-xl leading-snug font-medium text-foreground/90 sm:text-2xl">
            {profile.coreMessage}
          </p>

          <p className="mt-5 font-mono text-sm tracking-wide text-primary">
            {profile.heroRoles.join(" · ")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#projects" className={cn(ctaBase, "bg-primary text-primary-foreground hover:bg-primary/90")}>
              See featured work
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          className="min-w-0 lg:col-span-6"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <TelemetryDemo />
        </motion.div>
      </div>
    </Section>
  );
}
