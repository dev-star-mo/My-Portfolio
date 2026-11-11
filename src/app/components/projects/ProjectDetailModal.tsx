import { useRef } from "react";
import type { ReactNode, RefObject } from "react";
import { ExternalLink, FlaskConical, Github } from "lucide-react";
import { domainLabels } from "@/data/projects";
import type { ProjectItem } from "@/types/portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "../ui/utils";
import { CategoryLabel, PipelineStrip, StatusBadge, focusRing } from "./ProjectCard";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}

function DetailBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 font-mono text-[11px] font-medium tracking-[0.16em] text-primary uppercase">
        {label}
      </h3>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </section>
  );
}

const linkButton =
  "inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors";

export function ProjectDetailModal({
  project,
  open,
  onClose,
  returnFocusRef,
}: ProjectDetailModalProps) {
  const pendingAnchor = useRef<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      {project && (
        <DialogContent
          className="max-h-[min(90vh,56rem)] gap-0 overflow-y-auto bg-card p-0 sm:max-w-3xl"
          onCloseAutoFocus={(event) => {
            const anchor = pendingAnchor.current;
            pendingAnchor.current = null;
            if (anchor) {
              event.preventDefault();
              const target = document.getElementById(anchor);
              target?.scrollIntoView({ block: "start" });
              target?.focus({ preventScroll: true });
              history.pushState(null, "", `#${anchor}`);
              return;
            }
            if (!returnFocusRef.current) return;
            event.preventDefault();
            returnFocusRef.current.focus();
          }}
        >
          <DialogHeader className="gap-3 border-b border-border p-5 pr-12 text-left sm:p-7 sm:pr-14">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <StatusBadge project={project} />
              <CategoryLabel category={project.primaryCategory} />
            </div>
            <DialogTitle className="text-xl leading-snug font-semibold tracking-tight sm:text-2xl">
              {project.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {project.contextProblem}
            </DialogDescription>
            {project.secondaryDomains && project.secondaryDomains.length > 0 && (
              <p className="font-mono text-[11px] text-muted-foreground">
                Also spans: {project.secondaryDomains.map((d) => domainLabels[d]).join(" · ")}
              </p>
            )}
          </DialogHeader>

          <div className="space-y-6 p-5 sm:p-7">
            {project.status === "sample-case-study" && (
              <p className="flex gap-3 rounded-lg border border-status-amber/50 bg-status-amber/10 p-3 text-sm leading-relaxed text-amber-ink">
                <FlaskConical className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-semibold">Demonstration project.</strong>{" "}
                  {project.progressNote}
                </span>
              </p>
            )}

            <DetailBlock label="Role & contribution">
              <p>{project.roleContribution}</p>
            </DetailBlock>

            <DetailBlock label="Solution & architecture">
              <p>{project.solutionArchitecture}</p>
              {project.architectureFlow && (
                <PipelineStrip steps={project.architectureFlow} className="mt-4" />
              )}
            </DetailBlock>

            <DetailBlock label="Tech stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock label="Outcome & evidence">
              <p>{project.outcomeEvidence}</p>
              {project.relatedExperienceId && (
                <a
                  href="#experience"
                  onClick={(event) => {
                    event.preventDefault();
                    pendingAnchor.current = "experience";
                    onClose();
                  }}
                  className={cn(
                    "mt-2 inline-block rounded-sm font-medium text-primary underline-offset-4 hover:underline",
                    focusRing,
                  )}
                >
                  See the related deployments in Experience
                </a>
              )}
            </DetailBlock>

            {(project.links?.liveDemo || project.links?.github) && (
              <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
                {project.links.liveDemo && (
                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      linkButton,
                      "justify-center bg-primary text-primary-foreground hover:bg-primary/90",
                      focusRing,
                    )}
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Open dashboard
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      linkButton,
                      "justify-center border border-border text-foreground hover:bg-muted",
                      focusRing,
                    )}
                  >
                    <Github className="size-4" aria-hidden="true" />
                    View source on GitHub
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
