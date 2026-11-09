import React, { useState } from 'react';
import { GitCommit, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GitHubActivity: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{ day: string; count: number } | null>(null);

  // Generate 52 weeks x 7 days pseudo-activity mapped to Prashanth's high-velocity building
  const weeks = 28;
  const days = 7;
  
  // Seed a realistic commit density
  const grid = Array.from({ length: weeks }, (_, wIndex) => {
    return Array.from({ length: days }, (_, dIndex) => {
      // higher intensity on weekdays and recent months
      const isWeekend = dIndex === 0 || dIndex === 6;
      const seed = Math.sin(wIndex * 1.5 + dIndex * 0.8) * 10;
      let count = 0;
      if (wIndex > 10) {
        if (!isWeekend && seed > 0) count = Math.floor((seed % 6) + 1);
        if (isWeekend && seed > 4) count = Math.floor((seed % 4) + 1);
        if (wIndex > 20) count += 2; // high recent activity in hackathons & Pubo
      }
      return count;
    });
  });

  const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

  const getColor = (count: number) => {
    if (count === 0) return 'bg-zinc-200 dark:bg-zinc-800/60';
    if (count <= 2) return 'bg-emerald-200 dark:bg-emerald-950/80 text-emerald-900 border border-emerald-800/40';
    if (count <= 4) return 'bg-emerald-400 dark:bg-emerald-700/80 text-emerald-900';
    if (count <= 6) return 'bg-emerald-500 dark:bg-emerald-500 text-white';
    return 'bg-emerald-600 dark:bg-emerald-400 text-black';
  };

  return (
    <section className="space-y-4 pb-10 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono flex items-center gap-2">
          <GitCommit className="h-4 w-4 text-emerald-500" />
          <span>GitHub contributions</span>
        </h2>

        <a
          href={PERSONAL_INFO.links.github}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono text-zinc-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1"
        >
          <span>github.com/{PERSONAL_INFO.links.github.split('/').pop()}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Contribution Heatmap Container */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3">
        {/* Month labels */}
        <div className="flex justify-between text-[10px] font-mono text-zinc-400 px-1">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-[3px] min-w-[500px]">
            {grid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.map((count, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => setHoveredCell({ day: `Week ${wIdx + 1}, Day ${dIdx + 1}`, count })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`h-[11px] w-[11px] rounded-[2px] transition-colors cursor-pointer ${getColor(count)}`}
                    title={`${count} commits`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[11px] font-mono text-zinc-500">
          <div>
            {hoveredCell ? (
              <span className="text-zinc-800 dark:text-zinc-200">
                {hoveredCell.count} commits on {hoveredCell.day}
              </span>
            ) : (
              <span>30+ Public Repositories · Active Open Source Commits</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-[1px] bg-zinc-200 dark:bg-zinc-800/60" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-200 dark:bg-emerald-950/80" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-400 dark:bg-emerald-700/80" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-500 dark:bg-emerald-500" />
            <span className="h-2.5 w-2.5 rounded-[1px] bg-emerald-600 dark:bg-emerald-400" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};
