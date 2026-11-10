import { Github, Linkedin, Mail } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import type { SocialLink } from "@/types/portfolio";
import { cn } from "../ui/utils";

const socialIcons: Record<SocialLink["id"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
};

const linkClass =
  "rounded-sm text-sm text-on-dark-muted transition-colors hover:text-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export function SiteFooter() {
  const email = profile.contact.find((item) => item.id === "email");
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark border-t border-navy-border">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
        <div>
          <p className="text-base font-semibold text-on-dark">{profile.name}</p>
          <p className="mt-1 font-mono text-xs tracking-wide text-on-dark-muted">
            {profile.roles.join(" · ")}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            {profile.coreMessage}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent-cyan uppercase">
            Sections
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-mono text-xs font-medium tracking-[0.18em] text-accent-cyan uppercase">
            Connect
          </p>
          <ul className="space-y-2">
            {email?.href && (
              <li>
                <a href={email.href} className={cn(linkClass, "inline-flex items-center gap-2")}>
                  <Mail className="size-4" aria-hidden="true" />
                  {email.value}
                </a>
              </li>
            )}
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(linkClass, "inline-flex items-center gap-2")}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {social.label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
