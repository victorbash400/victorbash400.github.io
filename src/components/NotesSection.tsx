import { interests } from "../content/siteContent";

export function NotesSection() {
  return (
    <section id="notes" className="relative">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-20">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-foreground/42">What I'm into</p>
          <h2 className="font-sans text-4xl leading-[0.98] tracking-[-0.04em] text-foreground md:text-5xl">
            Audio, software for fun, YouTube, light gaming, and design.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-[1.9] text-foreground/74">
          {interests.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
