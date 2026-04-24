import { ContactSection } from "./components/ContactSection";
import { FocusSection } from "./components/FocusSection";
import { IntroHero } from "./components/IntroHero";
import { NotesSection } from "./components/NotesSection";
import { SiteHeader } from "./components/SiteHeader";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <IntroHero />
        <FocusSection />
        <NotesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default App;
