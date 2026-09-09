"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { skills, projects, certifications, contactData, aboutData } from "@/lib/data/portfolio";

type CommandEntry = {
  description: string;
  output?: string | (() => string);
  action?: () => void;
};

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<React.ReactNode[]>([
    <div key="welcome">
      <p className="text-[1.1rem] font-bold text-[#00ff00] drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">🚀 Welcome to Nyraroot Terminal v1.0</p>
      <p className="text-[#00cc00]">Cybersecurity | Full-Stack Development</p>
      <p>
        Type <span className="rounded bg-[rgba(0,255,255,0.1)] px-1 py-0.5 text-[#00ffff]">&apos;help&apos;</span> to see available commands
      </p>
      <br />
    </div>,
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const openTerminal = useCallback(() => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);
  const closeTerminal = useCallback(() => setOpen(false), []);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) closeTerminal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeTerminal]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [output]);

  const commands: Record<string, CommandEntry> = {
    help: {
      description: "Show available commands",
      output: `
<span class="text-[#00ffff]">Available Commands:</span>
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">help</span>              - Show this help message
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">about</span>             - Show information about Frank
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">skills</span>            - List technical skills
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">projects</span>          - Show projects list
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">certifications</span>    - Show certifications
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">contact</span>           - Show contact information
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">social</span>            - Show social media links
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">clear</span>             - Clear terminal
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">whoami</span>            - Current user information
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">date</span>              - Show current date/time
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">cls</span>               - Clear terminal (alias)
  <span class="text-[#00ffff] bg-[rgba(0,255,255,0.1)] px-1 rounded">exit</span>              - Close terminal`,
    },
    about: {
      description: "Show information about Frank",
      output: `
<span class="text-[#00ffff]">╔══════════════════════════════════════════════════════╗</span>
<span class="text-[#00ffff]">║</span>  Frank Anconeyra - Nyraroot                      <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">╠══════════════════════════════════════════════════════╣</span>
<span class="text-[#00ffff]">║</span>  ${aboutData.role}      <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  Location: Arequipa, Perú                          <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  Email: anconeyrafsuyo@gmail.com                   <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">╠══════════════════════════════════════════════════════╣</span>
<span class="text-[#00ffff]">║</span>  Passionate about creating secure, scalable         <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  applications that connect people, devices,          <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  and data.                                           <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">╚══════════════════════════════════════════════════════╝</span>`,
    },
    skills: {
      description: "List technical skills",
      output: () => {
        let html = '<span class="text-[#00ffff]">Technical Skills:</span>';
        skills.forEach((s) => {
          html += `\n\n<span class="text-[#ffcc00]">${s.name}:</span>\n  ${s.items.join(" • ")}`;
        });
        return html;
      },
    },
    projects: {
      description: "Show projects list",
      output: () => {
        let html = '<span class="text-[#00ffff]">Projects:</span>';
        projects.forEach((p) => {
          html += `\n\n<span class="text-[#00ff00]">${p.icon} ${p.name}</span> - ${p.tech}\n  ${p.description}`;
        });
        html += `\n\n<span class="text-[#00ffff]">Visit GitHub for details</span>`;
        return html;
      },
    },
    certifications: {
      description: "Show certifications",
      output: () => {
        let html = '<span class="text-[#00ffff]">Certifications (15+):</span>';
        certifications.forEach((c) => {
          html += `\n\n<span class="text-[#ffcc00]">${c.category} (${c.count}):</span>`;
          c.items.forEach((item) => {
            html += `\n  ✓ ${item.name} - ${item.org} ${item.year}`;
          });
        });
        html += '\n\n<span class="text-[#00ffff]">Visit Credly for verified badges!</span>';
        return html;
      },
    },
    contact: {
      description: "Show contact information",
      output: `
<span class="text-[#00ffff]">╔══════════════════════════════════════════════════════╗</span>
<span class="text-[#00ffff]">║</span>  Contact Information                             <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">╠══════════════════════════════════════════════════════╣</span>
<span class="text-[#00ffff]">║</span>  📧 Email: anconeyrafsuyo@gmail.com              <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  📍 Location: ${contactData.location}                     <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  💬 WhatsApp: ${contactData.phoneDisplay}                    <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  🔗 GitHub: github.com/Anconeyra                 <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">║</span>  💼 LinkedIn: linkedin.com/in/frank-anconeyra    <span class="text-[#00ffff]">║</span>
<span class="text-[#00ffff]">╚══════════════════════════════════════════════════════╝</span>`,
    },
    social: {
      description: "Show social media links",
      output: `
<span class="text-[#00ffff]">Social Media:</span>

  <span class="text-[#00ffff]">GitHub:</span>    https://github.com/Anconeyra
  <span class="text-[#00ffff]">LinkedIn:</span>  https://linkedin.com/in/frank-anconeyra
  <span class="text-[#00ffff]">Email:</span>     mailto:anconeyrafsuyo@gmail.com
  <span class="text-[#00ffff]">Credly:</span>    https://credly.com/users/frank-anconeyra`,
    },
    whoami: {
      description: "Current user information",
      output: `<span class="text-[#00ff00]">root@nyraroot</span> - Full-Stack Developer & Cybersecurity Analyst`,
    },
    date: {
      description: "Show current date/time",
      output: () => `<span class="text-[#00ffff]">Current Date:</span> ${new Date().toLocaleString("es-PE")}`,
    },
    clear: {
      description: "Clear terminal",
      action: () => setOutput([]),
    },
    cls: {
      description: "Clear terminal (alias)",
      action: () => setOutput([]),
    },
    exit: {
      description: "Close terminal",
      action: () => closeTerminal(),
    },
  };

  const executeCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const args = cmd.split(" ");
    const base = args[0];

    const lineKey = Date.now();
    const promptLine = (
      <div key={`cmd-${lineKey}`} className="flex gap-2">
        <span className="font-bold text-[#00ff00]">root@nyraroot:~$</span>
        <span>{raw}</span>
      </div>
    );

    if (!cmd) {
      setOutput((prev) => [...prev, promptLine]);
      return;
    }

    if (commands[base]) {
      const entry = commands[base];
      if (entry.action) {
        setOutput((prev) => [...prev, promptLine]);
        entry.action!();
        return;
      }
      const out = typeof entry.output === "function" ? (entry.output as () => string)() : (entry.output as string);
      setOutput((prev) => [
        ...prev,
        promptLine,
        <div key={`out-${lineKey}`} className="whitespace-pre-wrap break-words text-[#00ff00]" dangerouslySetInnerHTML={{ __html: out ?? "" }} />,
      ]);
    } else {
      setOutput((prev) => [
        ...prev,
        promptLine,
        <div key={`err-${lineKey}`} className="text-[#ff5f56]">
          Command not found: {base}. Type &apos;help&apos; for available commands.
        </div>,
      ]);
    }
  };

  const autocompleteCommand = () => {
    const cur = input.toLowerCase();
    const matches = Object.keys(commands).filter((c) => c.startsWith(cur));
    if (matches.length === 1) {
      setInput(matches[0]);
    } else if (matches.length > 1) {
      setOutput((prev) => [
        ...prev,
        <div key={`ac-${Date.now()}`} className="text-[#00ffff]">
          {matches.join("  ")}
        </div>,
      ]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = input.trim();
      if (val) {
        setHistory((h) => [...h, val.toLowerCase()]);
        setHistoryIndex(history.length + 1);
        executeCommand(val);
      } else {
        executeCommand("");
      }
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        const idx = historyIndex - 1;
        setHistoryIndex(idx);
        setInput(history[idx] ?? "");
      } else if (history.length > 0 && historyIndex === -1) {
        setHistoryIndex(history.length - 1);
        setInput(history[history.length - 1] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const idx = historyIndex + 1;
        setHistoryIndex(idx);
        setInput(history[idx] ?? "");
      } else {
        setHistoryIndex(history.length);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      autocompleteCommand();
    }
  };

  return (
    <>
      <button
        id="terminal-toggle"
        aria-label="Abrir terminal"
        onClick={openTerminal}
        className="fixed right-[30px] bottom-[160px] z-[997] flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-[#00ff00] bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] shadow-[0_4px_15px_rgba(0,255,0,0.3)] transition hover:scale-110 hover:shadow-[0_6px_25px_rgba(0,255,0,0.5)] max-[768px]:right-[20px] max-[768px]:bottom-[140px] max-[768px]:h-[45px] max-[768px]:w-[45px]"
        style={{ animation: "terminalPulse 2s ease-in-out infinite" }}
      >
        <span aria-hidden="true" className="text-[1.25rem] text-[#00ff00]">
          &gt;_
        </span>
      </button>

      <div
        id="terminal-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal interactiva"
        className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-[10px] transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeTerminal();
        }}
      >
        <div className="flex h-[80vh] w-[90%] max-w-[900px] flex-col overflow-hidden rounded-[10px] border border-[#333] bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,255,0,0.2)] max-[768px]:h-[90vh] max-[768px]:w-[95%]">
          <div className="flex items-center justify-between border-b border-[#333] bg-[#1a1a1a] px-6 py-4">
            <div className="flex items-center gap-3 font-mono text-[0.95rem] text-[#00ff00]">
              <span aria-hidden="true">&gt;_</span>
              <span>root@nyraroot:~</span>
            </div>
            <button
              id="terminal-close"
              aria-label="Cerrar terminal"
              onClick={closeTerminal}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-none bg-[#ff5f56] text-white transition hover:scale-110 hover:bg-[#ff3b30]"
            >
              ×
            </button>
          </div>

          <div ref={bodyRef} id="terminal-body" className="flex-1 overflow-y-auto p-6 font-mono text-[0.95rem] leading-[1.6] max-[768px]:text-[0.85rem]">
            <div id="terminal-output" className="mb-4 text-[#00ff00]">
              {output}
            </div>
            <div className="flex items-center gap-3 text-[#00ff00]">
              <span className="font-bold">root@nyraroot:~$</span>
              <input
                ref={inputRef}
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 border-none bg-transparent font-mono text-[0.95rem] text-[#00ff00] caret-[#00ff00] outline-none max-[768px]:text-[0.85rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
