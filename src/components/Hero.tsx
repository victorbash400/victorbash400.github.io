import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type CommandKey = "whoami" | "profile" | "presence" | "interests" | "now";
type LineVariant = "prompt" | "output" | "meta";

type LineDescriptor = {
  prefix: string;
  content: string;
  variant: LineVariant;
  highlights?: string[];
};

type LogLine = LineDescriptor & {
  id: string;
  isNew?: boolean;
};

type CommandScript = {
  label: string;
  description: string;
  sequence: LineDescriptor[];
};

type MonitorKey = "devServer" | "unitTests" | "deploy";

const asciiBanner = [
  " __     __ _           _             ",
  " \\ \\   / /(_)  ___    | |__    __ _ ",
  "  \\ \\ / / | | / _ \\   | '_ \\  / _` |",
  "   \\ V /  | || (_) |  | |_) || (_| |",
  "    \\_/   |_| \\___/   |_.__/  \\__,_|",
].join("\n");

const commandOrder: CommandKey[] = [
  "whoami",
  "profile",
  "presence",
  "interests",
  "now",
];

const commandLibrary: Record<CommandKey, CommandScript> = {
  whoami: {
    label: "./whoami",
    description: "quick identity ping",
    sequence: [
      {
        prefix: "victor@oasis:~$",
        content: "./whoami",
        variant: "prompt",
      },
      {
        prefix: ">",
        content:
          "Victor Bash — 21-year-old builder at Oasis shipping thoughtful web experiences.",
        variant: "output",
        highlights: ["Victor Bash", "Oasis"],
      },
      {
        prefix: ">",
        content:
          "Blends computer science study with production delivery to stay fast and precise.",
        variant: "output",
        highlights: ["production", "precise"],
      },
      {
        prefix: ">",
        content:
          "North Star: ship polished features with tooling that never drags the team down.",
        variant: "output",
        highlights: ["North Star"],
      },
    ],
  },
  profile: {
    label: "cat developer-profile.txt",
    description: "experience snapshot",
    sequence: [
      {
        prefix: "victor@oasis:~$",
        content: "cat developer-profile.txt",
        variant: "prompt",
      },
      {
        prefix: "•",
        content:
          "Experience: 23+ public repositories tracking a steady cadence of new ideas.",
        variant: "output",
        highlights: ["23+", "public repositories"],
      },
      {
        prefix: "•",
        content:
          "Focus: pair clean tooling with a builder mindset to keep releases reliable.",
        variant: "output",
        highlights: ["clean tooling", "builder mindset"],
      },
      {
        prefix: "•",
        content:
          "Bio: developer who solves real problems by shipping, measuring, and iterating.",
        variant: "output",
        highlights: ["developer", "shipping"],
      },
    ],
  },
  presence: {
    label: "ls technical-presence",
    description: "where Victor shows up",
    sequence: [
      {
        prefix: "victor@oasis:~$",
        content: "ls technical-presence",
        variant: "prompt",
      },
      {
        prefix: "•",
        content:
          "GitHub Footprint: experiments plus polished builds spanning modern web stacks.",
        variant: "output",
        highlights: ["GitHub Footprint"],
      },
      {
        prefix: "•",
        content:
          "Portfolio: victorbash400.github.io stays updated with work notes and launches.",
        variant: "output",
        highlights: ["victorbash400.github.io"],
      },
      {
        prefix: "•",
        content:
          "Cadence: commits and version bumps arrive regularly to keep momentum visible.",
        variant: "output",
        highlights: ["cadence", "momentum"],
      },
    ],
  },
  interests: {
    label: "tail -n 5 interests.log",
    description: "what's lighting up now",
    sequence: [
      {
        prefix: "victor@oasis:~$",
        content: "tail -n 5 interests.log",
        variant: "prompt",
      },
      {
        prefix: "•",
        content: "Full-stack systems: connecting frontends to reliable infra without friction.",
        variant: "output",
        highlights: ["Full-stack"],
      },
      {
        prefix: "•",
        content: "Side quests: testing new patterns in small projects before scaling them up.",
        variant: "output",
        highlights: ["Side quests"],
      },
      {
        prefix: "•",
        content:
          "Community: contributing back and sharing learning logs to raise the floor for everyone.",
        variant: "output",
        highlights: ["Community"],
      },
      {
        prefix: "•",
        content:
          "Continuous learning: new languages, tooling, and paradigms to stay future-proof.",
        variant: "output",
        highlights: ["Continuous learning"],
      },
    ],
  },
  now: {
    label: "now --status",
    description: "current focus block",
    sequence: [
      {
        prefix: "victor@oasis:~$",
        content: "now --status",
        variant: "prompt",
      },
      {
        prefix: ">",
        content:
          "Deep diving into multi-terminal UI concepts and smoothing developer experience flows.",
        variant: "output",
        highlights: ["multi-terminal", "developer experience"],
      },
      {
        prefix: ">",
        content: "Exploring composable animations that keep interfaces calm yet responsive.",
        variant: "output",
        highlights: ["composable animations"],
      },
      {
        prefix: ">",
        content: "Shipping timeline: fresh updates weekly with measurable improvements each cycle.",
        variant: "output",
        highlights: ["weekly", "improvements"],
      },
    ],
  },
};

