import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import type { SectionId } from "@/types/portfolio";
import { Section } from "./components/layout/Section";
import { SectionHeading } from "./components/layout/SectionHeading";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { cn } from "./components/ui/utils";

const ctaBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

function PhasePlaceholder({ phase, children }: { phase: number; children: string }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/40 px-6 py-10 text-center">
      <span className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
        Phase {phase}
      </span>
      <p className="max-w-md text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

interface PlaceholderSection {
  id: SectionId;
  index: string;
  eyebrow: string;
  title: string;
  tone: "light" | "white" | "dark";
  phase: number;
  note: string;
}

const placeholderSections: PlaceholderSection[] = [
  {
    id: "projects",
    index: "01",
    eyebrow: "Projects",
    title: "Featured work",
    tone: "light",
    phase: 3,
    note: "Typed project catalogue with IoT, Software & Backend and Data Analytics filters, plus the In Progress & Concept Lab.",
  },
  {
    id: "architecture",
    index: "02",
    eyebrow: "Architecture",
    title: "Edge-to-cloud pipeline",
    tone: "dark",
    phase: 3,
    note: "Interactive 7-node representative reference architecture explorer.",
  },
  {
    id: "experience",
    index: "03",
    eyebrow: "Experience",
    title: "Experience & deployments",
    tone: "light",
    phase: 4,
    note: "Upande Limited role summary, five deployment case studies and four R&D highlights.",
  },
  {
    id: "certifications",
    index: "04",
    eyebrow: "Certifications",
    title: "Certifications",
    tone: "white",
    phase: 4,
    note: "IoT Development, Software & Backend and Data Analytics (including Ke Data Lab).",
  },
  {
    id: "about",
    index: "05",
    eyebrow: "About",
    title: "About & education",
    tone: "light",
    phase: 4,
    note: "Engineering narrative, portrait and JKUAT education card.",
  },
  {
    id: "contact",
    index: "06",
    eyebrow: "Contact",
    title: "Let's build something useful",
    tone: "dark",
    phase: 4,
    note: "Direct email, phone, location, GitHub and LinkedIn.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Section id="home" tone="dark" grid labelledBy="home-title" className="md:py-32">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy-border bg-navy-elevated px-3 py-1 font-mono text-xs tracking-wide text-on-dark-muted">
              <span className="size-1.5 rounded-full bg-accent-teal" aria-hidden="true" />
              {profile.location}
            </p>
            <h1
              id="home-title"
              className="text-4xl leading-[1.1] font-bold tracking-tight text-on-dark sm:text-5xl lg:text-6xl"
            >
              {profile.name}
            </h1>
            <p className="mt-4 font-mono text-sm tracking-wide text-accent-cyan sm:text-base">
              {profile.roles.join(" · ")}
            </p>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-on-dark-muted">
              {profile.coreMessage}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                Inspect architecture
              </a>
              <a
                href="#contact"
                className={cn(ctaBase, "text-on-dark-muted hover:text-on-dark")}
              >
                <Mail className="size-4" aria-hidden="true" />
                Contact
              </a>
            </div>
          </div>
          <div className="mt-12">
            <PhasePlaceholder phase={2}>
              Hero refinement, SIMULATED DEMO telemetry card, synthetic anomaly chart and the
              capability strip.
            </PhasePlaceholder>
          </div>
        </Section>

        {placeholderSections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            tone={section.tone}
            grid={section.id === "architecture"}
            labelledBy={`${section.id}-title`}
          >
            <SectionHeading
              id={`${section.id}-title`}
              index={section.index}
              eyebrow={section.eyebrow}
              title={section.title}
            />
            <PhasePlaceholder phase={section.phase}>{section.note}</PhasePlaceholder>
          </Section>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
