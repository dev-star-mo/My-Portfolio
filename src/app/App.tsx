import type { SectionId } from "@/types/portfolio";
import { Section } from "./components/layout/Section";
import { SectionHeading } from "./components/layout/SectionHeading";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { CapabilityStrip } from "./components/sections/CapabilityStrip";
import { HeroSection } from "./components/sections/HeroSection";

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
        <HeroSection />
        <CapabilityStrip />

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
