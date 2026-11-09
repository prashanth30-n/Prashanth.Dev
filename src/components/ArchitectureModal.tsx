import React, { useEffect } from 'react';
import { X, Layers, Github } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121314] text-zinc-900 dark:text-zinc-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5 bg-zinc-50 dark:bg-[#161718]">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-semibold">
              {project.title} — System Architecture Spec
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {project.bannerImage && (
            <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-[16/9] max-h-60 bg-zinc-950">
              <img
                src={project.bannerImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {project.architectureDiagram && (
            <div className="space-y-2">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Topology Flow Diagram
              </div>
              <div className="p-4 rounded-lg bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 overflow-x-auto">
                <pre className="font-mono text-xs text-cyan-400 leading-relaxed whitespace-pre">
                  {project.architectureDiagram}
                </pre>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Implementation Details
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {project.bullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">
                  • {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-5 py-3 bg-zinc-50 dark:bg-[#161718] text-xs font-mono">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5"
          >
            <Github className="h-3.5 w-3.5" />
            <span>View Source on GitHub</span>
          </a>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
