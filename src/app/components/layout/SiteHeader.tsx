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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

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
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingTarget = useRef<SectionId | null>(null);

  const handleMobileNav = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    // Scroll only after the Sheet unmounts and releases its body scroll lock.
    event.preventDefault();
    pendingTarget.current = id;
    setMenuOpen(false);
  };

  return (
    <header className="surface-dark sticky top-0 z-40 border-b border-navy-border bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/85">
      <a
        href="#main-content"
        className={cn(
          "sr-only rounded-md bg-accent-cyan px-4 py-2 text-sm font-semibold text-navy focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50",
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
            className="grid size-9 shrink-0 place-items-center rounded-md border border-accent-cyan/40 bg-navy-elevated font-mono text-sm font-semibold text-accent-cyan transition-colors group-hover:border-accent-cyan"
          >
            MM
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-semibold text-on-dark">{profile.name}</span>
            <span className="hidden truncate font-mono text-[11px] tracking-wide text-on-dark-muted sm:block">
              IoT · Backend · Data
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark",
                      focusRing,
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent-cyan transition-opacity",
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
              "hidden h-9 items-center rounded-md bg-accent-cyan px-4 text-sm font-semibold text-navy transition-colors hover:bg-accent-cyan/90 sm:inline-flex lg:hidden xl:inline-flex",
              focusRing,
            )}
          >
            Get in touch
          </a>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-md border border-navy-border text-on-dark transition-colors hover:bg-navy-elevated lg:hidden",
                focusRing,
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="surface-dark w-[85vw] max-w-xs gap-0 border-navy-border p-0 [&>button:last-child]:text-on-dark"
              onCloseAutoFocus={(event) => {
                const id = pendingTarget.current;
                if (!id) return;
                event.preventDefault();
                pendingTarget.current = null;
                focusSection(id);
              }}
            >
              <SheetHeader className="border-b border-navy-border p-5">
                <SheetTitle className="text-on-dark">{profile.name}</SheetTitle>
                <SheetDescription className="font-mono text-xs text-on-dark-muted">
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
                              ? "bg-navy-elevated text-on-dark"
                              : "text-on-dark-muted hover:bg-navy-elevated/60 hover:text-on-dark",
                            focusRing,
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "font-mono text-xs",
                              isActive ? "text-accent-cyan" : "text-on-dark-muted/70",
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
              <div className="border-t border-navy-border p-5">
                <a
                  href={profile.contact[0].href}
                  className={cn(
                    "flex h-11 items-center justify-center rounded-md bg-accent-cyan text-sm font-semibold text-navy transition-colors hover:bg-accent-cyan/90",
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
