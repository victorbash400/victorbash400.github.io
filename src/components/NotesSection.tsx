import { interests } from "../content/siteContent";

export function NotesSection() {
  return (
    <section id="notes" className="section-panel section-panel--green">
      <div className="section-number" aria-hidden="true">03</div>
      <div className="section-inner grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-4">
          <p className="section-kicker">What I'm into</p>
          <h2 className="font-sans text-4xl leading-[0.98] text-foreground md:text-5xl">
            Audio, software for fun, YouTube, light gaming, and design.
          </h2>
        </div>

        <div className="divide-y divide-black/8 border-y border-black/8 text-lg leading-[1.8] text-foreground/74">
          {interests.map((item, index) => (
            <p key={item} className="grid gap-4 py-6 md:grid-cols-[3rem_1fr]">
              <span className="font-sans text-sm text-foreground/38">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
