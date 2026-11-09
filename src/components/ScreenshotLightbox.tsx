import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ScreenshotLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && project?.screenshots) {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.screenshots!.length - 1));
      }
      if (e.key === 'ArrowRight' && project?.screenshots) {
        setCurrentIndex((prev) => (prev < project.screenshots!.length - 1 ? prev + 1 : 0));
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project || !project.screenshots || project.screenshots.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl border border-zinc-800 bg-[#121314] text-white overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3 bg-[#18191a]">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-accent" />
            <span className="text-xs font-mono font-semibold">
              {project.title} Screenshots
            </span>
            <span className="text-zinc-500 font-mono text-xs">
              ({currentIndex + 1} of {project.screenshots.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Main Display Area */}
        <div className="relative flex-1 flex items-center justify-center bg-black/90 p-4 min-h-[380px] max-h-[600px] overflow-hidden">
          <img
            src={project.screenshots[currentIndex]}
            alt={`${project.title} screenshot ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            className="max-h-[520px] max-w-full rounded-md object-contain shadow-2xl"
          />

          {project.screenshots.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.screenshots!.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800 border border-zinc-700 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < project.screenshots!.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-800 border border-zinc-700 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails Strip */}
        <div className="flex items-center gap-2 p-3 bg-[#161718] border-t border-zinc-800 overflow-x-auto">
          {project.screenshots.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-14 w-14 rounded-md overflow-hidden border shrink-0 transition-all ${
                currentIndex === idx
                  ? 'border-accent ring-2 ring-white/30'
                  : 'border-zinc-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={url}
                alt={`Thumb ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
