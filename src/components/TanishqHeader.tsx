import React, { useState, useEffect } from 'react';
import { Sun, Moon, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface TanishqHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenTerminal: () => void;
}

export const TanishqHeader: React.FC<TanishqHeaderProps> = ({ darkMode, onToggleTheme, onOpenTerminal }) => {
  const [indiaTime, setIndiaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      setIndiaTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full py-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 mb-8 transition-colors">
      {/* Brand Mark */}
      <a
        href="#"
        className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-100 font-mono text-[10px] font-bold text-white dark:text-zinc-950">
          PN
        </span>
        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
          prashanth.dev
        </span>
      </a>

      {/* Right Controls: Local time + Terminal + Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Real-time India Time Widget (tanishqlabs.in style) */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">IN</span>
          <span className="tabular-nums">{indiaTime || '11:34 AM'}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Terminal Button */}
        <button
          onClick={onOpenTerminal}
          className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title="Terminal (⌘K)"
          aria-label="Open Command Terminal"
        >
          <Terminal className="h-4 w-4" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};
