import { useEffect, useState } from "react";

const LINES = [
  "> Initializing System... [OK]",
  "> Loading Java/Spring Boot... [OK]",
  "> Connecting Kafka Streams... [OK]",
  "> Security Layer Active... [OK]",
  "> All systems operational.",
];

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (currentLine >= LINES.length) {
      setDone(true);
      return;
    }

    const target = LINES[currentLine];
    if (currentChar < target.length) {
      const t = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, 35);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, target]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, 300);
    return () => clearTimeout(t);
  }, [currentLine, currentChar, done]);

  const currentTyping =
    !done && currentLine < LINES.length
      ? LINES[currentLine].slice(0, currentChar)
      : "";

  return (
    <div
      className="rounded-lg p-4 font-mono text-sm"
      style={{
        background: "#0D0D14",
        border: "1px solid rgba(46,91,255,0.4)",
        boxShadow:
          "0 0 20px rgba(46,91,255,0.15), inset 0 0 30px rgba(0,0,0,0.5)",
        minHeight: "160px",
      }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 mb-3 pb-2"
        style={{ borderBottom: "1px solid rgba(46,91,255,0.2)" }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: "#ff5f57" }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: "#febc2e" }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: "#28c840" }}
        />
        <span className="ml-2 text-xs" style={{ color: "rgba(170,255,0,0.6)" }}>
          system.init
        </span>
      </div>

      {/* Completed lines */}
      {displayedLines.map((line) => (
        <div key={line} className="mb-1" style={{ color: "#AAFF00" }}>
          {line}
        </div>
      ))}

      {/* Currently typing line */}
      {!done && currentLine < LINES.length && (
        <div style={{ color: "#AAFF00" }}>
          {currentTyping}
          <span className="cursor-blink" style={{ color: "#2E5BFF" }}>
            █
          </span>
        </div>
      )}

      {done && (
        <div className="mt-2" style={{ color: "rgba(46,91,255,0.8)" }}>
          <span className="cursor-blink">█</span>
        </div>
      )}
    </div>
  );
}
