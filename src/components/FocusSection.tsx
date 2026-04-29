import { ArrowUpRight } from "lucide-react";

import { focusAreas } from "../content/siteContent";

export function FocusSection() {
  return (
    <section id="work" className="relative border-y border-black/8 bg-[#f2ecdf]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-foreground/42">
            What I'm building
          </p>
          <h2 className="max-w-xl font-sans text-4xl leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl">
            Aqualabs is the main thing. Software keeps happening around it.
          </h2>
          <div className="space-y-5 text-base leading-[1.85] text-foreground/70 md:text-lg">
            <p>
              Aqualabs is where most of my current effort goes: fish farming systems, research,
              operations, and the work needed to make it real.
            </p>
            <p>
              I still build software whenever an idea is interesting enough to pull me in.
            </p>
          </div>
        </div>

        <div className="divide-y divide-black/8 border-y border-black/8">
          {focusAreas.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="grid gap-4 py-7 transition-colors hover:text-foreground md:grid-cols-[1fr_auto]"
            >
              <div className="space-y-2">
                <h3 className="font-sans text-2xl tracking-[-0.03em] text-foreground">{item.title}</h3>
                <p className="max-w-xl text-base leading-[1.75] text-foreground/66">{item.copy}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/56">
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
