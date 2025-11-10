import type { FC } from "react";

interface Project {
  name: string;
  description: string;
  language?: string;
  updated: string;
}

const projects: Project[] = [
  {
    name: "victorbash400.github.io",
    description: "Personal portfolio website",
    language: "TypeScript",
    updated: "3 hours ago"
  },
  {
    name: "Seance",
    description: "Summon the spirits of world cultures. Learn history through haunted séances, cryptic riddles, and dark folklore",
    language: "TypeScript",
    updated: "3 days ago"
  },
  {
    name: "AIAuditor",
    description: "AI Auditor Project",
    language: "TypeScript",
    updated: "3 days ago"
  },
  {
    name: "Bloom",
    description: "AI-powered farming assistant",
    language: "Python",
    updated: "last week"
  },
  {
    name: "Runsheet",
    description: "AI powered logistics dashboard",
    language: "TypeScript",
    updated: "3 weeks ago"
  },
  {
    name: "Papertrail",
    description: "Community study assistant",
    language: "Python",
    updated: "Oct 9"
  },
  {
    name: "scout",
    description: "Business agent",
    language: "Python",
    updated: "Oct 6"
  },
  {
    name: "Cartmate",
    description: "A new way to shop",
    language: "JavaScript",
    updated: "Sep 14"
  },
  {
    name: "Rainmaker",
    description: "Agentic prospect hunting and sales assistant",
    language: "Python",
    updated: "Aug 23"
  },
  {
    name: "Skribble-Royale",
    description: "Browser-based multiplayer fighting game",
    language: "JavaScript",
    updated: "Aug 4"
  },
  {
    name: "Tiles",
    description: "AI powered event planner",
    language: "Python",
    updated: "Jul 19"
  },
  {
    name: "Canary",
    description: "Lightweight, serverless AI watchdog built with AWS Lambda. Monitors real-time user prompts and builds memory-driven context",
    language: "Python",
    updated: "Jun 25"
  },
  {
    name: "legion",
    description: "Your Strategic Research employee",
    language: "Python",
    updated: "Jun 19"
  }
];

const ProjectMarquee: FC = () => {
  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="project-marquee">
      <div className="project-marquee__track">
        {duplicatedProjects.map((project, index) => (
          <div key={`${project.name}-${index}`} className="project-marquee__item">
            <span className="project-marquee__name">{project.name}</span>
            <span className="project-marquee__separator">•</span>
            <span className="project-marquee__description">{project.description}</span>
            {project.language && (
              <>
                <span className="project-marquee__separator">•</span>
                <span className="project-marquee__language">{project.language}</span>
              </>
            )}
            <span className="project-marquee__separator">•</span>
            <span className="project-marquee__updated">{project.updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;
