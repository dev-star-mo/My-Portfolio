import { useRef, useState } from "react";
import { FlaskConical } from "lucide-react";
import {
  additionalProjects,
  analyticsProjects,
  featuredProjects,
  labProjects,
} from "@/data/projects";
import type { DomainCategory, ProjectItem } from "@/types/portfolio";
import { Section } from "../layout/Section";
import { SectionHeading } from "../layout/SectionHeading";
import { LabCard, ProjectCard } from "../projects/ProjectCard";
import { ProjectDetailModal } from "../projects/ProjectDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Filter = "all" | DomainCategory | "additional";

const FLAGSHIP_ID = "forest-acoustic-monitoring";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Featured" },
  { id: "iot", label: "IoT" },
  { id: "backend", label: "Software" },
  { id: "analytics", label: "Data Analytics" },
  { id: "additional", label: "Additional" },
];

const projectsFor = (filter: Filter): ProjectItem[] => {
  if (filter === "additional") return additionalProjects;
  if (filter === "all") return featuredProjects;
  if (filter === "analytics") return analyticsProjects;
  return featuredProjects.filter((p) => p.primaryCategory === filter);
};

export function FeaturedProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const openProject = (project: ProjectItem, trigger: HTMLElement) => {
    openerRef.current = trigger;
    setActiveProject(project);
    setModalOpen(true);
  };

  const visible = projectsFor(filter);
  const isAdditional = filter === "additional";
  const flagship =
    !isAdditional && (filter === "all" || filter === "iot")
      ? visible.find((p) => p.id === FLAGSHIP_ID)
      : undefined;
  const supporting = visible.filter((p) => p.id !== FLAGSHIP_ID || !flagship);
  const visibleLab =
    isAdditional || filter === "analytics"
      ? []
      : filter === "all"
        ? labProjects
        : labProjects.filter((project) => project.primaryCategory === filter);

  return (
    <Section id="projects" tone="light" labelledBy="projects-title">
      <SectionHeading
        id="projects-title"
        index="01"
        eyebrow="Projects"
        title="Selected systems"
        description="Case studies across connected hardware, software platforms, and data analytics. Featured highlights key work; Data Analytics holds the full Ke Data Lab catalogue. Additional covers separate builds."
      />

      <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} className="gap-8">
        <TabsList
          aria-label="Filter projects by category"
          className="inline-flex h-auto w-full flex-wrap gap-1 rounded-none border-0 bg-transparent p-0 sm:w-auto"
        >
          {filters.map((f) => {
            const count = projectsFor(f.id).length;
            return (
              <TabsTrigger
                key={f.id}
                value={f.id}
                aria-label={`${f.label}, ${count} ${count === 1 ? "project" : "projects"}`}
                className="h-9 rounded-md border border-transparent px-3 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                {f.label}
                <span className="ml-1.5 font-mono text-[11px] opacity-60" aria-hidden="true">
                  {count}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {filters.map((f) => (
          <TabsContent key={f.id} value={f.id} className="focus-visible:outline-none">
            {flagship && f.id === filter && (
              <ProjectCard project={flagship} onOpen={openProject} featured />
            )}

            <ul className="mt-2 grid gap-10 md:grid-cols-2">
              {(f.id === filter ? supporting : []).map((project) => (
                <li key={project.id}>
                  <ProjectCard project={project} onOpen={openProject} />
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>

      {visibleLab.length > 0 && (
        <section aria-labelledby="lab-title" className="mt-16 border-t border-border pt-12 md:mt-20">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-amber-ink uppercase">
                <FlaskConical className="size-3.5" aria-hidden="true" />
                Not yet completed
              </p>
              <h3 id="lab-title" className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                In Progress &amp; Concept Lab
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Planned work, kept separate from the completed case studies above.
            </p>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {visibleLab.map((project) => (
              <li key={project.id}>
                <LabCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProjectDetailModal
        project={activeProject}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        returnFocusRef={openerRef}
      />
    </Section>
  );
}
