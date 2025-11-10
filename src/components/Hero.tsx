import type { FC } from "react";
import logo from "../../assets/Perfil.jpeg";
import { highlightItems, terminalSnippets, socialLinks } from "../content/siteContent";

const Hero: FC = () => {
  return (
    <main className="hero">
      <div className="container">
        <div className="hero__grid">
          {/* Left Column - Profile & Info */}
          <div className="hero__left">
            <div className="profile-card">
              <div className="profile-card__frame">
                <img src={logo} alt="Victor Bash" />
              </div>
              <div className="profile-card__info">
                <h1 className="profile-card__name">Victor Bash</h1>
                <p className="profile-card__title">Full-Stack Developer</p>
                <span className="profile-card__status">
                  <span className="status-dot"></span>
                  Available for work
                </span>
              </div>
            </div>

            <div className="about-card">
              <h2 className="about-card__title">About Me</h2>
              <p className="about-card__text">
                I build full-stack web products that feel effortless to use and effortless to maintain.
                From whiteboard to production, I design architectures, craft TypeScript interfaces, and
                launch dependable Node.js services.
              </p>
            </div>

            <div className="highlights-grid">
              {highlightItems.map((item) => (
                <div key={item.label} className="highlight-card">
                  <span className="highlight-card__label">{item.label}</span>
                  <p className="highlight-card__detail">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="social-card">
              <h3 className="social-card__title">Connect With Me</h3>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-link__icon">{link.icon}</span>
                    <div className="social-link__info">
                      <span className="social-link__label">{link.label}</span>
                      <span className="social-link__value">{link.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Terminals */}
          <div className="hero__right">
            <div className="terminals-grid">
              {terminalSnippets.map((terminal) => (
                <div key={terminal.id} className="terminal-card">
                  <header className="terminal-card__header">
                    <div className="terminal-card__dots">
                      <span className="terminal-card__dot terminal-card__dot--red" />
                      <span className="terminal-card__dot terminal-card__dot--amber" />
                      <span className="terminal-card__dot terminal-card__dot--green" />
                    </div>
                    <span className="terminal-card__title">{terminal.filename}</span>
                  </header>
                  <div className="terminal-card__body">
                    <p className="terminal-card__prompt">
                      <span className="terminal-card__path">{terminal.prompt}</span>
                      <span className="terminal-card__symbol">~$</span>
                      <span className="terminal-card__command">{terminal.command}</span>
                    </p>
                    <div className="terminal-card__output">
                      {terminal.output.map((line, index) => (
                        <div key={`${terminal.id}-${index}`} className="terminal-card__line">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
