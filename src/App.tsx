import { useState, useEffect } from "react";
import { Menu, X, Github, Twitter, Mail } from "lucide-react";

// --- Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
          ? "bg-background/80 backdrop-blur-md py-4 border-accent"
          : "bg-transparent py-5 border-transparent"
          }`}
      >
        <div className="w-full max-w-[96rem] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="font-sans text-xl font-bold uppercase tracking-[0.05em] text-foreground">
            Victor Bash
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-foreground/80 hover:text-foreground transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-lg font-serif">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground border-b border-accent pb-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#141413] text-[#F0EEE6] py-16 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-4 max-w-sm">
          <span className="font-sans text-xl font-bold tracking-tight text-white">
            Victor Bash
          </span>
          <p className="font-serif text-[#E6E4DD] leading-relaxed">
            Building the future of sustainable food systems.
          </p>
        </div>

        <div className="flex gap-6 items-center">
          <a href="https://github.com/victorbash400" className="text-white hover:text-primary transition-colors"><Github /></a>
          <a href="https://x.com/notvictorbash" className="text-white hover:text-primary transition-colors"><Twitter /></a>
          <a href="mailto:victorbash400@gmail.com" className="text-white hover:text-primary transition-colors"><Mail /></a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs font-sans text-[#E6E4DD]/60">
        <p>&copy; {new Date().getFullYear()} Victor Bash. All rights reserved.</p>
      </div>
    </footer>
  );
}

// --- Main App ---

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif selection:bg-primary/20">
      <Navbar />

      <main className="flex flex-col items-center w-full">
        {/* Hero */}
        <section className="w-full max-w-[96rem] px-6 md:px-12 pt-32 md:pt-48 pb-20 md:pb-32">
          <div className="max-w-4xl">
            <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[1.05] mb-12">
              Building meaningful <br /> systems.
            </h1>

            <div className="space-y-8 font-serif text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-3xl">
              <p>
                I'm a software developer and the founder of <a href="https://aqualabs.tech" className="underline decoration-primary/30 hover:decoration-primary transition-all">Aqualabs</a>. I work on software projects and on building fish farms. My focus is on systems that are simple, reliable, and don't need constant attention.
              </p>
            </div>
          </div>
        </section>

        {/* Work / Projects */}
        <section id="work" className="w-full max-w-[96rem] px-6 md:px-12 py-24 border-t border-accent">
          <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-primary mb-12">What I Do</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Aqualabs Card */}
            <a href="https://aqualabs.tech" className="group block bg-white border border-accent rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="p-8 md:p-12 flex flex-col h-full justify-between gap-8">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-sans text-2xl font-bold">Aqualabs</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary rounded-full">Founder & CEO</span>
                  </div>
                  <p className="font-serif text-lg text-foreground/70 leading-relaxed">
                    A technology company dedicated to solving food security in Africa. We design and deploy closed-loop aquaculture systems that are automated, data-driven, and climate-resilient.
                  </p>
                </div>
                <div className="pt-8 border-t border-accent/50">
                  <span className="font-sans text-sm font-bold border-b border-foreground/20 pb-0.5 group-hover:border-primary transition-colors">View Company &rarr;</span>
                </div>
              </div>
            </a>

            {/* GitHub / Code */}
            <a href="https://github.com/victorbash400" className="group block bg-[#141413] text-[#F0EEE6] border border-accent rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="p-8 md:p-12 flex flex-col h-full justify-between gap-8">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-sans text-2xl font-bold text-white">Code</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-white/10 text-white/80 rounded-full">GitHub</span>
                  </div>
                  <p className="font-serif text-lg text-white/70 leading-relaxed">
                    I build stuff that run well and look good— mostly TypeScript-adjacent stuff.
                  </p>
                </div>
                <div className="pt-8 border-t border-white/10">
                  <span className="font-sans text-sm font-bold border-b border-white/20 pb-0.5 group-hover:border-[#E08A6E] transition-colors text-white">View GitHub &rarr;</span>
                </div>
              </div>
            </a>

          </div>
        </section>



        {/* Contact */}
        <section id="contact" className="w-full max-w-4xl px-6 text-center py-24 border-t border-accent">
          <h2 className="font-sans text-4xl md:text-6xl font-medium mb-8">Let&#39;s connect.</h2>
          <p className="font-serif text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            I&#39;m always open to discussing sustainable tech, aquaculture, or new ventures.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a href="https://medium.com/@victorbash" className="flex items-center gap-2 px-6 py-3 bg-secondary border border-accent rounded-full font-sans text-sm font-bold hover:bg-accent transition-colors">
              Blogs on Medium
            </a>
            <a href="https://github.com/victorbash400" className="flex items-center gap-2 px-6 py-3 bg-secondary border border-accent rounded-full font-sans text-sm font-bold hover:bg-accent transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://x.com/notvictorbash" className="flex items-center gap-2 px-6 py-3 bg-secondary border border-accent rounded-full font-sans text-sm font-bold hover:bg-accent transition-colors">
              <Twitter className="w-4 h-4" /> Twitter
            </a>
            <a href="https://instagram.com/victorbash.dev" className="flex items-center gap-2 px-6 py-3 bg-secondary border border-accent rounded-full font-sans text-sm font-bold hover:bg-accent transition-colors">
              Instagram
            </a>
          </div>

          <a
            href="mailto:victorbash400@gmail.com"
            className="inline-block px-10 py-5 bg-primary text-background text-xl font-bold rounded-xl hover:bg-primary/90 transition-colors hover:-translate-y-1 duration-300 font-sans shadow-lg shadow-primary/20"
          >
            Email Me
          </a>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default App;
