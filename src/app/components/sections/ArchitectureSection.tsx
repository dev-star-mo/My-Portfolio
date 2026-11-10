import { Section } from "../layout/Section";
import { SectionHeading } from "../layout/SectionHeading";
import { ArchitectureExplorer } from "../widgets/ArchitectureExplorer";

export function ArchitectureSection() {
  return (
    <Section id="architecture" tone="dark" grid labelledBy="architecture-title">
      <SectionHeading
        id="architecture-title"
        index="02"
        eyebrow="Architecture"
        title="From field sensor to decision"
        description="A representative edge-to-cloud path. Step through each stage to see its role, protocols, and failure modes."
      />
      <ArchitectureExplorer />
    </Section>
  );
}
