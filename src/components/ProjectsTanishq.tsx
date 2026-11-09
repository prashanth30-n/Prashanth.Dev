import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { Github, ExternalLink, Image, Layers, ChevronRight, X } from 'lucide-react';

interface ProjectsTanishqProps {
  onOpenArchitecture: (project: Project) => void;
  onOpenScreenshots: (project: Project) => void;
}

export const ProjectsTanishq: React.FC<ProjectsTanishqProps> = ({
  onOpenArchitecture,
  onOpenScreenshots
}) => {
  return (
    <section className="space-y-6 pb-10 border-b border-zinc-200 dark:border-zinc-800/80">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-display">
          Projects ({PROJECTS.length})
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1">
          Proudly presenting the code that didn't crash. Mostly.
        </p>
      </div>

      <div className="space-y-6">
        {PROJECTS.map((project) => {
          const hasScreenshots = Boolean(project.screenshots && project.screenshots.length > 0);
          const hasArchitecture = Boolean(project.architectureDiagram || project.bannerImage);

          const getStatusBadge = () => {
            switch (project.status) {
              case 'Under active development':
                return 'border-amber-400/40 bg-amber-500/10 text-amber-600 dark:text-amber-400';
              case 'IARE Hacktoberfest':
                return 'border-purple-400/40 bg-purple-500/10 text-purple-600 dark:text-purple-400';
              default:
                return 'border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300';
            }
          };

          return (
            <div
              key={project.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-50/40 dark:bg-zinc-950/40 space-y-3.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              {/* Header: Title + Status */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-display">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      — {project.subtitle}
                    </span>
                  )}
                </div>

                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge()}`}>
                  {project.status}
                </span>
              </div>

              {/* Main summary */}
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                {project.description}
              </p>

              {/* Technical Bullets from Resume */}
              {project.bullets && project.bullets.length > 0 && (
                <ul className="space-y-1.5 pt-1 pl-3 border-l-2 border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      • {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-6 items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 px-2 font-mono text-[11px] text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons: GitHub + Screenshots + Architecture */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </a>

                {hasScreenshots && (
                  <button
                    onClick={() => onOpenScreenshots(project)}
                    className="inline-flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 hover:underline transition-colors"
                  >
                    <Image className="h-3.5 w-3.5" />
                    <span>Screenshots ({project.screenshots?.length})</span>
                  </button>
                )}

                {hasArchitecture && (
                  <button
                    onClick={() => onOpenArchitecture(project)}
                    className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Architecture Spec</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
