import { type FC } from "react";
import { socialLinks } from "../content/siteContent";
import Terminal from "./Terminal";
import ProjectMarquee from "./ProjectMarquee";
import Socials from "./Socials";

const Hero: FC = () => {
  const terminalLottieUrl = "https://lottie.host/6531dccb-4d0e-4ee4-aeb1-a2bcd8d8c0b3/2gpEpoiUNl.lottie";

  return (
    <>
      <main className="landing" id="top">
        <div className="landing__background" aria-hidden="true">
          <span className="landing__blur landing__blur--pink" />
          <span className="landing__blur landing__blur--lavender" />
          <span className="landing__grain" />
        </div>

        <div className="container">
          <div className="landing__shell">
            <div className="landing__content">
              <div className="landing__hero-grid">
                <div className="landing__intro">
                  <div className="landing__header">
                    <p className="landing__eyebrow">Full-Stack Developer</p>
                    <h1 className="landing__name">Victor Bash</h1>
                  </div>
                  
                  <p className="landing__lead">
                    Specializing in the complete lifecycle of modern web applications—from 
                    concept to deployment. I build reliable, scalable systems that solve 
                    real-world problems with clean, maintainable code.
                  </p>

                  <Socials />
                </div>

                <div className="landing__terminal-section">
                  <Terminal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ProjectMarquee />
    </>
  );
};

export default Hero;
