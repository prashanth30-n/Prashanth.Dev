import React from 'react';
import { STACK_CATEGORIES } from '../data/portfolioData';
import { Layers } from 'lucide-react';

export const StackSection: React.FC = () => {
  return (
    <section className="space-y-6 pb-10 border-b border-zinc-200 dark:border-zinc-800/80">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
          Stack
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
          This list grows faster than my GitHub stars — and I kinda like that.
        </p>
      </div>

      <div className="space-y-6">
        {STACK_CATEGORIES.map((cat) => (
          <div key={cat.number} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent font-bold">
                {cat.number}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-mono">
                {cat.category}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex h-7 items-center rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/70 dark:bg-zinc-900/60 px-3 font-mono text-xs text-zinc-800 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
