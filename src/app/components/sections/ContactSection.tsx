import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import type { ContactMethod, SocialLink } from "@/types/portfolio";
import { Section } from "../layout/Section";
import { SectionHeading } from "../layout/SectionHeading";
import { cn } from "../ui/utils";

const contactIcons: Record<ContactMethod["id"], typeof Mail> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
};

const socialIcons: Record<SocialLink["id"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

export function ContactSection() {
  const reduceMotion = useReducedMotion();
  const email = profile.contact.find((item) => item.id === "email");

  return (
    <Section id="contact" tone="dark" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        index="06"
        eyebrow="Contact"
        title="Let's build something useful"
        description="Open to IoT deployments, backend services, analytics collaborations, and conversations about connected systems in the field."
      />

      <ul className="grid gap-6 sm:grid-cols-3">
        {profile.contact.map((item, index) => {
          const Icon = contactIcons[item.id];
          const content = (
            <>
              <div className="mb-4 grid size-11 place-items-center rounded-md bg-navy-elevated text-signal">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-on-dark-muted uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium text-on-dark">{item.value}</p>
            </>
          );

          return (
            <motion.li
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.06 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    "block rounded-md border border-navy-border bg-navy-elevated/60 p-5 transition-colors hover:border-signal/40",
                    focusRing,
                  )}
                >
                  {content}
                </a>
              ) : (
                <div className="rounded-md border border-navy-border bg-navy-elevated/60 p-5">
                  {content}
                </div>
              )}
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {profile.socials.map((social, index) => {
          const Icon = socialIcons[social.id];
          return (
            <motion.a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.12 + index * 0.06 }}
              className={cn(
                "group flex items-center gap-4 rounded-md border border-navy-border bg-navy-elevated/60 p-5 transition-colors hover:border-signal/40",
                focusRing,
              )}
            >
              <div className="grid size-12 place-items-center rounded-md bg-navy text-signal transition-colors group-hover:bg-signal group-hover:text-navy">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-on-dark">{social.label}</p>
                <p className="mt-0.5 font-mono text-xs text-on-dark-muted">{social.handle}</p>
              </div>
              <span className="sr-only">(opens in a new tab)</span>
            </motion.a>
          );
        })}
      </div>

      {email?.href && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.18 }}
          className="mt-12 border-t border-navy-border pt-10 text-center"
        >
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-on-dark-muted">
            Prefer email? Send a note about the system you are building — edge hardware, ingestion
            services, or the reporting layer on top.
          </p>
          <a
            href={email.href}
            className={cn(
              "mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-signal px-6 text-sm font-semibold text-navy transition-colors hover:bg-signal/90",
              focusRing,
            )}
          >
            <Mail className="size-4" aria-hidden="true" />
            Email {profile.name.split(" ")[0]}
          </a>
          {profile.cvUrl && (
            <a
              href={profile.cvUrl}
              className={cn(
                "mt-4 ml-0 inline-flex h-12 items-center justify-center rounded-md border border-navy-border px-6 text-sm font-medium text-on-dark transition-colors hover:border-signal/40 sm:ml-3",
                focusRing,
              )}
            >
              Download CV
            </a>
          )}
        </motion.div>
      )}
    </Section>
  );
}
