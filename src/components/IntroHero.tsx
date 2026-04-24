import { ArrowUpRight } from "lucide-react";

import { intro } from "../content/siteContent";

export function IntroHero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-foreground/42">
              {intro.eyebrow}
            </p>
            <h1 className="max-w-3xl font-sans text-4xl leading-[1] tracking-[-0.05em] text-foreground md:text-6xl">
              {intro.title}
            </h1>
            <div className="max-w-2xl space-y-5 text-lg leading-[1.75] text-foreground/74 md:text-[1.24rem]">
              <p>{intro.body}</p>
              <p>{intro.note}</p>
            </div>
          </div>
        </div>

        <aside className="grid gap-5">
          <figure className="overflow-hidden rounded-[2rem] bg-[#ebe5d8]">
            <img
              src="/me.png"
              alt="Victor Bash portrait"
              className="aspect-square h-full w-full object-cover"
            />
          </figure>
          <a
            href="https://aqualabs.tech"
            className="flex items-center justify-between border-t border-black/8 pt-4 text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            <span>Current focus: building Aqualabs</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </section>
  );
}
