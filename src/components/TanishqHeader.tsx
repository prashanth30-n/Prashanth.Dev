import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Terminal, Palette, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export type PaletteName = 'zinc' | 'cyan' | 'emerald' | 'amber' | 'violet';

interface TanishqHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  palette: PaletteName;
  onSelectPalette: (p: PaletteName) => void;
  onOpenTerminal: () => void;
}

const PALETTES: { id: PaletteName; name: string; color: string }[] = [
  { id: 'cyan', name: 'Cyan (Default)', color: '#06b6d4' },
  { id: 'zinc', name: 'Zinc (Monochrome)', color: '#71717a' },
  { id: 'emerald', name: 'Emerald (Matrix)', color: '#10b981' },
  { id: 'amber', name: 'Amber (Terminal)', color: '#f59e0b' },
  { id: 'violet', name: 'Violet (AI Agents)', color: '#8b5cf6' },
];

export const TanishqHeader: React.FC<TanishqHeaderProps> = ({
  darkMode,
  onToggleTheme,
  palette,
  onSelectPalette,
  onOpenTerminal,
}) => {
  const [indiaTime, setIndiaTime] = useState<string>('');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  // Close palette dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setIsPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

      {/* Right Controls: Local time + Palette Picker + Terminal + Theme Toggle */}
      <div className="flex items-center gap-2.5">
        {/* Real-time India Time Widget (tanishqlabs.in style) */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/60 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-200">IN</span>
          <span className="tabular-nums">{indiaTime || '11:34 AM'}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Color Palette Menu */}
        <div className="relative" ref={paletteRef}>
          <button
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-mono transition-colors"
            title="Choose Color Theme"
            aria-label="Color Palette Selector"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: PALETTES.find((p) => p.id === palette)?.color }}
            />
            <span className="hidden md:inline capitalize">{palette}</span>
            <Palette className="h-3.5 w-3.5 opacity-70" />
          </button>

          {/* Palette Dropdown Popover */}
          {isPaletteOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#161718] p-1.5 shadow-xl z-50 text-xs font-mono space-y-0.5 animate-in fade-in duration-150">
              <div className="px-2.5 py-1 text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                Color Palette
              </div>
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectPalette(p.id);
                    setIsPaletteOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                    palette === p.id
                      ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span>{p.name}</span>
                  </div>
                  {palette === p.id && <Check className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-100" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Terminal Quick Launcher */}
        <button
          onClick={onOpenTerminal}
          className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title="Terminal (⌘K)"
          aria-label="Open Command Terminal"
        >
          <Terminal className="h-4 w-4" />
        </button>

        {/* Light / Dark Mode Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-700" />
          )}
        </button>
      </div>
    </header>
  );
};
