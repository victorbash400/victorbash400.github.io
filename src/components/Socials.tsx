import type { FC } from "react";
import { Github, Instagram, Twitter, Trophy, Mail, Linkedin } from "lucide-react";
import { socialLinks } from "../content/siteContent";

const iconMap: Record<string, any> = {
  Github,
  Instagram,
  Twitter,
  Trophy,
  Mail,
  MailOpen: Mail,
  Linkedin,
};

const Socials: FC = () => {
  const allSocials = socialLinks;

  return (
    <div className="landing__socials-card">
      <nav className="landing__socials-nav" aria-label="Social media">
        {allSocials.map((link, index) => {
          const Icon = iconMap[link.icon];
          
          // Use GIF for GitHub, icons for others
          if (link.icon === "Github") {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="landing__social-link"
                aria-label={link.label}
                title={link.label}
                data-tooltip={link.label}
                style={{ 
                  '--i': index,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                } as React.CSSProperties}
              >
                <img 
                  src="/assets/icons8-github.gif" 
                  alt="GitHub" 
                  width={44} 
                  height={44}
                  style={{ display: 'block' }}
                />
              </a>
            );
          }
          
          return Icon ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="landing__social-link"
              aria-label={link.label}
              title={link.label}
              data-tooltip={link.label}
              style={{ '--i': index } as React.CSSProperties}
            >
              <Icon size={20} strokeWidth={1.4} />
            </a>
          ) : null;
        })}
      </nav>
    </div>
  );
};

export default Socials;
