export function NotesSection() {
  return (
    <section id="notes" className="relative">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-20">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-foreground/42">How I think</p>
          <h2 className="font-sans text-4xl leading-[0.98] tracking-[-0.04em] text-foreground md:text-5xl">
            Technical work should stay readable after the first wave of excitement.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-[1.9] text-foreground/74">
          <p>I'm drawn to technical work that stays legible after the excitement wears off. Systems with structure, real constraints, and a reason for existing beyond the initial idea.</p>
          <p>The instinct underneath most of what I build is the same: remove noise, make the moving parts clearer, and get closer to something that can be operated over time. That applies to software, to design, and to Aqualabs.</p>
        </div>
      </div>
    </section>
  );
}
