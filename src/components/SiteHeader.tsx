const links = [
  { label: "Work", href: "#work" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/6 bg-background/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="flex items-center gap-3 text-sm font-medium tracking-[0.12em] text-foreground"
        >
          <img src="/logo-128.png" alt="Victor Bash logo" className="h-9 w-9 rounded-full" />
          <span className="uppercase">Victor Bash</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-foreground/68 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
