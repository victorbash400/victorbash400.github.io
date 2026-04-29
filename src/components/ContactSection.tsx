import { ArrowUpRight, Github, Instagram, Mail, Twitter, type LucideIcon } from "lucide-react";

import { contactLinks } from "../content/siteContent";

const iconMap: Record<string, LucideIcon> = {
  Email: Mail,
  GitHub: Github,
  X: Twitter,
  Instagram: Instagram,
};

export function ContactSection() {
  return (
    <section id="contact" className="section-panel section-panel--blue">
      <div className="section-number" aria-hidden="true">04</div>
      <div className="section-inner grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-4">
          <p className="section-kicker">Contact</p>
          <h2 className="font-sans text-4xl leading-[0.98] text-foreground md:text-5xl">
            Reach out if anything here overlaps with what you're doing.
          </h2>
          <p className="max-w-md text-base leading-[1.8] text-foreground/68 md:text-lg">
            Email is the best place to start, but the other links are here too.
          </p>
        </div>

        <div className="divide-y divide-black/8 border-y border-black/8">
          {contactLinks.map((item) => {
            const Icon = iconMap[item.label];

            return (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-foreground"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-foreground/52" />
                  <div>
                    <p className="text-sm text-foreground/46">{item.label}</p>
                    <p className="text-base text-foreground/84">{item.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-foreground/46 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
