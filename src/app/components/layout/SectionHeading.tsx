import type { ReactNode } from "react";
import { cn } from "../ui/utils";

interface SectionHeadingProps {
  id: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "mb-10 max-w-3xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-primary uppercase">
        {index && <span>{`${index} // `}</span>}
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}
