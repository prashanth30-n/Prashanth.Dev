import React, { useState } from 'react';
import { FileText, Mail, Github, Twitter, Linkedin, Code, Check, Copy, ExternalLink, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface TanishqHeroProps {
  onOpenResume: () => void;
}

export const TanishqHero: React.FC<TanishqHeroProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-6 pb-10 border-b border-zinc-200 dark:border-zinc-800/80">
      {/* Avatar & Title Header */}
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shrink-0">
          <img
            src={PERSONAL_INFO.avatarUrl}
            alt={PERSONAL_INFO.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-display uppercase">
            {PERSONAL_INFO.displayName}
          </h1>
          <a
            href={PERSONAL_INFO.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-zinc-500 hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            <span>{PERSONAL_INFO.handle}</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Bio Copy (tanishqlabs.in style) */}
      <div className="space-y-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Philomath</strong> &amp; <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Fullstack developer</strong> who mostly writes <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Go</strong>. I love exploring and building things.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Open source and first principles is where most of my serious work lives.
        </p>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Available for full-time roles, contracts, and internships.
        </p>
      </div>

      {/* Resume Button */}
      <div className="pt-1">
        <button
          onClick={onOpenResume}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:opacity-90 transition-opacity shadow-sm"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Resume</span>
          <span className="text-[10px] opacity-70">PDF</span>
        </button>
      </div>

      {/* Connect Header & Links (tanishqlabs.in exact style) */}
      <div className="pt-4 space-y-3">
        <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
          Where you can Connect with Me (ofcourse digitally)
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Email Me button with copy action */}
          <div className="relative inline-flex items-center">
            <a
              href={PERSONAL_INFO.links.email}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 px-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-zinc-500" />
              <span>Email Me</span>
            </a>
            <button
              onClick={copyEmail}
              className="ml-1 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              title="Copy email address"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Twitter / X */}
          <a
            href={PERSONAL_INFO.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 px-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <Twitter className="h-3.5 w-3.5 text-zinc-500" />
            <span>Twitter</span>
          </a>

          {/* GitHub */}
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 px-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <Github className="h-3.5 w-3.5 text-zinc-500" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn (User-provided link) */}
          <a
            href={PERSONAL_INFO.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 px-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5 text-[#0077B5]" />
            <span>LinkedIn</span>
          </a>

          {/* LeetCode */}
          <a
            href={PERSONAL_INFO.links.leetcode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 px-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <Code className="h-3.5 w-3.5 text-amber-500" />
            <span>LeetCode (400+)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
