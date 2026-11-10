import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Menu } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import type { SectionId } from "@/types/portfolio";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "../ui/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function focusSection(id: SectionId) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ block: "start" });
  target.focus({ preventScroll: true });
  history.pushState(null, "", `#${id}`);
}

const sectionIds = navItems.map((item) => item.id);

export function SiteHeader() {
  const observed = useActiveSection(sectionIds);
  const [manualActive, setManualActive] = useState<SectionId | null>(null);
  const active = manualActive ?? observed;
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingTarget = useRef<SectionId | null>(null);

  useEffect(() => {
    setManualActive(null);
  }, [observed]);

  const handleMobileNav = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault();
    pendingTarget.current = id;
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <a
        href="#main-content"
        className={cn(
          "sr-only rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50",
          focusRing,
        )}
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className={cn("group flex min-w-0 items-center gap-3 rounded-md", focusRing)}
          aria-label={`${profile.name}, back to top`}
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-md bg-primary font-display text-sm font-bold tracking-tight text-primary-foreground"
          >
            MM
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display truncate text-sm font-semibold tracking-tight text-foreground">
              {profile.name}
            </span>
            <span className="hidden truncate font-mono text-[11px] tracking-wide text-muted-foreground sm:block">
              IoT · Backend · Data
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setManualActive(item.id)}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      focusRing,
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-0.5 bg-primary transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={cn(
              "hidden h-9 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex lg:hidden xl:inline-flex",
              focusRing,
            )}
          >
            Get in touch
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted lg:hidden",
                focusRing,
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-xs gap-0 border-border bg-background p-0"
              onCloseAutoFocus={(event) => {
                const id = pendingTarget.current;
                if (!id) return;
                event.preventDefault();
                pendingTarget.current = null;
                focusSection(id);
              }}
            >
              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="font-display">{profile.name}</SheetTitle>
                <SheetDescription className="font-mono text-xs">
                  {profile.roles.join(" · ")}
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(event) => handleMobileNav(event, item.id)}
                          aria-current={isActive ? "location" : undefined}
                          className={cn(
                            "flex min-h-11 items-center gap-3 rounded-md px-3 text-base font-medium transition-colors",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                            focusRing,
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "font-mono text-xs",
                              isActive ? "text-primary" : "text-muted-foreground/70",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="border-t border-border p-5">
                <a
                  href={profile.contact[0].href}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
                    focusRing,
                  )}
                >
                  Email {profile.contact[0].value}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
