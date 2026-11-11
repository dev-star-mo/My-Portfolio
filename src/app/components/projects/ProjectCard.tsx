import { ArrowRight, BarChart3, ChevronRight, Cpu, ExternalLink, Github, ServerCog } from "lucide-react";
import { domainLabels } from "@/data/projects";
import type { DomainCategory, ProjectItem, ProjectStatus } from "@/types/portfolio";
import { cn } from "../ui/utils";

export const domainIcons: Record<DomainCategory, typeof Cpu> = {
  iot: Cpu,
  backend: ServerCog,
  analytics: BarChart3,
};

const statusStyles: Record<ProjectStatus, string> = {
  completed: "border-primary/25 bg-primary/8 text-primary",
  "sample-case-study": "border-status-amber/40 bg-status-amber/10 text-amber-ink",
  "in-progress": "border-status-amber/40 bg-status-amber/10 text-amber-ink",
  concept: "border-border bg-muted text-muted-foreground",
};

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card";

export function StatusBadge({ project, className }: { project: ProjectItem; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.08em] uppercase",
        statusStyles[project.status],
        className,
      )}
    >
      {project.subtitleBadge}
    </span>
  );
}

export function CategoryLabel({ category }: { category: DomainCategory }) {
  const Icon = domainIcons[category];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground">
      <Icon className="size-3.5 text-primary" aria-hidden="true" />
      {domainLabels[category]}
    </span>
  );
}

export function PipelineStrip({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol
      className={cn("flex flex-wrap items-center gap-y-1.5 font-mono text-[11px]", className)}
      aria-label="Architecture flow"
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          <span className="rounded-md border border-border bg-background px-2 py-1 text-foreground">
            {step}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight className="mx-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  onOpen: (project: ProjectItem, trigger: HTMLElement) => void;
  featured?: boolean;
}

const MAX_TAGS = 4;

export function ProjectCard({ project, onOpen, featured = false }: ProjectCardProps) {
  const extraTags = project.techStack.length - MAX_TAGS;
  const titleId = `project-${project.id}-title`;

  if (featured) {
    return (
      <article
        aria-labelledby={titleId}
        className="grid gap-8 border-y border-foreground/10 py-10 md:grid-cols-12 md:gap-10 md:py-14"
      >
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <StatusBadge project={project} />
            <CategoryLabel category={project.primaryCategory} />
          </div>
          <h3
            id={titleId}
            className="font-display mt-4 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {project.title.replace(" (Wangari Maathai Foundation Hackathon)", "")}
          </h3>
          <p className="mt-2 font-mono text-xs tracking-wide text-primary">
            Wangari Maathai Foundation Hackathon
          </p>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
            {project.contextProblem}
          </p>
          {project.architectureFlow && (
            <PipelineStrip steps={project.architectureFlow} className="mt-6" />
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(event) => onOpen(project, event.currentTarget)}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
                focusRing,
              )}
            >
              View case study
              <span className="sr-only">: {project.title}</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            {project.links?.liveDemo && (
              <a
                href={project.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted",
                  focusRing,
                )}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Dashboard
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub (opens in a new tab)`}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  focusRing,
                )}
              >
                <Github className="size-4.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Stack
          </p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-foreground/85">
            {project.outcomeEvidence}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={titleId}
      className="group flex h-full flex-col border-t border-foreground/10 pt-5 transition-colors hover:border-primary/40"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CategoryLabel category={project.primaryCategory} />
        <StatusBadge project={project} />
      </div>

      <h3
        id={titleId}
        className="font-display mt-4 text-xl leading-snug font-semibold tracking-tight text-foreground"
      >
        {project.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {project.contextProblem}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.techStack.slice(0, MAX_TAGS).map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-foreground"
          >
            {tech}
          </li>
        ))}
        {extraTags > 0 && (
          <li className="rounded-md px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
            +{extraTags} more
          </li>
        )}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <button
          type="button"
          onClick={(event) => onOpen(project, event.currentTarget)}
          className={cn(
            "inline-flex h-10 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80",
            focusRing,
          )}
        >
          View case study
          <span className="sr-only">: {project.title}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-1">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
              className={cn(
                "grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                focusRing,
              )}
            >
              <Github className="size-4.5" aria-hidden="true" />
            </a>
          )}
          {project.links?.liveDemo && (
            <a
              href={project.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} dashboard (opens in a new tab)`}
              className={cn(
                "grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                focusRing,
              )}
            >
              <ExternalLink className="size-4.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function LabCard({ project }: { project: ProjectItem }) {
  return (
    <article className="flex h-full flex-col border-t border-dashed border-border pt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CategoryLabel category={project.primaryCategory} />
        <StatusBadge project={project} />
      </div>
      <h4 className="font-display mt-3 text-base leading-snug font-semibold text-foreground">
        {project.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.contextProblem}</p>
      {project.progressNote && (
        <p className="mt-auto border-t border-border pt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
          <span className="text-foreground">Status:</span> {project.progressNote}
        </p>
      )}
    </article>
  );
}
