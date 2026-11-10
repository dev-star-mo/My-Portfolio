import { GraduationCap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import profileImage from "@/assets/fd368df85e6222ad53e93a39fee71989489c4af6.png";
import { profile } from "@/data/profile";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Section } from "../layout/Section";
import { SectionHeading } from "../layout/SectionHeading";

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="about" tone="light" labelledBy="about-title">
      <SectionHeading
        id="about-title"
        index="05"
        eyebrow="About"
        title="About & education"
        description="An engineering path from electronic and computer systems into connected field deployments, backend services, and operational analytics."
      />

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div
          className="lg:col-span-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <figure className="overflow-hidden rounded-md border border-border bg-card">
            <ImageWithFallback
              src={profileImage}
              alt={`Portrait of ${profile.name}`}
              className="aspect-square w-full object-cover object-top"
              width={480}
              height={480}
            />
            <figcaption className="border-t border-border px-4 py-3">
              <p className="font-display text-sm font-semibold text-foreground">{profile.name}</p>
              <p className="mt-0.5 font-mono text-[11px] tracking-wide text-muted-foreground">
                {profile.roles.join(" · ")}
              </p>
            </figcaption>
          </figure>
        </motion.div>

        <motion.div
          className="lg:col-span-8"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.08 }}
        >
          <div className="space-y-5 max-w-[68ch]">
            {profile.aboutNarrative.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="mb-4 font-mono text-xs font-medium tracking-[0.18em] text-primary uppercase">
              Education
            </p>
            <div className="flex items-start gap-4 rounded-md border border-border bg-card p-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <GraduationCap className="size-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {profile.education.degree}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {profile.education.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.education.institution}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
