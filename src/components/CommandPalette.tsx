import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles, FolderGit2, Mail, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, Project } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ cmd: string; output: string | React.ReactNode }[]>([
    {
      cmd: "welcome",
      output: `Prashanth Nakirekanti CLI v1.0.0. Type 'help' to see all available commands, or select a quick action below.`
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim().toLowerCase();
    if (!trimmed) return;

    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div>Available commands:</div>
            <div className="text-cyan-400">  projects    - Browse production systems & case studies</div>
            <div className="text-cyan-400">  pubo        - Open Pubo layered Go system details</div>
            <div className="text-cyan-400">  lore        - Open Lore Agent skill generator</div>
            <div className="text-cyan-400">  skillsocket - Open SkillSocket real-time platform</div>
            <div className="text-cyan-400">  lab         - Jump to interactive Systems Lab</div>
            <div className="text-cyan-400">  philosophy  - View first-principles engineering mental models</div>
            <div className="text-cyan-400">  github      - Open GitHub profile (prashanth30-n)</div>
            <div className="text-cyan-400">  twitter     - Open Twitter profile (@prashanth_n369)</div>
            <div className="text-cyan-400">  contact     - View contact email & links</div>
            <div className="text-cyan-400">  clear       - Clear terminal history</div>
          </div>
        );
        break;

      case 'projects':
        window.location.hash = '#projects';
        output = 'Navigated to #projects section.';
        onClose();
        break;

      case 'pubo': {
        const pubo = PROJECTS.find((p) => p.id === 'pubo');
        if (pubo) {
          onSelectProject(pubo);
          output = 'Opening Pubo architectural case study...';
          onClose();
        }
        break;
      }

      case 'lore': {
        const lore = PROJECTS.find((p) => p.id === 'lore');
        if (lore) {
          onSelectProject(lore);
          output = 'Opening Lore Agent case study...';
          onClose();
        }
        break;
      }

      case 'skillsocket': {
        const skill = PROJECTS.find((p) => p.id === 'skillsocket');
        if (skill) {
          onSelectProject(skill);
          output = 'Opening SkillSocket case study...';
          onClose();
        }
        break;
      }

      case 'lab':
        window.location.hash = '#systems-lab';
        output = 'Navigated to #systems-lab playground.';
        onClose();
        break;

      case 'philosophy':
        window.location.hash = '#philosophy';
        output = 'Navigated to #philosophy section.';
        onClose();
        break;

      case 'github':
        window.open(PERSONAL_INFO.links.github, '_blank');
        output = `Opened ${PERSONAL_INFO.links.github}`;
        break;

      case 'twitter':
        window.open(PERSONAL_INFO.links.twitter, '_blank');
        output = `Opened ${PERSONAL_INFO.links.twitter}`;
        break;

      case 'contact':
        output = (
          <div className="text-slate-300">
            Email: <span className="text-cyan-400 select-all">{PERSONAL_INFO.email}</span>
            <br />
            Location: {PERSONAL_INFO.location}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = `Command not recognized: '${trimmed}'. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output }]);
    setInput('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border border-slate-800 bg-[#0C1019] text-slate-100 shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">prashanth@sysops:~</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Terminal Output Body */}
        <div className="p-4 max-h-[320px] overflow-y-auto space-y-3 bg-[#080B11]/90">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span>❯</span>
                <span className="text-white">{item.cmd}</span>
              </div>
              <div className="pl-4 text-slate-300 leading-relaxed">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Click Commands */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/50 border-t border-slate-800/60 overflow-x-auto text-[11px]">
          <span className="text-slate-500 mr-1">Quick:</span>
          {['help', 'pubo', 'lore', 'skillsocket', 'lab', 'github', 'contact', 'clear'].map((c) => (
            <button
              key={c}
              onClick={() => handleCommand(c)}
              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 whitespace-nowrap"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={onSubmit} className="flex items-center border-t border-slate-800 px-4 py-3 bg-slate-950">
          <span className="text-cyan-400 mr-2 font-bold">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (try 'projects', 'pubo', 'lab', 'help')..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 text-xs"
          />
          <button
            type="submit"
            className="p-1 text-slate-500 hover:text-cyan-400 transition-colors"
            aria-label="Execute command"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
