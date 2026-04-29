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
    <section id="contact" className="relative border-t border-black/8 bg-[#141413] text-[#f4efe4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-white/42">Contact</p>
          <h2 className="font-sans text-4xl leading-[0.98] tracking-[-0.04em] text-white md:text-5xl">
            Reach out if anything here overlaps with what you're doing.
          </h2>
          <p className="max-w-md text-base leading-[1.8] text-white/68 md:text-lg">
            Email is the best place to start, but the other links are here too.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {contactLinks.map((item) => {
            const Icon = iconMap[item.label];

            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between gap-4 py-5 transition-colors hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-white/52" />
                  <div>
                    <p className="text-sm text-white/46">{item.label}</p>
                    <p className="text-base text-white/84">{item.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/46" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
