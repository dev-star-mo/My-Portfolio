import { ArrowRight, Mail, Network } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "../layout/Section";
import { AnomalyChart } from "../widgets/AnomalyChart";
import { TelemetryDemo } from "../widgets/TelemetryDemo";
import { cn } from "../ui/utils";

const ctaBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

const heroFacts = [
  { value: `${profile.yearsExperience} yrs`, label: "Professional experience" },
  { value: "20+", label: "LoRaWAN sites delivered" },
  { value: "5", label: "Major deployments" },
];

export function HeroSection() {
  return (
    <Section
      id="home"
      tone="dark"
      grid
      labelledBy="home-title"
      className="bg-gradient-to-b from-navy to-navy-elevated md:py-20 lg:py-14"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy-border bg-navy-elevated px-3 py-1 font-mono text-xs tracking-wide text-on-dark-muted">
            <span className="size-1.5 rounded-full bg-accent-teal" aria-hidden="true" />
            {profile.location}
          </p>

          <h1
            id="home-title"
            className="text-4xl leading-[1.1] font-bold tracking-tight text-on-dark sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-sm leading-relaxed tracking-wide text-accent-cyan sm:text-base">
            {profile.roles.map((role, i) => (
              <span key={role}>
                {i > 0 && (
                  <>
                    <span className="text-on-dark-muted" aria-hidden="true">
                      {" · "}
                    </span>
                    <span className="sr-only">, </span>
                  </>
                )}
                <span className="whitespace-nowrap">{role}</span>
              </span>
            ))}
          </p>

          <p className="mt-6 max-w-[34ch] text-xl leading-snug font-medium text-on-dark sm:text-2xl">
            {profile.coreMessage}
          </p>

          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-on-dark-muted">
            From LoRaWAN and NB-IoT sensor networks to the Node.js and Python services that ingest
            their data, and the SQL and Power BI reporting that turns it into decisions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className={cn(ctaBase, "bg-accent-cyan text-navy hover:bg-accent-cyan/90")}
            >
              Explore featured work
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#architecture"
              className={cn(
                ctaBase,
                "border border-navy-border text-on-dark hover:border-accent-cyan/60 hover:bg-navy-elevated",
              )}
            >
              <Network className="size-4" aria-hidden="true" />
              Inspect architecture
            </a>
            <a href="#contact" className={cn(ctaBase, "text-on-dark-muted hover:text-on-dark")}>
              <Mail className="size-4" aria-hidden="true" />
              Contact
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-navy-border pt-6">
            {heroFacts.map((fact) => (
              <div key={fact.label} className="flex min-w-0 flex-col">
                <dt className="order-2 mt-1 text-xs leading-snug text-on-dark-muted">
                  {fact.label}
                </dt>
                <dd className="order-1 font-mono text-xl font-semibold text-on-dark sm:text-2xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
          <TelemetryDemo />
          <AnomalyChart />
        </div>
      </div>
    </Section>
  );
}
