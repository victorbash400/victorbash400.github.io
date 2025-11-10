import { useState, useEffect, FC } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

const Terminal: FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const fullLines = [
    "victor@portfolio:~$ whoami",
  "Victor Bash - full-stack engineer shipping usable products",
    "victor@portfolio:~$ stack --top",
    "TypeScript | React | Node.js | Rust",
    "victor@portfolio:~$ open ./contact",
    "Opening mailto:victorbash400@gmail.com",
    "victor@portfolio:~$ ",
  ];

  useEffect(() => {
    if (currentLineIndex >= fullLines.length) {
      setIsComplete(true);
      // Reset after 2 seconds to loop
      setTimeout(() => {
        setLines([]);
        setCurrentLineIndex(0);
        setCurrentText("");
        setIsComplete(false);
      }, 2000);
      return;
    }

    const currentFullLine = fullLines[currentLineIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentFullLine.length) {
        setCurrentText(currentFullLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setLines((prev) => [...prev, currentFullLine]);
        setCurrentText("");
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, currentLineIndex === 0 ? 300 : 200);
      }
    }, currentLineIndex === 0 ? 50 : 30);

    return () => clearInterval(typeInterval);
  }, [currentLineIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="terminal-widget">
      <div className="terminal-widget__header">
        <div className="terminal-widget__controls">
          <span className="terminal-widget__dot terminal-widget__dot--red" />
          <span className="terminal-widget__dot terminal-widget__dot--yellow" />
          <span className="terminal-widget__dot terminal-widget__dot--green" />
        </div>
        <div className="terminal-widget__title">
          <TerminalIcon size={14} />
          <span>bash</span>
        </div>
        <div className="terminal-widget__spacer" />
      </div>
      <div className="terminal-widget__body">
        <div className="terminal-widget__text">
          {lines.map((line, index) => (
            <div key={index} className="terminal-widget__line">
              {line}
            </div>
          ))}
          {currentText && (
            <div className="terminal-widget__line">
              {currentText}
              <span className="terminal-widget__cursor">|</span>
            </div>
          )}
          {isComplete && (
            <div className="terminal-widget__line">
              <span className="terminal-widget__cursor">|</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