const defaultSequence: CommandKey[] = ["whoami", "profile", "presence"];

const monitorMeta: Record<MonitorKey, {
  label: string;
  command: string;
  active: string;
  idle: string;
}> = {
  devServer: {
    label: "dev",
    command: "pnpm dev",
    active: "Vite server hot-reloading at :5173 — canvas stays live.",
    idle: "Workspace dormant. Spin it up to preview the latest surfaces.",
  },
  unitTests: {
    label: "tests",
    command: "pnpm test",
    active: "Vitest watch enforcing green builds while features evolve.",
    idle: "Test suite paused. Ideal moment for a focused refactor sprint.",
  },
  deploy: {
    label: "deploy",
    command: "pnpm deploy",
    active: "Latest build staged on GitHub Pages — checks all passed.",
    idle: "Deployment idle. Ship once main collects the next set of wins.",
  },
};

const monitorKeys: MonitorKey[] = ["devServer", "unitTests", "deploy"];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createLineId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createLogFromCommands = (commands: CommandKey[]): LogLine[] =>
  commands
    .flatMap((key) => commandLibrary[key].sequence)
    .map((line) => ({ ...line, id: createLineId(), isNew: false }));

const Hero: FC = () => {
  const [log, setLog] = useState<LogLine[]>(() => createLogFromCommands(defaultSequence));
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState<CommandKey | null>(null);
  const [status, setStatus] = useState("listening");
  const [clock, setClock] = useState(() => new Date());
  const [monitors, setMonitors] = useState<Record<MonitorKey, boolean>>({
    devServer: true,
    unitTests: false,
    deploy: true,
  });
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [pingMessage, setPingMessage] = useState("Ready when you are.");

  const streamRef = useRef<HTMLDivElement | null>(null);
  const timeouts = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const formattedClock = useMemo(
    () =>
      clock.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [clock]
  );

  useEffect(() => {
    const tick = setInterval(() => {
      setClock(new Date());
    }, 60000);

    return () => clearInterval(tick);
  }, []);

  const schedule = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      callback();
      timeouts.current = timeouts.current.filter((stored) => stored !== timeoutId);
    }, delay);

    timeouts.current.push(timeoutId);
  };

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    const node = streamRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [log]);

  const renderLineContent = (line: LogLine) => {
    if (!line.highlights || line.highlights.length === 0) {
      return line.content;
    }

    const pattern = new RegExp(
      `(${line.highlights.map((token) => escapeRegExp(token)).join("|")})`,
      "gi"
    );

    return line.content.split(pattern).map((segment, index) => {
      const match = line.highlights?.find(
        (token) => token.toLowerCase() === segment.toLowerCase()
      );

      if (match) {
        return (
          <span key={`${line.id}-${index}`} className="terminal__highlight">
            {segment}
          </span>
        );
      }

      return segment;
    });
  };

  const runCommand = (commandKey: CommandKey) => {
    const blueprint = commandLibrary[commandKey];
    if (!blueprint || isProcessing) {
      return;
    }

    const freshIds: string[] = [];
    const staged = blueprint.sequence.map((line) => {
      const id = createLineId();
      freshIds.push(id);
      return {
        ...line,
        id,
        isNew: true,
      };
    });

    setLog((previous) => [...previous, ...staged]);
    setIsProcessing(true);
    setLastCommand(commandKey);
    setStatus(`running ${blueprint.label}`);

    schedule(() => {
      const freshSet = new Set(freshIds);
      setLog((previous) =>
        previous.map((entry) =>
          freshSet.has(entry.id) ? { ...entry, isNew: false } : entry
        )
      );
      setIsProcessing(false);
      setStatus("listening");
    }, 640);
  };

  const clearHistory = () => {
    setLog(createLogFromCommands(defaultSequence));
    setLastCommand(null);
    setStatus("history refreshed");
    schedule(() => setStatus("listening"), 1200);
  };

  const toggleMonitor = (key: MonitorKey) => {
    setMonitors((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  const activeMonitors = monitorKeys.filter((key) => monitors[key]);
  const monitorProgress = Math.round(
    (activeMonitors.length / monitorKeys.length) * 100
  );
  const gaugeSegments = 8;
  const activeSegments = Math.max(
    1,
    Math.round((monitorProgress / 100) * gaugeSegments)
  );
  const monitorGauge = `${"#".repeat(activeSegments)}${"-".repeat(
    gaugeSegments - activeSegments
  )}`;

  const vibePhrases = useMemo(
    () => [
      "Always looking for crisp interfaces with strong foundations.",
      "Open to collabs that value shipping and learning in tandem.",
      "Currently iterating on DX patterns that keep teams unblocked.",
      "Happiest when pixels, performance, and people align.",
    ],
    []
  );

  const shufflePing = () => {
    setPingMessage((previous) => {
      const options = vibePhrases.filter((phrase) => phrase !== previous);
      const next = options[Math.floor(Math.random() * options.length)] ?? previous;
      return next;
    });
  };

  const handleCopyEmail = async () => {
    const email = "hello@victorbash.com";
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(email);
      setCopyState("copied");
      setPingMessage("Email copied — drop a line whenever.");
      schedule(() => setCopyState("idle"), 1800);
    } catch (error) {
      setCopyState("error");
      setPingMessage("Clipboard blocked — reach me at hello@victorbash.com.");
      schedule(() => setCopyState("idle"), 2000);
    }
  };

  const openInNewTab = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleOpenGitHub = () => {
    openInNewTab("https://github.com/victorbash400");
    setPingMessage("GitHub profile opened in a fresh tab.");
  };

  const handleOpenMailDraft = () => {
    openInNewTab("mailto:hello@victorbash.com?subject=Hey%20Victor!");
    setPingMessage("Draft email spinning up — see you in the inbox.");
  };

  const actionButtons = [
    {
      id: "copy",
      label: "copy email",
      description:
        copyState === "copied"
          ? "copied to clipboard"
          : "copy address for later",
      onClick: handleCopyEmail,
      variant: "primary" as const,
    },
    {
      id: "github",
      label: "open github",
      description: "peek at current repos",
      onClick: handleOpenGitHub,
    },
    {
      id: "ping",
      label: "send ping",
      description: "spin up a draft email",
      onClick: handleOpenMailDraft,
    },
    {
      id: "shuffle",
      label: "shuffle vibe",
      description: "swap the current status",
      onClick: shufflePing,
    },
  ];

  const heroHighlights = [
    {
      title: "Current mission",
      detail: "Prototyping multi-terminal UI flows that still feel friendly for the web.",
    },
    {
      title: "Superpower",
      detail: "Pairing reliable tooling with calm surfaces so teams keep shipping.",
    },
    {
      title: "Availability",
      detail: "Open to product squads that care about detail, craft, and developer joy.",
    },
  ];

  return (
    <div className="page">
      <div className="page__glow" aria-hidden="true" />

      <header className="topbar">
        <div className="shell topbar__inner">
          <div className="topbar__brand">
            <span className="topbar__dot" aria-hidden="true" />
            <span className="topbar__name">Victor Bash</span>
            <span className="topbar__role">Product Engineer @ Oasis</span>
          </div>
          <div className="topbar__links">
            <button type="button" className="link-btn" onClick={handleOpenGitHub}>
              github
            </button>
            <button type="button" className="link-btn" onClick={handleOpenMailDraft}>
              contact
            </button>
            <button
              type="button"
              className="link-btn link-btn--accent"
              onClick={handleCopyEmail}
            >
              copy email
            </button>
          </div>
        </div>
      </header>

      <main className="page__main">
        <section className="hero">
          <div className="shell hero__inner">
            <div className="hero__grid">
              <div className="hero__intro">
                <span className="hero__eyebrow">UI engineer · terminal UI tinkerer</span>
                <h1 className="hero__title">Hi, I&apos;m Victor Bash.</h1>
                <p className="hero__lead">
                  I build thoughtful web products that keep the developer experience clear
                  and the user experience calm.
                </p>
                <p className="hero__description">
                  From Oasis, I ship polished TypeScript, React, and Vite surfaces that balance
                  pace with precision. Let&apos;s partner if you want interfaces that feel modern
                  without the noise.
                </p>

                <div className="hero__actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={handleOpenMailDraft}
                  >
                    start a project
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={handleOpenGitHub}
                  >
                    browse github
                  </button>
                </div>

                <div className="hero__pulse" aria-live="polite">
                  {pingMessage}
                </div>

                <div className="hero__highlights">
                  {heroHighlights.map((item) => (
                    <div key={item.title} className="hero__highlight">
                      <span className="hero__highlight-label">{item.title}</span>
                      <p className="hero__highlight-detail">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero__terminals">
                <div className="terminal terminal--primary">
                  <header className="terminal__header" aria-label="Primary terminal toolbar">
                    <div className="terminal__dots" aria-hidden="true">
                      <span className="terminal__dot terminal__dot--red" />
                      <span className="terminal__dot terminal__dot--amber" />
                      <span className="terminal__dot terminal__dot--green" />
                    </div>
                    <div className="terminal__header-center">
                      <span className="terminal__title">victor@oasis:~/workspace</span>
                      <span className="terminal__clock" aria-label="Local time">
                        {formattedClock} local
                      </span>
                    </div>
                    <span
                      className={`terminal__badge ${
                        isProcessing ? "terminal__badge--pulse" : "terminal__badge--ready"
                      }`}
                    >
                      {isProcessing ? "running" : "ready"}
                    </span>
                  </header>

                  <div className="terminal__body">
                    <pre className="terminal__ascii" aria-hidden="true">
                      {asciiBanner}
                    </pre>

                    <div className="command-bar" role="group" aria-label="Command shortcuts">
                      {commandOrder.map((commandKey) => {
                        const blueprint = commandLibrary[commandKey];
                        return (
                          <button
                            key={commandKey}
                            type="button"
                            className="command-btn"
                            data-active={lastCommand === commandKey}
                            onClick={() => runCommand(commandKey)}
                            disabled={isProcessing}
                          >
                            <span className="command-btn__label">{blueprint.label}</span>
                            <span className="command-btn__desc">{blueprint.description}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="terminal__stream" ref={streamRef} aria-live="polite">
                      {log.map((line) => (
                        <div
                          key={line.id}
                          className={`terminal__line terminal__line--${line.variant} ${
                            line.isNew ? "is-new" : ""
                          }`}
                        >
                          <span className="terminal__prefix">{line.prefix}</span>
                          <span className="terminal__content">{renderLineContent(line)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <footer className="terminal__footer terminal__footer--primary">
                    <div className="terminal__footer-actions">
                      <button
                        type="button"
                        className="ghost-btn"
                        onClick={clearHistory}
                        disabled={isProcessing}
                      >
                        clear history
                      </button>
                      <span className="terminal__status" aria-live="polite">
                        {status}
                      </span>
                    </div>
                    <a className="terminal__link" href="mailto:hello@victorbash.com">
                      hello@victorbash.com
                    </a>
                  </footer>
                </div>

                <div className="hero__terminal-cluster">
                  <div className="terminal terminal--compact">
                    <header className="terminal__header" aria-label="Process monitor toolbar">
                      <div className="terminal__dots" aria-hidden="true">
                        <span className="terminal__dot terminal__dot--red" />
                        <span className="terminal__dot terminal__dot--amber" />
                        <span className="terminal__dot terminal__dot--green" />
                      </div>
                      <div className="terminal__header-center">
                        <span className="terminal__title">session monitors</span>
                        <span className="terminal__clock">
                          {activeMonitors.length}/{monitorKeys.length} active
                        </span>
                      </div>
                      <span className="terminal__badge terminal__badge--ghost">live</span>
                    </header>

                    <div className="terminal__body">
                      <p className="prompt">victor@oasis:~$ watch --processes</p>
                      <div className="monitor__chips">
                        {monitorKeys.map((key) => (
                          <button
                            key={key}
                            type="button"
                            className="toggle-chip"
                            data-active={monitors[key]}
                            onClick={() => toggleMonitor(key)}
                            aria-pressed={monitors[key]}
                          >
                            <span className="toggle-chip__label">{monitorMeta[key].label}</span>
                            <span className="toggle-chip__hint">
                              {monitors[key] ? "watching" : "sleeping"}
                            </span>
                          </button>
                        ))}
                      </div>

                      <ul className="monitor__list">
                        {monitorKeys.map((key) => (
                          <li key={`monitor-${key}`}>
                            <span className="monitor__command">{monitorMeta[key].command}</span>
                            <span className="monitor__status">
                              {monitors[key] ? monitorMeta[key].active : monitorMeta[key].idle}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="monitor__metrics" aria-live="polite">
                        <span className="monitor__gauge" aria-hidden="true">
                          [{monitorGauge}]
                        </span>
                        <span>{monitorProgress}% watchers engaged</span>
                      </div>
                    </div>
                  </div>

                  <div className="terminal terminal--compact">
                    <header className="terminal__header" aria-label="Quick actions toolbar">
                      <div className="terminal__dots" aria-hidden="true">
                        <span className="terminal__dot terminal__dot--red" />
                        <span className="terminal__dot terminal__dot--amber" />
                        <span className="terminal__dot terminal__dot--green" />
                      </div>
                      <div className="terminal__header-center">
                        <span className="terminal__title">quick actions</span>
                        <span className="terminal__clock">always on</span>
                      </div>
                      <span className="terminal__badge terminal__badge--ghost">ready</span>
                    </header>

                    <div className="terminal__body">
                      <p className="prompt">victor@oasis:~$ actions --interactive</p>
                      <div className="action-grid" role="group" aria-label="Action shortcuts">
                        {actionButtons.map((action) => (
                          <button
                            key={action.id}
                            type="button"
                            className="action-btn"
                            data-variant={action.variant ?? "secondary"}
                            onClick={action.onClick}
                          >
                            <span className="action-btn__label">{action.label}</span>
                            <span className="action-btn__hint">{action.description}</span>
                          </button>
                        ))}
                      </div>

                      <div className="action-log" data-state={copyState} aria-live="polite">
                        {pingMessage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
