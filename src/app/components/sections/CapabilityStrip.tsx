import { BarChart3, Cpu, ServerCog } from "lucide-react";
import { profile } from "@/data/profile";
import type { DomainCategory } from "@/types/portfolio";
import { Section } from "../layout/Section";

const pillarIcons: Record<DomainCategory, typeof Cpu> = {
  iot: Cpu,
  backend: ServerCog,
  analytics: BarChart3,
};

export function CapabilityStrip() {
  return (
    <Section
      tone="dark-elevated"
      labelledBy="capabilities-title"
      className="border-y border-navy-border py-12 md:py-16"
    >
      <h2 id="capabilities-title" className="sr-only">
        Core capabilities
      </h2>
      <ul className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {profile.capabilities.map((pillar, index) => {
          const Icon = pillarIcons[pillar.id];
          return (
            <li
              key={pillar.id}
              className="flex flex-col rounded-xl border border-navy-border bg-navy/60 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-on-dark-muted" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-on-dark">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{pillar.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${pillar.title} skills`}>
                {pillar.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-navy-border bg-navy-elevated px-2 py-1 font-mono text-[11px] text-on-dark"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
