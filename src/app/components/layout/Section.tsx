import type { ReactNode } from "react";
import type { SectionId } from "@/types/portfolio";
import { cn } from "../ui/utils";

type SectionTone = "light" | "white" | "dark" | "dark-elevated";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-background",
  white: "bg-card",
  dark: "surface-dark",
  "dark-elevated": "surface-dark bg-navy-elevated",
};

interface SectionProps {
  id?: SectionId;
  tone?: SectionTone;
  grid?: boolean;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  tone = "light",
  grid = false,
  labelledBy,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      tabIndex={id ? -1 : undefined}
      className={cn(
        "relative scroll-mt-20 py-16 outline-none md:py-24",
        toneClasses[tone],
        className,
      )}
    >
      {grid && (
        <div
          aria-hidden="true"
          className="tech-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]"
        />
      )}
      <div className={cn("container-page relative", containerClassName)}>{children}</div>
    </section>
  );
}
