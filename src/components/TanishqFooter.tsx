import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Github, Twitter, Linkedin, Mail, FileText } from 'lucide-react';

interface TanishqFooterProps {
  onOpenResume: () => void;
}

export const TanishqFooter: React.FC<TanishqFooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-10 pb-16 space-y-6 text-xs text-zinc-500 dark:text-zinc-500 font-mono">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-display">
            {PERSONAL_INFO.name}
          </div>
          <div className="text-xs text-zinc-500 mt-0.5">
            Built with focus, caffeine & a hint of chaos
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a
            href={PERSONAL_INFO.links.email}
            className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            Email
          </a>
          <a
            href={PERSONAL_INFO.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            Twitter
          </a>
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={onOpenResume}
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            <span>Resume</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>

        <button
          onClick={scrollToTop}
          className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title="Return to top"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="text-center text-[11px] text-zinc-400 dark:text-zinc-600 italic pt-4">
        Still scrolling? You're persistent. I like that. 👀
      </div>
    </footer>
  );
};
